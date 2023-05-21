import { MinStringLengthValidator } from '@/application/validations/string'
import { MinLenghtFieldError } from '@/application/errors'

describe('MinStringLengthValidator', () => {
  it('should returns a MinStringLengthValidator if value is smaller than minLength', () => {
    const sut = new MinStringLengthValidator('any_field', 'small', 10)

    const error = sut.validate()
    expect(error).toEqual(new MinLenghtFieldError('any_field', 10))
  })

  it('should returns undefined if value is bigger than minLength', () => {
    const sut = new MinStringLengthValidator('any_field', 'value-with-more-than-10-characters', 10)

    const error = sut.validate()
    expect(error).toBeUndefined()
  })
})
