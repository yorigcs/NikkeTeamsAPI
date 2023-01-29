import { AddAccountService } from '@/data/services'
import { badRequest, conflict, HttpResponse, ok, serverError } from '@/application/helpers'
import { PasswordConfirmationError, RequiredFieldStringError } from '@/application/errors'

type HttpRequest = {
  name: string | undefined
  email: string | undefined
  password: string | undefined
  confirmPassword: string | undefined
}

type Model = Error | string

export class AddAccountController {
  constructor (private readonly addAccount: AddAccountService) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const { name, email, password, confirmPassword } = httpRequest
      if (name === undefined) return badRequest(new RequiredFieldStringError('name'))
      if (email === undefined) return badRequest(new RequiredFieldStringError('email'))
      if (password === undefined) return badRequest(new RequiredFieldStringError('password'))
      if (confirmPassword === undefined) return badRequest(new RequiredFieldStringError('confirmPassword'))

      if (password !== confirmPassword) return badRequest(new PasswordConfirmationError())

      const result = await this.addAccount.perform({ name, email, password, picture: name })
      if (!result) return conflict('This account already exists')

      return ok('Account created successfully')
    } catch (error) {
      return serverError(error)
    }
  }
}
