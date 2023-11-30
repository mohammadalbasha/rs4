import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { NodeConfig } from './shared/configs/config.interfaces';
import { SwaggerSetup } from './setup/swagger/swagger.setup';
import { globalSetup } from './setup/globals.setup';
import { middlewareSetup } from './setup/middleware.setup';
import { securitySetup } from './setup/security.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   *  Global setup:
   *  Global-Prefix
   *  Global-Pipes (ValidationPipe, i18nValidationPipe)
   *  Global-Filter
   *  Versioning
   */
  globalSetup(app);

  /**
   *  Swagger setup:
   *  Central & Seller & Customer swagger configuration
   */
  SwaggerSetup(app);

  /**
   *  Middlwware setup:
   *  Request middleware for cerating unique id for each http request
   */
  middlewareSetup(app);

  /**
   *  Setup security
   *  Helmet & CSRF & CORS
   */
  securitySetup(app);

  const appPort = app.get(ConfigService<NodeConfig>).get('APP_PORT');
  await app.listen(appPort);
}
bootstrap();
