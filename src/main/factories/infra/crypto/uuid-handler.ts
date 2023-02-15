import { UUIDHandler } from '@/infra/crypto'

export const makeUUIDHandler = (): UUIDHandler => {
  return new UUIDHandler()
}
