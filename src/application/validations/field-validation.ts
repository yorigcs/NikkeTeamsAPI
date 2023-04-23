import { StringBuild } from '@/application/validations/string'
import { type File, ImageBuild } from '@/application/validations/image'
import { ArrayBuild } from '@/application/validations/array'

export class FieldValidation {
  constructor (private readonly fieldName: string) {}

  string (value: string): StringBuild {
    return StringBuild.of({ fieldName:this.fieldName, value })
  }

  image (file: File): ImageBuild {
    return ImageBuild.of({ fieldName: this.fieldName, file })
  }

  array (value: any []): ArrayBuild {
    return ArrayBuild.of({ fieldName: this.fieldName, value })
  }
}
