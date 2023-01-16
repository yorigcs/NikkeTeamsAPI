import { PrismaClient } from '@prisma/client'
import prismaConnection from '@/infra/repo/prisma'

jest.unmock('@/infra/repo/prisma')
describe('prismaConnection', () => {
  it('should be instance of PrismaClient', () => {
    expect(prismaConnection).toBeInstanceOf(PrismaClient)
  })
})
