import { Controller } from '@/application/controllers'
import { type LoginAccount, type Output as Response } from '@/domain/use-cases'
import { type HttpResponse, ok, unauthorized } from '@/application/helpers'
import { type Validator, ValidationBuild as Builder } from '@/application/validations'

type HttpRequest = { email: string, password: string }
type Model = Error | Response
export class LoginAccountController extends Controller {
  constructor (private readonly loginAccount: LoginAccount) {
    super()
  }

  async perform ({ email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    const user = await this.loginAccount({ email, password })
    if (user === null) return unauthorized('The email or password is wrong')
    return ok(user)
  }

  override buildValidators ({ email, password }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ fieldName: 'email', value: email }).required().email().build(),
      ...Builder.of({ fieldName: 'password', value: password }).required().build()
    ]
  }
}