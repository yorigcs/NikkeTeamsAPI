
import { randomUUID } from 'crypto'
import { Encrypter } from '@/data/contracts/crypto'
import { AddAccountService } from '@/data/services'

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
    await sut.perform({ email: 'any@mail.com', name: 'any_name', password: 'any_password' })
    expect(encryptSpy.plainText).toBe('any_password')
  })

  it('should throws if Encrypter throws', async () => {
    const encryptSpy = new EncrypterSpy()
    const sut = new AddAccountService(encryptSpy)
    jest.spyOn(encryptSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.perform({ email: 'any@mail.com', name: 'any_name', password: 'any_password' })
    await expect(promise).rejects.toThrow()
  })
})
