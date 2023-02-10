import { Router } from "express";
import { HomeController } from "../../controllers/HomeController";

export const router = new Router()

const homeController = new HomeController()

router.get('/', homeController.index)