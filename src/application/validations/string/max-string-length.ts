import { MaxLenghtFieldError } from '@/application/errors'
import { type Validator } from '@/application/validations'

export class MaxStringLengthValidator implements Validator {
  constructor (private readonly field: string, private readonly value: string, private readonly maxLength: number) {}

  validate (): Error | undefined {
    if (this.value.length >= this.maxLength) {
      return new MaxLenghtFieldError(this.field, this.maxLength)
    }
  }
}
