// import {
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
//   UpdateCustomerInput,
//   UpdateSellerCountryInput,
//   UpdateSellerInput,
// } from '../dtos/user-update-input.dto';

// @Injectable()
// export class UserServiceCustomer {
//   constructor(
//     private readonly prismaService: PrismaService,
//     private readonly logger: AppLogger,
//   ) {
//     this.logger.setContext(UserServiceCustomer.name);
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

//   async updateCustomer(data: UpdateCustomerInput, user: User) {
//     return this.prismaService.user.update({
//       where: { id: user.id },
//       data: data,
//     });
//   }
// }
