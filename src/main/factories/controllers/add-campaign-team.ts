import { AddCampaignTeamController } from '@/application/controllers'
import { makeAddCampaignTeamUseCase } from '@/main/factories/use-cases'

export const makeAddCampaignTeamController = (): AddCampaignTeamController => {
  return new AddCampaignTeamController(makeAddCampaignTeamUseCase())
}
