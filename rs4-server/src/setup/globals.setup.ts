import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { join } from 'path';

export function globalSetup(app: INestApplication) {
  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
    new I18nValidationPipe({ whitelist: true }),
  );

  app.useGlobalFilters(new I18nValidationExceptionFilter());

  const uploadFolderExists = existsSync(join(process.cwd(), 'upload'));
  if (!uploadFolderExists) {
    mkdirSync(join(process.cwd(), 'upload'));
  }

  const publicFolderExists = existsSync(join(process.cwd(), 'upload/public'));
  if (!publicFolderExists) {
    mkdirSync(join(process.cwd(), 'upload/public'));
  }
}
