-- CreateTable
CREATE TABLE "CampaignTeamStages" (
    "id" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CampaignTeamStages_id_key" ON "CampaignTeamStages"("id");
