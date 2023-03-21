import { type LoadAccountByEmailRepository } from '@/domain/contracts/repo'
import { type HasherCompare, type TokenGenerator } from '@/domain/contracts/crypto'
import { AcessToken, RefreshToken } from '@/domain/entities'

type Input = { email: string, password: string }
type UserPartial = { name: string, email: string, picture: string, role: string }
export type Output = { user: UserPartial, acessToken: string, refreshToken: string } | null
export type LoginAccount = (input: Input) => Promise<Output>
type Setup = (userAccountRepo: LoadAccountByEmailRepository, hashCompare: HasherCompare, tokenGenerator: TokenGenerator) => LoginAccount

export const setupLoginAccount: Setup = (userAccountRepo, hashCompare, tokenGenerator) => async input => {
  const { email, password } = input
  const user = await userAccountRepo.load({ email })
  if (user === null) return null
  const isPasswordValid = await hashCompare.compare({ plainText: password, digest: user.password })
  if (!isPasswordValid) return null
  const { id, name, picture, roles } = user
  const acessToken = await tokenGenerator.generate({ key: id, expirationInMs: AcessToken.expirationInMs })
  const refreshToken = await tokenGenerator.generate({ key: id, expirationInMs: RefreshToken.expirationInMs })
  return {
    user: { name, email, picture, role: roles },
    acessToken,
    refreshToken
  }
}
