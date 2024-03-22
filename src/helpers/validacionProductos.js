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
  check('imagen')
    .notEmpty()
    .withMessage('La imagen es un dato obligatorio')
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
    .withMessage(
      'La imagen debe tener un formato de URL valida y terminar en jpg|jpeg|gif|png'
    ),
  check('categoria')
    .notEmpty()
    .withMessage('La categoria es obligatoria')
    .isIn(['Infusiones', 'Batidos', 'dulce', 'salado'])
    .withMessage(
      "La categoria debe ser una de las siguientes opciones: 'Infusiones', 'Batidos', 'dulce', 'salado'"
    ),
    check('descripcionBreve')
    .notEmpty()
    .withMessage('La descripcion del producto es un dato obligatorio')
    .isLength({ min: 5, max: 50 })
    .withMessage('La descripcion debe tener entre 2 y 50 catacteres'),
    check('descripcionAmplia')
    .notEmpty()
    .withMessage('La descripcion del producto es un dato obligatorio')
    .isLength({ min: 2, max: 50 })
    .withMessage('La descripcion del producto debe tener entre 2 y 50 catacteres'),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesProducto;
