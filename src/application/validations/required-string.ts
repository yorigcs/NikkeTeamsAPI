import { RequiredFieldStringError } from '@/application/errors'
import { Validator } from '@/application/validations'

export class RequiredStringValidator implements Validator {
  constructor (private readonly fieldName: string, private readonly value: string) {}

  validate (): Error | undefined {
    if (this.value === undefined || this.value === null || this.value === '') {
      return new RequiredFieldStringError(this.fieldName)
    }
  }
}
