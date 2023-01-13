import { AddAccountError } from '@/domain/errors'

import { AddAccountService } from '@/data/services'
import { Encrypter } from '@/data/contracts/crypto'
import { SaveAccountRepository, LoadAccountByEmailRepository } from '@/data/contracts/repo'

import { mock, MockProxy } from 'jest-mock-extended'

const throwError = (): never => {
  throw new Error()
}

describe('AddAccountService', () => {
  let encrypter: MockProxy<Encrypter>
  let saveAccountRepo: MockProxy<SaveAccountRepository>
  let loadAccountByEmailRepo: MockProxy<LoadAccountByEmailRepository>
  let sut: AddAccountService
  const accountData = { email: 'any@mail.com', name: 'any_name', password: 'any_password', picture: 'any_picture' }

  beforeEach(() => {
    encrypter = mock()
    encrypter.encrypt.mockResolvedValue('hashedPassword')
    saveAccountRepo = mock()
    loadAccountByEmailRepo = mock()
    loadAccountByEmailRepo.load.mockResolvedValue(false)
    sut = new AddAccountService(encrypter, saveAccountRepo, loadAccountByEmailRepo)
  })

  it('should call Encrypter with correct params', async () => {
    await sut.perform(accountData)
    expect(encrypter.encrypt).toHaveBeenCalledWith({ plainText: 'any_password' })
    expect(encrypter.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should returns AddAccountError if Encrypter throws', async () => {
    encrypter.encrypt.mockImplementationOnce(throwError)
    const promise = await sut.perform(accountData)
    expect(promise).toBeInstanceOf(AddAccountError)
  })

  it('should returns AddAccountError if CreateUserAccount throws', async () => {
    saveAccountRepo.save.mockImplementationOnce(throwError)
    const promise = await sut.perform(accountData)
    expect(promise).toBeInstanceOf(AddAccountError)
  })

  it('should call saveAccountRepo with correct params', async () => {
    await sut.perform(accountData)
    expect(saveAccountRepo.save).toHaveBeenCalledWith({ id: 'any_id', ...accountData, password: 'hashedPassword' })
    expect(saveAccountRepo.save).toHaveBeenCalledTimes(1)
  })

  it('should call loadAccountByEmailRepo with correct params', async () => {
    await sut.perform(accountData)
    expect(loadAccountByEmailRepo.load).toHaveBeenCalledWith({ email: accountData.email })
    expect(loadAccountByEmailRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should not call saveAccountRepo if loadAccountByEmailRepo is true', async () => {
    loadAccountByEmailRepo.load.mockResolvedValueOnce(true)
    await sut.perform(accountData)
    expect(saveAccountRepo.save).toHaveBeenCalledTimes(0)
  })

  it('should returns account infos without password if sucess', async () => {
    const promise = await sut.perform(accountData)
    expect(promise).toEqual({ email: 'any@mail.com', name: 'any_name', picture: 'any_picture' })
  })
})
