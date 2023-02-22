import { app } from '@/main/config/app'
import prismaConnection from '@/infra/repo/prisma'
import request from 'supertest'

jest.unmock('@/infra/repo/prisma')

type HttpRequestData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}
describe('Sign-up Routes', () => {
  describe('POST /sign-up', () => {
    let httpRequestData: HttpRequestData
    beforeAll(() => { httpRequestData = { name: 'any_name', email: 'any_mail@mail.com', password: 'any_pass', confirmPassword: 'any_pass' } })
    beforeEach(async () => { await prismaConnection.users.deleteMany() })

    it('should response with status 200 and body with message "Account created successfully"', async () => {
      const { status, body } = await request(app)
        .post('/api/sign-up')
        .send(httpRequestData)

      expect(status).toBe(200)
      expect(body).toBe('Account created successfully')
    })

    it('should response with status 409 and body error  with message "This account already exists"', async () => {
      await prismaConnection.users.create({ data: { id: '1', name: 'any_name', email: 'any_mail@mail.com', password: 'any_pass', picture: 'any_picture' } })
      const { status, body } = await request(app)
        .post('/api/sign-up')
        .send(httpRequestData)

      expect(status).toBe(409)
      expect(body.error).toBe('This account already exists')
    })
  })
})
