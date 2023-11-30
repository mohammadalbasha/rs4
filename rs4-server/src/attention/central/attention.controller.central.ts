import {
  BadRequestException,
  Body,
  Get,
  NotFoundException,
  Param,
  Put,
  Res,
} from '@nestjs/common';
const crypto = require('crypto');
import * as ExcelJS from 'exceljs';
import { CentralUserAuthorized } from 'src/authorization/casl/decorator/authorize.decorator';
import BaseCRUDController from 'src/shared/controllers/baseCRUD.controller';
import { ApiController } from 'src/shared/decorators/apiController.decorator';

import {
  AttentionCreateInputCentral,
  AttentionListInputCentral,
  AttentionUpdateInputCentral,
} from './attention.input.central';
import { CentralUser } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FrontendLinksConfig } from 'src/shared/configs/config.interfaces';
import { CentralMailService } from 'src/shared/mail/services/centralMail.service';
import { CentralNotification } from 'src/shared/constants/notification.events';
import { Public } from 'src/authorization/casl/public.decorator';

@CentralUserAuthorized()
@ApiController('attentions', 1)
export class AttentionControllerCentral extends BaseCRUDController(
  'attentions',
  'attention',
  AttentionListInputCentral,
  AttentionCreateInputCentral,
  AttentionUpdateInputCentral,
  {
    hasDeleteMany: true,
    hasCreate: true,
    hasDelete: true,
    hasReadItem: true,
    hasReadList: true,
    hasUpdate: true,
  },
) {
  constructor(
    public prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private mailService: CentralMailService,
    private configService: ConfigService<FrontendLinksConfig>,
  ) {
    super(prisma);
    this.model = this.prisma.getEntity('attention');
  }

  public createData(
    input: AttentionCreateInputCentral,
    user: CentralUser,
  ): any {
    const { secondarySurnameId, groupId, ...data } = input;
    const serial = crypto.randomBytes(64).toString('hex');
    return {
      ...data,
      secondarySurname: {
        connect: { id: secondarySurnameId },
      },
      group: {
        connect: { id: groupId },
      },
      serial,
    };
  }

  public async canUpdate(
    item: any,
    data: any,
    user: CentralUser,
  ): Promise<boolean> {
    if (data.serial && data.serial != item.serial) {
      throw new BadRequestException('serial is invalid');
    }
    return true;
  }

  public updateData(input: any, user: CentralUser): any {
    const { secondarySurnameId, groupId, ...data } = input;
    return {
      ...data,
      ...(secondarySurnameId && {
        secondarySurname: {
          connect: { id: secondarySurnameId },
        },
      }),
      ...(groupId && {
        group: {
          connect: { id: groupId },
        },
      }),
    };
  }

  public afterCreate(item: any): Promise<void> {
    // if sendEmail
    // send email
    const link = `${this.configService.get('CONFIRM_ATTENTION')}/${
      item.id
    }/confirm?serial=${item.serial}`;

    if (item.sendEmail) {
      this.eventEmitter.emitAsync(
        CentralNotification.ConfirmAttention,
        item.primarySurname + ' ' + item.fullName,
        item.email,
        item.locale,
        link,
      );
    }

    // if send whatsappp
    // send whatsapp
    return;
  }

  @Public()
  @Put('/:id/confirm')
  async confirm(
    @Body() data: AttentionUpdateInputCentral,
    @Param('id') id: number,
  ) {
    const item = await this.prisma.attention.findFirst({ where: { id: id } });
    if (!item) throw new NotFoundException();
    if (data.serial && data.serial != item.serial) {
      throw new BadRequestException('serial is invalid');
    }
    const updateData = await this.updateData(data, undefined);
    const updatedRecord = await this.prisma.attention.update({
      where: { id: item.id },
      data: {
        ...updateData,
      },
    });
    return updatedRecord;
  }

  @Public()
  @Get('/:id/confirm')
  async getConfirm(@Param('id') id: number) {
    const item = await this.prisma.attention.findFirst({ where: { id: id } });
    if (!item) throw new NotFoundException();
    return item;
  }

  @Public()
  @Get('/download/all')
  async download(@Res() res) {
    const data = await this.prisma.attention.findMany();
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Populate the worksheet with data
    // Customize this section based on your data structure
    worksheet.addRow([
      'تاريخ الارسال',
      'اللقب',
      'الاسم',
      'البريد الاكتروني',
      'رقم الواتس آب',
      'الجهة',
      'المنصب',
      'تأكيد الحضور',
    ]);
    data.forEach((item) => {
      worksheet.addRow([
        item.createdAt,
        item.primarySurname,
        item.fullName,
        item.email,
        item.whatsappNumber,
        item.entity,
        item.position,
        item.attendConfirmation,
      ]);
    });
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');

    // Stream the workbook as an Excel file to the response
    await workbook.xlsx.write(res);

    // End the response
    res.end();
  }

  // // check if you can add or filter || allcountries
  // public whereData(filterBy, user: User): any {
  //   return {
  //     ...filterBy,
  //     ...(filterBy.countries && {
  //       countries: {
  //         every: {
  //           id: parseInt(filterBy.countries),
  //         },
  //       },
  //     }),
  //     //isActive: true,
  //   };
  // }
}
