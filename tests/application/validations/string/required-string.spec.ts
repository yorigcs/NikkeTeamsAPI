import { RequiredStringValidator } from '@/application/validations/string'
import { RequiredValidator } from '@/application/validations/'
import { InvalidFieldError, RequiredFieldError } from '@/application/errors'

describe('RequiredStringValidator', () => {
  it('should be instance of RequiredFieldError', () => {
    const sut = new RequiredStringValidator('any_fieldname', 'any_value')

    expect(sut).toBeInstanceOf(RequiredValidator)
  })

  it('should returns RequiredFieldError if value is undefined', () => {
    const sut = new RequiredStringValidator('any_fieldname', undefined as any)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_fieldname'))
  })

  it('should returns InvalidFieldError if value is not a string', () => {
    const sut = new RequiredStringValidator('any_fieldname', 123 as any)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('The field [any_fieldname] must be a string.'))
  })
})
