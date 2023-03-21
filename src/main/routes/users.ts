import { adapterExpressController as adapt } from '@/infra/http'
import { Router } from 'express'
import { makeAddAccountController, makeLoginAccountController } from '../factories/controllers'

export default (router: Router): void => {
  router.post('/sign-up', adapt(makeAddAccountController()))
  router.post('/sign-in', adapt(makeLoginAccountController()))
}
