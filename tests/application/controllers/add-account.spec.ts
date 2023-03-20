
import { AddAccountController, Controller } from '@/application/controllers'
import { ConflictError } from '@/application/errors'
import { RequiredStringValidator, CompareStringValidator, EmailValidator } from '@/application/validations'

type HttpRequest = {
  name: string
  email: string
  password: string
  confirmPassword: string
}
describe('AddAccountController', () => {
  const data = {
    user: { name: 'any_name', email: 'any@mail', picture: 'any_picture', role: 'user' },
    acessToken: 'any_token',
    refreshToken: 'any_token'
  }
  let httpRequest: HttpRequest
  let sut: AddAccountController
  let addAccount: jest.Mock
  let loginAccount: jest.Mock

  beforeAll(() => {
    addAccount = jest.fn()
    addAccount.mockResolvedValue(true)
    loginAccount = jest.fn()
    loginAccount.mockResolvedValue(data)
  })
  beforeEach(() => {
    httpRequest = { name: 'any_name', email: 'any@email.com', password: 'any_password', confirmPassword: 'any_password' }
    sut = new AddAccountController(addAccount, loginAccount)
  })

  it('should extends controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators(httpRequest)

    expect(validators).toEqual([
      new RequiredStringValidator('name', 'any_name'),
      new RequiredStringValidator('email', 'any@email.com'),
      new EmailValidator('any@email.com'),
      new RequiredStringValidator('password', 'any_password'),
      new RequiredStringValidator('confirmPassword', 'any_password'),
      new CompareStringValidator('any_password', 'any_password')
    ])
  })

  it('should returns status code 409 if perform to add addAcount returns false', async () => {
    addAccount.mockResolvedValueOnce(false)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 409, data: new ConflictError('This account already exists') })
  })

  it('should returns status code 201 with user credentials if authentication sucessfull', async () => {
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 201, data })
  })

  it('should returns status code 201 with null data if authentication is not sucessfull', async () => {
    loginAccount.mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 201, data: null })
  })
})
