
import { randomUUID } from 'crypto'
import { Encrypter } from '@/data/contracts/crypto'
import { AddAccountService } from '@/data/services'
import { AddAccountError } from '@/domain/errors'

class EncrypterSpy implements Encrypter {
  plainText?: string
  cipherText = randomUUID()
  async encrypt (params: Encrypter.Params): Promise<string> {
    this.plainText = params.plainText
    return this.cipherText
  }
}

const throwError = (): never => {
  throw new Error()
}

describe('AddAccountService', () => {
  it('should call Encrypter with correct params', async () => {
    const encryptSpy = new EncrypterSpy()
    const sut = new AddAccountService(encryptSpy)
    await sut.perform({ email: 'any@mail.com', name: 'any_name', password: 'any_password', picture: 'any_picture' })
    expect(encryptSpy.plainText).toBe('any_password')
  })

  it('should returns AddAccountError if Encrypter throws', async () => {
    const encryptSpy = new EncrypterSpy()
    const sut = new AddAccountService(encryptSpy)
    jest.spyOn(encryptSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = await sut.perform({ email: 'any@mail.com', name: 'any_name', password: 'any_password', picture: 'any_picture' })
    expect(promise).toBeInstanceOf(AddAccountError)
  })

  it('should returns account infos without password if sucess', async () => {
    const encryptSpy = new EncrypterSpy()
    const sut = new AddAccountService(encryptSpy)
    const promise = await sut.perform({ email: 'any@mail.com', name: 'any_name', password: 'any_password', picture: 'any_picture' })
    expect(promise).toEqual({ email: 'any@mail.com', name: 'any_name', picture: 'any_picture' })
  })
})
