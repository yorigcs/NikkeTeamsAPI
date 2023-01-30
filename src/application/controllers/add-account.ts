import { AddAccountService } from '@/data/services'
import { badRequest, conflict, HttpResponse, ok, serverError } from '@/application/helpers'
import { ValidationComposite, ValidationBuild as builder } from '@/application/validations'

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
    return new ValidationComposite([
      ...builder.of({ fieldName: 'name', value: name }).required().build(),
      ...builder.of({ fieldName: 'email', value: email }).required().email().build(),
      ...builder.of({ fieldName: 'password', value: password }).required().build(),
      ...builder.of({ fieldName: 'confirmPassword', value: confirmPassword }).required().compareTo(password).build()
    ]).validate()
  }
}
