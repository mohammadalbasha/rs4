import { Module } from '@nestjs/common';

import { CentralAuthController } from './controllers/centralAuth.controller';
import { CentralAuthService } from './services/centralAuth.service';
import { PasswordService } from './services/password.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtModule],
  providers: [CentralAuthService, PasswordService, JwtStrategy],
  exports: [CentralAuthService, PasswordService],
})
export class CentralAuthModule {}
