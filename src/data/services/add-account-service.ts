import { Encrypter } from '@/data/contracts/crypto'
import { AddAccountError } from '@/domain/errors'
import { AddAcount } from '@/domain/feature'

export class AddAccountService {
  constructor (private readonly encrypter: Encrypter) { }

  async perform (params: AddAcount.Params): Promise<AddAcount.Result> {
    try {
      await this.encrypter.encrypt({ plainText: params.password })
      const { password, ...accountInfo } = params
      return { ...accountInfo }
    } catch (err) {
      return new AddAccountError()
    }
  }
}
