import { HashHandler } from '@/infra/crypto'
import { hash } from 'bcrypt'

jest.mock('bcrypt')

describe('HashHandler', () => {
  let sut: HashHandler

  beforeAll(() => {
    jest.mocked(hash).mockImplementation(() => 'hashedText')
  })

  beforeEach(() => {
    sut = new HashHandler()
  })

  it('should call hash', async () => {
    await sut.hash({ plainText: 'plainText' })
    expect(hash).toHaveBeenCalledTimes(1)
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
