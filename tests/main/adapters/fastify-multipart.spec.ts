import { ServerError } from '@/application/errors'
import { adaptFastifyMultipart as sut } from '@/main/adapters'
import { type FastifyReply, type FastifyRequest } from 'fastify'

describe('adaptFastifyMultipart', () => {
  let req: FastifyRequest
  let reply: FastifyReply
  beforeAll(() => {
    req = {} as unknown as FastifyRequest
    req.body = { any_field: { value: 'any_value', anyOtherProp: 'any' } }
    reply = {} as unknown as FastifyReply
    reply.send = jest.fn()
    reply.code = jest.fn(() => reply)
  })
  it('should set req.body with correct values', async () => {
    await sut(req, reply)

    expect(req.body).toEqual({ any_field: 'any_value' })
  })

  it('should set req.locals with buffer and mimeType', async () => {
    const buffer = Buffer.from('any_buffer')
    const mimetype = 'any/any'
    const file = { _buf: buffer, toBuffer: async function () { return this._buf }, mimetype }
    req.body = { file }

    await sut(req, reply)

    expect(req.locals).toEqual({ file: { buffer, mimeType: mimetype } })
  })

  it('should set req.locals with buffer and mimeType', async () => {
    const buffer = Buffer.from('any_buffer')
    const error = new Error('any_error')
    const file = { _buf: buffer, toBuffer: async function () { throw error } }
    req.body = { file }

    await sut(req, reply)

    expect(reply.code).toHaveBeenCalledTimes(1)
    expect(reply.code).toHaveBeenCalledWith(500)
    expect(reply.send).toHaveBeenCalledTimes(1)
    expect(reply.send).toHaveBeenCalledWith({ error: new ServerError().message })
  })
})
