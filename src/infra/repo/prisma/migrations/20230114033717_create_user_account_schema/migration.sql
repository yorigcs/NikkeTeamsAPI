-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "userAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "roles" "Roles" NOT NULL DEFAULT 'user'
);

-- CreateIndex
CREATE UNIQUE INDEX "userAccount_id_key" ON "userAccount"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userAccount_email_key" ON "userAccount"("email");
