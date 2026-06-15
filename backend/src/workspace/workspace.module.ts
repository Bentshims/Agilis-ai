import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { InvitationController } from './invitation.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  controllers: [WorkspaceController, InvitationController],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
