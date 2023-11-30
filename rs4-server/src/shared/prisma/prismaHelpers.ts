import { BadRequestException, NotFoundException } from '@nestjs/common';

import { LocaleField } from '../dtos/localeField.dts';

export function queryingLocalField_stringContain(data: any) {
  console.log(data);
  const array: any[] = [];
  Object.getOwnPropertyNames(new LocaleField()).forEach((lang) => {
    Object.getOwnPropertyNames(data).forEach((property) => {
      if (
        typeof data[property]?.[lang] !== 'undefined' &&
        data[property]?.[lang]
      ) {
        array.push({
          [property]: {
            path: [lang],
            string_contains: data[property][lang],
          },
        });
      }
    });
  });
  return array;
}

export function queryingLocalField_equals(data: any) {
  const array: any[] = [];
  Object.getOwnPropertyNames(new LocaleField()).forEach((lang) => {
    Object.getOwnPropertyNames(data).forEach((property) => {
      if (
        typeof data[property]?.[lang] !== 'undefined' &&
        data[property]?.[lang]
      ) {
        array.push({
          [property]: {
            path: [lang],
            equals: data[property][lang],
          },
        });
      }
    });
  });
  return array;
}

export async function checkModelExist(
  model: any,
  id: any,
  modelName: string,
  method: string,
  relationFields?: any,
) {
  const entity = await model.findUnique({
    where: { id: Number.parseInt(id) },
    ...(relationFields &&
      Object.keys(relationFields).length !== 0 && {
        include: {
          ...relationFields,
        },
      }),
  });
  if (!entity) {
    if (method === 'GET') {
      throw new NotFoundException(`${modelName} with id: ${id} not found`);
    } else {
      throw new BadRequestException(`${modelName} with id: ${id} not found`);
    }
  }

  return entity;
}
