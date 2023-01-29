import { AddAccountService } from '@/data/services'
import { badRequest, conflict, HttpResponse, ok, serverError } from '@/application/helpers'
import { PasswordConfirmationError, RequiredFieldStringError } from '@/application/errors'

type HttpRequest = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type Model = Error | string

export class AddAccountController {
  constructor (private readonly addAccount: AddAccountService) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) return badRequest(error)
      const { name, email, password } = httpRequest

      const result = await this.addAccount.perform({ name, email, password, picture: name[0].toUpperCase() })
      if (!result) return conflict('This account already exists')

      return ok('Account created successfully')
    } catch (error) {
      return serverError(error)
    }
  }

  validate ({ name, email, password, confirmPassword }: HttpRequest): Error | undefined {
    if (name === undefined) return new RequiredFieldStringError('name')
    if (email === undefined) return new RequiredFieldStringError('email')
    if (password === undefined) return new RequiredFieldStringError('password')
    if (confirmPassword === undefined) return new RequiredFieldStringError('confirmPassword')
    if (password !== confirmPassword) return new PasswordConfirmationError()
  }
}
