
import { AddAccountController } from '@/application/controllers'
import { ConflictError } from '@/application/errors'
import { RequiredStringValidator, CompareStringValidator, EmailValidator } from '@/application/validations'

type HttpRequest = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

describe('AddAccountController', () => {
  let httpRequest: HttpRequest
  let sut: AddAccountController
  let addAccount: jest.Mock

  beforeAll(() => {
    addAccount = jest.fn()
    addAccount.mockResolvedValue(true)
  })
  beforeEach(() => {
    httpRequest = { name: 'any_name', email: 'any@email.com', password: 'any_password', confirmPassword: 'any_password' }
    sut = new AddAccountController(addAccount)
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

  it('should returns status code 201 if perform to add addAcount returns true', async () => {
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 201, data: 'Account created successfully' })
  })
})
