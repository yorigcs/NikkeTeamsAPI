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

export class PasswordConfirmationError extends Error {
  constructor () {
    super('The password and the confirmPassword must be equals')
    this.name = 'PasswordConfirmationError'
  }
}

export class ConflictError extends Error {
  constructor (private readonly msg: string) {
    super(msg)
    this.name = 'ConflictError'
  }
}
