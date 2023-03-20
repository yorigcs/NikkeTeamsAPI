export const env = {
  port: process.env.PORT ?? 8080,
  tokenSecret: process.env.TOKEN_SECRET ?? 'dev_token'
}
