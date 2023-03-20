import { Controller } from '@/application/controllers'
import { HttpResponse } from '../helpers'

class LoginAccountController extends Controller {
  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}
describe('LoginAccountController', () => {
  let sut: LoginAccountController
  beforeEach(() => {
    sut = new LoginAccountController()
  })
  it('should extends controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
