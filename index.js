import express from 'express';
import cors from 'cors';
import 'dotenv/config'; //Permite procesar variables de entorno
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import productosRouter from './src/routes/productos.routes.js';
import './src/database/database.js';

//1- Configurar un puerto
// puedo compilar el index.js de manera constante usando node --watch en forma experimental

const app = express();

//Crear una variable con express

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => {
  console.log('Estoy en el puerto ' + app.get('port'));
});

//2- Configurar los middleware del proyecto

app.use(cors()); //Permite conexiones remotas
app.use(morgan('dev')); //Nos da informacion extra en la terminal
app.use(express.json()); //Permite interpretar datos en formato json
app.use(express.urlencoded({ extended: true })); //Ayuda a interpretar los datos del body del request

//Falta configurar index.html

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/public')));
// console.log(path.join(__dirname, '/public'));
// console.log(__filename);
// console.log(__dirname);

//3- Configurar las rutas

//http://localhost:4001/api/nuevo
app.use('/api', productosRouter);

// app.get('/nuevo', (req, res) => {
//   console.log('Alguien solicito algo xd');
//   //Falta configurar la respuesta
//   res.send('Respuesta desde nuestro backend de rollingCoffe');
// });
