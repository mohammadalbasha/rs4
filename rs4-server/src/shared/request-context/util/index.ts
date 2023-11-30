import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import {
  FORWARDED_FOR_TOKEN_HEADER,
  REQUEST_ID_TOKEN_HEADER,
} from '../../constants';
import { RequestContext } from '../request-context.dto';
import { CentralUser } from '@prisma/client';

// Creates a RequestContext object from Request
export function createRequestContext(request: Request): RequestContext {
  const ctx = new RequestContext();
  ctx.requestID = request.header(REQUEST_ID_TOKEN_HEADER);
  ctx.url = request.url;
  ctx.ip = request.header(FORWARDED_FOR_TOKEN_HEADER)
    ? request.header(FORWARDED_FOR_TOKEN_HEADER)
    : request.ip;

  // If request.user does not exist, we explicitly set it to null.
  ctx.user = request.user as CentralUser;

  return ctx;
}
