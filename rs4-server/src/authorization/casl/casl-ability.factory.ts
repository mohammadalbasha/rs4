import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { createPrismaAbility, PrismaQuery } from '@casl/prisma';
import { ConsoleLogger, Injectable, Post, Type } from '@nestjs/common';
import { CentralUser, Prisma } from '@prisma/client';
import { env } from 'process';
import { PrismaModels } from 'src/shared/prisma/prismaModels.type';

import { Action } from './action.enum';
import { type } from 'os';

// type Subjects = InferSubjects<PrismaModels> | 'all';
// export type Subjects = PrismaModels | 'all' | typeof BaseModel;
export type Subjects = PrismaModels | 'all';

export type AppAbility = PureAbility<[Action, Subjects], PrismaQuery>;

@Injectable()
export class CaslAbilityFactory {
  createForCentralUser(user: CentralUser) {
    if (!user) return null;
    const ability = new CaslAbility();

    // ALL PERMISIONS GRANTED TO SUPER ADMIN
    if (user.is_super_admin) {
      ability.can(Action.Manage, 'centralUser');
      ability.can(Action.Manage, 'group');
      ability.can(Action.Manage, 'surname');
      ability.can(Action.Manage, 'attention');
    } else {
      // DEFAULT PERMISIONS FOR EACH ADMIN
      ability.can(Action.Manage, 'centralUser', { id: user.id });

      // PERMISIONS RELATED ON GRANTED ROLES
      //@ts-ignore
      user.permisions?.forEach((permision) => {
        const { subject, action } = permision;

        ability.can(action, subject);
      });
      //@ts-ignore

      // for (let i = 0; i < user.permisions.length; i++) {
      //   //@ts-ignore
      //   const { subject, action } = user.permisions[i];
      //   console.log(subject, action);
      // }
    }

    return ability.build();
  }

  createForGuest() {
    const ability = new CaslAbility();

    // ability.can(Action.Manage, 'currency');
    // ability.can(Action.Manage, 'centralUser');

    return ability.build();
  }
}

class CaslAbility {
  protected innerCan;
  protected innerBuild;
  protected innerCannot;
  constructor() {
    // const { can, cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(PureAbility as AbilityClass<AppAbility>);
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );
    this.innerCan = can;
    this.innerCannot = cannot;
    this.innerBuild = build;
  }

  can(
    action: Action,
    subject: PrismaModels,
    conditions?: {
      // [P in keyof Prisma.CurrencyCreateInput]?: Prisma.CurrencyCreateInput[P];
      [P in keyof any]?: any;
    },
    fields?: // [keyof Prisma.CurrencyCreateInput],
    any,

    cannotFields?: //[keyof Prisma.CurrencyCreateInput],
    any,
  ) {
    this.innerCan(action, subject, fields, conditions);
    if (cannotFields) {
      this.innerCannot(action, subject, cannotFields, conditions);
    }
  }

  cannot(
    action: Action,
    subject: PrismaModels,
    conditions?: {
      [P in keyof any]?: any[P];
    },
    fields?: [keyof any],
  ) {
    this.innerCannot(action, subject, fields, conditions);
  }

  build() {
    return this.innerBuild({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item: PrismaModels) => {
        return (item.constructor as any)
          .modelName as ExtractSubjectType<Subjects>;
        // return (item as any)._prismaTypeName;
      },
    });
  }
}
