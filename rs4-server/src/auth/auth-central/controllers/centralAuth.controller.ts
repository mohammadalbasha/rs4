import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CentralUser } from '@prisma/client';
import { Can } from 'src/authorization/casl/can.decorator';
import { PoliciesGuard } from 'src/authorization/casl/guards/policy.guard';
import {
  BaseApiErrorResponse,
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dtos/base-api-response.dto';
import { AppLogger } from 'src/shared/logger/logger.service';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context.dto';

import { LoginInput } from '../dtos/login.dto';
import { CreateCentralInput } from '../dtos/manageAdministrator.dto';
import { CentralAuthService } from '../services/centralAuth.service';
import { Action } from 'src/authorization/casl/action.enum';
import { CentralUserAuthorized } from 'src/authorization/casl/decorator/authorize.decorator';
import { ApiController } from 'src/shared/decorators/apiController.decorator';

import { Serialize } from 'src/shared/decorators/serialize.decorator';
import { Public } from 'src/authorization/casl/public.decorator';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { JwtAuthGuard } from '../guards/centralToken.guards';
import { UpdateCentralPermisions } from 'src/permision/permisions.input';
import { UpdateCentralUserPermisions } from '../dtos/permisions.dto';

@CentralUserAuthorized()
@ApiController('auth', 1)
export class CentralAuthController {
  constructor(private readonly centralAuthService: CentralAuthService) {}

  //#region ADMINISTRATOR RELATED FUNCTIONALITY

  //#region swagger stuff
  /* mohammad albacha */
  @Can([Action.Create, 'centralUser'])
  @ApiOperation({
    summary: 'Create Central Admin',
  })

  // @ApiCreatedResponse({
  //   type: SwaggerBaseApiResponse(CreateCentralInput),
  // })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   type: BaseApiErrorResponse,
  // })
  // //#endregion
  // @HttpCode(HttpStatus.CREATED)
  // @Serialize(Administrator)
  @Post('')
  async createAdministratorBySuperAdmin(
    @ReqContext() ctx: RequestContext,
    @Body() data: CreateCentralInput,
    @CurrentUser() user: CentralUser, //: Promise<BaseApiResponse<Administrator>>
  ) {
    data.email = data.email.toLowerCase();
    const createdUser =
      await this.centralAuthService.createAdministratorBySuperAdmin(data);
    return { data: createdUser, meta: {} };
  }

  //#region swagger stuff
  @ApiOperation({
    summary: 'Central adminstrator login API',
  })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   type: SwaggerBaseApiResponse(LoginAdministratorResponse),
  // })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   type: BaseApiErrorResponse,
  // })
  // //#endregion
  // @HttpCode(HttpStatus.OK)
  @Public()
  //@UseInterceptors(ClassSerializerInterceptor)
  //@Serialize(LoginAdministratorResponse)
  @Post('login')
  async login(@Body() credential: LoginInput) {
    return this.centralAuthService.login(credential);
  }

  @ApiOperation({
    summary: 'Central adminstrator login API',
  })
  @Get('me')
  async me(@CurrentUser() user: CentralUser) {
    return this.centralAuthService.me(user);
  }

  @ApiOperation({
    summary: 'list central permisions',
  })
  @Get('permisions')
  listPermisions() {
    return this.centralAuthService.listAllPermisions();
  }

  @ApiOperation({
    summary: 'update central permision',
  })
  @Put('permisions/update-central-permisions')
  updateCentralPermisions(@Body() data: UpdateCentralUserPermisions) {
    return this.centralAuthService.updateCentralPermisions(data);
  }
}
