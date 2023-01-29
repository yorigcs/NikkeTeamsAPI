import { AddAccountService } from '@/data/services'
import { HttpResponse, serverError } from '@/application/helpers'

export class AddAccountController {
  constructor (private readonly addAccount: AddAccountService) {}
  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']
      for (const field of requiredFields) {
        if (httpRequest[field] === undefined) {
          return {
            statusCode: 422,
            data: new Error(`The field ${field} is required`)
          }
        }
      }
      const { name, email, password, confirmPassword } = httpRequest
      if (password !== confirmPassword) {
        return {
          statusCode: 400,
          data: new Error('The password and the confirmPassword must be equals')
        }
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
