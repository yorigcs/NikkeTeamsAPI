import { AddAccountService } from '@/data/services'
import { Encrypter, Uuid } from '@/data/contracts/crypto'
import { SaveAccountRepository, LoadAccountByEmailRepository } from '@/data/contracts/repo'

import { mock, MockProxy } from 'jest-mock-extended'

const throwError = (): never => {
  throw new Error()
}

describe('AddAccountService', () => {
  let encrypter: MockProxy<Encrypter>
  let userAccountRepo: MockProxy<SaveAccountRepository & LoadAccountByEmailRepository>
  let uuid: MockProxy<Uuid>
  let sut: AddAccountService
  const accountData = { email: 'any@mail.com', name: 'any_name', password: 'any_password', picture: 'any_picture' }

  beforeEach(() => {
    encrypter = mock()
    encrypter.encrypt.mockResolvedValue('hashedPassword')
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(false)
    uuid = mock()
    uuid.generate.mockReturnValue('any_id')
    sut = new AddAccountService(encrypter, userAccountRepo, uuid)
  })

  it('should call Encrypter with correct params', async () => {
    await sut.perform(accountData)
    expect(encrypter.encrypt).toHaveBeenCalledWith({ plainText: 'any_password' })
    expect(encrypter.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should throws if AddAccountError if Encrypter throws', async () => {
    encrypter.encrypt.mockImplementationOnce(throwError)
    const promise = sut.perform(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('should throws if CreateUserAccount throws', async () => {
    userAccountRepo.save.mockImplementationOnce(throwError)
    const promise = sut.perform(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('should call saveAccountRepo with correct params', async () => {
    await sut.perform(accountData)
    expect(userAccountRepo.save).toHaveBeenCalledWith({ id: 'any_id', ...accountData, password: 'hashedPassword' })
    expect(userAccountRepo.save).toHaveBeenCalledTimes(1)
  })

  it('should call loadAccountByEmailRepo with correct params', async () => {
    await sut.perform(accountData)
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: accountData.email })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should not call saveAccountRepo if loadAccountByEmailRepo is true', async () => {
    userAccountRepo.load.mockResolvedValueOnce(true)
    await sut.perform(accountData)
    expect(userAccountRepo.save).toHaveBeenCalledTimes(0)
  })

  it('should call Uuid with correct params', async () => {
    await sut.perform(accountData)
    expect(uuid.generate).toHaveBeenCalledWith({ key: accountData.email })
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('should returns true if sucess', async () => {
    const promise = await sut.perform(accountData)
    expect(promise).toBe(true)
  })
})
