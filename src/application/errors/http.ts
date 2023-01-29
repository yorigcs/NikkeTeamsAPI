export class ServerError extends Error {
  constructor (private readonly error?: Error) {
    super('An internal error occured, try again later!')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
