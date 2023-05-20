/*
  Warnings:

  - A unique constraint covering the columns `[stage,type]` on the table `CampaignTeamStages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StageType" AS ENUM ('normal', 'hard', 'sub', 'ex');

-- AlterTable
ALTER TABLE "CampaignTeamStages" ADD COLUMN     "type" "StageType" NOT NULL DEFAULT 'normal';

-- CreateIndex
CREATE UNIQUE INDEX "CampaignTeamStages_stage_type_key" ON "CampaignTeamStages"("stage", "type");
