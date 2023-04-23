import { RequiredFieldError } from '@/application/errors'
import { type Validator } from '@/application/validations'

export class RequiredValidator implements Validator {
  constructor (readonly value: any, readonly fieldName?: string) {}

  validate (): Error | undefined {
    if (this.value === undefined || this.value === null) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
