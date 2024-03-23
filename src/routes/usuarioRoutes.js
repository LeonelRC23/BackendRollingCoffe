import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/usuarioControllers.js';

export const routerUsuario = router
  .post('/login', login)
  .post('/register', register);
