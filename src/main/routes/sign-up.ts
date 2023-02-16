import { adapterExpressController as adapt } from '@/infra/http'
import { Router } from 'express'
import { makeAddAccountController } from '../factories/controllers'

export default (router: Router): void => {
  router.post('/sign-up', adapt(makeAddAccountController()))
}
