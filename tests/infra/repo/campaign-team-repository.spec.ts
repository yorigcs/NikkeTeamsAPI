import { CampaignTeamRepository } from '@/infra/repo'

import { prismaMock } from '@/tests/infra/repo/mocks'
import { type CampaignTeam } from '@prisma/client'

describe('CampaignTeamRepository', () => {
  let campaignTeam: CampaignTeam
  let sut: CampaignTeamRepository
  const date = new Date()

  beforeAll(() => {
    campaignTeam = { id: 'any_id', image: 'any_img', nikkes: ['any_nikke'], power: '1000', stage: '10', uploaderId: 'any_uploader_id', notes: null, createdAt: date, updatedAt: date }
    prismaMock.campaignTeam.create.mockResolvedValue(campaignTeam)
  })
  beforeEach(() => {
    sut = new CampaignTeamRepository()
  })

  it('should calls save without error', async () => {
    const promise = sut.save(campaignTeam)
    await expect(promise).resolves.not.toThrow()
    expect(prismaMock.campaignTeam.create).toHaveBeenCalledWith({ data: campaignTeam })
  })

  it('should throw an error if save throws', async () => {
    const error = new Error('Error to save campaign team')
    prismaMock.campaignTeam.create.mockRejectedValue(error)
    const promise = sut.save(campaignTeam)
    await expect(promise).rejects.toThrow(error)
  })
})
