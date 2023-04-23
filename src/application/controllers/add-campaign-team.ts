import { Controller } from '@/application/controllers'
import { created, type HttpResponse } from '@/application/helpers'
import { type Validator, FieldValidation as Validation } from '@/application/validations'
import { type AddCampaignTeam } from '@/domain/use-cases'

type HttpRequest = {
  userId: string
  file: { buffer: Buffer, mimeType: string }
  nikkes: string[]
  power: string
  stage: string
}

type Model = { message: string }

export class AddCampaignTeamController extends Controller {
  constructor (private readonly addCapaignTeamService: AddCampaignTeam) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.addCapaignTeamService({ ...httpRequest })
    return created({ message: 'Team uploaded!' })
  }

  override buildValidators ({ userId, power, stage, nikkes, file }: HttpRequest): Validator[] {
    return [
      ...new Validation('userId').string(userId).required().build(),
      ...new Validation('power').string(power).required().build(),
      ...new Validation('stage').string(stage).required().build(),
      ...new Validation('nikkes').array(nikkes).required().build(),
      ...new Validation('file').image(file).required().allowedExtentions(['png', 'jpeg', 'jpg']).maxSize(6).build()
    ]
  }
}
