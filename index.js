import express from 'express';
console.log('hola mundo v3');

//1- Configurar un puerto
// puedo compilar el index.js de manera constante usando node --watch en forma experimental
const app = express();
//Crear una variable con express
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => {
  console.log('Estoy en el puerto ' + app.get('port'));
});

//2- Configurar los middleware del proyecto

//3- Configurar las rutas
