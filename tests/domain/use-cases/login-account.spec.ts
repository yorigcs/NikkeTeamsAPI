import { mock, MockProxy } from 'jest-mock-extended'
import { LoadAccountByEmailRepository } from '@/domain/contracts/repo'
import { HasherCompare, TokenGenerator } from '@/domain/contracts/crypto'

type LoginAccount = (params: { email: string, password: string }) => Promise<Output>
type Output = {
  user: {
    name: string
    email: string
    picture: string
    role: string
  }
  acessToken: string
  refreshToken: string
} | null
type Setup = (userAccountRepo: LoadAccountByEmailRepository, hashCompare: HasherCompare, tokenGenerator: TokenGenerator) => LoginAccount

const setupLoginAccount: Setup = (userAccountRepo, hashCompare, tokenGenerator) => async params => {
  const { email, password } = params
  const user = await userAccountRepo.load({ email })
  if (user === null) return null
  const isPasswordValid = await hashCompare.compare({ plainText: password, digest: user.password })
  if (!isPasswordValid) return null
  const acessToken = await tokenGenerator.generate({ key: user.id, expirationInMs: 1 * 60 * 60 * 1000 })
  const refreshToken = await tokenGenerator.generate({ key: user.id, expirationInMs: 24 * 60 * 60 * 1000 })

  return {
    user: {
      name: user.name,
      email: user.email,
      picture: user.picture,
      role: user.roles
    },
    acessToken,
    refreshToken
  }
}

describe('LoginAccountUseCase', () => {
  let sut: LoginAccount
  let userAccountRepo: MockProxy<LoadAccountByEmailRepository>
  let hashCompare: MockProxy<HasherCompare>
  let tokenGenerator: MockProxy<TokenGenerator>

  beforeAll(() => {
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue({ name: 'any_name', email: 'any@mail', password: 'hashed_password', picture: 'any_picture', roles: 'user', id: 'any_id' })
    hashCompare = mock()
    hashCompare.compare.mockResolvedValue(true)
    tokenGenerator = mock()
    tokenGenerator.generate.mockResolvedValue('any_token')
  })

  beforeEach(() => {
    sut = setupLoginAccount(userAccountRepo, hashCompare, tokenGenerator)
  })

  it('should calls user account load method with email', async () => {
    await sut({ email: 'any@mail', password: 'any_password' })

    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
    expect(userAccountRepo.load).toHaveBeenLastCalledWith({ email: 'any@mail' })
  })

  it('should returns null if user is null', async () => {
    userAccountRepo.load.mockResolvedValueOnce(null)

    const resp = await sut({ email: 'any@mail', password: 'any_password' })

    expect(resp).toBe(null)
  })

  it('should calls hasher compare with correct params', async () => {
    await sut({ email: 'any@mail', password: 'any_password' })

    expect(hashCompare.compare).toHaveBeenCalledTimes(1)
    expect(hashCompare.compare).toHaveBeenCalledWith({ plainText: 'any_password', digest: 'hashed_password' })
  })

  it('should returns null if password does not match', async () => {
    hashCompare.compare.mockResolvedValueOnce(false)

    const resp = await sut({ email: 'any@mail', password: 'any_password' })

    expect(resp).toBe(null)
  })

  it('should calls token generator with correct values', async () => {
    await sut({ email: 'any@mail', password: 'any_password' })
    expect(tokenGenerator.generate).toHaveBeenCalledTimes(2)
    expect(tokenGenerator.generate).toHaveBeenCalledWith({ key: 'any_id', expirationInMs: 1 * 60 * 60 * 1000 })
    expect(tokenGenerator.generate).toHaveBeenCalledWith({ key: 'any_id', expirationInMs: 24 * 60 * 60 * 1000 })
  })

  it('should returns user with acessToken and refreshToken', async () => {
    const resp = await sut({ email: 'any@mail', password: 'any_password' })
    expect(resp).toEqual({
      user: {
        name: 'any_name',
        email: 'any@mail',
        picture: 'any_picture',
        role: 'user'
      },
      acessToken: 'any_token',
      refreshToken: 'any_token'
    })
  })
})
