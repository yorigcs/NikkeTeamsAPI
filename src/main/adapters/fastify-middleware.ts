import { type Middleware } from '@/application/middlewares'
import { type FastifyReply, type FastifyRequest } from 'fastify'

type Adapter = (controller: Middleware) => (req: FastifyRequest, reply: FastifyReply) => Promise<void>

export const adapterFastifyMiddleware: Adapter = middleware => async (req, reply) => {
  const { cookie, ...headers } = req.headers
  let validHeaders = { ...headers }
  if (cookie !== undefined) {
    const cookiesMap = new Map<string, string>()
    cookie.split(';').forEach(cookie => {
      const [key, value] = cookie.trim().split('=')
      cookiesMap.set(key, value)
    })
    const cookies = Object.fromEntries(cookiesMap)
    validHeaders = { ...validHeaders, ...cookies }
  }

  const { data, statusCode } = await middleware.handle({ ...validHeaders })
  if (statusCode === 200) {
    const validEntries = Object.entries(data).filter(([,value]) => value)
    req.locals = { ...req.locals, ...Object.fromEntries(validEntries) }
    console.log(validEntries)
  } else {
    await reply.status(statusCode).send({ error: data.message })
  }
}
