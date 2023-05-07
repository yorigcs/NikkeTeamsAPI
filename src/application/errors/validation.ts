export class RequiredFieldError extends Error {
  constructor (private readonly field?: string) {
    const message = field === undefined ? 'Field Required' : `The field ${field} is required`
    super(message)
    this.name = 'RequiredFieldError'
  }
}

export class InvalidFieldError extends Error {
  constructor (private readonly msg: string) {
    super(msg)
    this.name = 'InvalidFieldError'
  }
}

export class CompareFieldsError extends Error {
  constructor (private readonly field: string, private readonly fieldToCompare: string) {
    super(`The field ${field} must be equals to field ${fieldToCompare}`)
    this.name = 'CompareFieldsError'
  }
}

export class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported file. Allowed extensions: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  constructor (maxSizeInMb: number) {
    super(`File upload limit is ${maxSizeInMb}MB`)
    this.name = 'MaxFileSizeError'
  }
}

export class EmailError extends Error {
  constructor () {
    super('This e-mail is not valid!')
    this.name = 'EmailError'
  }
}
