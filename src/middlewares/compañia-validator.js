import { body, param  } from "express-validator";
import { compañiaExist } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const registrarCompañiaValidator = [
    validateJWT,
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("impacto").notEmpty().withMessage("El impacto es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("telefono").notEmpty().withMessage("El telefono es requerido"),
    body("direccion").notEmpty().withMessage("La direccion es requerido"),
    body("categoria").notEmpty().withMessage("Lacategoria es requerido"),
    validarCampos,
    handleErrors
]

export const listarCompañiasValidator = [
    validateJWT,
    body("filtro").notEmpty().withMessage("El filtro es requerido"),
    validarCampos,
    handleErrors
]

export const actualizarCompañiaValidator = [
    validateJWT,
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(compañiaExist),
    validarCampos,
    handleErrors
]

