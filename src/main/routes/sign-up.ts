import { Router } from 'express'

export default (router: Router): void => {
  router.post('/sign-up', (_req, res) => {
    res.send({ data: 'okay' })
  })
}
