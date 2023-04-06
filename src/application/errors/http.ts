export class ServerError extends Error {
  constructor (private readonly error?: Error) {
    super('An internal error occured, try again later!')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class RequiredFieldError extends Error {
  constructor (private readonly field?: string) {
    const message = field === undefined ? 'Field Required' : `The field ${field} is required`
    super(message)
    this.name = 'RequiredFieldError'
  }
}

export class CompareFieldsError extends Error {
  constructor (private readonly field: string, private readonly fieldToCompare: string) {
    super(`The field ${field} must be equals to field ${fieldToCompare}`)
    this.name = 'CompareFieldsError'
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
