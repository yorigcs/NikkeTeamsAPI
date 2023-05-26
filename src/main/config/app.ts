import Fastify, { type FastifyInstance } from 'fastify'
import { setupRoutes } from '@/main/config/routes'
import { setupFastifyCookie } from '@/main/config/fastifyCookie'

const app: FastifyInstance = Fastify({ logger: true })
setupFastifyCookie(app)
setupRoutes(app)

export { app }
