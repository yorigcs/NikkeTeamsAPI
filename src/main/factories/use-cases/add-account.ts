import { setupAddAccount, AddAccount } from '@/domain/use-cases'
import { makeCryptoHandler, makeUUIDHandler } from '@/main/factories/infra/crypto'
import { makeUserAccountRepository } from '@/main/factories/infra/repo'

export const makeAddAccountUseCase = (): AddAccount => {
  return setupAddAccount(makeCryptoHandler(), makeUserAccountRepository(), makeUUIDHandler())
}
