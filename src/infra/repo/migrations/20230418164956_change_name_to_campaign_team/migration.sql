-- CreateTable
CREATE TABLE "CampaignTeam" (
    "id" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "nikkes" TEXT[],
    "uploaderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CampaignTeam_id_key" ON "CampaignTeam"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignTeam_image_key" ON "CampaignTeam"("image");

-- AddForeignKey
ALTER TABLE "CampaignTeam" ADD CONSTRAINT "CampaignTeam_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
