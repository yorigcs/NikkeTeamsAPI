export class ServerError extends Error {
  constructor (private readonly error?: Error) {
    super('An internal error occured, try again later!')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class ConflictError extends Error {
  constructor (private readonly msg: string) {
    super(msg)
    this.name = 'ConflictError'
  }
}

export class UnauthorizedError extends Error {
  constructor (private readonly msg: string) {
    super(msg)
    this.name = 'UnauthorizedError'
  }
}
