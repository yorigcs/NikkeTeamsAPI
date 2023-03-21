import { Controller } from '@/application/controllers'
import { type HttpResponse } from '@/application/helpers'
import { ServerError } from '@/application/errors'
import { ValidationComposite } from '@/application/validations'

jest.mock('@/application/validations/composite')

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 201,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('should returns 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    jest.mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle('any_value')

    expect(ValidationComposite).toHaveBeenCalledTimes(1)
    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(httpResponse).toEqual({ statusCode: 400, data: error })
  })

  it('should returns status code 500 if perform  throws an error', async () => {
    const error = new Error('perform_error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle('any_value')
    expect(httpResponse).toEqual({ statusCode: 500, data: new ServerError(error) })
  })

  it('should returns status code 500 if perform throws undefined', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(undefined)
    const httpResponse = await sut.handle('any_value')
    expect(httpResponse).toEqual({ statusCode: 500, data: new ServerError(undefined) })
  })

  it('should returns same result as perform', async () => {
    const httpResponse = await sut.handle('any_value')
    expect(httpResponse).toEqual(sut.result)
  })
})
