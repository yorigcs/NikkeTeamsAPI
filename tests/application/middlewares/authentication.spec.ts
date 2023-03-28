import { ok, unauthorized, type HttpResponse } from '@/application/helpers'
import { UnauthorizedError } from '@/application/errors'

type Model = Error | { userId: string }
type HttpRequest = { acessToken: string }

type Authorization = (input: { token: string }) => Promise<string>
class AuthenticationMiddleware {
  constructor (private readonly auth: Authorization) {}

  async handle ({ acessToken }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const userId = await this.auth({ token: acessToken })
      return ok({ userId })
    } catch {
      return unauthorized('Invalid token')
    }
  }
}

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let authorization: jest.Mock
  let acessToken: string

  beforeAll(() => {
    acessToken = 'any_token'
    authorization = jest.fn().mockResolvedValue('any_user_id')
  })
  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorization)
  })

  it('should call auth with correct input', async () => {
    await sut.handle({ acessToken })
    expect(authorization).toHaveBeenCalledTimes(1)
    expect(authorization).toHaveBeenCalledWith({ token: acessToken })
  })

  it('should returns status code 200 and userId', async () => {
    const httpResponse = await sut.handle({ acessToken })
    expect(httpResponse).toEqual({ statusCode: 200, data: { userId: 'any_user_id' } })
  })

  it('should returns status code 401 if invalid token', async () => {
    authorization.mockRejectedValueOnce(new Error('Invalid token'))
    const httpResponse = await sut.handle({ acessToken })
    expect(httpResponse).toEqual({ statusCode: 401, data: new UnauthorizedError('Invalid token') })
  })
})
