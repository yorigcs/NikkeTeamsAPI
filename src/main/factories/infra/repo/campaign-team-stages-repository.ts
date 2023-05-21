import { CampaignTeamStagesRepository } from '@/infra/repo'

export const makeCampaignTeamStagesRepository = (): CampaignTeamStagesRepository => {
  return new CampaignTeamStagesRepository()
}
