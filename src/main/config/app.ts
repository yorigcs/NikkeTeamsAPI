import Fastify, { type FastifyInstance } from 'fastify'
import { setupRoutes } from '@/main/config/routes'
import { setupFastifyCookie } from '@/main/config/fastifyCookie'
import { setupRateLimit } from './fastifyRateLimit'
import { setupFastifyCors } from './fastifyCors'

const app: FastifyInstance = Fastify({ logger: true })
setupFastifyCors(app)
setupRateLimit(app)
setupFastifyCookie(app)
setupRoutes(app)

export { app }
