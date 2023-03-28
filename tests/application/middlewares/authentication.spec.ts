
type HttpRequest = { acessToken: string }
type Authorization = (input: { token: string }) => Promise<{ userId: string }>
class AuthenticationMiddleware {
  constructor (private readonly auth: Authorization) {}

  async handle ({ acessToken }: HttpRequest): Promise<void> {
    await this.auth({ token: acessToken })
  }
}

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let authorization: jest.Mock
  let acessToken: string

  beforeAll(() => {
    acessToken = 'any_token'
    authorization = jest.fn().mockResolvedValue('any_token')
  })
  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorization)
  })

  it('should call auth with correct input', async () => {
    await sut.handle({ acessToken })
    expect(authorization).toHaveBeenCalledTimes(1)
    expect(authorization).toHaveBeenCalledWith({ token: acessToken })
  })
})
