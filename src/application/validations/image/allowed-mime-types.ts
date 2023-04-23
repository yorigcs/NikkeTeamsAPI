import { type Validator } from '@/application/validations'
import { InvalidMimeTypeError } from '@/application/errors'

export type Extension = 'png' | 'jpg' | 'jpeg'

export class AllowedMimeTypes implements Validator {
  constructor (private readonly allowed: Extension[], private readonly mimeType: string) {}

  validate (): Error | undefined {
    if (this.isPng() || this.isJpg() || this.isJpeg()) return
    return new InvalidMimeTypeError(this.allowed)
  }

  private isPng (): boolean {
    return this.allowed.includes('png') && this.mimeType === 'image/png'
  }

  private isJpg (): boolean {
    return this.allowed.includes('jpg') && this.mimeType === 'image/jpg'
  }

  private isJpeg (): boolean {
    return this.allowed.includes('jpeg') && this.mimeType === 'image/jpeg'
  }
}
