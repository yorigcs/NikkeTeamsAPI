import { type Middleware } from '@/application/middlewares'
import { type RequestHandler } from 'express'

type Adapter = (middleware: Middleware) => RequestHandler

export const adapterExpressMiddleware: Adapter = middleware => async (req, res, next) => {
  const { data, statusCode } = await middleware.handle({ ...req.headers })
  if (statusCode === 200) {
    const validEntries = Object.entries(data).filter(([,value]) => value)
    res.locals = { ...res.locals, ...Object.fromEntries(validEntries) }
    next()
  } else {
    res.status(statusCode).json({ error: data.message })
  }
}
