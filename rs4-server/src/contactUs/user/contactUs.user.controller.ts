// import { Body, NotFoundException, Post } from '@nestjs/common';
// import {
//   ApiBody,
//   ApiNotFoundResponse,
//   ApiOperation,
//   ApiParam,
// } from '@nestjs/swagger';
// import { UserAuthorized } from 'src/authorization/casl/decorator/authorize.decorator';
// import { ApiController } from 'src/shared/decorators/apiController.decorator';
// import { MailSmtpService } from 'src/shared/mail/services/mailSmtp.service';
// import { PrismaService } from 'src/shared/prisma/prisma.service';
// import { ContactUsEmail } from './contactUs.user.input';

// @UserAuthorized()
// @ApiController('contact-us', 1)
// export class ContactUserController {
//   constructor(
//     private mailService: MailSmtpService,
//     private prismaService: PrismaService,
//   ) {}

//   //#region swagger stuff
//   @ApiOperation({
//     summary: 'Sending general email from user to adminstrators',
//   })
//   @ApiNotFoundResponse({
//     description: 'Occurs when "userId"  OR  "centralUserId" not exist in db',
//   })
//   @ApiBody({
//     required: true,
//     description: 'email body that contain on "subject" and "content" ',
//     type: [ContactUsEmail],
//   })
//   //#endregion
//   @Post('send-email')
//   public async sendEmailToCentral(@Body() contactUsEmail: ContactUsEmail) {
//     const isUserExist = await this.prismaService.user.findUnique({
//       where: { id: contactUsEmail.userId },
//     });
//     if (isUserExist) {
//       const isCentalUserExist = await this.prismaService.centralUser.findUnique(
//         { where: { id: contactUsEmail.centralUserId } },
//       );
//       if (isCentalUserExist) {
//         this.mailService.getGmailSmtpMailServer().sendMail({
//           to: isCentalUserExist.email,
//           subject: contactUsEmail.subject,
//           text:
//             contactUsEmail.content +
//             `\n\nThis Email Sended by: ${isUserExist.email}`,
//           date: new Date(),
//         });
//       } else {
//         throw new NotFoundException(
//           `central user with id: ${contactUsEmail.centralUserId} not exist`,
//         );
//       }
//     } else {
//       throw new NotFoundException(
//         `user with id: ${contactUsEmail.userId} not exist`,
//       );
//     }
//   }
// }
