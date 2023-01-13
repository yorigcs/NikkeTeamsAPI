import { Encrypter, Uuid } from '@/data/contracts/crypto'
import { AddAcount } from '@/domain/feature'
import { SaveAccountRepository, LoadAccountByEmailRepository } from '@/data/contracts/repo/user-account'

export class AddAccountService {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly userAccountRepo: SaveAccountRepository & LoadAccountByEmailRepository,
    private readonly uuid: Uuid

  ) { }

  async perform (params: AddAcount.Params): Promise<AddAcount.Result> {
    let hasSucess = false

    const { password, ...accountInfo } = params
    const hasAccount = await this.userAccountRepo.load({ email: accountInfo.email })

    if (!hasAccount) {
      const hashpassword = await this.encrypter.encrypt({ plainText: password })
      const uuid = this.uuid.generate({ key: accountInfo.email })
      await this.userAccountRepo.save({ id: uuid, password: hashpassword, ...accountInfo })
      hasSucess = true
    }

    return hasSucess
  }
}
