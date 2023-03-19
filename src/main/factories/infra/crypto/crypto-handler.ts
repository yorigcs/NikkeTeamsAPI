import { HashHandler } from '@/infra/crypto'

export const makeHashHandler = (): HashHandler => {
  return new HashHandler()
}
