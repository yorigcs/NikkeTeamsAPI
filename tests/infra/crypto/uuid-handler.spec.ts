
import { v4 } from 'uuid'
import { UUIDHandler } from '@/infra/crypto'

jest.mock('uuid')

describe('UuidHandler', () => {
  let sut: UUIDHandler

  beforeAll(() => {
    jest.mocked(v4).mockReturnValue('any_uuid')
  })

  beforeEach(() => {
    sut = new UUIDHandler()
  })

  it('should call v4', async () => {
    await sut.generate({ key: 'any_key' })
    expect(v4).toHaveBeenCalledTimes(1)
  })

  it('should returns correct uuid with key', async () => {
    const uuid = await sut.generate({ key: 'any_key' })
    expect(uuid).toBe('any_key_any_uuid')
  })

  it('should returns correct uuid without key', async () => {
    const uuid = await sut.generate({ })
    expect(uuid).toBe('any_uuid')
  })

  it('throws if uuid is not a string', async () => {
    jest.mocked(v4).mockImplementationOnce(() => { throw new Error('uuid is not a string') })
    const promise = sut.generate({ key: 'any_key' })
    await expect(promise).rejects.toThrow(new Error('uuid is not a string'))
  })
})
