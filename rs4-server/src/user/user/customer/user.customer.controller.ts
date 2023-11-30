// import {
//   Body,
//   ClassSerializerInterceptor,
//   Get,
//   HttpStatus,
//   Param,
//   Patch,
//   Post,
//   Put,
//   Query,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { User } from '@prisma/client';
// import { CurrentUser } from 'src/auth/auth-user/decorators/currentUser.decorator';
// import { UserAuthorized } from 'src/authorization/casl/decorator/authorize.decorator';
// import { ApiController } from 'src/shared/decorators/apiController.decorator';

// import {
//   BaseApiErrorResponse,
//   BaseApiResponse,
//   SwaggerBaseApiResponse,
// } from '../../../shared/dtos/base-api-response.dto';
// import { ReqContext } from '../../../shared/request-context/req-context.decorator';
// import { RequestContext } from '../../../shared/request-context/request-context.dto';
// import { UserOutput } from '../dtos/user-output.dto';
// import BaseCRUDController from 'src/shared/controllers/baseCRUD.controller';
// import { UserListInput } from '../dtos/list.dto';
// import {
//   UpdateCustomerInput,
//   UpdateSellerCountryInput,
//   UpdateSellerInput,
//   UpdateUserInput,
// } from '../dtos/user-update-input.dto';
// import { PrismaService } from 'src/shared/prisma/prisma.service';
// import { UserServiceCustomer } from './user.customer.service';
// import { UserTokenGuard } from 'src/auth/auth-user/guards/token.guard';

// const tag = 'users';

// @UseGuards(UserTokenGuard)
// @ApiController(tag, 1)
// export class UserControllerCustomer extends BaseCRUDController(
//   'users',
//   'user',
//   UserListInput,
//   UpdateUserInput,
//   UpdateUserInput,
//   {
//     hasDelete: false,
//     hasCreate: false,
//   },
// ) {
//   constructor(
//     private prismaService: PrismaService,
//     private userService: UserServiceCustomer,
//   ) {
//     super(prismaService);
//   }

//   @ApiBearerAuth()
//   @UseInterceptors(ClassSerializerInterceptor)
//   @Get('me')
//   @ApiOperation({
//     summary: 'Get user me API',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     type: SwaggerBaseApiResponse(UserOutput),
//   })
//   @ApiResponse({
//     status: HttpStatus.UNAUTHORIZED,
//     type: BaseApiErrorResponse,
//   })
//   async getMyProfile(
//     @ReqContext() ctx: RequestContext,
//     @CurrentUser() user: User,
//   ): Promise<BaseApiResponse<UserOutput>> {
//     //    const user = await this.userService.findById(ctx, ctx.user.id);
//     return {
//       data: user, // plainToClass(UserOutput, user, { excludeExtraneousValues: true }),
//       meta: {},
//     };
//   }

//   @UseInterceptors(ClassSerializerInterceptor)
//   @Put('')
//   @ApiOperation({
//     summary: 'update customer',
//   })
//   async updateCustomer(
//     @Body() data: UpdateCustomerInput,
//     @CurrentUser() user: User,
//   ) {
//     return this.userService.updateCustomer(data, user);
//   }
// }
