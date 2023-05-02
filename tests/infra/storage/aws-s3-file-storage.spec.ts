import { AwsS3FileStorage } from '@/infra/storage'
import { S3 } from '@aws-sdk/client-s3'

jest.mock('@aws-sdk/client-s3')

describe('AwsS3FileStorage', () => {
  let sut: AwsS3FileStorage
  let accessKey: string
  let secret: string
  let fileName: string
  let bucket: string
  let region: string

  beforeAll(() => {
    accessKey = 'any_key'
    secret = 'any_secret'
    bucket = 'any_bucket'
    fileName = 'any_file_name'
    region = 'any_region_name'
  })
  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKey, secret, bucket, region)
  })
  it('should call S3 with correct param configs', async () => {
    expect(sut).toBeDefined()
    expect(S3).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      },
      region
    })
  })

  describe('upload', () => {
    let file: Buffer
    let putObjectSpy: jest.Mock
    beforeAll(() => {
      file = Buffer.from('any_buffer')
      putObjectSpy = jest.fn()
      jest.mocked(S3).mockImplementation(jest.fn().mockImplementation(() => ({ putObject: putObjectSpy })))
    })
    it('should call putObject with correct input', async () => {
      await sut.upload({ file, fileName })

      expect(putObjectSpy).toHaveBeenCalledWith(
        {
          Bucket: bucket,
          Key: fileName,
          Body: file,
          ACL: 'public-read'
        }
      )
      expect(putObjectSpy).toHaveBeenCalledTimes(1)
    })

    it('should return an image url', async () => {
      const imageUrl = await sut.upload({ file, fileName })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/${fileName}`)
    })

    it('should return an encoded image url', async () => {
      fileName = 'any file name'

      const imageUrl = await sut.upload({ file, fileName })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/${encodeURIComponent(fileName)}`)
    })

    it('should throws if putObject throws', async () => {
      const error = new Error('upload_error')
      putObjectSpy.mockRejectedValueOnce(error)

      const promise = sut.upload({ file, fileName })

      await expect(promise).rejects.toThrow(error)
    })
  })
})
