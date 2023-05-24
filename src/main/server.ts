import './config/modules-alias'
import { env } from '@/main/config/env'
import { app } from '@/main/config/app'

export const executeServer = async (): Promise<void> => {
  await app.listen({ port: env.port })
  process.on('SIGTERM', () => {
    app.close(() => process.exit())
  })
}
