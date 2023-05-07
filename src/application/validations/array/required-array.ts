import { InvalidFieldError, RequiredFieldError } from '@/application/errors'
import { RequiredValidator } from '@/application/validations'

export class RequiredArrayValidator extends RequiredValidator {
  constructor (override readonly fieldName: string, override readonly value: any []) {
    super(value, fieldName)
  }

  override validate (): Error | undefined {
    if (super.validate() !== undefined) {
      return new RequiredFieldError(this.fieldName)
    }

    if (!Array.isArray(this.value)) return new InvalidFieldError(`The field [${this.fieldName}] must be an array.`)
  }
}
