import { type UploadFile } from '@/domain/contracts/storage'
import { S3 } from '@aws-sdk/client-s3'

export class AwsS3FileStorage implements UploadFile {
  private readonly s3: S3
  constructor (private readonly accessKey: string, private readonly secret: string, private readonly bucket: string, private readonly region: string) {
    this.s3 = new S3({ credentials: { accessKeyId: this.accessKey, secretAccessKey: this.secret }, region: this.region })
  }

  async upload ({ file, fileName }: UploadFile.Input): Promise<UploadFile.Output> {
    await this.s3.putObject({ Bucket: this.bucket, Key: fileName, Body:file, ACL: 'public-read' })
    return `https://${this.bucket}.s3.amazonaws.com/${encodeURIComponent(fileName)}`
  }
}
