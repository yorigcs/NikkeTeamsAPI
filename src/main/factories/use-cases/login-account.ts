import { LoginAccount, setupLoginAccount } from '@/domain/use-cases'
import { makeUserAccountRepository } from '@/main/factories/infra/repo'
import { makeHashHandler, makeJwtTokenHandler } from '../infra/crypto'

export const makeLoginAccountUseCase = (): LoginAccount => {
  return setupLoginAccount(makeUserAccountRepository(), makeHashHandler(), makeJwtTokenHandler())
}
