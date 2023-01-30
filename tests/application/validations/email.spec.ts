import { EmailError } from '@/application/errors'

class EmailValidator {
  constructor (private readonly email: string) {}
  validate (): Error | undefined {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!regex.test(this.email)) return new EmailError()
  }
}
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
