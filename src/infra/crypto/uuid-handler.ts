import { UUID } from '@/data/contracts/crypto'
import { v4 } from 'uuid'

export class UUIDHandler implements UUID {
  async generate ({ key }: UUID.Input): Promise<UUID.Output> {
    const uuid = v4()
    return key !== undefined ? `${key}_${uuid}` : uuid
  }
}
