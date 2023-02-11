import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import { resolve } from 'path'
import './src/database'
import { corsOptions } from './utils/cors'

dotenv.config()

import express from 'express'
import { router as homeRoutes } from './src/routes/home/routes'
import { router as photoRoutes } from './src/routes/photos/routes'
import { router as studentRoutes } from './src/routes/student/routes'
import { router as tokenRoutes } from './src/routes/token/routes'
import { router as userRoutes } from './src/routes/user/routes'

class App {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(cors(corsOptions))
    this.app.use(helmet())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(express.static(resolve(__dirname, 'upload')))
  }

  routes() {
    this.app.use('/', homeRoutes)
    this.app.use('/users/', userRoutes)
    this.app.use('/tokens/', tokenRoutes)
    this.app.use('/student/', studentRoutes)
    this.app.use('/photos/', photoRoutes)
  }
}

export default new App().app