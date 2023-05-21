import { mock, type MockProxy } from 'jest-mock-extended'
import { type UploadFile } from '@/domain/contracts/storage'
import { type UUID } from '@/domain/contracts/crypto'
import { type LoadCampaignTeamStagesAll, type SaveCampaignTeamRepository } from '@/domain/contracts/repo'
import { type AddCampaignTeam, setupAddCampaingTeam } from '@/domain/use-cases'
import { CheckError } from '@/domain/entities/errors'

describe('AddCampaignTeamUseCase', () => {
  const input = {
    userId: 'any_userId',
    nikkes: ['any_nikke1', 'any_nikke2'],
    power: '50000',
    stage: '15-20',
    stageType: 'normal',
    notes: 'any_note',
    file: { buffer: Buffer.from('any_buffer'), mimeType: 'image/png' }
  }
  let uuid: MockProxy<UUID>
  let fileStorage: MockProxy<UploadFile>
  let campaignTeamRepo: MockProxy<SaveCampaignTeamRepository>
  let campaignTeamStageRepo: MockProxy<LoadCampaignTeamStagesAll>
  let sut: AddCampaignTeam
  beforeAll(() => {
    uuid = mock()
    uuid.generate.mockResolvedValue('any_uuid')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_image_link')
    campaignTeamRepo = mock()
    campaignTeamRepo.save.mockResolvedValue()
    campaignTeamStageRepo = mock()
    campaignTeamStageRepo.load.mockResolvedValue([{ id: 'any_id', stage: '15-20', type: 'normal' }])
  })

  beforeEach(() => {
    sut = setupAddCampaingTeam(fileStorage, uuid, campaignTeamRepo, campaignTeamStageRepo)
  })

  it('should call uuid generate with correct input', async () => {
    await sut(input)

    expect(uuid.generate).toHaveBeenCalledTimes(1)
    expect(uuid.generate).toHaveBeenCalledWith({ key: 'any_userId' })
  })

  it('should throws if uuid generate throws', async () => {
    uuid.generate.mockRejectedValueOnce(new Error('uuid_generate_error'))

    const response = sut(input)

    await expect(response).rejects.toThrow(new Error('uuid_generate_error'))
  })

  it('should call fileStorage upload with correct input', async () => {
    await sut(input)

    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
    expect(fileStorage.upload).toHaveBeenCalledWith({ file: Buffer.from('any_buffer'), fileName: 'any_uuid.png' })
  })

  it('should throws if fileStorage upload throws', async () => {
    fileStorage.upload.mockRejectedValueOnce(new Error('upload_error'))

    const response = sut(input)

    await expect(response).rejects.toThrow(new Error('upload_error'))
  })

  it('should call campaignTeamRepo save with correct input', async () => {
    await sut(input)

    expect(campaignTeamRepo.save).toHaveBeenCalledTimes(1)
    expect(campaignTeamRepo.save).toHaveBeenCalledWith({
      id: 'any_uuid',
      image: 'any_image_link',
      nikkes: ['any_nikke1', 'any_nikke2'],
      power: '50000',
      stage: '15-20',
      notes: 'any_note',
      uploaderId: 'any_userId'
    })
  })

  it('should call campaignTeamRepo save with correct input', async () => {
    await sut({ ...input, notes: undefined })

    expect(campaignTeamRepo.save).toHaveBeenCalledTimes(1)
    expect(campaignTeamRepo.save).toHaveBeenCalledWith({
      id: 'any_uuid',
      image: 'any_image_link',
      nikkes: ['any_nikke1', 'any_nikke2'],
      power: '50000',
      stage: '15-20',
      notes: null,
      uploaderId: 'any_userId'
    })
  })

  it('should throws if campaignTeamRepo save throws', async () => {
    campaignTeamRepo.save.mockRejectedValueOnce(new Error('save_error'))

    const response = sut(input)

    await expect(response).rejects.toThrow(new Error('save_error'))
  })

  it('should throws if campaignTeamStageRepo load throws', async () => {
    campaignTeamStageRepo.load.mockRejectedValueOnce(new Error('load_error'))

    const response = sut(input)

    await expect(response).rejects.toThrow(new Error('load_error'))
  })

  it('should throws a CheckError if the stage is not available', async () => {
    campaignTeamStageRepo.load.mockResolvedValueOnce([])

    const response = sut(input)

    await expect(response).rejects.toThrow(new CheckError('This stage is not available!'))
  })

  it('should not throws if sucess', async () => {
    const response = sut(input)

    await expect(response).resolves.not.toThrow()
  })
})
