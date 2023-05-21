-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "StageType" AS ENUM ('normal', 'hard', 'sub', 'exHard', 'exNormal');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "roles" "Roles" NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "CampaignTeam" (
    "id" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "nikkes" TEXT[],
    "uploaderId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "CampaignTeamStages" (
    "id" SERIAL NOT NULL,
    "stage" TEXT NOT NULL,
    "type" "StageType" NOT NULL DEFAULT 'normal',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignTeamStages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignTeam_id_key" ON "CampaignTeam"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignTeam_image_key" ON "CampaignTeam"("image");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignTeamStages_stage_type_key" ON "CampaignTeamStages"("stage", "type");

-- AddForeignKey
ALTER TABLE "CampaignTeam" ADD CONSTRAINT "CampaignTeam_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
