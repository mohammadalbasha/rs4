import { SetMetadata } from '@nestjs/common';

import { PrismaModels } from './prismaModels.type';

export const ModelData = 'modeDataAndRelations';
export const GetModelFromParam = (
  modelName: PrismaModels,
  relationFields: string[] = [],
) =>
  SetMetadata(ModelData, {
    modelName,
    relationFields,
  });
