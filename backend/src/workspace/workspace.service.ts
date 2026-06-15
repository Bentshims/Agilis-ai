import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 48) || 'wsp';
}

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async list(userId: string) {
    return this.prisma.workspace.findMany({
      where: { members: { some: { userId } } },
      include: {
        _count: { select: { members: true, agents: true, tasks: true } },
        members: {
          where: { userId },
          select: { role: true },
        },
      },
    });
  }

  async getById(workspaceId: string, userId: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        _count: { select: { members: true, agents: true, tasks: true } },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        subscription: {
          select: { plan: true, status: true, tasksUsed: true, tasksIncluded: true },
        },
      },
    });

    if (!workspace) {
      throw new NotFoundException('Espace de travail introuvable');
    }

    const membership = workspace.members.find((m) => m.user.id === userId);
    if (!membership) {
      throw new ForbiddenException("Vous n'êtes pas membre de cet espace de travail");
    }

    return { ...workspace, currentUserRole: membership.role };
  }

  async create(dto: CreateWorkspaceDto, userId: string) {
    const slug = `${slugify(dto.name)}-${randomBytes(4).toString('hex')}`;

    const workspace = await this.prisma.$transaction(async (tx) => {
      const ws = await tx.workspace.create({
        data: { name: dto.name, slug },
      });

      await tx.member.create({
        data: {
          userId,
          workspaceId: ws.id,
          role: 'ADMIN',
        },
      });

      return ws;
    });

    return workspace;
  }

  async update(workspaceId: string, dto: UpdateWorkspaceDto, userId: string) {
    await this.requireAdmin(workspaceId, userId);

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.logo !== undefined) data.logo = dto.logo;

    return this.prisma.workspace.update({
      where: { id: workspaceId },
      data,
    });
  }

  async delete(workspaceId: string, userId: string) {
    await this.requireAdmin(workspaceId, userId);

    await this.prisma.workspace.delete({ where: { id: workspaceId } });

    return { message: 'Espace de travail supprimé' };
  }

  async addMember(workspaceId: string, dto: AddMemberDto, userId: string) {
    await this.requireAdmin(workspaceId, userId);

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException("Aucun utilisateur avec cet email");
    }

    const existing = await this.prisma.member.findUnique({
      where: { workspaceId_userId: { workspaceId, userId: user.id } },
    });

    if (existing) {
      throw new ConflictException("Cet utilisateur est déjà membre");
    }

    const member = await this.prisma.member.create({
      data: {
        workspaceId,
        userId: user.id,
        role: dto.role ?? 'MEMBER',
      },
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
      },
    });

    return member;
  }

  async removeMember(workspaceId: string, memberId: string, userId: string) {
    await this.requireAdmin(workspaceId, userId);

    const member = await this.prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!member || member.workspaceId !== workspaceId) {
      throw new NotFoundException('Membre introuvable');
    }

    if (member.userId === userId) {
      const adminCount = await this.prisma.member.count({
        where: { workspaceId, role: 'ADMIN' },
      });
      if (adminCount <= 1) {
        throw new BadRequestException("Vous ne pouvez pas quitter l'espace en tant que dernier administrateur");
      }
    }

    await this.prisma.member.delete({ where: { id: memberId } });

    return { message: 'Membre retiré' };
  }

  async updateMemberRole(workspaceId: string, memberId: string, dto: UpdateMemberRoleDto, userId: string) {
    await this.requireAdmin(workspaceId, userId);

    const member = await this.prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!member || member.workspaceId !== workspaceId) {
      throw new NotFoundException('Membre introuvable');
    }

    if (member.userId === userId && dto.role !== 'ADMIN') {
      const adminCount = await this.prisma.member.count({
        where: { workspaceId, role: 'ADMIN' },
      });
      if (adminCount <= 1) {
        throw new BadRequestException("Vous ne pouvez pas rétrograder le dernier administrateur");
      }
    }

    return this.prisma.member.update({
      where: { id: memberId },
      data: { role: dto.role },
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
      },
    });
  }

  async listInvitations(workspaceId: string, userId: string) {
    await this.requireAdmin(workspaceId, userId);

    return this.prisma.invitation.findMany({
      where: { workspaceId, acceptedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createInvitation(workspaceId: string, email: string, role: Role, userId: string) {
    await this.requireAdmin(workspaceId, userId);

    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (!userExists) {
      throw new NotFoundException("Aucun utilisateur avec cet email");
    }

    const existingMember = await this.prisma.member.findUnique({
      where: { workspaceId_userId: { workspaceId, userId: userExists.id } },
    });
    if (existingMember) {
      throw new ConflictException("Cet utilisateur est déjà membre");
    }

    const existingInvitation = await this.prisma.invitation.findUnique({
      where: { workspaceId_email: { workspaceId, email } },
    });
    if (existingInvitation && !existingInvitation.acceptedAt) {
      throw new ConflictException("Une invitation est déjà en attente pour cet email");
    }

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return this.prisma.invitation.create({
      data: { workspaceId, email, role, token, expiresAt },
    });
  }

  async acceptInvitation(token: string, userId: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { token },
    });

    if (!invitation || invitation.acceptedAt) {
      throw new NotFoundException('Invitation invalide ou déjà acceptée');
    }

    if (invitation.expiresAt < new Date()) {
      throw new BadRequestException('Invitation expirée');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.email !== invitation.email) {
      throw new ForbiddenException('Cette invitation ne vous est pas destinée');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.member.create({
        data: {
          workspaceId: invitation.workspaceId,
          userId,
          role: invitation.role,
        },
      });

      await tx.invitation.update({
        where: { id: invitation.id },
        data: { acceptedAt: new Date() },
      });
    });

    return { message: 'Invitation acceptée' };
  }

  async cancelInvitation(workspaceId: string, invitationId: string, userId: string) {
    await this.requireAdmin(workspaceId, userId);

    const invitation = await this.prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation || invitation.workspaceId !== workspaceId) {
      throw new NotFoundException('Invitation introuvable');
    }

    await this.prisma.invitation.delete({ where: { id: invitationId } });

    return { message: 'Invitation annulée' };
  }

  private async requireAdmin(workspaceId: string, userId: string) {
    const member = await this.prisma.member.findUnique({
      where: { workspaceId_userId: { workspaceId, userId } },
    });

    if (!member) {
      throw new ForbiddenException("Vous n'êtes pas membre de cet espace de travail");
    }

    if (member.role !== 'ADMIN') {
      throw new ForbiddenException('Seuls les administrateurs peuvent effectuer cette action');
    }

    return member;
  }
}
