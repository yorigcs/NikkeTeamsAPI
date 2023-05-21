import { MinLenghtFieldError } from '@/application/errors'
import { type Validator } from '@/application/validations'

export class MinStringLengthValidator implements Validator {
  constructor (private readonly field: string, private readonly value: string, private readonly minLength: number) {}

  validate (): Error | undefined {
    if (this.value.length < this.minLength) {
      return new MinLenghtFieldError(this.field, this.minLength)
    }
  }
}
