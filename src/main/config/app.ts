import Fastify, { type FastifyInstance } from 'fastify'
import { setupRoutes } from '@/main/config/routes'
import { setupFastifyMultipart } from '@/main/config/fastifyMultipart'
import { setupFastifyCookie } from '@/main/config/fastifyCookie'

const app: FastifyInstance = Fastify({ logger: true })
setupFastifyCookie(app)
setupFastifyMultipart(app)
setupRoutes(app)

export { app }
