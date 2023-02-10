import { Router } from "express";
import { UserController } from '../../controllers/UserController'
import { loginRequired } from '../../middlewares/loginRequired'

export const router = new Router()

const userController = new UserController()

// router.get('/list', userController.index)
// router.get('/show/:id', userController.show)

router.post('/create', userController.create)
router.put('/edit/', loginRequired, userController.update)
router.delete('/delete/', loginRequired, userController.delete)

/**
 * index - list all,
 * store/create - create one user,
 * delete - delete user,
 * show - one user
 * update - one user
 */