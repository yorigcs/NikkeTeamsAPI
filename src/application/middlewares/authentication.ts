import { ok, unauthorized, type HttpResponse } from '@/application/helpers'
import { RequiredStringValidator } from '@/application/validations/string'
import { type Middleware } from '@/application/middlewares'

type Model = Error | { userId: string }
type HttpRequest = { acessToken: string }
type Authorization = (input: { token: string }) => Promise<string>

export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly auth: Authorization) {}

  async handle ({ acessToken }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!this.validate({ acessToken })) return unauthorized('acessToken is required')
    try {
      const userId = await this.auth({ token: acessToken })
      return ok({ userId })
    } catch {
      return unauthorized('Invalid token')
    }
  }

  private validate ({ acessToken }: HttpRequest): boolean {
    const error = new RequiredStringValidator('acessToken', acessToken).validate()
    return error === undefined
  }
}
