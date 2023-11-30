-- CreateTable
CREATE TABLE "CentralUser" (
    "id" SERIAL NOT NULL,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(50),
    "email" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CentralUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permision" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "action" VARCHAR(50) NOT NULL,
    "subject" VARCHAR(100) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Permision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CentralUserToPermision" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CentralUser_email_key" ON "CentralUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CentralUserToPermision_AB_unique" ON "_CentralUserToPermision"("A", "B");

-- CreateIndex
CREATE INDEX "_CentralUserToPermision_B_index" ON "_CentralUserToPermision"("B");

-- AddForeignKey
ALTER TABLE "_CentralUserToPermision" ADD CONSTRAINT "_CentralUserToPermision_A_fkey" FOREIGN KEY ("A") REFERENCES "CentralUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CentralUserToPermision" ADD CONSTRAINT "_CentralUserToPermision_B_fkey" FOREIGN KEY ("B") REFERENCES "Permision"("id") ON DELETE CASCADE ON UPDATE CASCADE;
