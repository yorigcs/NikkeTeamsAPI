import { MaxStringLengthValidator } from '@/application/validations/string'
import { MaxLenghtFieldError } from '@/application/errors'

describe('MaxStringLengthValidator', () => {
  it('should returns a MaxStringLengthValidator if value is bigger than maxLength', () => {
    const sut = new MaxStringLengthValidator('any_field', 'value-with-more-than-10-characters', 10)

    const error = sut.validate()
    expect(error).toEqual(new MaxLenghtFieldError('any_field', 10))
  })

  it('should returns undefined if value is smaller than maxLength', () => {
    const sut = new MaxStringLengthValidator('any_field', 'small', 10)

    const error = sut.validate()
    expect(error).toBeUndefined()
  })
})
