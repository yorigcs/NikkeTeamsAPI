import { AwsS3FileStorage } from '@/infra/storage'
import { env } from '@/main/config/env'

describe('Aws S3 integration test', () => {
  let sut: AwsS3FileStorage

  beforeAll(() => {
    sut = new AwsS3FileStorage(env.s3.accessKey, env.s3.secret, env.s3.bucket, env.s3.region)
  })

  it('should upload image to s3', async () => {
    const onePixelImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYMj+/x8ABEMCahdmb9sAAAAASUVORK5CYII='
    const file = Buffer.from(onePixelImage, 'base64')
    const fileName = 'any_name.png'
    const pictureUrl = await sut.upload({ file, fileName })

    expect((await fetch(pictureUrl)).status).toBe(200)
  })
})
