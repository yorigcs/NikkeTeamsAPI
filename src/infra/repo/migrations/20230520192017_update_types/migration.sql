/*
  Warnings:

  - The values [ex] on the enum `StageType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StageType_new" AS ENUM ('normal', 'hard', 'sub', 'exHard', 'exNormal');
ALTER TABLE "CampaignTeamStages" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "CampaignTeamStages" ALTER COLUMN "type" TYPE "StageType_new" USING ("type"::text::"StageType_new");
ALTER TYPE "StageType" RENAME TO "StageType_old";
ALTER TYPE "StageType_new" RENAME TO "StageType";
DROP TYPE "StageType_old";
ALTER TABLE "CampaignTeamStages" ALTER COLUMN "type" SET DEFAULT 'normal';
COMMIT;
