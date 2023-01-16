import { LoadAccountByEmailRepository } from '@/data/contracts/repo'
import prismaConnection from '@/infra/repo/helpers/prisma'

export class UserAccountRepository implements LoadAccountByEmailRepository {
  async load ({ email }: LoadAccountByEmailRepository.Input): Promise<LoadAccountByEmailRepository.Output> {
    return await prismaConnection.users.findUnique({ where: { email } }) !== null
  }
}
