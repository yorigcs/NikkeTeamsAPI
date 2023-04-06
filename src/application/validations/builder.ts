import { CompareStringValidator, EmailValidator, RequiredStringValidator, RequiredArrayValidator, type Validator } from '@/application/validations'

export class ValidationBuild {
  private constructor (
    private readonly fieldName: string,
    private readonly value: string,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ fieldName, value }: { fieldName: string, value: any }): ValidationBuild {
    return new ValidationBuild(fieldName, value)
  }

  required (): ValidationBuild {
    if (typeof this.value === 'string') {
      this.validators.push(new RequiredStringValidator(this.fieldName, this.value))
    } else if (Array.isArray(this.value)) {
      this.validators.push(new RequiredArrayValidator(this.fieldName, this.value))
    }
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
