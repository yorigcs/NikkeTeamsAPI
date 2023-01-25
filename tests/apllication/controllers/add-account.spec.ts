class AddAccountController {
  async handle (httpRequest: any): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'password', 'confirmPassword']
    for (const field of requiredFields) {
      if (httpRequest[field] === undefined) {
        return {
          statusCode: 422,
          body: { error: new Error(`The field ${field} is required`) }
        }
      }
    }
    return {
      statusCode: 200,
      body: 'Account created successfully'
    }
  }
}

type HttpResponse = {
  statusCode: number
  body: any
}

describe('AddAccountController', () => {
  let httpRequest: any
  let sut: AddAccountController

  beforeEach(() => {
    httpRequest = { name: 'any_name', email: 'any_email', password: 'any_password', confirmPassword: 'any_password' }
    sut = new AddAccountController()
  })
  it('should returns status code 422 if no name is provided', async () => {
    httpRequest.name = undefined
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 422, body: { error: new Error('The field name is required') } })
  })

  it('should returns status code 422 if no name email provided', async () => {
    httpRequest.email = undefined
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 422, body: { error: new Error('The field email is required') } })
  })
})
