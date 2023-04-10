import { Controller, AddCampaignGuideController } from '@/application/controllers'
import { RequiredStringValidator, RequiredArrayValidator, RequiredBufferValidator, AllowedMimeTypes, MaxFileSize } from '@/application/validations'

type HttpRequest = {
  userId: string
  file: { buffer: Buffer, mimeType: string }
  nikkes: string[]
  power: string
  stage: string
}

describe('AddCampaignGuideController', () => {
  let sut: AddCampaignGuideController
  let httpRequest: HttpRequest
  let addCampaignGuide: jest.Mock

  beforeAll(() => {
    httpRequest = {
      userId: 'any_userId',
      file: { buffer: Buffer.from('any_buffer'), mimeType: 'image/png' },
      nikkes: ['any_nikke1', 'any_nikke2', 'any_nikke3', 'any_nikke4', 'any_nikke5'],
      power: '50000',
      stage: '10-5'
    }
    addCampaignGuide = jest.fn()
    addCampaignGuide.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = new AddCampaignGuideController(addCampaignGuide)
  })
  it('should be instance of Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should returns statusCode 201 with sucess message', async () => {
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({ statusCode: 201, data: { message: 'Guide uploaded!' } })
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators(httpRequest)

    expect(validators).toEqual([
      new RequiredStringValidator('userId', httpRequest.userId),
      new RequiredStringValidator('power', httpRequest.power),
      new RequiredStringValidator('stage', httpRequest.stage),
      new RequiredArrayValidator('nikkes', httpRequest.nikkes),
      new RequiredBufferValidator('file', httpRequest.file.buffer),
      new AllowedMimeTypes(['png', 'jpeg', 'jpg'], httpRequest.file.mimeType),
      new MaxFileSize(6, httpRequest.file.buffer)

    ])
  })
})
