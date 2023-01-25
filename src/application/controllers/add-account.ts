import { AddAccountService } from '@/data/services'
import { HttpResponse } from '../helpers'

export class AddAccountController {
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
