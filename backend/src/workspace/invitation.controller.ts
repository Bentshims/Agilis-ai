import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('invitations')
export class InvitationController {
  constructor(private workspaceService: WorkspaceService) {}

  @Post(':token/accept')
  @UseGuards(JwtAuthGuard)
  accept(@Param('token') token: string, @CurrentUser('id') userId: string) {
    return this.workspaceService.acceptInvitation(token, userId);
  }
}
