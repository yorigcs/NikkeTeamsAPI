import { sign, verify } from 'jsonwebtoken'
import { JwtTokenHandler } from '@/infra/crypto'

jest.mock('jsonwebtoken')

describe('JwtTokenHandler', () => {
  let sut: JwtTokenHandler
  let secret: string

  beforeAll(() => { secret = 'any_secret' })

  beforeEach(() => { sut = new JwtTokenHandler(secret) })

  describe('sign', () => {
    let key: string
    let expirationInMs: number
    let token: string

    beforeAll(() => {
      token = 'any_token'
      key = 'any_key'
      expirationInMs = 1000
      jest.mocked(sign).mockImplementation(() => token)
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

  describe('verify', () => {
    let token: string
    let key: string
    beforeAll(() => {
      token = 'any_token'
      key = 'any_key'
      jest.mocked(verify).mockImplementation(() => ({ key }))
    })

    it('should calls verify with correct input', async () => {
      await sut.validate({ token })

      expect(verify).toHaveBeenCalledTimes(1)
      expect(verify).toHaveBeenCalledWith(token, secret)
    })

    it('should returns the correct key', async () => {
      const responseKey = await sut.validate({ token })

      expect(responseKey).toBe(key)
    })

    it('should throws if verify throws', async () => {
      jest.mocked(verify).mockImplementationOnce(() => { throw new Error('key_error') })

      const resp = sut.validate({ token })

      await expect(resp).rejects.toThrow(new Error('key_error'))
    })

    it('should throws if verify returns null', async () => {
      jest.mocked(verify).mockImplementationOnce(() => null)

      const resp = sut.validate({ token })

      await expect(resp).rejects.toThrow()
    })
  })
})
