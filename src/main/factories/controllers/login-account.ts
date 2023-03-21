import { LoginAccountController } from '@/application/controllers'
import { makeLoginAccountUseCase } from '../use-cases'

export const makeLoginAccountController = (): LoginAccountController => {
  return new LoginAccountController(makeLoginAccountUseCase())
}
