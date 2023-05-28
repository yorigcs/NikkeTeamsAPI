import { ServerError } from '@/application/errors'
import { type MultipartFile, type MultipartValue } from '@fastify/multipart'
import { type FastifyReply, type FastifyRequest } from 'fastify'

type Adapter = (req: FastifyRequest, reply: FastifyReply) => Promise<void>
type Body = {
  file: MultipartFile
  [key: string]: any
}
export const adaptFastifyMultipart: Adapter = async (req, res) => {
  const { file, ...fields }: Body = req.body as any

  const validFields = Object.fromEntries(
    Object.keys(fields).map((key) => {
      const field = fields[key] as MultipartValue
      if (Array.isArray(field)) return [key, field.map(item => item.value)]
      else return [key, field?.value ?? null]
    })
  )
  req.body = validFields
  try {
    if (file !== undefined) {
      const buffer = await file.toBuffer()
      const mimeType = file.mimetype
      req.locals = { ...req.locals, file: { buffer, mimeType } }
    }
  } catch {
    await res.code(500).send({ error: new ServerError().message })
  }
}
