import { type Hasher, type UUID } from '@/domain/contracts/crypto'

import { type SaveAccountRepository, type LoadAccountByEmailRepository } from '@/domain/contracts/repo/user-account'
import { UserProfile } from '../entities'

type Setup = (hasher: Hasher, userAccountRepo: SaveAccountRepository & LoadAccountByEmailRepository, uuid: UUID) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = boolean
export type AddAccount = (input: Input) => Promise<Output>

export const setupAddAccount: Setup = (hasher, userAccountRepo, uuid) => async input => {
  let hasSucess = false
  const { name, email, password } = input
  const hasAccount = await userAccountRepo.load({ email })
  if (hasAccount === null) {
    const { initials } = new UserProfile(name)
    const hashpassword = await hasher.hash({ plainText: password })
    const uuidG = await uuid.generate({})
    await userAccountRepo.save({ id: uuidG, password: hashpassword, name, email, picture: initials })
    hasSucess = true
  }
  return hasSucess
}
