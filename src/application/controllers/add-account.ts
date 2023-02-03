import { AddAccountService } from '@/data/services'
import { conflict, HttpResponse, ok } from '@/application/helpers'
import { ValidationBuild as Builder, Validator } from '@/application/validations'
import { Controller } from '@/application/controllers'

type HttpRequest = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type Model = Error | string

export class AddAccountController extends Controller {
  constructor (private readonly addAccount: AddAccountService) {
    super()
  }

  async perform ({ name, email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    const result = await this.addAccount.perform({ name, email, password, picture: name[0].toUpperCase() })

    if (!result) return conflict('This account already exists')

    return ok('Account created successfully')
  }

  override buildValidators ({ name, email, password, confirmPassword }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ fieldName: 'name', value: name }).required().build(),
      ...Builder.of({ fieldName: 'email', value: email }).required().email().build(),
      ...Builder.of({ fieldName: 'password', value: password }).required().build(),
      ...Builder.of({ fieldName: 'confirmPassword', value: confirmPassword }).required().compareTo(password).build()
    ]
  }
}
