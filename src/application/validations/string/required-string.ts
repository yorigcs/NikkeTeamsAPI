import { InvalidFieldError, RequiredFieldError } from '@/application/errors'
import { RequiredValidator } from '@/application/validations'

export class RequiredStringValidator extends RequiredValidator {
  constructor (override readonly fieldName: string, override readonly value: string) {
    super(value, fieldName)
  }

  override validate (): Error | undefined {
    if (super.validate() !== undefined) return new RequiredFieldError(this.fieldName)

    if (typeof this.value !== 'string') return new InvalidFieldError(`The field [${this.fieldName}] must be a string.`)
  }
}
