import { CompareStringValidator, EmailValidator, RequiredStringValidator, StringBuild } from '@/application/validations/string'

describe('StringBuild', () => {
  it('should returns a RequiredStringValidator', () => {
    const sut = StringBuild.of({ fieldName: 'any_field_name', value: 'any_value' }).required().build()

    expect(sut).toEqual([new RequiredStringValidator('any_field_name', 'any_value')])
  })

  it('should returns a CompareStringValidator', () => {
    const sut = StringBuild.of({ fieldName: 'any_field_name', value: 'any_value' }).compareTo('another_value').build()

    expect(sut).toEqual([new CompareStringValidator('any_value', 'another_value')])
  })

  it('should returns a EmailValidator', () => {
    const sut = StringBuild.of({ fieldName: 'any_field_name', value: 'any_value' }).email().build()

    expect(sut).toEqual([new EmailValidator('any_value')])
  })
})
