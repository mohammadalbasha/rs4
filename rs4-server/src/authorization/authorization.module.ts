import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CaslModule } from './casl/casl.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule, CaslModule],
  controllers: [],
  providers: [],
})
export class AuthorizationModule {}
