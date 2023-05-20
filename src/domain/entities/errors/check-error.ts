export class CheckError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'CheckError'
  }
}
