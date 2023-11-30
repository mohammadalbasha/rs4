import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService, PathImpl2 } from '@nestjs/config';
import { CentralUser } from '@prisma/client';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { NodeConfig } from 'src/shared/configs/config.interfaces';
import { Environment } from 'src/shared/constants/environments';
import { I18nTranslations } from 'src/shared/i18n/i18n.generated';
import { PrismaService } from 'src/shared/prisma/prisma.service';

import { MailSmtpService } from './mailSmtp.service';

@Injectable()
export class CommonMailService {
  constructor(
    private mailSmtpService: MailSmtpService,
    private i18nService: I18nService<I18nTranslations>,
    private configService: ConfigService<NodeConfig>,
  ) {}

  public sendEmailToUser(emailConfig: any) {
    if (this.configService.get('APP_ENV') === Environment.Development) {
      this.mailSmtpService
        .getGmailSmtpMailServer()
        .sendMail(emailConfig)
        .catch((err) => {
          throw new InternalServerErrorException(`${err}`);
        });
    }
    // production status
    else {
      this.mailSmtpService
        .getZohoSmtpMailServer()
        .sendMail(emailConfig)
        .catch((err) => {
          throw new InternalServerErrorException(`${err}`);
        });
    }
  }

  public t(jsonProp: PathImpl2<I18nTranslations>, args?, local?) {
    return <string>this.i18nService.t(jsonProp, {
      args,
      lang: local ? local : I18nContext.current().lang,
    });
  }

  public headerFooterDataContext(local?: string) {
    return {
      BEST_REGARDS: this.t('mail.partials.footer.BEST_REGARDS'),
    };
  }

  // public footerDataContext() {
  //   return {
  //     SADEED_SUPPORT_TEAM: this.t('mail.partials.footer.SADEED_SUPPORT_TEAM'),
  //     BEST_REGARDS: this.t('mail.partials.footer.BEST_REGARDS'),
  //   };
  // }
}
