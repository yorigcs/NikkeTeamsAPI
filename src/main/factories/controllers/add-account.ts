import { AddAccountController } from '@/application/controllers'
import { makeAddAccountService } from '@/main/factories/services'

export const makeAddAccountController = (): AddAccountController => {
  return new AddAccountController(makeAddAccountService())
}
