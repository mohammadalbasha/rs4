import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService, PathImpl2 } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { CentralUser } from '@prisma/client';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';

import { LocaleField } from 'src/shared/dtos/localeField.dts';

import { I18nTranslations } from '../../i18n/i18n.generated';
import { CommonMailService } from './commonMail.service';
import { MailSmtpService } from './mailSmtp.service';
import { CentralNotification } from 'src/shared/constants/notification.events';

@Injectable()
export class CentralMailService {
  constructor(private cms: CommonMailService) {}

  @OnEvent(CentralNotification.ConfirmAttention, { async: true })
  async sendConfirmaAttentionNotification(
    fullName: string,
    email: string,
    locale: string,
    link: string,
  ) {
    const confirmAttentionEmail = {
      to: email,
      subject: this.cms.t(
        'mail.templates.confirmAttention.SUBJECT',
        {},
        locale,
      ),
      template: 'confirmAttention.hbs',
      context: {
        ...this.cms.headerFooterDataContext(locale),
        NAME: this.cms.t('mail.templates.confirmAttention.NAME', {
          fullName: fullName,
        }),
        INTRO: this.cms.t('mail.templates.confirmAttention.INTRO'),
        INFO: this.cms.t('mail.templates.confirmAttention.INFO'),
        HEADING: this.cms.t('mail.templates.confirmAttention.HEADING'),
        TIME: this.cms.t('mail.templates.confirmAttention.TIME'),
        LOCATION: this.cms.t('mail.templates.confirmAttention.LOCATION'),
        DATE: this.cms.t('mail.templates.confirmAttention.DATE'),
        CONFIRM_MESSAGE: this.cms.t(
          'mail.templates.confirmAttention.CONFIRM_MESSAGE',
        ),
        LINK_CONTENT: this.cms.t(
          'mail.templates.confirmAttention.LINK_CONTENT',
        ),

        LINK: link,
        BEST_REGARDS: this.cms.t('mail.partials.footer.BEST_REGARDS'),
      },
    };

    this.cms.sendEmailToUser(confirmAttentionEmail);
  }

  //#endregion
}
