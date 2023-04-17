import { type Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/campaign-upload', auth, (_req, res) => {
    res.send('ok')
  })
}
