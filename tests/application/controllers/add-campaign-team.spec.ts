import { Controller, AddCampaignTeamController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validations/string'
import { RequiredArrayValidator } from '@/application/validations/array'
import { RequiredBufferValidator, AllowedMimeTypes, MaxFileSize } from '@/application/validations/image'
import { CheckError } from '@/domain/entities/errors'
import { ServerError } from '@/application/errors'

type HttpRequest = {
  userId: string
  file: { buffer: Buffer, mimeType: string }
  nikkes: string[]
  power: string
  stage: string
}

describe('AddCampaignTeamController', () => {
  let sut: AddCampaignTeamController
  let httpRequest: HttpRequest
  let addCampaignTeam: jest.Mock

  beforeAll(() => {
    httpRequest = {
      userId: 'any_userId',
      file: { buffer: Buffer.from('any_buffer'), mimeType: 'image/png' },
      nikkes: ['any_nikke1', 'any_nikke2', 'any_nikke3', 'any_nikke4', 'any_nikke5'],
      power: '50000',
      stage: '10-5'
    }
    addCampaignTeam = jest.fn()
    addCampaignTeam.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = new AddCampaignTeamController(addCampaignTeam)
  })
  it('should be instance of Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should returns statusCode 201 with sucess message', async () => {
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({ statusCode: 201, data: { message: 'Team uploaded!' } })
  })

  it('should returns badRequest if addCampaignTeam throws CheckError instance', async () => {
    const error = new CheckError('any_error')
    addCampaignTeam.mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({ statusCode: 400, data: error })
  })

  it('should throws if addCampaignTeam throws another error', async () => {
    const error = new Error('any_error')
    addCampaignTeam.mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({ statusCode: 500, data: new ServerError(error) })
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
