import { AddAccountService } from '@/data/services'
import { badRequest, conflict, HttpResponse, ok, serverError } from '@/application/helpers'
import { RequiredStringValidator, CompareStringValidator } from '@/application/validations'

type HttpRequest = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type Model = Error | string

export class AddAccountController {
  constructor (private readonly addAccount: AddAccountService) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) return badRequest(error)
      const { name, email, password } = httpRequest

      const result = await this.addAccount.perform({ name, email, password, picture: name[0].toUpperCase() })
      if (!result) return conflict('This account already exists')

      return ok('Account created successfully')
    } catch (error) {
      return serverError(error)
    }
  }

  validate (httpRequest: HttpRequest): Error | undefined {
    for (const field in httpRequest) {
      const error = new RequiredStringValidator(field, httpRequest[field as keyof HttpRequest]).validate()
      if (error !== undefined) return error
    }

    const error = new CompareStringValidator(httpRequest.password, httpRequest.confirmPassword).validate()
    if (error !== undefined) return error
  }
}
