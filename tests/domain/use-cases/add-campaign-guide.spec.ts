import { type UploadFile } from '@/domain/contracts/storage'
import { type UUID } from '@/domain/contracts/crypto'
import { mock, type MockProxy } from 'jest-mock-extended'

type Input = {
  userId: string
  file: { buffer: Buffer, mimeType: string }
  nikkes: string[]
  power: string
  stage: string
}
type Output = string
type AddCampaignGuide = (input: Input) => Promise<Output>
type Setup = (fileStorage: UploadFile, uuid: UUID) => AddCampaignGuide

const setupAddCampaingGuide: Setup = (fileStorage, uuid) => async input => {
  const { userId, file:{ buffer, mimeType } } = input
  const key = await uuid.generate({ key: userId })
  return await fileStorage.upload({ file: buffer, fileName: `${key}.${mimeType.split('/')[1]}` })
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
  let sut: AddCampaignGuide
  beforeAll(() => {
    uuid = mock()
    uuid.generate.mockResolvedValue('any_uuid')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_string')
  })

  beforeEach(() => {
    sut = setupAddCampaingGuide(fileStorage, uuid)
  })

  it('should call uuid generate with correct input', async () => {
    await sut(input)

    expect(uuid.generate).toHaveBeenCalledTimes(1)
    expect(uuid.generate).toHaveBeenCalledWith({ key: 'any_userId' })
  })

  it('should call fileStorage upload with correct input', async () => {
    await sut(input)

    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
    expect(fileStorage.upload).toHaveBeenCalledWith({ file: Buffer.from('any_buffer'), fileName: 'any_uuid.png' })
  })

  it('should throws if uuid generate throws', async () => {
    uuid.generate.mockRejectedValueOnce(new Error('uuid_generate_error'))

    const response = sut(input)

    await expect(response).rejects.toThrow(new Error('uuid_generate_error'))
  })

  it('should throws if fileStorage upload throws', async () => {
    fileStorage.upload.mockRejectedValueOnce(new Error('upload_error'))

    const response = sut(input)

    await expect(response).rejects.toThrow(new Error('upload_error'))
  })
})
