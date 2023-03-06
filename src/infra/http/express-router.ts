import { Controller } from '@/application/controllers'
import { RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

const adapterExpressController: Adapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.body })
  const json = [200, 201].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}

export { adapterExpressController }
