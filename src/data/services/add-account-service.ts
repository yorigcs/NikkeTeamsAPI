import { Encrypter } from '@/data/contracts/crypto'
import { AddAccountError } from '@/domain/errors'
import { AddAcount } from '@/domain/feature'
import { SaveAccountRepository } from '@/data/contracts/repo/user-account'

export class AddAccountService {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly saveAccountRepo: SaveAccountRepository
  ) { }

  async perform (params: AddAcount.Params): Promise<AddAcount.Result> {
    try {
      const { password, ...accountInfo } = params
      const hashpassword = await this.encrypter.encrypt({ plainText: password })
      await this.saveAccountRepo.save({ id: 'any_id', password: hashpassword, ...accountInfo })

      return { ...accountInfo }
    } catch (err) {
      return new AddAccountError()
    }
  }
}
