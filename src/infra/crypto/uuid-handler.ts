import { Uuid } from '@/data/contracts/crypto'
import { v4 } from 'uuid'

export class UUIDHandler implements Uuid {
  async generate ({ key }: Uuid.Input): Promise<Uuid.Output> {
    const uuid = v4()
    if (typeof uuid === 'string') {
      return `${key}_${uuid}`
    }
    throw new Error()
  }
}
