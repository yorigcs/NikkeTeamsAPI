import { CompareStringValidator, EmailValidator, RequiredStringValidator, RequiredArrayValidator, type Validator, type Extension, AllowedMimeTypes, MaxFileSize, RequiredBufferValidator } from '@/application/validations'

export class ValidationBuild {
  private constructor (
    private readonly fieldName: string,
    private readonly value: any,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ fieldName, value }: { fieldName: string, value: any }): ValidationBuild {
    return new ValidationBuild(fieldName, value)
  }

  required (): ValidationBuild {
    if (typeof this.value === 'string') {
      this.validators.push(new RequiredStringValidator(this.fieldName, this.value))
    } else if (this.value.buffer !== undefined) {
      this.validators.push(new RequiredBufferValidator(this.fieldName, this.value.buffer))
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

  image ({ allowed, maxSizeInMb }: { allowed: Extension[], maxSizeInMb: number }): ValidationBuild {
    if (this.value.mimeType !== undefined) {
      this.validators.push(new AllowedMimeTypes(allowed, this.value.mimeType))
    }
    if (this.value.buffer !== undefined) {
      this.validators.push(new MaxFileSize(maxSizeInMb, this.value.buffer))
    }
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
