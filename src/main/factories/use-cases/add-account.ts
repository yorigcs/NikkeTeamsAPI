import { setupAddAccount, type AddAccount } from '@/domain/use-cases'
import { makeHashHandler, makeUUIDHandler } from '@/main/factories/infra/crypto'
import { makeUserAccountRepository } from '@/main/factories/infra/repo'

export const makeAddAccountUseCase = (): AddAccount => {
  return setupAddAccount(makeHashHandler(), makeUserAccountRepository(), makeUUIDHandler())
}
