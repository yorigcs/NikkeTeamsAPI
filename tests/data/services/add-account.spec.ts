import { Encrypter } from '@/data/contracts/crypto'
import { AddAccountService } from '@/data/services'
import { AddAccountError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

const throwError = (): never => {
  throw new Error()
}

describe('AddAccountService', () => {
  it('should call Encrypter with correct params', async () => {
    const encrypter = mock<Encrypter>()
    const sut = new AddAccountService(encrypter)
    await sut.perform({ email: 'any@mail.com', name: 'any_name', password: 'any_password', picture: 'any_picture' })
    expect(encrypter.encrypt).toHaveBeenCalledWith({ plainText: 'any_password' })
    expect(encrypter.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should returns AddAccountError if Encrypter throws', async () => {
    const encrypter = mock<Encrypter>()
    const sut = new AddAccountService(encrypter)
    jest.spyOn(encrypter, 'encrypt').mockImplementationOnce(throwError)
    const promise = await sut.perform({ email: 'any@mail.com', name: 'any_name', password: 'any_password', picture: 'any_picture' })
    expect(promise).toBeInstanceOf(AddAccountError)
  })

  it('should returns account infos without password if sucess', async () => {
    const encrypter = mock<Encrypter>()
    const sut = new AddAccountService(encrypter)
    const promise = await sut.perform({ email: 'any@mail.com', name: 'any_name', password: 'any_password', picture: 'any_picture' })
    expect(promise).toEqual({ email: 'any@mail.com', name: 'any_name', picture: 'any_picture' })
  })
})
