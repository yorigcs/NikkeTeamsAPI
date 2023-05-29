import { type FastifyInstance } from 'fastify'

export const setupFastifyCors = (app: FastifyInstance): void => {
  void app.register(import('@fastify/cors'))
}
