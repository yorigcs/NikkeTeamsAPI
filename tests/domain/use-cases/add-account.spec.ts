import { AddAccount, setupAddAccount } from '@/domain/use-cases'
import { Encrypter, UUID } from '@/domain/contracts/crypto'
import { SaveAccountRepository, LoadAccountByEmailRepository } from '@/domain/contracts/repo'
import { mock, MockProxy } from 'jest-mock-extended'

type Params = {
  name: string
  email: string
  password: string
}
describe('AddAccountUseCase', () => {
  let encrypter: MockProxy<Encrypter>
  let userAccountRepo: MockProxy<SaveAccountRepository & LoadAccountByEmailRepository>
  let uuid: MockProxy<UUID>
  let sut: AddAccount
  let accountData: Params

  beforeAll(() => {
    accountData = { email: 'any@mail.com', name: 'any name', password: 'any_password' }
    encrypter = mock()
    encrypter.encrypt.mockResolvedValue('hashedPassword')
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(false)
    uuid = mock()
    uuid.generate.mockResolvedValue('any_id')
  })

  beforeEach(() => {
    sut = setupAddAccount(encrypter, userAccountRepo, uuid)
  })

  it('should call Encrypter with correct params', async () => {
    await sut(accountData)
    expect(encrypter.encrypt).toHaveBeenCalledWith({ plainText: 'any_password' })
    expect(encrypter.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should throws if AddAccountError if Encrypter throws', async () => {
    encrypter.encrypt.mockRejectedValueOnce(new Error('Encrypter error'))
    const promise = sut(accountData)
    await expect(promise).rejects.toThrow(new Error('Encrypter error'))
  })

  it('should throws if CreateUserAccount throws', async () => {
    userAccountRepo.save.mockRejectedValueOnce(new Error('CreateUserAccount error'))
    const promise = sut(accountData)
    await expect(promise).rejects.toThrow(new Error('CreateUserAccount error'))
  })

  it('should call saveAccountRepo with correct params', async () => {
    await sut(accountData)
    expect(userAccountRepo.save).toHaveBeenCalledWith({ id: 'any_id', ...accountData, password: 'hashedPassword', picture: 'AN' })
    expect(userAccountRepo.save).toHaveBeenCalledTimes(1)
  })

  it('should call loadAccountByEmailRepo with correct params', async () => {
    await sut(accountData)
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: accountData.email })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should not call saveAccountRepo if loadAccountByEmailRepo is true', async () => {
    userAccountRepo.load.mockResolvedValueOnce(true)
    await sut(accountData)
    expect(userAccountRepo.save).toHaveBeenCalledTimes(0)
  })

  it('should call Uuid with correct params', async () => {
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
