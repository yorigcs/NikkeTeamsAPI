import { CompareStringValidator, RequiredStringValidator, ValidationBuild } from '@/application/validations'

describe('ValidationBuild', () => {
  it('should returns a RequiredStringValidator', () => {
    const sut = ValidationBuild.of({ fieldName: 'name', value: 'any_name' }).required().build()
    expect(sut).toEqual([new RequiredStringValidator('name', 'any_name')])
  })

  it('should returns a CompareStringValidator', () => {
    const sut = ValidationBuild.of({ fieldName: 'name', value: 'any_name' }).compareTo('another_name').build()
    expect(sut).toEqual([new CompareStringValidator('any_name', 'another_name')])
  })
})
