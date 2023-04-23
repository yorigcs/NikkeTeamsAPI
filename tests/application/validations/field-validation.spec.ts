import { FieldValidation } from '@/application/validations'
import { StringBuild } from '@/application/validations/string'
import { ArrayBuild } from '@/application/validations/array'
import { ImageBuild } from '@/application/validations/image'

describe('FieldValidation', () => {
  it('should returns StringBuild', () => {
    const sut = new FieldValidation('any_field_name').string('any_string')

    expect(sut).toBeInstanceOf(StringBuild)
  })

  it('should returns ImageBuild', () => {
    const file = { buffer: Buffer.from('any_buffer'), mimeType: 'image/png' }
    const sut = new FieldValidation('any_field_name').image(file)

    expect(sut).toBeInstanceOf(ImageBuild)
  })

  it('should returns ArrayBuild', () => {
    const sut = new FieldValidation('any_field_name').array(['any_string'])

    expect(sut).toBeInstanceOf(ArrayBuild)
  })
})
