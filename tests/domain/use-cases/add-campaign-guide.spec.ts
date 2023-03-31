import { type UploadFile } from '@/domain/contracts/storage'
import { type UUID } from '@/domain/contracts/crypto'
import { mock, type MockProxy } from 'jest-mock-extended'
import { type SaveCampaignGuideRepository } from '@/domain/contracts/repo'

type Input = {
  userId: string
  file: { buffer: Buffer, mimeType: string }
  nikkes: string[]
  power: string
  stage: string
}
type AddCampaignGuide = (input: Input) => Promise<void>
type Setup = (fileStorage: UploadFile, uuid: UUID, campaignGuideRepoGuide: SaveCampaignGuideRepository) => AddCampaignGuide

const setupAddCampaingGuide: Setup = (fileStorage, uuid, campaignGuideRepoGuide) => async input => {
  const { userId, file:{ buffer, mimeType }, nikkes, power, stage } = input
  const key = await uuid.generate({ key: userId })
  const linkImage = await fileStorage.upload({ file: buffer, fileName: `${key}.${mimeType.split('/')[1]}` })
  await campaignGuideRepoGuide.save({ id: key, image: linkImage, nikkes, power, stage, uploaderId: userId })
}
describe('AddCampaignGuideUseCase', () => {
  const input = {
    userId: 'any_userId',
    nikkes: ['any_nikke1', 'any_nikke2'],
    power: '50000',
    stage: '15-20',
    file: { buffer: Buffer.from('any_buffer'), mimeType: 'image/png' }
  }
  let uuid: MockProxy<UUID>
  let fileStorage: MockProxy<UploadFile>
  let campaignGuideRepoGuide: MockProxy<SaveCampaignGuideRepository>
  let sut: AddCampaignGuide
  beforeAll(() => {
    uuid = mock()
    uuid.generate.mockResolvedValue('any_uuid')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_image_link')
    campaignGuideRepoGuide = mock()
    campaignGuideRepoGuide.save.mockResolvedValue()
  })

  beforeEach(() => {
    sut = setupAddCampaingGuide(fileStorage, uuid, campaignGuideRepoGuide)
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

  it('should call campaignGuideRepoGuide save with correct input', async () => {
    await sut(input)

    expect(campaignGuideRepoGuide.save).toHaveBeenCalledTimes(1)
    expect(campaignGuideRepoGuide.save).toHaveBeenCalledWith({
      id: 'any_uuid',
      image: 'any_image_link',
      nikkes: ['any_nikke1', 'any_nikke2'],
      power: '50000',
      stage: '15-20',
      uploaderId: 'any_userId'
    })
  })

  it('should throws if campaignGuideRepo save throws', async () => {
    campaignGuideRepoGuide.save.mockRejectedValueOnce(new Error('save_error'))

    const response = sut(input)

    await expect(response).rejects.toThrow(new Error('save_error'))
  })

  it('should not throws if sucess', async () => {
    const response = sut(input)

    await expect(response).resolves.not.toThrow()
  })
})
