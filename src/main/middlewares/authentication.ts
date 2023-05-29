import { adapterFastifyMiddleware } from '@/main/adapters'
import { makeAuthenticationMiddleware } from '@/main/factories/middlewares'

export const auth = adapterFastifyMiddleware(makeAuthenticationMiddleware())
