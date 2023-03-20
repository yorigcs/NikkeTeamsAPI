import { sign } from 'jsonwebtoken'
import { JwtTokenHandler } from '@/infra/crypto'

jest.mock('jsonwebtoken')

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

  it('should calls sign with correct input', async () => {
    await sut.generate({ key, expirationInMs })

    expect(sign).toHaveBeenCalledTimes(1)
    expect(sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
  })

  it('should returns a token', async () => {
    const resp = await sut.generate({ key, expirationInMs })

    expect(resp).toBe('any_token')
  })

  it('should throws if sign throws', async () => {
    jest.mocked(sign).mockImplementationOnce(() => { throw new Error('token_error') })

    const resp = sut.generate({ key, expirationInMs })

    await expect(resp).rejects.toThrow(new Error('token_error'))
  })
})
