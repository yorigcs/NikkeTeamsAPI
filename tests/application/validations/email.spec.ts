
class EmailValidator {
  constructor (private readonly email: string) {}
  validate (): undefined {
    return undefined
  }
}
describe('EmailValidator', () => {
  it('should returns undefinded if email is valid', () => {
    const sut = new EmailValidator('any_email')
    const error = sut.validate()
    expect(error).toBeUndefined()
  })
})
