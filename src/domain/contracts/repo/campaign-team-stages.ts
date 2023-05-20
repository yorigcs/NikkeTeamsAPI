export interface LoadCampaignTeamStagesAll {
  load: () => Promise<LoadCampaignTeamStagesAll.Output>
}

type CampaingStage = {
  id: string
  stage: string
  type: 'normal' | 'hard' | 'sub' | 'exNormal' | 'exHard'
}
export namespace LoadCampaignTeamStagesAll {
  export type Output = CampaingStage[]
}
