import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

import prisma from '@/infra/repo/prisma'

jest.mock('@/infra/repo/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
