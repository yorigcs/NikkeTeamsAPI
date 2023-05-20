import { CampaignTeamStagesRepository } from '@/infra/repo'

import { prismaMock } from '@/tests/infra/repo/mocks'
import { type CampaignTeamStages } from '@prisma/client'

describe('CampaignTeamStagesRepository', () => {
  let campaignTeamStage: CampaignTeamStages
  let sut: CampaignTeamStagesRepository
  const date = new Date()
  beforeAll(() => {
    campaignTeamStage = { id: 'any_id', stage: 'any_stage', type: 'normal', createdAt: date, updatedAt: date }
    prismaMock.campaignTeamStages.findMany.mockResolvedValue([campaignTeamStage])
  })
  beforeEach(() => {
    sut = new CampaignTeamStagesRepository()
  })

  it('should calls load without error', async () => {
    const promise = sut.load()
    await expect(promise).resolves.not.toThrow()
    expect(prismaMock.campaignTeamStages.findMany).toHaveBeenCalledWith()
  })

  it('should throw an error if load throws', async () => {
    const error = new Error('Error to load campaign team stages')
    prismaMock.campaignTeamStages.findMany.mockRejectedValue(error)
    const promise = sut.load()
    await expect(promise).rejects.toThrow(error)
  })
})
