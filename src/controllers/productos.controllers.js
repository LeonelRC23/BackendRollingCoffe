import Producto from '../database/model/producto.js';

export const listarProductos = (req, res) => {
  console.log('Desde listar productos');
  res.send('Enviar lista de productos...');
};
