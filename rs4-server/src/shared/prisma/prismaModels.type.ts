import { PrismaClient } from '@prisma/client';

export type PrismaModels = keyof Omit<
  PrismaClient,
  | '$disconnect'
  | '$connect'
  | '$executeRaw'
  | '$queryRaw'
  | '$transaction'
  | '$on'
  | '$use'
  | 'disconnect'
  | 'connect'
  | 'executeRaw'
  | 'queryRaw'
  | 'transaction'
  | 'on'
  | '$executeRawUnsafe'
  | '$queryRawUnsafe'
>;
