import { Encrypter } from '@/data/contracts/crypto'
import { AddAcount } from '@/domain/feature'
export class AddAccountService {
  constructor (private readonly encrypter: Encrypter) { }

  async perform (params: AddAcount.Params): Promise<void> {
    await this.encrypter.encrypt({ plainText: params.password })
  }
}
