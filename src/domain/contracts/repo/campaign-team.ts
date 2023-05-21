export interface SaveCampaignTeamRepository {
  save: (input: SaveCampaignTeamRepository.Input) => Promise<void>
}

export namespace SaveCampaignTeamRepository {
  export type Input = {
    id: string
    stage: string
    power: string
    image: string
    nikkes: string[]
    notes: string | null
    uploaderId: string
  }

}
