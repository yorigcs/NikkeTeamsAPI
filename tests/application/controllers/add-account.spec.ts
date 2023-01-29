
import { AddAccountController } from '@/application/controllers'
import { AddAccountService } from '@/data/services'
import { MockProxy, mock } from 'jest-mock-extended'
import { ConflictError } from '@/application/errors'
import { RequiredStringValidator, CompareStringValidator, ValidationComposite } from '@/application/validations'

jest.mock('@/application/validations/composite')

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

  it('should returns 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    jest.mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle(httpRequest)
    expect(ValidationComposite).toHaveBeenCalledTimes(1)
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredStringValidator('name', 'any_name'),
      new RequiredStringValidator('email', 'any_email'),
      new RequiredStringValidator('password', 'any_password'),
      new RequiredStringValidator('confirmPassword', 'any_password'),
      new CompareStringValidator('any_password', 'any_password')

    ])

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
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
