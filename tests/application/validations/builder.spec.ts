import { CompareStringValidator, EmailValidator, RequiredStringValidator, RequiredArrayValidator, ValidationBuild } from '@/application/validations'

describe('ValidationBuild', () => {
  it('should returns a RequiredStringValidator', () => {
    const sut = ValidationBuild.of({ fieldName: 'name', value: 'any_name' }).required().build()
    expect(sut).toEqual([new RequiredStringValidator('name', 'any_name')])
  })

  it('should returns a RequiredArrayValidator', () => {
    const sut = ValidationBuild.of({ fieldName: 'name', value: ['any_value'] }).required().build()
    expect(sut).toEqual([new RequiredArrayValidator('name', ['any_value'])])
  })

  it('should returns a CompareStringValidator', () => {
    const sut = ValidationBuild.of({ fieldName: 'name', value: 'any_name' }).compareTo('another_name').build()
    expect(sut).toEqual([new CompareStringValidator('any_name', 'another_name')])
  })

  it('should returns a EmailValidator', () => {
    const sut = ValidationBuild.of({ fieldName: 'email', value: 'any_email' }).email().build()
    expect(sut).toEqual([new EmailValidator('any_email')])
  })
})
