import { validationResult } from 'express-validator';

const resultadoValidacion = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.isEmpty());
  //preguntar si ocurrieron errores
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errores: errors.array(),
    });
  }
  //debe continuar con la validacion
  next();
};

export default resultadoValidacion;
