import { mock, type MockProxy } from 'jest-mock-extended'

import { type Controller } from '@/application/controllers'
import { adapterFastifyController } from '@/main/adapters'
import { AcessToken, RefreshToken } from '@/domain/entities'
import { type FastifyReply, type FastifyRequest } from 'fastify'

describe('FastifyRouter', () => {
  let req: FastifyRequest
  let reply: FastifyReply
  let controller: MockProxy<Controller>
  let sut: (req: FastifyRequest, reply: FastifyReply) => Promise<void>

  beforeAll(() => {
    req = {} as unknown as FastifyRequest
    req.body = { any: 'any' }
    reply = {} as unknown as FastifyReply
    reply.send = jest.fn()
    reply.code = jest.fn(() => reply)
    reply.cookie = jest.fn()

    controller = mock()
    controller.handle.mockResolvedValue({ statusCode: 201, data: { data: 'any_data' } })
  })
  beforeEach(() => {
    sut = adapterFastifyController(controller)
  })

  it('should calls handle with correct request', async () => {
    await sut(req, reply)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should respond with correct data and statusCode 201', async () => {
    await sut(req, reply)

    expect(reply.code).toHaveBeenCalledWith(201)
    expect(reply.code).toHaveBeenCalledTimes(1)

    expect(reply.send).toHaveBeenCalledWith({ data: 'any_data' })
    expect(reply.send).toHaveBeenCalledTimes(1)
  })

  it('should respond with Error and statusCode 400', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('any_error')
    })
    await sut(req, reply)

    expect(reply.code).toHaveBeenCalledWith(400)
    expect(reply.code).toHaveBeenCalledTimes(1)

    expect(reply.send).toHaveBeenCalledWith({ error: 'any_error' })
    expect(reply.send).toHaveBeenCalledTimes(1)
  })

  it('should set cookies if refreshToken and acessToken are defined', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 200,
      data: { refreshToken: 'any_token', acessToken: 'any_token', other_data: 'any_data' }
    })

    await sut(req, reply)

    expect(reply.cookie).toBeCalledTimes(2)
    expect(reply.cookie).toHaveBeenCalledWith('refreshToken', 'any_token', { expires: expect.any(Date), maxAge: RefreshToken.expirationInMs, httpOnly: true, sameSite: 'lax' })
    expect(reply.cookie).toHaveBeenCalledWith('acessToken', 'any_token', { expires: expect.any(Date), maxAge: AcessToken.expirationInMs, httpOnly: true, sameSite: 'lax' })

    expect(reply.code).toHaveBeenCalledWith(200)
    expect(reply.code).toHaveBeenCalledTimes(1)

    expect(reply.send).toHaveBeenCalledWith({ other_data: 'any_data' })
    expect(reply.send).toHaveBeenCalledTimes(1)
  })
})
