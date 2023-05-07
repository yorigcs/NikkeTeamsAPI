import { RequiredArrayValidator } from '@/application/validations/array'
import { RequiredValidator } from '@/application/validations/'
import { InvalidFieldError, RequiredFieldError } from '@/application/errors'

describe('RequiredArrayValidator', () => {
  it('should be instance of RequiredFieldError', () => {
    const sut = new RequiredArrayValidator('any_fieldname', ['any_value'])

    expect(sut).toBeInstanceOf(RequiredValidator)
  })

  it('should returns RequiredFieldError if value is undefided', () => {
    const sut = new RequiredArrayValidator('any_fieldname', undefined as any)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_fieldname'))
  })

  it('should returns InvalidFieldError if value is not an array', () => {
    const sut = new RequiredArrayValidator('any_fieldname', 123 as any)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('The field [any_fieldname] must be an array.'))
  })
})
