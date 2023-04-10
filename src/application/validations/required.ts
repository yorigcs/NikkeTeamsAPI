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

export class RequiredArrayValidator extends RequiredValidator {
  constructor (override readonly fieldName: string, override readonly value: string []) {
    super(value, fieldName)
  }

  override validate (): Error | undefined {
    if (super.validate() !== undefined || this.value.length === 0) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}

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
