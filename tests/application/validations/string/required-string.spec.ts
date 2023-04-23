import { RequiredStringValidator } from '@/application/validations/string'
import { RequiredValidator } from '@/application/validations/'
import { RequiredFieldError } from '@/application/errors'

describe('RequiredStringValidator', () => {
  it('should be instance of RequiredFieldError', () => {
    const sut = new RequiredStringValidator('any_fieldname', 'any_value')

    expect(sut).toBeInstanceOf(RequiredValidator)
  })

  it('should returns RequiredFieldError if value length is zero', () => {
    const sut = new RequiredStringValidator('any_fieldname', '')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_fieldname'))
  })
})
