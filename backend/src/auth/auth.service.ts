import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, createHash } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

const SALT_ROUNDS = 12;
const ACCESS_TOKEN_EXPIRES = '15m';
const REFRESH_TOKEN_EXPIRES = '7d';
const REFRESH_TOKEN_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 48) || 'wsp';
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function sanitizeUser(user: { passwordHash?: string; [key: string]: unknown }) {
  const { passwordHash: _, ...rest } = user;
  void _;
  return rest;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    const { email, password, name } = dto;

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('Un compte avec cet email existe déjà');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const displayName = name ?? email.split('@')[0];

    const user = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name: displayName,
          passwordHash,
        },
      });

      const workspaceName = `Espace de travail de ${displayName}`;
      const slug = `${slugify(displayName)}-${randomBytes(4).toString('hex')}`;

      const workspace = await tx.workspace.create({
        data: {
          name: workspaceName,
          slug,
        },
      });

      await tx.member.create({
        data: {
          userId: user.id,
          workspaceId: workspace.id,
          role: 'ADMIN',
        },
      });

      return user;
    });

    const tokens = await this.generateTokens(user.id, user.email);

    return { user: sanitizeUser(user), ...tokens };
  }

  async signin(dto: SigninDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    return { user: sanitizeUser(user), ...tokens };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<{ sub: string; email: string }>(
        refreshToken,
        { secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET') },
      );

      const tokenHash = hashToken(refreshToken);
      const stored = await this.prisma.refreshToken.findUnique({
        where: { token: tokenHash },
      });

      if (!stored || stored.revokedAt) {
        throw new UnauthorizedException();
      }

      await this.prisma.refreshToken.update({
        where: { id: stored.id },
        data: { revokedAt: new Date() },
      });

      const tokens = await this.generateTokens(payload.sub, payload.email);

      return tokens;
    } catch {
      throw new UnauthorizedException('Session expirée, veuillez vous reconnecter');
    }
  }

  async signout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      await this.prisma.refreshToken.updateMany({
        where: { userId, token: tokenHash, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    } else {
      await this.prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        stripeCustomerId: true,
        createdAt: true,
        members: {
          select: {
            role: true,
            workspace: {
              select: {
                id: true,
                name: true,
                slug: true,
                logo: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }

    return user;
  }

  private async generateTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, email },
      { expiresIn: ACCESS_TOKEN_EXPIRES },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId, email },
      {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: REFRESH_TOKEN_EXPIRES,
      },
    );

    await this.prisma.refreshToken.create({
      data: {
        token: hashToken(refreshToken),
        userId,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
      },
    });

    return { accessToken, refreshToken };
  }
}
