import { CompareStringValidator, EmailValidator, RequiredStringValidator, type Validator } from '@/application/validations'

export class ValidationBuild {
  private constructor (
    private readonly fieldName: string,
    private readonly value: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (input: { fieldName: string, value: string }): ValidationBuild {
    return new ValidationBuild(input.fieldName, input.value)
  }

  required (): ValidationBuild {
    this.validators.push(new RequiredStringValidator(this.fieldName, this.value))
    return this
  }

  compareTo (valueToCompare: string): ValidationBuild {
    this.validators.push(new CompareStringValidator(this.value, valueToCompare))
    return this
  }

  email (): ValidationBuild {
    this.validators.push(new EmailValidator(this.value))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
