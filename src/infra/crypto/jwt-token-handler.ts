import { type TokenGenerator, type TokenValidator } from '@/domain/contracts/crypto'
import { sign, verify, type JwtPayload } from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGenerator, TokenValidator {
  constructor (private readonly secret: string) {}

  async generate ({ key, expirationInMs }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    const expiresInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expiresInSeconds })
  }

  async validate ({ token }: TokenValidator.Input): Promise<string> {
    const payload = verify(token, this.secret) as JwtPayload
    return payload.key
  }
}
