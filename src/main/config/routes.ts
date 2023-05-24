import { type FastifyInstance } from 'fastify'
import { readdirSync } from 'fs'
import { join } from 'path'
export const setupRoutes = (app: FastifyInstance): void => {
  readdirSync(join(__dirname, '../routes'))
    .map(async file => {
      if (!file.endsWith('.map')) {
        await app.register(await import(`../routes/${file}`), { prefix: '/api' })
      }
    })
}
