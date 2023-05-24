import { adapterFastifyController as adapt } from '@/main/adapters'
import { makeAddAccountController, makeLoginAccountController } from '@/main/factories/controllers'
import { type FastifyInstance } from 'fastify'

export default async (app: FastifyInstance): Promise<void> => {
  app.post('/sign-up', adapt(makeAddAccountController()))
  app.post('/sign-in', adapt(makeLoginAccountController()))
}
