import { app } from '@/main/config/app'
import prismaConnection from '@/infra/repo/prisma'
import request from 'supertest'

jest.unmock('@/infra/repo/prisma')

describe('campaign-team Routes', () => {
  const accountData = { name: 'any_name', email: 'any_mail@mail.com', password: 'any_pass', confirmPassword: 'any_pass' }
  let acessTokenResp: string

  beforeAll(async () => {
    await app.ready()
    await request(app.server).post('/api/sign-up').send(accountData)
    const { header } = await request(app.server).post('/api/sign-in').send({ email: accountData.email, password: accountData.password })
    const [acessToken] = header['set-cookie']
    acessTokenResp = acessToken.split(';')[0]
    await prismaConnection.campaignTeamStages.create({ data: { stage: '1-10' } })
  })

  afterAll(async () => {
    await prismaConnection.users.deleteMany()
    await prismaConnection.campaignTeamStages.deleteMany()
  })

  describe('POST /campaign-upload', () => {
    const fields = { power: '123', stage: '1-10', nikkes: ['nikke1', 'nikke2'], stageType: 'normal' }
    const onePixelImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYMj+/x8ABEMCahdmb9sAAAAASUVORK5CYII='
    const file = Buffer.from(onePixelImage, 'base64')

    afterAll(async () => { await prismaConnection.campaignTeam.deleteMany() })

    it('should response with status 400 and body error  with message "The field power is required"', async () => {
      const { status, body } = await request(app.server).post('/api/campaign-upload').set('Cookie', [acessTokenResp])
        .field('any', 'any')

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'The field power is required' })
    })

    it('should response with status 400 and body error  with message "The field stage is required"', async () => {
      const { status, body } = await request(app.server).post('/api/campaign-upload').set('Cookie', [acessTokenResp])
        .field('power', fields.power)

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'The field stage is required' })
    })

    it('should response with status 400 and body error  with message "The field nikkes is required"', async () => {
      const { status, body } = await request(app.server).post('/api/campaign-upload').set('Cookie', [acessTokenResp])
        .field('power', fields.power)
        .field('stage', fields.stage)
        .field('stageType', fields.stageType)

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'The field nikkes is required' })
    })

    it('should response with status 400 and body error  with message "The field [nikkes] must be an array."', async () => {
      const { status, body } = await request(app.server).post('/api/campaign-upload').set('Cookie', [acessTokenResp])
        .field('power', fields.power)
        .field('stage', fields.stage)
        .field('nikkes', 'nikke')
        .field('stageType', fields.stageType)

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'The field [nikkes] must be an array.' })
    })

    it('should response with status 400 and body error  with message "The field file is required"', async () => {
      const { status, body } = await request(app.server).post('/api/campaign-upload').set('Cookie', [acessTokenResp])
        .field('power', fields.power)
        .field('stage', fields.stage)
        .field('nikkes', fields.nikkes)
        .field('stageType', fields.stageType)

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'The field file is required' })
    })

    it('should response with status 400 and body error  with message "Unsupported file. Allowed extensions: png, jpeg, jpg"', async () => {
      const { status, body } = await request(app.server).post('/api/campaign-upload').set('Cookie', [acessTokenResp])
        .field('power', fields.power)
        .field('stage', fields.stage)
        .field('nikkes', fields.nikkes)
        .field('stageType', fields.stageType)
        .attach('file', file, { filename: 'test.ext' })

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'Unsupported file. Allowed extensions: png, jpeg, jpg' })
    })

    it('should response with status 400 and body error with message "The field [notes] must have at least 10 characters"', async () => {
      const { status, body } = await request(app.server).post('/api/campaign-upload').set('Cookie', [acessTokenResp])
        .field('power', fields.power)
        .field('stage', fields.stage)
        .field('nikkes', fields.nikkes)
        .field('stageType', fields.stageType)
        .field('notes', 'small')
        .attach('file', file, { filename: 'test.png' })

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'The field [notes] must have at least 10 characters' })
    })

    it('should response with status 400 and body error with message "The field [notes] must have at least 10 characters"', async () => {
      const { status, body } = await request(app.server).post('/api/campaign-upload').set('Cookie', [acessTokenResp])
        .field('power', fields.power)
        .field('stage', fields.stage)
        .field('nikkes', fields.nikkes)
        .field('stageType', fields.stageType)
        .field('notes', 'A string reallly big!!,A string reallly big!!,A string reallly big!!,A string reallly big!!,A string reallly big!!A string reallly big!!,A string reallly big!!,A string reallly big!!,A string reallly big!!'
        )
        .attach('file', file, { filename: 'test.png' })

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'The field [notes] must have less than 200 characters' })
    })

    it('should response with status 201 and body with message "Team uploaded!"', async () => {
      const onePixelImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYMj+/x8ABEMCahdmb9sAAAAASUVORK5CYII='
      const file = Buffer.from(onePixelImage, 'base64')
      const { status, body } = await request(app.server).post('/api/campaign-upload').set('Cookie', [acessTokenResp])
        .field('power', fields.power)
        .field('stage', fields.stage)
        .field('nikkes', fields.nikkes)
        .field('stageType', fields.stageType)
        .attach('file', file, { filename: 'test.png' })

      expect(status).toBe(201)
      expect(body).toEqual({ message: 'Team uploaded!' })
    })
  })
})
