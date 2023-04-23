import { RequiredFieldError } from '@/application/errors'
import { RequiredValidator } from '@/application/validations'

export class RequiredStringValidator extends RequiredValidator {
  constructor (override readonly fieldName: string, override readonly value: string) {
    super(value, fieldName)
  }

  override validate (): Error | undefined {
    if (super.validate() !== undefined || this.value === '') {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
