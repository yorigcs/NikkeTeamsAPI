
import { AddAccountService } from '@/data/services'
import { MockProxy, mock } from 'jest-mock-extended'
class AddAccountController {
  constructor (private readonly addAccount: AddAccountService) {}
  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']
      for (const field of requiredFields) {
        if (httpRequest[field] === undefined) {
          return {
            statusCode: 422,
            body: { error: new Error(`The field ${field} is required`) }
          }
        }
      }
      const { name, email, password, confirmPassword } = httpRequest
      if (password !== confirmPassword) {
        return {
          statusCode: 400,
          body: { error: new Error('The password and the confirmPassword must be equals') }
        }
      }

      const result = await this.addAccount.perform({ name, email, password, picture: name })
      if (!result) {
        return {
          statusCode: 409,
          body: { error: new Error('This account already exists') }
        }
      }
      return {
        statusCode: 200,
        body: 'Account created successfully'
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: new Error('Infra error') }
      }
    }
  }
}

type HttpResponse = {
  statusCode: number
  body: any
}

describe('AddAccountController', () => {
  let httpRequest: any
  let sut: AddAccountController
  let addAccountService: MockProxy<AddAccountService>

  beforeAll(() => {
    addAccountService = mock()
    addAccountService.perform.mockResolvedValue(true)
  })
  beforeEach(() => {
    httpRequest = { name: 'any_name', email: 'any_email', password: 'any_password', confirmPassword: 'any_password' }
    sut = new AddAccountController(addAccountService)
  })
  it('should returns status code 422 if no name is provided', async () => {
    httpRequest.name = undefined
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 422, body: { error: new Error('The field name is required') } })
  })

  it('should returns status code 422 if no name email is provided', async () => {
    httpRequest.email = undefined
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 422, body: { error: new Error('The field email is required') } })
  })

  it('should returns status code 422 if no password is provided', async () => {
    httpRequest.password = undefined
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 422, body: { error: new Error('The field password is required') } })
  })

  it('should returns status code 422 if no confirmPassword is provided', async () => {
    httpRequest.confirmPassword = undefined
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 422, body: { error: new Error('The field confirmPassword is required') } })
  })

  it('should returns status code 400 if password is diferent of confirmPassword', async () => {
    httpRequest.confirmPassword = 'another_password'
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, body: { error: new Error('The password and the confirmPassword must be equals') } })
  })

  it('should returns status code 400 if perform to add addAcount returns false', async () => {
    addAccountService.perform.mockResolvedValueOnce(false)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 409, body: { error: new Error('This account already exists') } })
  })

  it('should returns status code 200 if perform to add addAcount returns true', async () => {
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 200, body: 'Account created successfully' })
  })

  it('should returns status code 500 if perform to add addAcount throws', async () => {
    addAccountService.perform.mockRejectedValueOnce(new Error('Infra error'))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 500, body: { error: new Error('Infra error') } })
  })
})
