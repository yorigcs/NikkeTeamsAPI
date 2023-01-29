import { AddAccountService } from '@/data/services'
import { badRequest, HttpResponse, serverError } from '@/application/helpers'
import { PasswordConfirmationError, RequiredFieldStringError } from '@/application/errors'

export class AddAccountController {
  constructor (private readonly addAccount: AddAccountService) {}
  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']
      for (const field of requiredFields) {
        if (httpRequest[field] === undefined) {
          return badRequest(new RequiredFieldStringError(field))
        }
      }
      const { name, email, password, confirmPassword } = httpRequest
      if (password !== confirmPassword) {
        return badRequest(new PasswordConfirmationError())
      }

      const result = await this.addAccount.perform({ name, email, password, picture: name })
      if (!result) {
        return {
          statusCode: 409,
          data: new Error('This account already exists')
        }
      }
      return {
        statusCode: 200,
        data: 'Account created successfully'
      }
    } catch (error) {
      return serverError(new Error('Infra error'))
    }
  }
}
