import { AddAccountController } from '@/application/controllers'
import { makeAddAccountUseCase, makeLoginAccountUseCase } from '@/main/factories/use-cases'

export const makeAddAccountController = (): AddAccountController => {
  return new AddAccountController(makeAddAccountUseCase(), makeLoginAccountUseCase())
}
