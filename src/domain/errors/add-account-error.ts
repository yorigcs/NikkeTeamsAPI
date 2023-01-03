export class AddAccoutError extends Error {
  constructor () {
    super('Houve um problema ao criar uma nova conta!')
    this.name = 'AddAccoutError'
  }
}
