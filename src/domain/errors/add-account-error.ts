export class AddAccountError extends Error {
  constructor (message?: string) {
    const msg = message ?? 'Houve um problema ao criar uma nova conta!'
    super(msg)
    this.name = 'AddAccoutError'
  }
}
