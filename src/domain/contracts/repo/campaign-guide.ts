export interface SaveCampaignGuideRepository {
  save: (input: SaveCampaignGuideRepository.Input) => Promise<void>
}

export namespace SaveCampaignGuideRepository {
  export type Input = {
    id: string
    stage: string
    power: string
    image: string
    nikkes: string[]
    uploaderId: string
  }

}
