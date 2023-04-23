import { RequiredFieldError } from '@/application/errors'
import { RequiredValidator } from '@/application/validations'

export class RequiredBufferValidator extends RequiredValidator {
  constructor (override readonly fieldName: string, override readonly value: Buffer) {
    super(value, fieldName)
  }

  override validate (): Error | undefined {
    if (super.validate() !== undefined || this.value.length === 0) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
