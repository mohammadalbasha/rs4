import { INestApplication } from '@nestjs/common';
import { RequestIdMiddleware } from 'src/shared/middlewares/request-id/request-id.middleware';

export function middlewareSetup(app: INestApplication) {
  app.use(RequestIdMiddleware);
}
