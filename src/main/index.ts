import './config/modules-alias'

import { env } from '@/main/config/env'
import { app } from '@/main/config/app'

import 'reflect-metadata'

app.listen(env.port, () => console.log(`Server running at port ${env.port}`))
