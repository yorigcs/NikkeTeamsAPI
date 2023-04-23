import { EmailError } from '@/application/errors'
import { EmailValidator } from '@/application/validations/string'

describe('EmailValidator', () => {
  it('should returns undefinded if email is valid', () => {
    const sut = new EmailValidator('valid@email.com')
    const error = sut.validate()
    expect(error).toBeUndefined()
  })

  it('should returns EmailError if email is not valid', () => {
    const sut = new EmailValidator('invalid_email')
    const error = sut.validate()
    expect(error).toEqual(new EmailError())
  })
})
