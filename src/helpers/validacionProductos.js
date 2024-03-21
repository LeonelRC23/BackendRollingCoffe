import { check } from 'express-validator';
import resultadoValidacion from './resultadoValidacion.js';

const validacionesProducto = [
  check('nombreProducto')
    .notEmpty()
    .withMessage('El nombre del producto es un dato obligatorio')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre del producto debe tener entre 2 y 50 catacteres'),
  check('precio')
    .notEmpty()
    .withMessage('El precio es un dato obligatorio')
    .isNumeric()
    .withMessage('El precio debe ser un numero')
    .custom((value) => {
      if (value >= 50 && value <= 10000) {
        return true;
      } else {
        throw new Error('El precio debe estar entre $50 y $10000');
      }
    }),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesProducto;
