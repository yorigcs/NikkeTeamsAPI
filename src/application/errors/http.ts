export class ServerError extends Error {
  constructor (private readonly error?: Error) {
    super('An internal error occured, try again later!')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class RequiredFieldStringError extends Error {
  constructor (private readonly field: string) {
    super(`The field ${field} is required`)
    this.name = 'RequiredFieldString'
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
