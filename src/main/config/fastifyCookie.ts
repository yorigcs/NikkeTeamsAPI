import { type FastifyInstance } from 'fastify'

export const setupFastifyCookie = (app: FastifyInstance): void => {
  void app.register(import('@fastify/cookie'))
}
