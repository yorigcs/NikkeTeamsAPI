import { Controller } from '@/application/controllers'
import { type HttpResponse } from '../helpers'
import { type Validator } from '../validations'

type HttpRequest = {
  userId: string
  file: { buffer: Buffer, mimeType: string }
  nikkes: string[]
  power: string
  stage: string
}
class AddCampaignGuideController extends Controller {
  async perform (httpRequest: any): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return []
  }
}
describe('AddCampaignGuideController', () => {
  let sut: AddCampaignGuideController

  beforeEach(() => {
    sut = new AddCampaignGuideController()
  })
  it('should be instance of Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
