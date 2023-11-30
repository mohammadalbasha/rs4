// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Prisma, User } from '@prisma/client';
// import { compare, hash } from 'bcrypt';
// import { plainToClass } from 'class-transformer';
// import { PrismaService } from 'src/shared/prisma/prisma.service';

// import { AppLogger } from '../../../shared/logger/logger.service';
// import { RequestContext } from '../../../shared/request-context/request-context.dto';
// import { UserOutput } from '../dtos/user-output.dto';
// import {
//   UpdateBillingEmail,
//   UpdateCustomerInput,
//   UpdateSellerCountryInput,
//   UpdateSellerCurrencyInput,
//   UpdateSellerFields,
//   UpdateSellerInput,
//   UpdateSellerRequestInput,
//   UpdateSellerSpecialityInput,
// } from '../dtos/user-update-input.dto';
// import {
//   CreateCompanyInput,
//   UpdateCompanyFields,
//   UpdateCompanyInput,
//   UpdateCompanyRequestInput,
// } from '../dtos/company.dto';

// @Injectable()
// export class UserServiceSeller {
//   constructor(
//     private readonly prismaService: PrismaService,
//     private readonly logger: AppLogger,
//   ) {
//     this.logger.setContext(UserServiceSeller.name);
//   }

//   async findById(ctx: RequestContext, id: number): Promise<UserOutput> {
//     this.logger.log(ctx, `${this.findById.name} was called`);

//     const user = await this.prismaService.user.findFirst({ where: { id } });
//     if (!user) {
//       throw new NotFoundException();
//     }
//     return plainToClass(UserOutput, user, {
//       excludeExtraneousValues: true,
//     });
//   }

//   async updateSeller(data: UpdateSellerInput, user: User) {
//     return this.prismaService.user.update({
//       where: { id: user.id },
//       data: data,
//     });

//     // TODO:
//     // if data.email || data.phoneNumber
//     // SEND MAIL
//   }

//   async updateBillingEmail(data: UpdateBillingEmail, user: User) {
//     return this.prismaService.user.update({
//       where: { id: user.id },
//       data: data,
//     });

//     // TODO:
//     // SEND MAIL
//   }

//   async updateSellerCountry(data: UpdateSellerCountryInput, user: User) {
//     return this.prismaService.user.update({
//       where: { id: user.id },
//       data: {
//         country: {
//           connect: {
//             id: data.countryId,
//           },
//         },
//       },
//     });
//   }
//   async updateSellerCurrency(data: UpdateSellerCurrencyInput, user: User) {
//     return this.prismaService.user.update({
//       where: { id: user.id },
//       data: {
//         currency: {
//           connect: {
//             id: data.currencyId,
//           },
//         },
//       },
//     });
//   }
//   async updateSellerSpeciality(data: UpdateSellerSpecialityInput, user: User) {
//     return this.prismaService.user.update({
//       where: { id: user.id },
//       data: {
//         speciality: {
//           connect: {
//             id: data.specialityId,
//           },
//         },
//       },
//     });
//   }

//   async updateSellerRequest(user: User, data: UpdateSellerRequestInput) {
//     const { fieldName, value } = data;
//     const tableName = 'user';
//     if (fieldName == UpdateSellerFields.isCompanyAccount) {
//       await this.prismaService.fieldsUpdate.create({
//         data: {
//           tableName,
//           fieldName,
//           booleanValue: value,
//           refId: user.id,
//         },
//       });
//       return 'update requested successfully';
//     } else {
//       await this.prismaService.fieldsUpdate.create({
//         data: {
//           tableName: 'user',
//           fieldName: fieldName,
//           value: value,
//           refId: user.id,
//         },
//       });
//       return 'update requested successfully';
//     }
//   }

//   async updateCompanyRequest(user: User, data: UpdateCompanyRequestInput) {
//     const company = await this.prismaService.company.findFirst({
//       where: { id: data.companyId },
//     });
//     if (company.userId != user.id) {
//       throw new UnauthorizedException('you have no access to this company');
//     }
//     if (data.fieldName == UpdateCompanyFields.countryId) {
//       const country = await this.prismaService.country.findFirst({
//         where: { id: data.value },
//       });
//       if (!country) {
//         throw new NotFoundException('country not found');
//       }
//     }

//     if (data.fieldName == UpdateCompanyFields.businessTypeId) {
//       const businessType = await this.prismaService.businessType.findFirst({
//         where: { id: data.value },
//       });
//       if (!businessType) {
//         throw new NotFoundException('businessType not found');
//       }
//     }

//     await this.prismaService.fieldsUpdate.create({
//       data: {
//         tableName: 'company',
//         fieldName: data.fieldName,
//         value: data.value,
//         refId: company.id,
//       },
//     });
//     return 'update requested successfully';
//   }

//   async createCompany(user: User, input: CreateCompanyInput) {
//     const { countryId, businessTypeId, ...rest } = input;

//     return this.prismaService.company.create({
//       data: {
//         ...rest,
//         user: {
//           connect: {
//             id: user.id,
//           },
//         },
//         ...(countryId && {
//           country: {
//             connect: {
//               id: countryId,
//             },
//           },
//         }),
//         businessType: {
//           connect: {
//             id: businessTypeId,
//           },
//         },
//       },
//     });
//   }

//   listCompanies(user: User) {
//     return this.prismaService.company.findMany({
//       where: {
//         userId: user.id,
//       },
//     });
//   }

//   async updateCompany(user: User, id: number, input: UpdateCompanyInput) {
//     const company = await this.prismaService.company.findFirst({
//       where: {
//         id: id,
//       },
//     });
//     if (!company) throw new NotFoundException();

//     if (company.userId != user.id) throw new UnauthorizedException();

//     return this.prismaService.company.update({
//       where: { id: id },
//       data: { ...input },
//     });
//   }

//   async deleteCompany(user: User, id: number) {
//     const company = await this.prismaService.company.findFirst({
//       where: {
//         id: id,
//       },
//     });
//     if (!company) throw new NotFoundException();

//     return this.prismaService.company.delete({ where: { id: id } });
//   }
// }
