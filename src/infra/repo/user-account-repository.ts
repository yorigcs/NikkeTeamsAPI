import { LoadAccountByEmailRepository, SaveAccountRepository } from '@/domain/contracts/repo'
import prismaConnection from '@/infra/repo/prisma'

export class UserAccountRepository implements LoadAccountByEmailRepository, SaveAccountRepository {
  async load ({ email }: LoadAccountByEmailRepository.Input): Promise<LoadAccountByEmailRepository.Output> {
    const user = await prismaConnection.users.findUnique({ where: { email } })
    return (user !== undefined && user !== null)
  }

  async save (input: SaveAccountRepository.Input): Promise<void> {
    await prismaConnection.users.create({ data: input })
  }
}
