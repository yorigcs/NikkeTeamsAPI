import { ImageBuild, RequiredBufferValidator, AllowedMimeTypes, MaxFileSize } from '@/application/validations/image'

describe('ImageBuild', () => {
  const file = { buffer: Buffer.from('any_buffer'), mimeType: 'image/png' }

  it('should returns a RequiredBufferValidator', () => {
    const sut = ImageBuild.of({ fieldName: 'file', file }).required().build()

    expect(sut).toEqual([new RequiredBufferValidator('file', Buffer.from('any_buffer'))])
  })

  it('should returns validators to file buffer and mimeType', () => {
    const sut = ImageBuild.of({ fieldName: 'file', file }).allowedExtentions(['png']).build()

    expect(sut).toEqual([new AllowedMimeTypes(['png'], file.mimeType)])
  })

  it('should returns validators to file buffer and mimeType', () => {
    const sut = ImageBuild.of({ fieldName: 'file', file }).maxSize(6).build()

    expect(sut).toEqual([new MaxFileSize(6, file.buffer)])
  })
})
