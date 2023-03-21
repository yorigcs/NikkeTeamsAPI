import { type Hasher, type HasherCompare } from '@/domain/contracts/crypto'
import bcrypt from 'bcrypt'

export class HashHandler implements Hasher, HasherCompare {
  async hash ({ plainText }: Hasher.Input): Promise<Hasher.Output> {
    const salt = 12
    return await bcrypt.hash(plainText, salt)
  }

  async compare ({ plainText, digest }: HasherCompare.Input): Promise<HasherCompare.Output> {
    return await bcrypt.compare(plainText, digest)
  }
}
