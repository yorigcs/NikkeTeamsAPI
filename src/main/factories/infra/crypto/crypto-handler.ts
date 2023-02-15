import { CryptoHandler } from '@/infra/crypto'

export const makeCryptoHandler = (): CryptoHandler => {
  return new CryptoHandler()
}
