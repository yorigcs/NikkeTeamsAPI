import { RequiredBufferValidator } from '@/application/validations/image'
import { RequiredValidator } from '@/application/validations/'
import { RequiredFieldError } from '@/application/errors'

describe('RequiredBufferValidator', () => {
  it('should be instance of RequiredFieldError', () => {
    const sut = new RequiredBufferValidator('any_fieldname', Buffer.from('any_buffer'))

    expect(sut).toBeInstanceOf(RequiredValidator)
  })
  it('should returns RequiredFieldError if value length is zero', () => {
    const sut = new RequiredBufferValidator('any_fieldname', Buffer.from(''))

    const error = sut.validate()
    expect(error).toEqual(new RequiredFieldError('any_fieldname'))
  })

  it('should returns undefined if buffer is a valid value', () => {
    const sut = new RequiredBufferValidator('any_fieldname', Buffer.from('any_buffer'))

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
