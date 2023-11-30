import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function createPermision(subject: string, action: string) {
  await prisma.permision.create({
    data: { subject: subject, action: action },
  });

  // if (action == 'manage') {
  //   for (let item of ['manage', 'read', 'create', 'update', 'delete']) {
  //     await prisma.permision.create({
  //       data: { subject: subject, action: item },
  //     });
  //   }
  // } else
  //   await prisma.permision.create({
  //     data: { subject: subject, action: action },
  //   });
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
  //   await createPermision('CENTRAL', 'currency', 'manage');
  //   await createPermision('CENTRAL', 'speciality', 'manage');
  //   await createPermision('CENTRAL', 'businessType', 'manage');
  //   await createPermision('CENTRAL', 'documentType', 'manage');
  //   await createPermision('CENTRAL', 'document', 'manage');
  //   await createPermision('CENTRAL', 'role', 'manage');
  //   await createPermision('CENTRAL', 'mediaFile', 'manage');
  //   await createPermision('CENTRAL', 'payoutMethod', 'manage');
  //   await createPermision('CENTRAL', 'payoutMethodName', 'manage');
  //   await createPermision('CENTRAL', 'electronicBankPayout', 'manage');
  //   await createPermision('CENTRAL', 'transferBankPayout', 'manage');
  //   await createPermision('CENTRAL', 'moneyTransferPayout', 'manage');
  //   await createPermision('CENTRAL', 'friendsInvitation', 'manage');
  //   await createPermision('CENTRAL', 'fieldsUpdate', 'manage');
  //   await createPermision('CENTRAL', 'usageGuide', 'manage');
  //   await createPermision('CENTRAL', 'usageGuideCategory', 'manage');
  //   await createPermision('CENTRAL', 'notification', 'manage');
  //   await createPermision('CENTRAL', 'supportTicket', 'manage');
  //   await createPermision('CENTRAL', 'SupportTicketDepartment', 'manage');
  //   await createPermision('CENTRAL', 'shop', 'manage');
  //   await createPermision('CENTRAL', 'shopFeature', 'manage');
  //   await createPermision('CENTRAL', 'shopSalesVolume', 'manage');
  //   await createPermision('CENTRAL', 'shopAudienceOpinion', 'manage');
  //   await createPermision('CENTRAL', 'shopOnMediaFile', 'manage');
  //   await createPermision('CENTRAL', 'shopSocialMediaIcon', 'manage');
  //   await createPermision('CENTRAL', 'shopApp', 'manage');
  //   await createPermision('CENTRAL', 'shopLawPage', 'manage');
  //   await createPermision('CENTRAL', 'shopElectronicBankIcon', 'manage');
  //   await createPermision('CENTRAL', 'shopPage', 'manage');
  //   await createPermision('CENTRAL', 'subscription', 'manage');
  //   await createPermision('CENTRAL', 'product', 'manage');
  //   await createPermision('CENTRAL', 'sale', 'manage');
  //   await createPermision('CENTRAL', 'shopFAQ', 'manage');
  //   await createPermision('CENTRAL', 'shopFAQCategory', 'manage');
  // }

  const password = await hash('12345678', 10);
  const centralUser = await prisma.centralUser.findFirst();

  if (!centralUser) {
    await prisma.centralUser.create({
      data: {
        name: 'mohammad albacha',
        email: 'hamoudy00128@hotmail.com',
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
