import { LocaleField } from '../dtos/localeField.dts';

export function localFieldComparison(obj1: any, obj2: any) {
  return Object.keys(new LocaleField()).some((lang) => {
    if (obj1?.[lang] && obj2?.[lang]) return obj1[lang] === obj2[lang];
  });
}

export function printingLocalFieldNames(value: any) {
  return `
  [${Object.keys(new LocaleField())
    .map((lang) => value[lang] && `${lang}: ${value[lang]}`)
    .join(', ')}]`;
}

export function fillLocaleField(value: string) {
  let obj = {};
  Object.values(new LocaleField()).map((lang) => {
    obj = { ...obj, [lang]: value };
  });

  return obj;
}
