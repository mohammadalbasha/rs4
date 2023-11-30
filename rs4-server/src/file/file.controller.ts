// import { Ability, PureAbility } from '@casl/ability';
// import {
//   BadRequestException,
//   Controller,
//   Delete,
//   ForbiddenException,
//   Get,
//   NotFoundException,
//   Param,
//   Post,
//   Request,
//   StreamableFile,
//   UploadedFile,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { FileInterceptor } from '@nestjs/platform-express';

// import { Response } from '@nestjs/common';
// import { CentralUser, User } from '@prisma/client';
// import { createReadStream, existsSync, mkdirSync, unlinkSync } from 'fs';
// import { diskStorage } from 'multer';
// import { extname, join } from 'path';
// import { env } from 'process';
// import { UserTokenGuard } from 'src/auth/auth-user/guards/token.guard';
// import { CurrentUser } from 'src/auth/currentUser.decorator';
// import { Action } from 'src/authorization/casl/action.enum';
// import { Can } from 'src/authorization/casl/can.decorator';
// import { CurrentAbility } from 'src/authorization/casl/currentAbility.decorator';
// import { PoliciesGuard } from 'src/authorization/casl/guards/policy.guard';
// import { CentralTokenGuard } from 'src/auth/auth-central/guards/centralToken.guards';
// import { execSync } from 'child_process';
// import { fileFilter, shopFileDestination, shopFileName } from './file.helper';
// import { Public } from 'src/authorization/casl/public.decorator';
// import { PrismaService } from 'src/shared/prisma/prisma.service';
// import { v4 as uuid } from 'uuid';

// import { MediaFileService } from './file.service';

// @Controller()
// export class MediaFileController {
//   constructor(
//     protected mediaFileService: MediaFileService,
//     private prismService: PrismaService,
//   ) {}

//   @UseGuards(PoliciesGuard)
//   @UseGuards(CentralTokenGuard)
//   @Post('central/files/upload/public')
//   //@Can([Action.Create, 'mediaFile'])
//   @UseInterceptors(
//     FileInterceptor('file', {
//       limits: {
//         fileSize: +env.MaxPublicFileUploadSize || 100000,
//       },
//       storage: diskStorage({
//         destination: env.PublicLocalStoragePath || './public',
//         filename: (req: any, file: any, cb: any) => {
//           cb(null, `${uuid()}${extname(file.originalname)}`);
//         },
//       }),
//       fileFilter: fileFilter(
//         [
//           'rtf',
//           'pdf',
//           'doc',
//           'docx',
//           'txt',
//           'png',
//           'jpg',
//           'jpeg',
//           'gif',
//           'ico',
//         ],
//         +env.MaxPublicFileUploadSize || 100000,
//       ),
//     }),
//   )
//   async uploadPublicFileByCentral(
//     @Request() req,
//     @CurrentUser() user: CentralUser,
//     @CurrentAbility() ability: PureAbility,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     if (!file) throw new BadRequestException('No file selected');

//     const mediaFile = this.mediaFileService.saveFileByCentral(file, user);
//     return mediaFile;
//   }

//   @UseGuards(PoliciesGuard)
//   @UseGuards(CentralTokenGuard)
//   @Get('central/files/listMyFiles')
//   async listMyFilesCentral(@CurrentUser() user: User) {
//     return this.prismService.mediaFile.findMany({
//       where: {
//         centralId: user.id,
//       },
//     });
//     // todo authorize download by cookies
//     // const mediaFile = await this.Models.model(MediaFile).findById(id).accessibleBy(ability)
//   }

//   @UseGuards(PoliciesGuard)
//   @UseGuards(CentralTokenGuard)
//   //@Can([Action.Delete, 'mediaFile'])
//   @Delete('central/files/:id')
//   async deleteFileByCentral(
//     @CurrentUser() user: User,
//     @Param('id') id: number,
//   ) {
//     const item = await this.prismService.mediaFile.findFirst({
//       where: {
//         id: +id,
//       },
//     });
//     if (!item) throw new NotFoundException();

//     if (item.centralId != user.id) throw new ForbiddenException();

//     if (existsSync(item.path)) {
//       unlinkSync(item.path);
//     }
//     return this.prismService.mediaFile.delete({ where: { id: id } });
//     // todo authorize download by cookies
//     // const mediaFile = await this.Models.model(MediaFile).findById(id).accessibleBy(ability)
//   }

//   @UseGuards(PoliciesGuard)
//   @UseGuards(UserTokenGuard)
//   @Post('files/upload/public')
//   //@Can([Action.Create, 'mediaFile'])
//   @UseInterceptors(
//     FileInterceptor('file', {
//       limits: {
//         fileSize: +env.MaxPublicFileUploadSize || 100000,
//       },
//       storage: diskStorage({
//         destination: env.PublicLocalStoragePath || './public',
//         filename: (req: any, file: any, cb: any) => {
//           cb(null, `${uuid()}${extname(file.originalname)}`);
//         },
//       }),
//       fileFilter: fileFilter(
//         [
//           'rtf',
//           'pdf',
//           'doc',
//           'docx',
//           'txt',
//           'png',
//           'jpg',
//           'jpeg',
//           'gif',
//           'ico',
//         ],
//         +env.MaxPublicFileUploadSize || 100000,
//       ),
//     }),
//   )
//   async uploadPublicFile(
//     @Request() req,
//     @CurrentUser() user: User,
//     @CurrentAbility() ability: PureAbility,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     if (!file) throw new BadRequestException('No file selected');

//     const mediaFile = this.mediaFileService.saveFile(file, user);
//     return mediaFile;
//   }

//   @UseGuards(PoliciesGuard)
//   @UseGuards(UserTokenGuard)
//   @Post('files/upload/private')
//   //@Can([Action.Create, MediaFile])
//   @UseInterceptors(
//     FileInterceptor('file', {
//       limits: {
//         fileSize: +env.MaxPrivateFileUploadSize || 100000,
//       },
//       storage: diskStorage({
//         destination: env.PrivateLocalStoragePath || './upload',
//       }),
//       fileFilter: fileFilter(
//         [
//           'rtf',
//           'pdf',
//           'doc',
//           'docx',
//           'txt',
//           'png',
//           'jpg',
//           'jpeg',
//           'gif',
//           'ico',
//         ],
//         10000000,
//       ),
//     }),
//   )
//   async uploadPrivateFile(
//     @Request() req,
//     @CurrentUser() user: User,
//     @CurrentAbility() ability: Ability,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     if (!file) throw new BadRequestException('No file selected');

//     const mediaFile = this.mediaFileService.saveFile(file, user, false);
//     return mediaFile;
//   }

//   @UseGuards(PoliciesGuard)
//   @UseGuards(UserTokenGuard)
//   @Get('files/listMyFiles')
//   async listMyFiles(@CurrentUser() user: User) {
//     return this.prismService.mediaFile.findMany({
//       where: {
//         userId: user.id,
//       },
//     });
//     // todo authorize download by cookies
//     // const mediaFile = await this.Models.model(MediaFile).findById(id).accessibleBy(ability)
//   }

//   @Public()
//   @Get('files/:id')
//   async downloadPrivateFile(
//     @Response({ passthrough: true }) res,
//     @Param('id') id: number,
//     @CurrentAbility() ability: PureAbility,
//     @Request() req,
//   ) {
//     try {
//       const mediaFile = await this.prismService.mediaFile.findFirst({
//         where: {
//           id: +id,
//         },
//       });
//       // todo authorize download by cookies
//       // const mediaFile = await this.Models.model(MediaFile).findById(id).accessibleBy(ability)

//       if (!mediaFile) throw new NotFoundException();

//       if (!existsSync(mediaFile.path)) {
//         throw new NotFoundException();
//       }

//       res.set({
//         'Content-Type': mediaFile.mimeType,
//         'Content-Disposition':
//           'attachment; filename="' + mediaFile.originalName + '"',
//       });

//       const file = createReadStream(join(process.cwd(), mediaFile.path));
//       return new StreamableFile(file);
//     } catch (err) {
//       throw new NotFoundException();
//     }
//   }

//   @UseGuards(PoliciesGuard)
//   @UseGuards(CentralTokenGuard)
//   @UseInterceptors(
//     FileInterceptor('file', {
//       limits: {
//         fileSize: 1024 * 1024 * 10,
//       },
//       storage: diskStorage({
//         destination(req, file, callback) {
//           const isElectroniBankIconsFolderExist = existsSync(
//             join(process.cwd(), 'upload/public/electronicBankIcons'),
//           );
//           if (!isElectroniBankIconsFolderExist) {
//             mkdirSync(join(process.cwd(), 'upload/public/electronicBankIcons'));
//           }

//           callback(null, 'upload/public/electronicBankIcons');
//         },

//         filename(req, file, callback) {
//           callback(null, `${uuid()}${extname(file.originalname)}`);
//         },
//       }),
//       fileFilter: fileFilter(['png', 'jpg', 'jpeg', 'svg', 'ico', 'webp']),
//     }),
//   )
//   @Post('central/shops/electronic-bank-icons/upload/public')
//   async uploadShopElectronicIconCentral(
//     @UploadedFile() file: Express.Multer.File,
//     @CurrentUser() user,
//   ) {
//     const mediaFile = this.mediaFileService.saveFile(file, user, true);
//     return mediaFile;
//   }

//   @UseGuards(PoliciesGuard)
//   @UseGuards(CentralTokenGuard)
//   @UseInterceptors(
//     FileInterceptor('file', {
//       limits: {
//         fileSize: 1024 * 1024 * 50,
//       },
//       storage: diskStorage({
//         destination: shopFileDestination(),

//         filename: shopFileName(),
//       }),
//       fileFilter: fileFilter([
//         'png',
//         'jpg',
//         'jpeg',
//         'svg',
//         'ico',
//         'svg',
//         'webp',
//       ]),
//     }),
//   )
//   @Post('central/shops/upload/public')
//   async uploadShopFileByCentral(
//     @UploadedFile() file: Express.Multer.File,
//     @CurrentUser() user,
//   ) {
//     const mediaFile = this.mediaFileService.saveFile(file, user, true);
//     return mediaFile;
//   }

//   @UseGuards(PoliciesGuard)
//   @UseGuards(UserTokenGuard)
//   @UseInterceptors(
//     FileInterceptor('file', {
//       limits: {
//         fileSize: 1024 * 1024 * 50,
//       },
//       storage: diskStorage({
//         destination: shopFileDestination(),

//         filename: shopFileName(),
//       }),
//       fileFilter: fileFilter([
//         'png',
//         'jpg',
//         'jpeg',
//         'svg',
//         'ico',
//         'svg',
//         'webp',
//       ]),
//     }),
//   )
//   @Post('seller/shops/upload/public')
//   async uploadShopFileBySeller(
//     @UploadedFile() file: Express.Multer.File,
//     @CurrentUser() user,
//   ) {
//     const mediaFile = this.mediaFileService.saveFile(file, user, true);
//     return mediaFile;
//   }

//   @UseGuards(UserTokenGuard)
//   //@Can([Action.Delete, 'mediaFile'])
//   @Delete('files/:id')
//   async deleteFile(@CurrentUser() user: User, @Param('id') id: number) {
//     const item = await this.prismService.mediaFile.findFirst({
//       where: {
//         id: +id,
//       },
//     });
//     if (!item) throw new NotFoundException();

//     if (item.userId != user.id) throw new ForbiddenException();

//     if (existsSync(item.path)) {
//       unlinkSync(item.path);
//     }

//     return this.prismService.mediaFile.delete({ where: { id: id } });
//     // todo authorize download by cookies
//     // const mediaFile = await this.Models.model(MediaFile).findById(id).accessibleBy(ability)
//   }
// }
