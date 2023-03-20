import { Controller } from '@/application/controllers'
import { LoginAccount } from '@/domain/use-cases'
import { HttpResponse, ok } from '@/application/helpers'

type HttpRequest = { email: string, password: string }
class LoginAccountController extends Controller {
  constructor (private readonly loginAccount: LoginAccount) {
    super()
  }

  async perform ({ email, password }: HttpRequest): Promise<HttpResponse<any>> {
    await this.loginAccount({ email, password })
    return ok('any_data')
  }
}

describe('LoginAccountController', () => {
  const data = {
    user: { name: 'any_name', email: 'any@mail', picture: 'any_picture', role: 'user' },
    acessToken: 'any_token',
    refreshToken: 'any_token'
  }
  let sut: LoginAccountController
  let loginAccount: jest.Mock

  beforeAll(() => {
    loginAccount = jest.fn()
    loginAccount.mockReturnValue(data)
  })
  beforeEach(() => { sut = new LoginAccountController(loginAccount) })

  it('should extends controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should calls loginAccount with correct input', async () => {
    await sut.perform({ email: 'any@mail', password: 'any_password' })
    expect(loginAccount).toHaveBeenCalledTimes(1)
    expect(loginAccount).toHaveBeenCalledWith({ email: 'any@mail', password: 'any_password' })
  })
})
