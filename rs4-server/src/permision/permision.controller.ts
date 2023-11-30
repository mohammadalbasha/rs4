import { Controller, Get, Param, Put } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/authorization/casl/public.decorator';
import BaseCRUDController from 'src/shared/controllers/baseCRUD.controller';
import BaseReadController from 'src/shared/controllers/baseREAD.controller';
import { ApiController } from 'src/shared/decorators/apiController.decorator';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CentralPermisionService } from './permision.service';
import { Can } from 'src/authorization/casl/can.decorator';
import { Action } from 'src/authorization/casl/action.enum';
import { UpdateCentralPermisions } from './permisions.input';

@Can([Action.Manage, 'permision'])
@ApiController('permisions', 1)
export class CentralPermisionsController {
  // TODO:
  // Asking about PermissionService
  constructor(
    private permisionService: CentralPermisionService,
    private readonly prisma: PrismaService, // private permisionService: any,
  ) {}

  @Get()
  listPermisions() {
    return this.prisma.permision.findMany();
  }

  @ApiOperation({
    summary: 'update central permision',
  })
  @ApiNotFoundResponse({
    description: 'Occurs when "userId"  OR  "centralUserId" not exist in db',
  })
  @Put('/update-central-permisions')
  updateCentralPermisions(data: UpdateCentralPermisions) {
    return this.permisionService.updateCentralPermisions(data);
  }
}
