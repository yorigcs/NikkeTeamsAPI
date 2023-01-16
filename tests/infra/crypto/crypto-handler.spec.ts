import { CryptoHandler } from '@/infra/crypto'
import { hash } from 'bcrypt'

jest.mock('bcrypt')

describe('CryptoHandler', () => {
  let sut: CryptoHandler

  beforeAll(() => {
    jest.mocked(hash).mockImplementation(() => 'hashedText')
  })

  beforeEach(() => {
    sut = new CryptoHandler()
  })

  it('should call hash', async () => {
    await sut.encrypt({ plainText: 'plainText' })
    expect(hash).toHaveBeenCalledTimes(1)
  })

  it('should return a hashedText', async () => {
    const hashedText = await sut.encrypt({ plainText: 'plainText' })
    expect(hashedText).toBe('hashedText')
  })

  it('should throws an error if hash throws', async () => {
    jest.mocked(hash).mockImplementationOnce(() => { throw new Error('hash throws an error') })
    const promise = sut.encrypt({ plainText: 'plainText' })
    await expect(promise).rejects.toThrow(new Error('hash throws an error'))
  })
})
