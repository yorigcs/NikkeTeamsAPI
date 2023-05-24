import 'fastify'
declare module 'fastify' {
  export interface FastifyRequest {
    locals?: any
  }
}
