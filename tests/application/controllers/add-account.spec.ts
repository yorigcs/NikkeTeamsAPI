
import { AddAccountController } from '@/application/controllers'
import { AddAccountService } from '@/data/services'
import { MockProxy, mock } from 'jest-mock-extended'
import { RequiredFieldStringError, PasswordConfirmationError, ConflictError } from '@/application/errors'

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
  it('should returns status code 400 if no name is provided', async () => {
    httpRequest.name = undefined
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, data: new RequiredFieldStringError('name') })
  })

  it('should returns status code 400 if no name email is provided', async () => {
    httpRequest.email = undefined
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, data: new RequiredFieldStringError('email') })
  })

  it('should returns status code 400 if no password is provided', async () => {
    httpRequest.password = undefined
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, data: new RequiredFieldStringError('password') })
  })

  it('should returns status code 400 if no confirmPassword is provided', async () => {
    httpRequest.confirmPassword = undefined
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, data: new RequiredFieldStringError('confirmPassword') })
  })

  it('should returns status code 400 if password is diferent of confirmPassword', async () => {
    httpRequest.confirmPassword = 'another_password'
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, data: new PasswordConfirmationError() })
  })

  it('should returns status code 409 if perform to add addAcount returns false', async () => {
    addAccountService.perform.mockResolvedValueOnce(false)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 409, data: new ConflictError('This account already exists') })
  })

  it('should returns status code 200 if perform to add addAcount returns true', async () => {
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 200, data: 'Account created successfully' })
  })

  it('should returns status code 500 if perform to add addAcount throws', async () => {
    addAccountService.perform.mockRejectedValueOnce(new Error('Infra error'))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 500, data: new Error('An internal error occured, try again later!') })
  })
})
