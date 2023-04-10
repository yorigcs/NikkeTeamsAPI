import { Controller } from '@/application/controllers'
import { created, type HttpResponse } from '@/application/helpers'
import { type Validator, ValidationBuild as Builder } from '@/application/validations'
import { type AddCampaignGuide } from '@/domain/use-cases'

type HttpRequest = {
  userId: string
  file: { buffer: Buffer, mimeType: string }
  nikkes: string[]
  power: string
  stage: string
}

type Model = { message: string }

export class AddCampaignGuideController extends Controller {
  constructor (private readonly addCapaignService: AddCampaignGuide) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.addCapaignService({ ...httpRequest })
    return created({ message: 'Guide uploaded!' })
  }

  override buildValidators ({ userId, power, stage, nikkes, file }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ fieldName: 'userId', value: userId }).required().build(),
      ...Builder.of({ fieldName: 'power', value: power }).required().build(),
      ...Builder.of({ fieldName: 'stage', value: stage }).required().build(),
      ...Builder.of({ fieldName: 'nikkes', value: nikkes }).required().build(),
      ...Builder.of({ fieldName: 'file', value: file }).required().image({ allowed: ['png', 'jpeg', 'jpg'], maxSizeInMb: 6 }).build()
    ]
  }
}
