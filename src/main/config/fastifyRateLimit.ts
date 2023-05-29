import { type FastifyInstance } from 'fastify'

export const setupRateLimit = (app: FastifyInstance): void => {
  void app.register(import('@fastify/rate-limit'), { max: 50, timeWindow: 5000 * 60, ban: 3 })
}
