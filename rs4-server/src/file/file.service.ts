// import { Injectable } from '@nestjs/common';
// import { CentralUser, MediaFile, User } from '@prisma/client';

// import { classToPlain } from 'class-transformer';
// import { PrismaService } from 'src/shared/prisma/prisma.service';

// // todo: file resolver
// @Injectable()
// export class MediaFileService {
//   constructor(protected prismaService: PrismaService) {}

//   async saveFile(file: Express.Multer.File, user: User, isPublic = true) {
//     const data = {
//       userId: user.id,
//       isPublic: isPublic,
//       mimeType: file.mimetype,
//       name: file.originalname,
//       originalName: file.originalname,
//       path: file.path,
//       size: file.size,
//       filename: file.filename,
//     } as MediaFile;

//     // if (shop!== null) {
//     //     data.shop_id = shop.id;
//     // }

//     const result = await this.prismaService.mediaFile.create({
//       data: {
//         ...data,
//       },
//     });
//     // const r = result.toJSON()
//     // delete r['path']
//     // return r
//     return result;
//   }

//   async saveFileByCentral(
//     file: Express.Multer.File,
//     user: CentralUser,
//     isPublic = true,
//   ) {
//     const data = {
//       centralId: user.id,
//       isPublic: isPublic,
//       mimeType: file.mimetype,
//       name: file.originalname,
//       originalName: file.originalname,
//       path: file.path,
//       size: file.size,
//       filename: file.filename,
//     } as MediaFile;

//     // if (shop!== null) {
//     //     data.shop_id = shop.id;
//     // }

//     const result = await this.prismaService.mediaFile.create({
//       data: {
//         ...data,
//       },
//     });
//     // const r = result.toJSON()
//     // delete r['path']
//     // return r
//     return result;
//   }
// }
