import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocuments } from './swagger.document';
import { INestApplication } from '@nestjs/common';

export function SwaggerSetup(app: INestApplication) {
  SwaggerModule.setup(
    'swagger/central',
    app,
    SwaggerDocuments.centralSwaggerDocument(app),
  );
}
