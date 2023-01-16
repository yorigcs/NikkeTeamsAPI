import { Encrypter } from '@/data/contracts/crypto'
import { hash } from 'bcrypt'

export class CryptoHandler implements Encrypter {
  async encrypt ({ plainText }: Encrypter.Params): Promise<Encrypter.Result> {
    const salt = 12
    return await hash(plainText, salt)
  }
}
