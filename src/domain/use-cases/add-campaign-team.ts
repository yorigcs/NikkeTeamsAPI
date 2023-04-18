import { type UploadFile } from '@/domain/contracts/storage'
import { type UUID } from '@/domain/contracts/crypto'

import { type SaveCampaignTeamRepository } from '@/domain/contracts/repo'

type Input = {
  userId: string
  file: { buffer: Buffer, mimeType: string }
  nikkes: string[]
  power: string
  stage: string
}
export type AddCampaignTeam = (input: Input) => Promise<void>
type Setup = (fileStorage: UploadFile, uuid: UUID, campaignTeamRepo: SaveCampaignTeamRepository) => AddCampaignTeam

export const setupAddCampaingTeam: Setup = (fileStorage, uuid, campaignTeamRepo) => async input => {
  const { userId, file:{ buffer, mimeType }, nikkes, power, stage } = input
  const key = await uuid.generate({ key: userId })
  const linkImage = await fileStorage.upload({ file: buffer, fileName: `${key}.${mimeType.split('/')[1]}` })
  await campaignTeamRepo.save({ id: key, image: linkImage, nikkes, power, stage, uploaderId: userId })
}
