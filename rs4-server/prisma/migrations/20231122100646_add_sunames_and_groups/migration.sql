-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en', 'ar');

-- CreateTable
CREATE TABLE "Surname" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "surname" VARCHAR(100) NOT NULL,
    "locale" "Locale" NOT NULL DEFAULT 'ar',

    CONSTRAINT "Surname_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "group" VARCHAR(100) NOT NULL,
    "color" VARCHAR(100) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Surname_surname_key" ON "Surname"("surname");

-- CreateIndex
CREATE UNIQUE INDEX "Group_group_key" ON "Group"("group");
