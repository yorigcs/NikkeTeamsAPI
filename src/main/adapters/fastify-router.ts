import { type Controller } from '@/application/controllers'
import { AcessToken, RefreshToken } from '@/domain/entities'
import { type FastifyRequest, type FastifyReply } from 'fastify'

type Adapter = (controller: Controller) => (req: FastifyRequest, reply: FastifyReply) => Promise<void>

const adapterFastifyController: Adapter = controller => async (req, reply) => {
  const body = req.body as any
  const file = await req.file()
  console.log(file)
  const { statusCode, data } = await controller.handle({ ...body, ...req.locals })
  const { acessToken, refreshToken, ...bodyData } = data
  if (acessToken !== undefined && refreshToken !== undefined) {
    void reply.cookie('acessToken', acessToken, { expires: new Date(Date.now() + AcessToken.expirationInMs), maxAge: AcessToken.expirationInMs, httpOnly: true, sameSite: 'lax' })
    void reply.cookie('refreshToken', refreshToken, { expires: new Date(Date.now() + RefreshToken.expirationInMs), maxAge: RefreshToken.expirationInMs, httpOnly: true, sameSite: 'lax' })
  }
  const json = [200, 201].includes(statusCode) ? bodyData : { error: data.message }
  await reply.code(statusCode).send({ ...json })
}

export { adapterFastifyController }
