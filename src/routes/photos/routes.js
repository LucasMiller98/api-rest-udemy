import { Router } from 'express'
import { loginRequired } from '../../middlewares/loginRequired'
import { PhotoController } from '../../controllers/PhotoController'

export const router = new Router()

const photoController = new PhotoController()

router.post('/upload', loginRequired, photoController.create)