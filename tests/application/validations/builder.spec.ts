import { RequiredStringValidator, Validator } from '@/application/validations'

class ValidationBuild {
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

  build (): Validator[] {
    return this.validators
  }
}

describe('ValidationBuild', () => {
  it('should returns a RequiredStringValidator', () => {
    const sut = ValidationBuild.of({ fieldName: 'name', value: 'any_name' }).required().build()
    expect(sut).toEqual([new RequiredStringValidator('name', 'any_name')])
  })
})
