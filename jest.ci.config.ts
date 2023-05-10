import config from './jest.config'

export default {
  ...config,
  setupFiles: ['dotenv/config'],
  testMatch: ['**/*.test.ts','**/*.spec.ts']
}
