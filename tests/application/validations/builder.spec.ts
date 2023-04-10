import { CompareStringValidator, EmailValidator, RequiredStringValidator, RequiredArrayValidator, ValidationBuild, RequiredBufferValidator, AllowedMimeTypes, MaxFileSize } from '@/application/validations'

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

  it('should returns validators to file buffer and mimeType', () => {
    const file = { buffer: Buffer.from('any_buffer'), mimeType: 'image/png' }

    const sut = ValidationBuild.of({ fieldName: 'file', value: file }).required().image({ allowed: ['png'], maxSizeInMb: 6 }).build()

    expect(sut).toEqual([
      new RequiredBufferValidator('file', file.buffer),
      new AllowedMimeTypes(['png'], file.mimeType),
      new MaxFileSize(6, file.buffer)
    ])
  })

  it('should returns a RequiredBufferValidator', () => {
    const sut = ValidationBuild.of({ fieldName: 'file', value: { buffer: Buffer.from('any_buffer') } }).required().build()

    expect(sut).toEqual([new RequiredBufferValidator('file', Buffer.from('any_buffer'))])
  })
})
