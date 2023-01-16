import { LoadAccountByEmailRepository, SaveAccountRepository } from '@/data/contracts/repo'
import prismaConnection from '@/infra/repo/prisma'

export class UserAccountRepository implements LoadAccountByEmailRepository, SaveAccountRepository {
  async load ({ email }: LoadAccountByEmailRepository.Input): Promise<LoadAccountByEmailRepository.Output> {
    return await prismaConnection.users.findUnique({ where: { email } }) !== null
  }

  async save (input: SaveAccountRepository.Input): Promise<void> {
    await prismaConnection.users.create({ data: input })
  }
}
