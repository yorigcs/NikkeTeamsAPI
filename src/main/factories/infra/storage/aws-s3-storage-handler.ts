import { AwsS3FileStorage } from '@/infra/storage'
import { env } from '@/main/config/env'

export const makeAwsS3StorageHandler = (): AwsS3FileStorage => {
  const { accessKey, bucket, region, secret } = env.s3
  return new AwsS3FileStorage(accessKey, secret, bucket, region)
}
