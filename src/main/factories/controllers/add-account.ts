import { AddAccountController } from '@/application/controllers'
import { makeAddAccountUseCase } from '@/main/factories/use-cases'

export const makeAddAccountController = (): AddAccountController => {
  return new AddAccountController(makeAddAccountUseCase())
}
