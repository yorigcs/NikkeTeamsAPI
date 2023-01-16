import { PrismaClient } from '@prisma/client'
import prismaConnection from '@/infra/repo/helpers/prisma'

describe('prismaConnection', () => {
  it('should be instance of PrismaClient', () => {
    expect(prismaConnection).toBeInstanceOf(PrismaClient)
  })
})
