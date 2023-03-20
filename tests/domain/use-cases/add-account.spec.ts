import { AddAccount, setupAddAccount } from '@/domain/use-cases'
import { Hasher, UUID } from '@/domain/contracts/crypto'
import { SaveAccountRepository, LoadAccountByEmailRepository } from '@/domain/contracts/repo'
import { mock, MockProxy } from 'jest-mock-extended'

type Input = {
  name: string
  email: string
  password: string
}
describe('AddAccountUseCase', () => {
  let hasher: MockProxy<Hasher>
  let userAccountRepo: MockProxy<SaveAccountRepository & LoadAccountByEmailRepository>
  let uuid: MockProxy<UUID>
  let sut: AddAccount
  let accountData: Input

  beforeAll(() => {
    accountData = { email: 'any@mail.com', name: 'any name', password: 'any_password' }
    hasher = mock()
    hasher.hash.mockResolvedValue('hashedPassword')
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(null)
    uuid = mock()
    uuid.generate.mockResolvedValue('any_id')
  })

  beforeEach(() => {
    sut = setupAddAccount(hasher, userAccountRepo, uuid)
  })

  it('should call Hasher with correct input', async () => {
    await sut(accountData)
    expect(hasher.hash).toHaveBeenCalledWith({ plainText: 'any_password' })
    expect(hasher.hash).toHaveBeenCalledTimes(1)
  })

  it('should throws if AddAccountError if Hasher throws', async () => {
    hasher.hash.mockRejectedValueOnce(new Error('Hasher error'))
    const promise = sut(accountData)
    await expect(promise).rejects.toThrow(new Error('Hasher error'))
  })

  it('should throws if CreateUserAccount throws', async () => {
    userAccountRepo.save.mockRejectedValueOnce(new Error('CreateUserAccount error'))
    const promise = sut(accountData)
    await expect(promise).rejects.toThrow(new Error('CreateUserAccount error'))
  })

  it('should call saveAccountRepo with correct input', async () => {
    await sut(accountData)
    expect(userAccountRepo.save).toHaveBeenCalledWith({ id: 'any_id', ...accountData, password: 'hashedPassword', picture: 'AN' })
    expect(userAccountRepo.save).toHaveBeenCalledTimes(1)
  })

  it('should call loadAccountByEmailRepo with correct input', async () => {
    await sut(accountData)
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: accountData.email })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should not call saveAccountRepo if loadAccountByEmailRepo is true', async () => {
    userAccountRepo.load.mockResolvedValueOnce({ ...accountData, id: 'any_id', roles: 'user', picture: 'AN' })
    await sut(accountData)
    expect(userAccountRepo.save).toHaveBeenCalledTimes(0)
  })

  it('should call Uuid with correct input', async () => {
    await sut(accountData)
    expect(uuid.generate).toHaveBeenCalledWith({})
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('should rethrows if Uuid throws', async () => {
    uuid.generate.mockRejectedValueOnce(new Error('Uuid error'))
    const promise = sut(accountData)
    await expect(promise).rejects.toThrow(new Error('Uuid error'))
  })

  it('should returns true if sucess', async () => {
    const promise = await sut(accountData)
    expect(promise).toBe(true)
  })
})
