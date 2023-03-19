import { Hasher } from '@/domain/contracts/crypto'
import bcrypt from 'bcrypt'

export class HashHandler implements Hasher {
  async hash ({ plainText }: Hasher.Input): Promise<Hasher.Output> {
    const salt = 12
    return await bcrypt.hash(plainText, salt)
  }
}
