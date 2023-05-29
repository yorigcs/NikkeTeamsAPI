
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { type MockProxy, mock } from 'jest-mock-extended'

import { type Middleware } from '@/application/middlewares'
import { adapterFastifyMiddleware } from '@/main/adapters'

describe('FastifyMidleware', () => {
  let req: FastifyRequest
  let reply: FastifyReply
  let middleware: MockProxy<Middleware>
  let sut: (req: FastifyRequest, reply: FastifyReply) => Promise<void>

  beforeAll(() => {
    req = {} as unknown as FastifyRequest
    req.headers = { any: 'any', cookie: 'any_cookie_key=any_cookie_value;' }
    reply = {} as unknown as FastifyReply
    reply.send = jest.fn()
    reply.code = jest.fn(() => reply)

    middleware = mock()
    middleware.handle.mockResolvedValue({
      statusCode: 200,
      data: {
        emptyProp: '',
        nullProp: null,
        undefinedProp: undefined,
        prop: 'any_value'
      }
    })
  })

  beforeEach(() => {
    sut = adapterFastifyMiddleware(middleware)
  })
  it('should call handle with correct request', async () => {
    await sut(req, reply)

    expect(middleware.handle).toBeCalledTimes(1)
    expect(middleware.handle).toHaveBeenCalledWith({ any: 'any', any_cookie_key: 'any_cookie_value' })
  })

  it('should add valid data to req.locals', async () => {
    await sut(req, reply)

    expect(req.locals).toEqual({ prop: 'any_value' })
  })

  it('should responde with correct errors and statusCode', async () => {
    middleware.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any_error')
    })
    await sut(req, reply)

    expect(reply.code).toHaveBeenCalledWith(500)
    expect(reply.code).toHaveBeenCalledTimes(1)
    expect(reply.send).toHaveBeenCalledWith({ error: 'any_error' })
    expect(reply.send).toHaveBeenCalledTimes(1)
  })
})
