import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';

export enum LocaleFieldEnum {
  en = 'en',
  ar = 'ar',
}

export class LocaleField {
  @IsDefined()
  @IsString()
  en: string;

  @IsOptional()
  @IsString()
  ar: string;

  @IsOptional()
  @IsString()
  tr: string;

  constructor(en?: string, ar?: string, tr?: string) {
    this.en = en ? en : '';
    this.ar = ar ? ar : '';
    this.tr = tr ? tr : '';
  }
}
