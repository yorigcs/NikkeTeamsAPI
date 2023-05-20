import { Controller } from '@/application/controllers'
import { badRequest, created, type HttpResponse } from '@/application/helpers'
import { type Validator, FieldValidation as Validation } from '@/application/validations'
import { CheckError } from '@/domain/entities/errors'
import { type AddCampaignTeam } from '@/domain/use-cases'

type HttpRequest = {
  userId: string
  file: { buffer: Buffer, mimeType: string }
  nikkes: string[]
  power: string
  stage: string
  stageType: string
}

type Model = { message: string }

export class AddCampaignTeamController extends Controller {
  constructor (private readonly addCapaignTeamService: AddCampaignTeam) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.addCapaignTeamService({ ...httpRequest })
      return created({ message: 'Team uploaded!' })
    } catch (error) {
      if (error instanceof CheckError) return badRequest(error)
      throw error
    }
  }

  override buildValidators ({ userId, power, stage, nikkes, file, stageType }: HttpRequest): Validator[] {
    return [
      ...new Validation('userId').string(userId).required().build(),
      ...new Validation('power').string(power).required().build(),
      ...new Validation('stage').string(stage).required().build(),
      ...new Validation('stageType').string(stageType).required().build(),
      ...new Validation('nikkes').array(nikkes).required().build(),
      ...new Validation('file').image(file).required().allowedExtentions(['png', 'jpeg', 'jpg']).maxSize(6).build()
    ]
  }
}
