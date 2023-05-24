import { type FastifyInstance } from 'fastify'

export const setupFastifyMultipart = (app: FastifyInstance): void => {
  void app.register(import('@fastify/multipart'))
}
