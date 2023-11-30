import * as p from '@prisma/client'

export type ModelDelegates = {
  [K in p.Prisma.ModelName]: p.PrismaClient[Uncapitalize<K>]
}

export type WhereInput<T> = T extends Model<Record<string, unknown>, p.Prisma.ModelName>
  ? Exclude<Parameters<ModelDelegates[T["kind"]]["findFirst"]>[0], undefined | null>["where"]
  : never;

type Model<T extends Record<string, unknown>, TName extends string> = T & { kind: TName };
// type Post = Model<p.Post, 'Post'>;

// type PostWhereInput = WhereInput<Post>;
