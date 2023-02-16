import { Controller } from '@/application/controllers'
import { Request, Response } from 'express'

export class ExpressRouter {
  constructor (private readonly controller: Controller) {}
  async adapt (req: Request, res: Response): Promise<void> {
    const { statusCode, data } = await this.controller.handle({ ...req.body })
    statusCode === 200 ? res.status(statusCode).json(data) : res.status(statusCode).json({ error: data.message })
  }
}
