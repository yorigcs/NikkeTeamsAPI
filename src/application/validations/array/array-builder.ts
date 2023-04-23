import { RequiredArrayValidator } from '@/application/validations/array'
import { type Validator } from '@/application/validations/'

export class ArrayBuild {
  private constructor (
    private readonly fieldName: string,
    private readonly value: any [],
    private readonly validators: Validator[] = []) {}

  static of ({ fieldName, value }: { fieldName: string, value: any [] }): ArrayBuild {
    return new ArrayBuild(fieldName, value)
  }

  required (): ArrayBuild {
    this.validators.push(new RequiredArrayValidator(this.fieldName, this.value))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
