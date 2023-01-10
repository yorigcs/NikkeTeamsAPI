import { AddAccountError } from '@/domain/errors'
import { Account } from '@/domain/models'

export interface AddAcount {
  perform: (params: AddAcount.Params) => Promise<AddAcount.Result>
}

export namespace AddAcount {
  export type Params = Account
  export type Result = Omit<Account, 'password'> | AddAccountError
}
