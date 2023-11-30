// import { UnsupportedMediaTypeException } from '@nestjs/common';
// import { ShopMediaFileType } from '@prisma/client';
// import { existsSync, mkdirSync } from 'fs';
// import { extname, join } from 'path';
// import { convertToCamelCase } from 'src/shared/helpers/stringsOperations.helpers';
// import { v4 as uuid } from 'uuid';

// export function fileFilter(mimetypes: string[], maxSize = 1000000) {
//   return (
//     req,
//     file: Express.Multer.File,
//     callback: (error: Error | null, acceptFile: boolean) => void,
//   ) => {
//     if (!!maxSize && file.size > maxSize) {
//       callback(
//         new UnsupportedMediaTypeException(
//           `File size is bigger than: ${maxSize}`,
//         ),
//         false,
//       );
//     }

//     const fileExtension = file.originalname.split('.').pop();
//     if (!mimetypes.some((m) => fileExtension.includes(m))) {
//       callback(
//         new UnsupportedMediaTypeException(
//           `File type is not matching: ${mimetypes.join(', ')}`,
//         ),
//         false,
//       );
//     }

//     callback(null, true);
//   };
// }

// function checkingFoldersExit(req: any) {
//   // Note:
//   // Firstly you will upload image then you will create shop, so you don't have shopId in realworld
//   // But we can work around it by getting last shop's id that exist in db and make id++, expecting that the next shop' id will be id + 1
//   const shopId = req.query?.shopId;
//   const sellerId = req.query?.sellerId;

//   const sellersFolderExists = existsSync(
//     join(process.cwd(), `upload/public/sellers`),
//   );
//   if (!sellersFolderExists) {
//     mkdirSync(join(process.cwd(), `upload/public/sellers`));
//   }

//   const sellerFolderExists = existsSync(
//     join(process.cwd(), `upload/public/sellers/seller_${sellerId}`),
//   );
//   if (!sellerFolderExists) {
//     mkdirSync(join(process.cwd(), `upload/public/sellers/seller_${sellerId}`));
//   }

//   const shopFolderExists = existsSync(
//     join(process.cwd(), `upload/public/sellers/seller_${sellerId}/shops`),
//   );
//   if (!shopFolderExists) {
//     mkdirSync(
//       join(process.cwd(), `upload/public/sellers/seller_${sellerId}/shops`),
//     );
//   }

//   const shopIdFolderExists = existsSync(
//     join(
//       process.cwd(),
//       `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}`,
//     ),
//   );
//   if (!shopIdFolderExists) {
//     mkdirSync(
//       join(
//         process.cwd(),
//         `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}`,
//       ),
//     );
//   }
// }

// function determinFileDestination(
//   req: any,
//   callback: (error: Error | null, filePath: string) => void,
// ) {
//   const shopId = req.query?.shopId;
//   const shopCreate = req.query?.shopCreate && JSON.parse(req.query?.shopCreate);
//   const sellerId = req.query?.sellerId;
//   const shopMediaFileType = req.query.shopMediaFileType as ShopMediaFileType;

//   // When create shop with logo
//   if (
//     shopMediaFileType === 'AppsBackgroundImage' ||
//     shopMediaFileType === 'Logo'
//   ) {
//     if (shopCreate) {
//       const untitledFolderExists = existsSync(
//         join(
//           process.cwd(),
//           `upload/public/sellers/seller_${sellerId}/shops/untitled`,
//         ),
//       );
//       if (!untitledFolderExists) {
//         mkdirSync(
//           join(
//             process.cwd(),
//             `upload/public/sellers/seller_${sellerId}/shops/untitled`,
//           ),
//         );
//       }
//       callback(null, `upload/public/sellers/seller_${sellerId}/shops/untitled`);
//     }

//     // shopCreate is undifined or false
//     callback(
//       null,
//       `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}`,
//     );
//   }
//   // feature image
//   else if (shopMediaFileType === 'Feature') {
//     const featuresFolderExists = existsSync(
//       join(
//         process.cwd(),
//         `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/features`,
//       ),
//     );
//     if (!featuresFolderExists) {
//       mkdirSync(
//         join(
//           process.cwd(),
//           `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/features`,
//         ),
//       );
//     }
//     callback(
//       null,
//       `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/features`,
//     );
//   }
//   // poster image
//   else if (shopMediaFileType === 'Poster') {
//     const postersFolderExists = existsSync(
//       join(
//         process.cwd(),
//         `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/posters`,
//       ),
//     );
//     if (!postersFolderExists) {
//       mkdirSync(
//         join(
//           process.cwd(),
//           `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/posters`,
//         ),
//       );
//     }
//     callback(
//       null,
//       `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/posters`,
//     );
//   }
//   // social media icon
//   else if (shopMediaFileType === 'SocialMediaIcon') {
//     const socialMediaIconsFolderExists = existsSync(
//       join(
//         process.cwd(),
//         `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/socialMediaIcons`,
//       ),
//     );
//     if (!socialMediaIconsFolderExists) {
//       mkdirSync(
//         join(
//           process.cwd(),
//           `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/socialMediaIcons`,
//         ),
//       );
//     }
//     callback(
//       null,
//       `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/socialMediaIcons`,
//     );
//   }
//   // Audience Opinion icon
//   else if (shopMediaFileType === 'AudienceOpinion') {
//     const audienceOpinionsFolderExists = existsSync(
//       join(
//         process.cwd(),
//         `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/audienceOpinions`,
//       ),
//     );
//     if (!audienceOpinionsFolderExists) {
//       mkdirSync(
//         join(
//           process.cwd(),
//           `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/audienceOpinions`,
//         ),
//       );
//     }
//     callback(
//       null,
//       `upload/public/sellers/seller_${sellerId}/shops/shop_${shopId}/audienceOpinions`,
//     );
//   }
// }

// export function shopFileDestination() {
//   return (
//     req,
//     file,
//     callback: (error: Error | null, filePath: string) => void,
//   ) => {
//     checkingFoldersExit(req);

//     return determinFileDestination(req, callback);
//   };
// }

// export function shopFileName() {
//   return (
//     req,
//     file,
//     callback: (error: Error | null, fileName: string) => void,
//   ) => {
//     // logo
//     const shopMediaFileType = req.query.shopMediaFileType as ShopMediaFileType;
//     switch (shopMediaFileType) {
//       case 'AppsBackgroundImage': {
//         const beginingFileName = convertToCamelCase(
//           ShopMediaFileType.AppsBackgroundImage.toString(),
//         );
//         callback(
//           null,
//           `${beginingFileName}_${uuid()}_${extname(file.originalname)}`,
//         );
//         break;
//       }
//       case 'Logo': {
//         const beginingFileName = convertToCamelCase(
//           ShopMediaFileType.Logo.toString(),
//         );
//         callback(
//           null,
//           `${beginingFileName}_${uuid()}_${extname(file.originalname)}`,
//         );
//         break;
//       }
//       // Fearures || Posters || SocialMediaIcons
//       default: {
//         callback(null, `${uuid()}_${extname(file.originalname)}`);
//         break;
//       }
//     }
//   };
// }
