import { Router } from 'express';
import {
  listarProductos,
  crearProducto,
  obtenerProducto,
  editarProducto,
  borrarProducto,
} from '../controllers/productos.controllers.js';
import { check } from 'express-validator';
import validacionesProducto from '../helpers/validacionProductos.js';

const router = Router();

router
  .route('/productos')
  .get(listarProductos)
  .post([validacionesProducto], crearProducto);
router
  .route('/productos/:id')
  .get(obtenerProducto)
  .put(editarProducto)
  .delete(borrarProducto);

export default router;
