import { conflict, created, HttpResponse } from '@/application/helpers'
import { ValidationBuild as Builder, Validator } from '@/application/validations'
import { Controller } from '@/application/controllers'
import { AddAccount, LoginAccount, Output as Response } from '@/domain/use-cases'

type HttpRequest = { name: string, email: string, password: string, confirmPassword: string }
type Model = Error | Response

export class AddAccountController extends Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly loginAccount: LoginAccount
  ) {
    super()
  }

  async perform ({ name, email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    const result = await this.addAccount({ name, email, password })
    if (!result) return conflict('This account already exists')
    const login = await this.loginAccount({ email, password })
    return created(login)
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
