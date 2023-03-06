import { Encrypter, UUID } from '@/domain/contracts/crypto'

import { SaveAccountRepository, LoadAccountByEmailRepository } from '@/domain/contracts/repo/user-account'
import { UserProfile } from '../entities'

type Setup = (encrypter: Encrypter, userAccountRepo: SaveAccountRepository & LoadAccountByEmailRepository, uuid: UUID) => AddAccount
export type AddAccount = (params: { name: string, email: string, password: string }) => Promise<boolean>

export const setupAddAccount: Setup = (encrypter, userAccountRepo, uuid) => async params => {
  let hasSucess = false
  const { name, email, password } = params
  const hasAccount = await userAccountRepo.load({ email })
  if (!hasAccount) {
    const { initials } = new UserProfile(name)
    const hashpassword = await encrypter.encrypt({ plainText: password })
    const uuidG = await uuid.generate({})
    await userAccountRepo.save({ id: uuidG, password: hashpassword, name, email, picture: initials })
    hasSucess = true
  }
  return hasSucess
}
