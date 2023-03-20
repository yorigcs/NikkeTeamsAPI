import { LoadAccountByEmailRepository } from '@/domain/contracts/repo'
import { HasherCompare, TokenGenerator } from '@/domain/contracts/crypto'
import { AcessToken, RefreshToken } from '@/domain/entities'

export type LoginAccount = (params: { email: string, password: string }) => Promise<Output>
type Output = {
  user: { name: string, email: string, picture: string, role: string }
  acessToken: string
  refreshToken: string
} | null
type Setup = (userAccountRepo: LoadAccountByEmailRepository, hashCompare: HasherCompare, tokenGenerator: TokenGenerator) => LoginAccount

export const setupLoginAccount: Setup = (userAccountRepo, hashCompare, tokenGenerator) => async params => {
  const { email, password } = params
  const user = await userAccountRepo.load({ email })
  if (user === null) return null
  const isPasswordValid = await hashCompare.compare({ plainText: password, digest: user.password })
  if (!isPasswordValid) return null
  const acessToken = await tokenGenerator.generate({ key: user.id, expirationInMs: AcessToken.expirationInMs })
  const refreshToken = await tokenGenerator.generate({ key: user.id, expirationInMs: RefreshToken.expirationInMs })

  return {
    user: { name: user.name, email: user.email, picture: user.picture, role: user.roles },
    acessToken,
    refreshToken
  }
}
