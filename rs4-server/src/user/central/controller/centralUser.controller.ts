// import {
//   ClassSerializerInterceptor,
//   Controller,
//   Get,
//   HttpStatus,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import {
//   ApiBearerAuth,
//   ApiOperation,
//   ApiResponse,
//   ApiTags,
// } from '@nestjs/swagger';
// import { CentralUser, User } from '@prisma/client';
// import { Administrator } from 'src/auth/auth-central/dtos/manageAdministrator.dto';
// import { CentralTokenGuard } from 'src/auth/auth-central/guards/centralToken.guards';
// import { Public } from 'src/auth/auth-user/decorators/isPublic.decorator';
// import { PoliciesGuard } from 'src/authorization/casl/guards/policy.guard';
// import BaseReadController from 'src/shared/controllers/baseREAD.controller';

// import { AdministratorListInput } from '../dtos/list.dto';
// import { UpdateAdministratorInput } from '../dtos/update.dto';
// import { PrismaService } from 'src/shared/prisma/prisma.service';
// import { ChangePasswordInput } from '../../../auth/auth-central/dtos/changePassword.dto';
// import { CurrentUser } from 'src/auth/currentUser.decorator';
// import {
//   SwaggerBaseApiResponse,
//   BaseApiErrorResponse,
//   BaseApiResponse,
// } from 'src/shared/dtos/base-api-response.dto';
// import { ReqContext } from 'src/shared/request-context/req-context.decorator';
// import { RequestContext } from 'src/shared/request-context/request-context.dto';
// import { UserOutput } from 'src/user/user/dtos/user-output.dto';
// import BaseCRUDController from 'src/shared/controllers/baseCRUD.controller';

// const PATH = '/users';

// // you have to use auth guard even when it is a public route
// // beacue the ability build in the auth guards
// // then it is uesd in the policy guard

// // uncommkited it in the casl module

// @UseGuards(PoliciesGuard)
// @UseGuards(CentralTokenGuard)
// @ApiTags(PATH)
// @Controller(PATH)
// export class CentralUserController extends BaseCRUDController(
//   'central/users',
//   'centralUser',
//   AdministratorListInput,
//   UpdateAdministratorInput,
//   UpdateAdministratorInput,
//   {
//     hasCreate: false,
//     hasDelete: false,
//   },
// ) {
//   public whereData(filter, user: User): any {
//     const { createdAtFrom, createdAtTo, ...filterBy } = filter;

//     return {
//       ...filterBy,
//       ...(filterBy.roles && {
//         roles: {
//           some: {
//             RoleId: parseInt(filterBy.roles),
//           },
//         },
//       }),
//       ...(createdAtFrom &&
//         createdAtTo && {
//           createdAt: {
//             lte: new Date(createdAtTo).toISOString(),
//             gt: new Date(createdAtFrom).toISOString(),
//           },
//         }),

//       //isActive: true,
//     };
//   }
//   public RelationFields: never[] = ['roles', 'country'] as any;

//   @ApiBearerAuth()
//   @UseInterceptors(ClassSerializerInterceptor)
//   @Get('me')
//   @ApiOperation({
//     summary: 'Get Central me API',
//   })
//   @ApiResponse({
//     status: HttpStatus.UNAUTHORIZED,
//     type: BaseApiErrorResponse,
//   })
//   async getMyProfile(
//     @ReqContext() ctx: RequestContext,
//     @CurrentUser() user: CentralUser,
//   ) {
//     console.log(user);
//     //    const user = await this.userService.findById(ctx, ctx.user.id);
//     return {
//       data: user, // plainToClass(UserOutput, user, { excludeExtraneousValues: true }),
//       meta: {},
//     };
//   }
// }
