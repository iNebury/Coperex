import { Router } from "express"
import { registrarCompañia , listarCompañias, actualizarCompañia} from "./compañia.controller.js";
import { registrarCompañiaValidator , listarCompañiasValidator, actualizarCompañiaValidator} from "../middlewares/compañia-validator.js";

const router = Router()


/**
 * @swagger
 * /registrarCompania:
 *   post:
 *     summary: Registra una nueva compañía
 *     tags: [Compañías]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la compañía
 *                 example: TechCorp
 *               añosDeTrayectoria:
 *                 type: number
 *                 description: Años de trayectoria de la compañía
 *                 example: 10
 *               impacto:
 *                 type: string
 *                 description: Nivel de impacto de la compañía
 *                 example: Alto
 *               email:
 *                 type: string
 *                 description: Correo electrónico de la compañía
 *                 example: contacto@techcorp.com
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono
 *                 example: "12345678"
 *               direccion:
 *                 type: string
 *                 description: Dirección de la compañía
 *                 example: Calle 10, Zona 1
 *               categoria:
 *                 type: string
 *                 description: Categoría de la compañía
 *                 example: Tecnología
 *               fundacion:
 *                 type: number
 *                 description: Año de fundación
 *                 example: 2005
 *     responses:
 *       201:
 *         description: Compañía registrada exitosamente
 *       401:
 *         description: Token inválido o no proporcionado
 *       500:
 *         description: Error en el servidor
 */
router.post("/registrarCompania", registrarCompañiaValidator, registrarCompañia);

/**
 * @swagger
 * /listarCompania:
 *   get:
 *     summary: Lista las compañías registradas
 *     tags: [Compañías]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filtro
 *         schema:
 *           type: string
 *         description: "Tipo de filtro para la búsqueda (Ejemplo: categoría, añosDeTrayectoria)"
 *       - in: query
 *         name: valor
 *         schema:
 *           type: string
 *         description: "Valor del filtro aplicado"
 *     responses:
 *       200:
 *         description: Lista de compañías obtenida correctamente
 *       401:
 *         description: Token inválido o no proporcionado
 *       404:
 *         description: No se encontraron compañías
 *       500:
 *         description: Error en el servidor
 */
router.get("/listarCompania", listarCompañiasValidator, listarCompañias);




export default router