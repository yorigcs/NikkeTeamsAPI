import { UserAccountRepository } from '@/infra/repo'

export const makeUserAccountRepository = (): UserAccountRepository => {
  return new UserAccountRepository()
}
