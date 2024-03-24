import { usuarioModel } from '../database/model/usuarioSchema.js';
import bcrypts from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const expCorreo =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    const { email, password, role } = req.body;
    if (expCorreo.test(email)) {
      const emailValidacion = await usuarioModel.findOne({ email: email });
      if (emailValidacion) {
        res.status(200).json({
          mensaje: 'Este correo ya se encuentra registrado.',
        });
      } else {
        const saltos = await bcrypts.genSalt(8);
        const passEncriptada = await bcrypts.hash(password, saltos);
        const crearUsuario = new usuarioModel({
          email: email,
          password: passEncriptada,
          role: role,
        });
        crearUsuario.save();
        res.status(200).json({
          mensaje: 'Usuario creado correctamente.',
        });
      }
    } else {
      return res.status(400).json({
        mensaje: 'Correo invalido.',
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error interno.',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailValidacion = await usuarioModel.findOne({ email: email });
    if (emailValidacion) {
      const passwordValidacion = await bcrypts.compare(
        password,
        emailValidacion.password
      );
      if (passwordValidacion) {
        res.status(200).json({
          mensaje: emailValidacion,
        });
      } else {
        res.status(404).json({
          mensaje: 'Correo o contraseña incorrectos.',
        });
      }
    } else {
      res.status(404).json({
        mensaje: 'Correo o contraseña incorrectos.',
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error interno.',
    });
  }
};
