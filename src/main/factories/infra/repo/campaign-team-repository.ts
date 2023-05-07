import { CampaignTeamRepository } from '@/infra/repo'

export const makeCampaignTeamRepository = (): CampaignTeamRepository => {
  return new CampaignTeamRepository()
}
