import { type UploadFile } from '@/domain/contracts/storage'
import { type UUID } from '@/domain/contracts/crypto'
import { type SaveCampaignTeamRepository, type LoadCampaignTeamStagesAll } from '@/domain/contracts/repo'
import { CheckError } from '@/domain/entities/errors'

type Input = {
  userId: string
  file: { buffer: Buffer, mimeType: string }
  nikkes: string[]
  power: string
  stage: string
  stageType: string
  notes?: string
}
export type AddCampaignTeam = (input: Input) => Promise<void>
type Setup = (fileStorage: UploadFile, uuid: UUID, campaignTeamRepo: SaveCampaignTeamRepository, campaignStages: LoadCampaignTeamStagesAll) => AddCampaignTeam

export const setupAddCampaingTeam: Setup = (fileStorage, uuid, campaignTeamRepo, campaignStages) => async input => {
  const { userId, file:{ buffer, mimeType }, nikkes, power, stage, stageType, notes } = input
  const availableStages = await campaignStages.load()
  if (!availableStages.some(availableStage => availableStage.stage === stage && availableStage.type === stageType)) throw new CheckError('This stage is not available!')
  const key = await uuid.generate({ key: userId })
  const linkImage = await fileStorage.upload({ file: buffer, fileName: `${key}.${mimeType.split('/')[1]}` })
  await campaignTeamRepo.save({ id: key, image: linkImage, nikkes, power, stage, uploaderId: userId, notes: notes ?? null })
}
