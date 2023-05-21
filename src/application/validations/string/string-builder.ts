
import { type Validator } from '@/application/validations'
import { CompareStringValidator, EmailValidator, MaxStringLengthValidator, MinStringLengthValidator } from '@/application/validations/string'
import { RequiredStringValidator } from './required-string'

export class StringBuild {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ value, fieldName }: { value: string, fieldName: string }): StringBuild {
    return new StringBuild(value, fieldName)
  }

  required (): StringBuild {
    this.validators.push(new RequiredStringValidator(this.fieldName, this.value))
    return this
  }

  compareTo (valueToCompare: string): StringBuild {
    this.validators.push(new CompareStringValidator(this.value, valueToCompare))
    return this
  }

  email (): StringBuild {
    this.validators.push(new EmailValidator(this.value))
    return this
  }

  min (minLength: number): StringBuild {
    this.validators.push(new MinStringLengthValidator(this.fieldName, this.value, minLength))
    return this
  }

  max (maxLength: number): StringBuild {
    this.validators.push(new MaxStringLengthValidator(this.fieldName, this.value, maxLength))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
