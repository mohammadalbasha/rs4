import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join, resolve } from 'path';
import { MailConfig } from 'src/shared/configs/config.interfaces';

@Injectable()
export class MailSmtpService {
  constructor(private configService: ConfigService<MailConfig>) {}

  public getGmailSmtpMailServer() {
    return new MailerService(
      {
        transport: {
          host: this.configService.get('MAIL_HOST'),
          port: this.configService.get('MAIL_PORT'),
          secure: this.configService.get('MAIL_IS_SECURE'),
          auth: {
            user: this.configService.get('MAIL_AUTH_USER'),
            pass: this.configService.get('MAIL_AUTH_PASSWORD'),
          },
        },
        // transport: this.configService.get('MAIL_SMTP'),
        defaults: {
          from: this.configService.get('MAIL_DEFAULT_FROM_USER'),
        },
        template: {
          dir: resolve(__dirname, '../templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: resolve(__dirname, '../partials'),
            options: {
              strict: true,
            },
          },
        },
      },
      null,
    );
  }

  public getZohoSmtpMailServer() {
    return new MailerService(
      {
        transport: {
          host: this.configService.get('ZOHO_HOST'),
          port: this.configService.get('ZOHO_PORT'),
          ignoreTLS: true,
          secure: this.configService.get('ZOHO_IS_SECURE'),
          auth: {
            user: this.configService.get('ZOHO_AUTH_USER'),
            pass: this.configService.get('ZOHO_AUTH_PASSWORD'),
          },
        },
        defaults: {
          from: this.configService.get('ZOHO_DEFAULT_FROM_USER'),
        },
        template: {
          dir: resolve(__dirname + '../templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: resolve(__dirname, '../partials'),
            options: {
              strict: true,
            },
          },
        },
      },
      null,
    );
  }
}
