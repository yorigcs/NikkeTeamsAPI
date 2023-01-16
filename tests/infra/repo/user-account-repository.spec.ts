import { UserAccountRepository } from '@/infra/repo'

import { prismaMock } from '@/tests/infra/repo/mocks'
import { Users } from '@prisma/client'

describe('UserAccountRepository', () => {
  let user: Users
  let email: string
  let sut: UserAccountRepository

  beforeAll(() => {
    user = { name: 'any_name', email: 'any_email', password: 'any_password', picture: 'any_picture', roles: 'user', id: 'any_id' }
    email = 'any_email'
    prismaMock.users.findUnique.mockResolvedValue(null)
    prismaMock.users.create.mockResolvedValue(user)
  })
  beforeEach(() => {
    sut = new UserAccountRepository()
  })

  it('should returns false if user doesnt have an account', async () => {
    const hasAccount = await sut.load({ email })
    expect(hasAccount).toBe(false)
  })

  it('should returns true user have an account', async () => {
    prismaMock.users.findUnique.mockResolvedValueOnce(user)
    const hasAccount = await sut.load({ email })
    expect(hasAccount).toBe(true)
  })

  it('should throw an error if load throws', async () => {
    prismaMock.users.findUnique.mockRejectedValue(new Error('Error to load account'))
    const promise = sut.load(user)
    await expect(promise).rejects.toThrow(new Error('Error to load account'))
  })

  it('should calls save without error', async () => {
    const promise = sut.save(user)
    await expect(promise).resolves.not.toThrow()
  })

  it('should throw an error if save throws', async () => {
    prismaMock.users.create.mockRejectedValue(new Error('Error to save account'))
    const promise = sut.save(user)
    await expect(promise).rejects.toThrow(new Error('Error to save account'))
  })
})
