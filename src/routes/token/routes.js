import { Router } from 'express'
import { TokenController } from '../../controllers/TokenController'

export const router = new Router()

const tokenController = new TokenController()

router.post('/create', tokenController.create)