export interface LoadCampaignTeamStagesAll {
  load: () => Promise<LoadCampaignTeamStagesAll.Output>
}

type CampaingStage = {
  id: string
  stage: string
}
export namespace LoadCampaignTeamStagesAll {
  export type Output = CampaingStage[]
}
