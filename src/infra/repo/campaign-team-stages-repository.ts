import { type LoadCampaignTeamStagesAll } from '@/domain/contracts/repo'
import prismaConnection from '@/infra/repo/prisma'

export class CampaignTeamStagesRepository implements LoadCampaignTeamStagesAll {
  async load (): Promise<LoadCampaignTeamStagesAll.Output> {
    return await prismaConnection.campaignTeamStages.findMany()
  }
}
