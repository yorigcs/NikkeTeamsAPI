import { app } from '@/main/config/app'
import prismaConnection from '@/infra/repo/prisma'
import request from 'supertest'

jest.unmock('@/infra/repo/prisma')

describe('Sign-up Routes', () => {
  describe('POST /sign-up', () => {
    beforeEach(async () => {
      await prismaConnection.users.deleteMany()
    })
    it('should return 200 with message "Account created successfully"', async () => {
      const { status, body } = await request(app)
        .post('/api/sign-up').send({ name: 'any_name', email: 'any_mail@mail.com', password: 'any_pass', confirmPassword: 'any_pass' })

      expect(status).toBe(200)
      expect(body).toBe('Account created successfully')
    })
  })
})
