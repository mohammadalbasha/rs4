import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Action } from 'src/authorization/casl/action.enum';

import {
  capitalizeFirstLetter,
  splitAtCapitalLetters,
} from '../helpers/stringsOperations.helpers';
import { PrismaService } from '../prisma/prisma.service';
import { checkModelExist } from '../prisma/prismaHelpers';
import { PrismaModels } from '../prisma/prismaModels.type';
import { ModelData } from '../prisma/prismaRelationFields.metadata';

@Injectable()
export class CheckRecordExistenceInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    Reflect.get;
    const request = context.switchToHttp().getRequest();
    const modelMetaData = this.reflector.getAll<
      {
        modelName: PrismaModels;
        relationFields: string[];
      }[]
    >(ModelData, [context.getHandler()]);

    if (Object.keys(request?.params).length === 0) {
      return next.handle();
    }

    const paramsNames = Object.keys(request?.params);
    const paramsValues = Object.values(request?.params) as any;

    console.log(paramsNames, paramsValues, modelMetaData);

    for (let i = 0; i < paramsNames.length; i++) {
      const modelName = paramsNames[i].split('Id')[0];

      const capitalziedModelName = capitalizeFirstLetter(modelName);
      const firstSpacedModelNameWord =
        splitAtCapitalLetters(capitalziedModelName)[0];
      const restSpacedModelNameWords = splitAtCapitalLetters(
        capitalziedModelName,
      )
        .slice(1)
        .join(' ');

      const modelInfo =
        modelMetaData?.length > 0 &&
        !modelMetaData?.some((r) => typeof r === 'undefined')
          ? modelMetaData.filter(
              (relFieMetaData) => relFieMetaData.modelName === modelName,
            )
          : [];

      // console.log(modelInfo);
      if (modelInfo.length > 0) {
        const populateFields =
          modelInfo[0]?.relationFields.length > 0
            ? modelInfo[0]?.relationFields?.reduce((accumulator, value) => {
                return { ...accumulator, [value]: true };
              }, {})
            : {};
        console.log(populateFields);

        request[modelName] = await checkModelExist(
          this.prisma[modelName],
          paramsValues[i],
          `${firstSpacedModelNameWord} ${restSpacedModelNameWords}`.trim(),
          request.method,
          populateFields,
        );
      }
      // If There is not metadata to get model info
      else {
        await checkModelExist(
          this.prisma[modelName],
          paramsValues[i],
          `${firstSpacedModelNameWord} ${restSpacedModelNameWords}`.trim(),
          request.method,
        );
      }

      // if (isRequiredRelationFields?.length > 0) {
      //   const populateFields =
      //     isRequiredRelationFields[0]?.relationFields?.reduce(
      //       (accumulator, value) => {
      //         return { ...accumulator, [value]: true };
      //       },
      //       {},
      //     );

      //   request[modelName] = await checkModelExist(
      //     this.prisma[modelName],
      //     paramsValues[i],
      //     `${firstSpacedModelNameWord} ${restSpacedModelNameWords}`.trim(),
      //     request.method,
      //     populateFields,
      //   );
      // }
      // // There isn't any relation fields data for param
      // else {
      //   request[modelName] = await checkModelExist(
      //     this.prisma[modelName],
      //     Number.parseInt(paramsValues[i]),
      //     `${firstSpacedModelNameWord} ${restSpacedModelNameWords}`.trim(),
      //     request.method,
      //   );
      // }
    }

    return next.handle();
  }
}
