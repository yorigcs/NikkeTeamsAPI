import { RequiredFieldStringError } from '@/application/errors'

interface Validator {
  validate: () => Error | undefined
}

class RequiredStringValidator implements Validator {
  constructor (private readonly fieldName: string, private readonly value: string) {}

  validate (): Error | undefined {
    return new RequiredFieldStringError(this.fieldName)
  }
}

describe('RequiredStringValidator', () => {
  it('should returns a RequiredFieldStringError if value is empty', () => {
    const sut = new RequiredStringValidator('any_fieldname', '')

    const error = sut.validate()
    expect(error).toEqual(new RequiredFieldStringError('any_fieldname'))
  })

  it('should returns a RequiredFieldStringError if value is undefined', () => {
    const sut = new RequiredStringValidator('any_fieldname', undefined as any)

    const error = sut.validate()
    expect(error).toEqual(new RequiredFieldStringError('any_fieldname'))
  })

  it('should returns a RequiredFieldStringError if value is null', () => {
    const sut = new RequiredStringValidator('any_fieldname', null as any)

    const error = sut.validate()
    expect(error).toEqual(new RequiredFieldStringError('any_fieldname'))
  })
})
