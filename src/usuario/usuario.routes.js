import { Router } from "express"
import { getUserById, getUsers,   updateUser } from "./usuario.controller.js"
import {updateUserValidator} from "../middlewares/usuario-validator.js"

const router = Router()


/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Obtiene un usuario por su UID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/findUser/:uid", getUserById);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Lista todos los usuarios (requiere token)
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       401:
 *         description: Token inválido o no proporcionado
 *       500:
 *         description: Error en el servidor
 */
router.get("/", getUsers);

/**
 * @swagger
 * /updateUser/{uid}:
 *   patch:
 *     summary: Actualiza la información de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del usuario
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 description: Nuevo correo electrónico
 *                 example: juan@example.com
 *               telefono:
 *                 type: string
 *                 description: Nuevo número de teléfono
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.patch("/updateUser/:uid", updateUserValidator, updateUser);


export default router