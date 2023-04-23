import { CompareStringValidator } from '@/application/validations/string'
import { CompareFieldsError } from '@/application/errors'

describe('CompareStringValidator', () => {
  it('should returns a CompareFieldsError if value is empty', () => {
    const sut = new CompareStringValidator('any_field', 'other_field')

    const error = sut.validate()
    expect(error).toEqual(new CompareFieldsError('any_field', 'other_field'))
  })

  it('should returns undefined if fields are equal', () => {
    const sut = new CompareStringValidator('any_field', 'any_field')

    const error = sut.validate()
    expect(error).toBeUndefined()
  })
})
