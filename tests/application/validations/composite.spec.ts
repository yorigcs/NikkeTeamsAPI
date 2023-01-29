import { mock } from 'jest-mock-extended'
import { Validator } from '@/application/validations'

class ValidationComposite {
  constructor (private readonly validators: Validator[]) {}
  validate (): undefined {
    return undefined
  }
}

describe('ValidationComposite', () => {
  it('should returns undefined if all validators returns undefined', () => {
    const validator1 = mock<Validator>()
    validator1.validate.mockReturnValue(undefined)
    const validator2 = mock<Validator>()
    validator1.validate.mockReturnValue(undefined)
    const validators: Validator[] = [validator1, validator2]
    const sut = new ValidationComposite(validators)
    const error = sut.validate()
    expect(error).toBeUndefined()
  })
})
