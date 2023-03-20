import { HashHandler } from '@/infra/crypto'
import { hash, compare } from 'bcrypt'

jest.mock('bcrypt')

describe('HashHandler', () => {
  let sut: HashHandler

  beforeEach(() => {
    sut = new HashHandler()
  })

  describe('hash', () => {
    beforeAll(() => {
      jest.mocked(hash).mockImplementation(() => 'hashedText')
    })
    it('should call hash', async () => {
      await sut.hash({ plainText: 'plainText' })
      expect(hash).toHaveBeenCalledTimes(1)
      expect(hash).toHaveBeenCalledWith('plainText', 12)
    })

    it('should return a hashedText', async () => {
      const hashedText = await sut.hash({ plainText: 'plainText' })
      expect(hashedText).toBe('hashedText')
    })

    it('should throws an error if hash throws', async () => {
      jest.mocked(hash).mockImplementationOnce(() => { throw new Error('hash throws an error') })
      const promise = sut.hash({ plainText: 'plainText' })
      await expect(promise).rejects.toThrow(new Error('hash throws an error'))
    })
  })

  describe('compare', () => {
    beforeAll(() => {
      jest.mocked(compare).mockImplementation(() => true)
    })
    it('should call compare with correct input', async () => {
      await sut.compare({ plainText: 'any_plainText', digest: 'any_digest' })
      expect(compare).toHaveBeenCalledTimes(1)
      expect(compare).toHaveBeenCalledWith('any_plainText', 'any_digest')
    })

    it('should return true if compare returns true', async () => {
      const valid = await sut.compare({ plainText: 'any_plainText', digest: 'any_digest' })
      expect(valid).toBe(true)
    })

    it('should return false if compare returns false', async () => {
      jest.mocked(compare).mockImplementationOnce(() => false)
      const valid = await sut.compare({ plainText: 'any_plainText', digest: 'any_digest' })
      expect(valid).toBe(false)
    })

    it('should throws an error if compare throws', async () => {
      jest.mocked(compare).mockImplementationOnce(() => { throw new Error('compare throws an error') })
      const valid = sut.compare({ plainText: 'any_plainText', digest: 'any_digest' })
      await expect(valid).rejects.toThrow(new Error('compare throws an error'))
    })
  })
})
