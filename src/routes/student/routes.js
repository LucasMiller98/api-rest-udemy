import { Router } from 'express'
import { StudentController } from '../../controllers/StudentController'
import { loginRequired } from '../../middlewares/loginRequired'

export const router = new Router()

const studentController = new StudentController()

router.get('/list', studentController.index)
router.post('/create', loginRequired, studentController.create)
router.get('/show/:id', studentController.show)
router.put('/update/:id', loginRequired, studentController.update)
router.delete('/delete/:id', loginRequired, studentController.delete)