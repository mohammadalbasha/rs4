// import { BadRequestException } from '@nestjs/common';
// import { User } from '@prisma/client';
// import { CentralUserAuthorized } from 'src/authorization/casl/decorator/authorize.decorator';
// import BaseCRUDController from 'src/shared/controllers/baseCRUD.controller';
// import { ApiController } from 'src/shared/decorators/apiController.decorator';
// import { CentralMailService } from 'src/shared/mail/services/centralMail.service';
// import { PrismaService } from 'src/shared/prisma/prisma.service';

// import {
//   DocumentCreateInputCentral,
//   DocumentListInputCentral,
//   DocumentStatus,
//   DocumentUpdateInputCentral,
// } from './document.input.central';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// import {
//   CentralNotification,
//   UserNotification,
// } from 'src/shared/constants/notification.events';
// import { ConfigService } from '@nestjs/config';
// import { FrontendLinksConfig } from 'src/shared/configs/config.interfaces';

// @CentralUserAuthorized()
// @ApiController('documents', 1)
// export class DocumentControllerCentral extends BaseCRUDController(
//   'documents',
//   'document',
//   DocumentListInputCentral,
//   DocumentCreateInputCentral,
//   DocumentUpdateInputCentral,
// ) {
//   constructor(
//     public prisma: PrismaService,
//     private eventEmitter: EventEmitter2,
//     private mailService: CentralMailService,
//     private configService: ConfigService<FrontendLinksConfig>,
//   ) {
//     super(prisma);
//     this.model = this.prisma.getEntity('document');
//   }

//   // TODO:
//   // after create a user
//   // create a document for him with id = 1
//   public createData(data: DocumentCreateInputCentral, user: User): any {
//     const { documentTypeId, userId, ...createData } = data;
//     return {
//       ...createData,
//       user: {
//         connect: {
//           id: userId,
//         },
//       },
//       documentType: {
//         connect: {
//           id: data.documentTypeId,
//         },
//       },
//     };
//   }

//   public whereData(filterBy, user: User): any {
//     return {
//       ...filterBy,
//       ...(filterBy.userId && {
//         userId: parseInt(filterBy.userId),
//       }),
//       ...(filterBy.documentTypeId && {
//         documentTypeId: filterBy.documentTypeId,
//       }),
//     };
//   }

//   public async canDelete(item: any, user: User): Promise<boolean> {
//     // if (item.isMandatory == true || item.createdAt != item.updatedAt)
//     if (item.isMandatory == true || item.mediaFileId)
//       throw new BadRequestException('can not unlink this document');
//     return true;
//   }
//   public async canUpdate(item: any, data: any, user: User): Promise<boolean> {
//     // if (data.isActive) return true;
//     if (data.userType) {
//       throw new BadRequestException('can not update user type');
//     }
//     if (
//       (item.status == DocumentStatus.inprocessing &&
//         data.status == DocumentStatus.new) ||
//       item.status == DocumentStatus.accepted ||
//       item.status == DocumentStatus.rejected
//     ) {
//       throw new BadRequestException('can not edit this document');
//     }
//     return true;
//   }

//   public async afterCreate(item): Promise<void> {
//     const user = await this.prisma.user.findFirst({
//       where: {
//         id: item.userId,
//       },
//     });
//     const documentType = await this.prisma.documentType.findFirst({
//       where: {
//         id: item.documentTypeId,
//       },
//     });

//     await this.eventEmitter.emitAsync(
//       UserNotification.DocumentCreated,
//       user,
//       {
//         documentName: documentType.name as object,
//         notes: item.centralNotes,
//         link: this.configService.get('USER_DOCUMENTS'),
//       },
//       'create',
//     );
//     // fetch user
//     // fetch business type
//     // send mail
//   }
//   public async afterUpdate(item): Promise<void> {
//     const user = await this.prisma.user.findFirst({
//       where: {
//         id: item.userId,
//       },
//     });
//     const documentType = await this.prisma.documentType.findFirst({
//       where: {
//         id: item.documentTypeId,
//       },
//     });
//     // if rejected accepted send email
//     if (item.status == 'rejected') {
//       await this.eventEmitter.emitAsync(
//         UserNotification.DocumentCreated,
//         user,
//         {
//           documentName: documentType.name as object,
//           notes: item.centralNotes,
//         },
//         'reject',
//       );
//     } else if (item.status == 'accepted') {
//       await this.eventEmitter.emitAsync(
//         UserNotification.DocumentCreated,
//         user,
//         {
//           documentName: documentType.name as object,
//           notes: item.centralNotes,
//         },
//         'accept',
//       );
//     }
//   }
// }
