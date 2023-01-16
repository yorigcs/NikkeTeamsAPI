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
})
