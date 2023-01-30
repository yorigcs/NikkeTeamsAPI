export class EmailError extends Error {
  constructor () {
    super('This e-mail is not valid!')
    this.name = 'EmailError'
  }
}
