import { CompareStringValidator, EmailValidator, RequiredStringValidator, Validator } from '@/application/validations'

export class ValidationBuild {
  private constructor (
    private readonly fieldName: string,
    private readonly value: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: { fieldName: string, value: string }): ValidationBuild {
    return new ValidationBuild(params.fieldName, params.value)
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
