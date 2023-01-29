import { CompareFieldsError } from '@/application/errors'
import { Validator } from '@/application/validations'

export class CompareStringValidator implements Validator {
  constructor (private readonly firstString: string, private readonly secondString: string) {}

  validate (): Error | undefined {
    if (this.firstString !== this.secondString) {
      return new CompareFieldsError(this.firstString, this.secondString)
    }
  }
}
