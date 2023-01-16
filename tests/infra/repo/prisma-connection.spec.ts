import { PrismaClient } from '@prisma/client'
import { prismaConnection } from '@/infra/repo/prisma/prisma-connection'

describe('prismaConnection', () => {
  it('should be instance of PrismaClient', () => {
    expect(prismaConnection).toBeInstanceOf(PrismaClient)
  })
})
