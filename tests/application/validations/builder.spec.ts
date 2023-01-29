import { RequiredStringValidator, ValidationBuild } from '@/application/validations'

describe('ValidationBuild', () => {
  it('should returns a RequiredStringValidator', () => {
    const sut = ValidationBuild.of({ fieldName: 'name', value: 'any_name' }).required().build()
    expect(sut).toEqual([new RequiredStringValidator('name', 'any_name')])
  })
})
