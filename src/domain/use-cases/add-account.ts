import { Encrypter, UUID } from '@/domain/contracts/crypto'

import { SaveAccountRepository, LoadAccountByEmailRepository } from '@/domain/contracts/repo/user-account'

type Setup = (encrypter: Encrypter, userAccountRepo: SaveAccountRepository & LoadAccountByEmailRepository, uuid: UUID) => AddAccount
export type AddAccount = (params: { name: string, email: string, password: string, picture: string }) => Promise<boolean>

export const setupAddAccount: Setup = (encrypter, userAccountRepo, uuid) => async params => {
  let hasSucess = false
  const { password, ...accountInfo } = params
  const hasAccount = await userAccountRepo.load({ email: accountInfo.email })
  if (!hasAccount) {
    const hashpassword = await encrypter.encrypt({ plainText: password })
    const uuidG = await uuid.generate({})
    await userAccountRepo.save({ id: uuidG, password: hashpassword, ...accountInfo })
    hasSucess = true
  }
  return hasSucess
}
