import { type SaveCampaignTeamRepository } from '@/domain/contracts/repo'
import prismaConnection from '@/infra/repo/prisma'

export class CampaignTeamRepository implements SaveCampaignTeamRepository {
  async save (input: SaveCampaignTeamRepository.Input): Promise<void> {
    await prismaConnection.campaignTeam.create({ data: input })
  }
}
