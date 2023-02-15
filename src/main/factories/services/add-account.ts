import { AddAccountService } from '@/data/services'
import { makeCryptoHandler, makeUUIDHandler } from '@/main/factories/infra/crypto'
import { makeUserAccountRepository } from '@/main/factories/infra/repo'

export const makeAddAccountService = (): AddAccountService => {
  return new AddAccountService(makeCryptoHandler(), makeUserAccountRepository(), makeUUIDHandler())
}
