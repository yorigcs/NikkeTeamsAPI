class AddAccountController {
  async handle (httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 422,
      body: { error: new Error('The name field is required') }
    }
  }
}

type HttpResponse = {
  statusCode: number
  body: any
}

const data = {
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  confirmPassword: 'any_password'
}

describe('AddAccountController', () => {
  it('should returns status code 422 if no name is provided', async () => {
    const sut = new AddAccountController()
    const httpResponse = await sut.handle(data)
    expect(httpResponse).toEqual({ statusCode: 422, body: { error: new Error('The name field is required') } })
  })
})
