import 'reflect-metadata';
import { LocaleField } from '../dtos/localeField.dts';
const filterTypeMetadataKey = Symbol('format');

// decorator
export function FilterType(
  type: 'contains' | 'equals' | 'locale_contains' | 'scalar_list' | 'default',
) {
  return Reflect.metadata(filterTypeMetadataKey, type);
}

//
function getFilterType(target: any, propertyKey: string) {
  return Reflect.getMetadata(filterTypeMetadataKey, target, propertyKey);
}

// dto changer
export function getPrismaWhereByFilterDto(dto) {
  const result = {};
  if (!dto) return result;

  Object.getOwnPropertyNames(dto).forEach((x) => {
    if (dto[x] && dto[x] !== '') {
      const filterType = getFilterType(dto, x);
      if (filterType === 'locale_contains') {
        const dtoPropLanguages = [];
        Object.getOwnPropertyNames(new LocaleField()).forEach((lang) => {
          dtoPropLanguages.push({
            [x]: {
              path: [lang],
              string_contains: dto[x],
            },
          });
        });
        result['OR'] = dtoPropLanguages;
      } else if (filterType === 'equals') {
        result[x] = dto[x] == 'false' || dto[x] == false ? false : true;
      } else if (filterType === 'scalar_list') {
        // Note:
        // there is no difference between hasEvery, hasSome
        result[x] = {
          hasSome: dto[x],
        };
      } else if (filterType === 'contains') {
        result[x] = { [filterType ?? 'contains']: dto[x] };
      } else {
        result[x] = dto[x];
      }
    }
  });

  console.log(result);
  // code : {'containe': 'sy'}
  return result;
}
