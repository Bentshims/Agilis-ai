import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Get()
  list(@CurrentUser('id') userId: string) {
    return this.workspaceService.list(userId);
  }

  @Post()
  create(@Body() dto: CreateWorkspaceDto, @CurrentUser('id') userId: string) {
    return this.workspaceService.create(dto, userId);
  }

  @Get(':id')
  getById(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.workspaceService.getById(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkspaceDto, @CurrentUser('id') userId: string) {
    return this.workspaceService.update(id, dto, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.workspaceService.delete(id, userId);
  }

  @Post(':id/members')
  addMember(@Param('id') id: string, @Body() dto: AddMemberDto, @CurrentUser('id') userId: string) {
    return this.workspaceService.addMember(id, dto, userId);
  }

  @Delete(':id/members/:memberId')
  removeMember(@Param('id') id: string, @Param('memberId') memberId: string, @CurrentUser('id') userId: string) {
    return this.workspaceService.removeMember(id, memberId, userId);
  }

  @Patch(':id/members/:memberId/role')
  updateMemberRole(@Param('id') id: string, @Param('memberId') memberId: string, @Body() dto: UpdateMemberRoleDto, @CurrentUser('id') userId: string) {
    return this.workspaceService.updateMemberRole(id, memberId, dto, userId);
  }

  @Get(':id/invitations')
  listInvitations(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.workspaceService.listInvitations(id, userId);
  }

  @Post(':id/invitations')
  createInvitation(@Param('id') id: string, @Body() dto: AddMemberDto, @CurrentUser('id') userId: string) {
    return this.workspaceService.createInvitation(id, dto.email, dto.role ?? 'MEMBER', userId);
  }

  @Delete(':id/invitations/:invitationId')
  cancelInvitation(@Param('id') id: string, @Param('invitationId') invitationId: string, @CurrentUser('id') userId: string) {
    return this.workspaceService.cancelInvitation(id, invitationId, userId);
  }
}
