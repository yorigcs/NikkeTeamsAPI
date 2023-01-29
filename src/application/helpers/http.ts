import { ConflictError, ServerError } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const conflict = (msg: string): HttpResponse<Error> => ({
  statusCode: 409,
  data: new ConflictError(msg)
})

export const serverError = (error: unknown): HttpResponse<Error> => (
  {
    statusCode: 500,
    data: new ServerError(error instanceof Error ? error : undefined)
  }
)

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})
