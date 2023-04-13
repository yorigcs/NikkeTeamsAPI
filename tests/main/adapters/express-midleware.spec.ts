/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */
import { type Middleware } from '@/application/middlewares'
import { type Request, type Response, type NextFunction, type RequestHandler } from 'express'
import { type MockProxy, mock } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'

type Adapter = (middleware: Middleware) => RequestHandler

const adapterExpressMiddleware: Adapter = middleware => async (req, res, next) => {
  const { data, statusCode } = await middleware.handle({ ...req.headers })
  if (statusCode === 200) {
    const validEntries = Object.entries(data).filter(([,value]) => value)
    res.locals = { ...res.locals, ...Object.fromEntries(validEntries) }
    next()
  } else {
    res.status(statusCode).json({ error: data.message })
  }
}
describe('ExpressMidleware', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let middleware: MockProxy<Middleware>
  let sut: RequestHandler

  beforeAll(() => {
    req = getMockReq({ headers: { any: 'any' } })
    res = getMockRes().res
    next = getMockRes().next
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
    sut = adapterExpressMiddleware(middleware)
  })
  it('should call handle with correct request', async () => {
    await sut(req, res, next)

    expect(middleware.handle).toBeCalledTimes(1)
    expect(middleware.handle).toHaveBeenCalledWith({ any: 'any' })
  })

  it('should add valid data to res.locals', async () => {
    await sut(req, res, next)

    expect(res.locals).toEqual({ prop: 'any_value' })
    expect(next).toHaveBeenCalledTimes(1)
  })

  it('should responde with correct errors and statusCode', async () => {
    middleware.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any_error')
    })
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
