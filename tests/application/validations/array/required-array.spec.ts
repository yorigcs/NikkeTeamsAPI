import { RequiredArrayValidator } from '@/application/validations/array'
import { RequiredValidator } from '@/application/validations/'
import { RequiredFieldError } from '@/application/errors'

describe('RequiredArrayValidator', () => {
  it('should be instance of RequiredFieldError', () => {
    const sut = new RequiredArrayValidator('any_fieldname', ['any_value'])

    expect(sut).toBeInstanceOf(RequiredValidator)
  })

  it('should returns RequiredFieldError if value length is zero', () => {
    const sut = new RequiredArrayValidator('any_fieldname', [])

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_fieldname'))
  })
})
