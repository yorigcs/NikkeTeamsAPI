
import { auth } from '@/main/middlewares'
import { adapterFastifyController as adapt } from '@/main/adapters'
import { makeAddCampaignTeamController } from '@/main/factories/controllers'
import { type FastifyInstance } from 'fastify'

export default async (app: FastifyInstance): Promise<void> => {
  app.post('/campaign-upload', { preHandler: [auth] }, adapt(makeAddCampaignTeamController()))
}
