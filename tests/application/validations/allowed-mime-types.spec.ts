import { AllowedMimeTypes } from '@/application/validations/'
import { InvalidMimeTypeError } from '@/application/errors'

describe('AllowedMimeTypes', () => {
  it('should returns InvalidMimeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })

  it('should returns undefined if mimeType png is valid', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/png')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should returns undefined if mimeType jpg is valid', () => {
    const sut = new AllowedMimeTypes(['jpg'], 'image/jpg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should returns undefined if mimeType jpeg is valid', () => {
    const sut = new AllowedMimeTypes(['jpeg'], 'image/jpeg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
