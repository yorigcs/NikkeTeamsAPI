import { Validator } from '@/application/validations'
import { EmailError } from '@/application/errors'

export class EmailValidator implements Validator {
  constructor (private readonly email: string) {}
  validate (): Error | undefined {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!regex.test(this.email)) return new EmailError()
  }
}
