import { TokenGenerator } from '@/domain/contracts/crypto'
import { sign } from 'jsonwebtoken'

jest.mock('jsonwebtoken')

class JwtTokenHandler implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate ({ key, expirationInMs }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    const expiresInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expiresInSeconds })
  }
}
describe('', () => {
  let sut: JwtTokenHandler
  let secret: string
  let key: string
  let expirationInMs: number

  beforeAll(() => {
    secret = 'any_secret'
    key = 'any_key'
    expirationInMs = 1000
    jest.mocked(sign).mockImplementation(() => 'any_token')
  })

  beforeEach(() => {
    sut = new JwtTokenHandler(secret)
  })

  it('should calls', async () => {
    await sut.generate({ key, expirationInMs })
    expect(sign).toHaveBeenCalledTimes(1)
    expect(sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
  })
})
