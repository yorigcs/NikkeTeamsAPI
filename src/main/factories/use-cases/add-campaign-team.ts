import { type AddCampaignTeam, setupAddCampaingTeam } from '@/domain/use-cases'
import { makeAwsS3StorageHandler } from '@/main/factories/infra/storage'
import { makeUUIDHandler } from '@/main/factories/infra/crypto'
import { makeCampaignTeamRepository, makeCampaignTeamStagesRepository } from '@/main/factories/infra/repo'

export const makeAddCampaignTeamUseCase = (): AddCampaignTeam => {
  return setupAddCampaingTeam(makeAwsS3StorageHandler(), makeUUIDHandler(), makeCampaignTeamRepository(), makeCampaignTeamStagesRepository())
}
