
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

describe('AddAccountService', () => {
  it('should call Encrypter with correct params', async () => {
    const encryptSpy = new EncrypterSpy()
    const sut = new AddAccountService(encryptSpy)
    await sut.perform({ email: 'any@mail.com', name: 'any_name', password: 'any_password' })
    expect(encryptSpy.plainText).toBe('any_password')
  })
})
