import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function createPermision(subject: string, action: string) {
  await prisma.permision.create({
    data: { subject: subject, action: action },
  });
}

async function main() {
  const centralPermisions = await prisma.permision.findMany();
  if (centralPermisions?.length == 0) {
    await createPermision('centralUser', 'manage');
    await createPermision('group', 'manage');
    await createPermision('attention', 'manage');
    await createPermision('surname', 'manage');
    await createPermision('permision', 'manage');
  }

  const password = await hash('12345678', 10);
  const centralUser = await prisma.centralUser.findFirst();

  if (!centralUser) {
    await prisma.centralUser.create({
      data: {
        name: 'mohammad albacha',
        email: 'rs4@email.com',
        password,
        is_super_admin: true,
      },
    });
  }
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
