
type LoginAccount = (params: { email: string, password: string }) => Promise<boolean>
type Setup = () => LoginAccount

const setupLoginAccount: Setup = () => async params => {
  return true
}
describe('LoginAccountUseCase', () => {
  let sut: LoginAccount

  beforeEach(() => {
    sut = setupLoginAccount()
  })
  it('should returns true when calls sut', async () => {
    const resp = await sut({ email: 'any@mail', password: 'any_password' })
    expect(resp).toBe(true)
  })
})
