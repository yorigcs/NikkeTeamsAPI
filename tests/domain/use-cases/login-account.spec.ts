import { mock, MockProxy } from 'jest-mock-extended'
import { LoadAccountByEmailRepository } from '@/domain/contracts/repo'
import { HasherCompare } from '@/domain/contracts/crypto'

type LoginAccount = (params: { email: string, password: string }) => Promise<null | undefined>
type Setup = (userAccountRepo: LoadAccountByEmailRepository, hashCompare: HasherCompare) => LoginAccount

const setupLoginAccount: Setup = (userAccountRepo, hashCompare) => async params => {
  const { email, password } = params
  const user = await userAccountRepo.load({ email })
  if (user === null) return null
  const isPasswordValid = await hashCompare.compare({ plainText: password, digest: user.password })
  if (!isPasswordValid) return null
}

describe('LoginAccountUseCase', () => {
  let sut: LoginAccount
  let userAccountRepo: MockProxy<LoadAccountByEmailRepository>
  let hashCompare: MockProxy<HasherCompare>

  beforeAll(() => {
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue({ name: 'any_name', email: 'any_email', password: 'hashed_password', picture: 'any_picture', roles: 'user', id: 'any_id' })
    hashCompare = mock()
    hashCompare.compare.mockResolvedValue(true)
  })
  beforeEach(() => {
    sut = setupLoginAccount(userAccountRepo, hashCompare)
  })
  it('should calls user account load method with email', async () => {
    await sut({ email: 'any@mail', password: 'any_password' })
    expect(userAccountRepo.load).toHaveBeenLastCalledWith({ email: 'any@mail' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should returns null if user is null', async () => {
    userAccountRepo.load.mockResolvedValueOnce(null)
    const resp = await sut({ email: 'any@mail', password: 'any_password' })
    expect(resp).toBe(null)
  })

  it('should calls hasher compare with correct params', async () => {
    await sut({ email: 'any@mail', password: 'any_password' })
    expect(hashCompare.compare).toHaveBeenCalledWith({ plainText: 'any_password', digest: 'hashed_password' })
    expect(hashCompare.compare).toHaveBeenCalledTimes(1)
  })

  it('should returns null if password does not match', async () => {
    hashCompare.compare.mockResolvedValueOnce(false)
    const resp = await sut({ email: 'any@mail', password: 'any_password' })
    expect(resp).toBe(null)
  })
})
