import { type Extension, AllowedMimeTypes, MaxFileSize, RequiredBufferValidator } from '@/application/validations/image'
import { type Validator } from '@/application/validations/'

export type File = { buffer: Buffer, mimeType: string }

export class ImageBuild {
  private constructor (
    private readonly fieldName: string,
    private readonly file: File,
    private readonly validators: Validator[] = []) {}

  static of ({ fieldName, file }: { fieldName: string, file: File }): ImageBuild {
    return new ImageBuild(fieldName, file)
  }

  required (): ImageBuild {
    this.validators.push(new RequiredBufferValidator(this.fieldName, this.file?.buffer))
    return this
  }

  allowedExtentions (allowed: Extension[]): ImageBuild {
    this.validators.push(new AllowedMimeTypes(allowed, this.file?.mimeType))
    return this
  }

  maxSize (maxSizeInMb: number): ImageBuild {
    this.validators.push(new MaxFileSize(maxSizeInMb, this.file?.buffer))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
