import { Router } from "express"
import { getUserById, getUsers,   updateUser } from "./usuario.controller.js"
import {updateUserValidator} from "../middlewares/usuario-validator.js"

const router = Router()


router.get("/findUser/:uid", getUserById);

router.get("/", getUsers);

router.patch("/updateUser/:uid", updateUserValidator, updateUser);

export default router