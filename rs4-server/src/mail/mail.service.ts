/* mohammad albacha */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CentralUser } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendAdministratorAccountCreationNotification(user: CentralUser) {
    let subject = '';
    let locale = 'en'; /**** */
    switch (locale) {
      case 'en':
        subject = 'new Sedeed Administrator Account has been created for you';
        break;

      case 'ar':
        subject = 'تم إنشاء حساب خاص بك كمسؤول في منصة سديد';
        break;

      default:
        subject = 'new Sedeed Administrator Account has been created for you';
    }

    const template_language = locale || 'en';
    const template = `./newAccount.${template_language}.hbs`;

    await this.mailerService
      .sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: subject,
        template: template,
        context: {
          name: user.name,
          email: user.email,
          createdDate: user.createdAt,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // async sendDocumentCreateNotification(
  //   user: User,
  //   data: {
  //     notes: string;
  //     documentName: object;
  //   },
  //   action: 'create' | 'accept' | 'reject' | 'unassign',
  // ) {
  //   let subject = '';
  //   let create = action == 'create' ? true : false;
  //   const template_language = user.locale || 'en';
  //   const template = `./documentCreate.${template_language}.hbs`;
  //   const link = 'http://localhost:3000/documents';

  //   const createSubject =
  //     user.locale == 'en'
  //       ? 'please, assign needed document to confirm your sadeed account'
  //       : 'يرجى ارفاق الوثيقة المطلوبة لتأكيد حسابك';

  //   const accepteSubject =
  //     user.locale == 'en'
  //       ? 'congratualtions, your document has been accepted by sadeed administrator'
  //       : 'تهانينا تم قبول  الوثيقة التي قمت بتزويدنا بها ';

  //   const rejectSubject =
  //     user.locale == 'en'
  //       ? 'your document rejected by Sadeed administrator'
  //       : 'تم رفض  الوثيقة التي قمت بتزويدنا بها';

  //   const unAssignSubject =
  //     user.locale == 'en'
  //       ? 'document has been unassigned to you by sadeed administrator'
  //       : 'تم إلغاء إسناد  الوثيقة التي تمت مطالبتك بها سابقاً  ';

  //   const createMessage =
  //     user.locale == 'en'
  //       ? 'please, assign needed document to confirm your sadeed account'
  //       : 'يرجى ارفاق الوثيقة المطلوبة لتأكيد حسابك';

  //   const acceptMessage =
  //     user.locale == 'en'
  //       ? 'congratualtions, your document has been accepted by sadeed administrator'
  //       : 'تهانينا تم قبول  الوثيقة التي قمت بتزويدنا بها ';

  //   const rejectMessage =
  //     user.locale == 'en'
  //       ? 'your document rejected by Sadeed administrator'
  //       : 'تم رفض  الوثيقة التي قمت بتزويدنا بها';

  //   const unAssignMessage =
  //     user.locale == 'en'
  //       ? 'document has been unassigned to you by sadeed administrator'
  //       : 'م إلغاء إسناد  الوثيقة التي تمت مطالبتك بها سابقاً  ';

  //   subject =
  //     action == 'create'
  //       ? createSubject
  //       : action == 'accept'
  //       ? accepteSubject
  //       : action == 'reject'
  //       ? rejectSubject
  //       : unAssignSubject;

  //   const message =
  //     action == 'create'
  //       ? createMessage
  //       : action == 'accept'
  //       ? acceptMessage
  //       : action == 'reject'
  //       ? rejectMessage
  //       : unAssignMessage;
  //   //@ts-ignore
  //   await this.mailerService
  //     .sendMail({
  //       to: user.email,
  //       from: '"Sadeed Administrator" <sadeed@sadeed.com>', // override default from
  //       subject: subject,
  //       template: template,
  //       context: {
  //         name: user.name,
  //         create: create,
  //         message: message,
  //         documentName:
  //           //@ts-ignore
  //           user.locale == 'en' ? data?.documentName.en : data?.documentName.ar,
  //         notes: data?.notes,
  //         link: link,
  //       },
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}
