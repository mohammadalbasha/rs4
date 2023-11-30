-- CreateEnum
CREATE TYPE "PrimarySurname" AS ENUM ('ma3ali', 'sa3adt', 'mr', 'your_excellency');

-- CreateTable
CREATE TABLE "Attention" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "primarySurname" "PrimarySurname" NOT NULL DEFAULT 'ma3ali',
    "secondarySurnameId" INTEGER NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "alternativeEmails" JSONB NOT NULL,
    "entity" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "locale" "Locale" NOT NULL,
    "sendEmail" BOOLEAN NOT NULL DEFAULT true,
    "sendWhatsapp" BOOLEAN NOT NULL DEFAULT false,
    "attendConfirmation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Attention_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attention" ADD CONSTRAINT "Attention_secondarySurnameId_fkey" FOREIGN KEY ("secondarySurnameId") REFERENCES "Surname"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attention" ADD CONSTRAINT "Attention_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
