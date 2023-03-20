import { mock, MockProxy } from 'jest-mock-extended'
import { LoadAccountByEmailRepository } from '../contracts/repo'

type LoginAccount = (params: { email: string, password: string }) => Promise<null | string>
type Setup = (userAccountRepo: LoadAccountByEmailRepository) => LoginAccount

const setupLoginAccount: Setup = (userAccountRepo) => async params => {
  const { email } = params
  const user = await userAccountRepo.load({ email })
  if (user === null) return null
  return `${user.name}`
}
describe('LoginAccountUseCase', () => {
  let sut: LoginAccount
  let userAccountRepo: MockProxy<LoadAccountByEmailRepository>

  beforeAll(() => {
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(null)
  })
  beforeEach(() => {
    sut = setupLoginAccount(userAccountRepo)
  })
  it('should calls user account load method with email', async () => {
    await sut({ email: 'any@mail', password: 'any_password' })
    expect(userAccountRepo.load).toHaveBeenLastCalledWith({ email: 'any@mail' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })
  it('should returns null if user is null', async () => {
    const resp = await sut({ email: 'any@mail', password: 'any_password' })
    expect(resp).toBe(null)
  })
})
