import { Module } from '@nestjs/common';

import { MailSmtpService } from './services/mailSmtp.service';
import { CentralMailService } from './services/centralMail.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

import { CommonMailService } from './services/commonMail.service';

@Module({
 
  providers: [
    MailSmtpService,
    CentralMailService,
    
    CommonMailService,
  ],
  exports: [CentralMailService, MailSmtpService],
})
export class MailModule {}
