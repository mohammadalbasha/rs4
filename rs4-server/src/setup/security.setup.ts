import helmet from 'helmet';
import * as csurf from 'csurf';
import { INestApplication } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from 'src/app.module';

export function securitySetup(app: INestApplication) {
  app.use(helmet());
  // app.use(csurf());
  app.enableCors();

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
    fallback: true,
  }); // for custom validators like unique
}
