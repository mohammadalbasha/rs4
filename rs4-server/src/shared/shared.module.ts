import { Global, Module } from '@nestjs/common';
import { CentralAuthModule } from 'src/auth/auth-central/centralAuth.module';
import { CaslModule } from 'src/authorization/casl/casl.module';

import { AppLoggerModule } from './logger/logger.module';
import { MailModule } from './mail/mail.module';
import { PrismaService } from './prisma/prisma.service';
import { CaslAbilityFactory } from 'src/authorization/casl/casl-ability.factory';
import { TranslateService } from './translation/translateService';

@Global()
@Module({
  imports: [
    AppLoggerModule,
    MailModule,
    CentralAuthModule,
    CaslModule,
  ],
  providers: [PrismaService, TranslateService],
  exports: [
    AppLoggerModule,
    MailModule,
    CentralAuthModule,
    CaslModule,
    PrismaService,
    TranslateService,
  ],
})
export class SharedModule {}
