import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { REQUEST_ID_TOKEN_HEADER } from '../constants';
import { BaseApiException } from '../exceptions/base-api.exception';
import { AppLogger } from '../logger/logger.service';
import { createRequestContext } from '../request-context/util';
import { NodeConfig } from '../configs/config.interfaces';
import { Environment } from '../constants/environments';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  /** set logger context */
  constructor(
    private readonly config: ConfigService<NodeConfig>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AllExceptionsFilter.name);

    // catch unhandled errors in async calls
    process.on('uncaughtException', (err: Error) => {
      console.log(
        `😱 Uncaught Exception Error: ${err.message}\n${err.stack}`,
        'AllExceptionsFilter',
      );
    });
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      // NOTE: if you receive this error message, most likely there was an error within an
      // unresolved Promise or Observable without .catch() function. Please implement a proper .catch() function!

      console.log(
        `😱 Unhandled Rejection Error: ${reason}\n${reason.stack}`,
        'AllExceptionsFilter',
      );
    });
  }

  catch(exception: T, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest<Request>();
    const res: Response = ctx.getResponse<Response>();

    const path = req.url;
    const timestamp = new Date().toISOString();
    const requestId = req.headers[REQUEST_ID_TOKEN_HEADER];
    const requestContext = createRequestContext(req);

    let stack: any;
    let statusCode: HttpStatus;
    let errorName: string;
    let message: string;
    let details: string | Record<string, any>;
    // TODO : Based on language value in header, return a localized message.
    const acceptedLanguage = 'ja';
    let localizedMessage: string;

    // TODO : Refactor the below cases into a switch case and tidy up error response creation.
    if (exception instanceof BaseApiException) {
      statusCode = exception.getStatus();
      errorName = exception.constructor.name;
      message = exception.message;
      localizedMessage = exception.localizedMessage[acceptedLanguage];
      details = exception.details || exception.getResponse();
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      errorName = exception.constructor.name;
      message = exception.message;
      details = exception.getResponse();
    } else if (exception instanceof Error) {
      errorName = exception.constructor.name;
      message = exception.message;
      stack = exception.stack;
    }

    // Set to internal server error in case it did not match above categories.
    statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    errorName = errorName || 'InternalException';
    message = message || 'Internal server error';

    // NOTE: For reference, please check https://cloud.google.com/apis/design/errors
    const error = {
      statusCode,
      message,
      localizedMessage,
      errorName,
      details,
      // Additional meta added by us.
      path,
      requestId,
      timestamp,
    };
    this.logger.warn(requestContext, error.message, {
      error,
      stack,
    });

    // Suppress original internal server error details in prod mode
    const isProMood = this.config.get('APP_ENV') !== Environment.Development;
    if (isProMood && statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      error.message = 'Internal server error';
    }

    res.status(statusCode).json({ error });
  }
}
