
import { auth } from '@/main/middlewares'
import { adapterFastifyController as adapt, adaptMultipart as upload } from '@/main/adapters'
import { makeAddCampaignTeamController } from '@/main/factories/controllers'
import { type FastifyInstance } from 'fastify'

export default async (app: FastifyInstance): Promise<void> => {
  void app.register(import('@fastify/multipart'), { attachFieldsToBody: true })
  app.post('/campaign-upload', { preHandler: [auth, upload] }, adapt(makeAddCampaignTeamController()))
}
