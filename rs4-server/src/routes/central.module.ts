import { Module } from '@nestjs/common';
import { CentralUserControllerCentral } from 'src/admin/central/admin.controller.central';
import { AttentionControllerCentral } from 'src/attention/central/attention.controller.central';
import { CentralAuthModule } from 'src/auth/auth-central/centralAuth.module';
import { CentralAuthController } from 'src/auth/auth-central/controllers/centralAuth.controller';
import { CentralAuthService } from 'src/auth/auth-central/services/centralAuth.service';
import { GroupControllerCentral } from 'src/group/central/group.controller.central';
import { SharedModule } from 'src/shared/shared.module';
import { SurnameControllerCentral } from 'src/surname/central/surname.controller.central';

@Module({
  imports: [CentralAuthModule, SharedModule],
  controllers: [
    CentralAuthController,
    SurnameControllerCentral,
    GroupControllerCentral,
    AttentionControllerCentral,
    CentralUserControllerCentral,
  ],
})
export class CentralModule {}
