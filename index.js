
const express = require('express');
require('dotenv').config();

//crear el servidor de express
const app= express();

//Directorio publico
app.use(express.static('public'))

//Lectura y parseo del codigo
app.use(express.json());

//rutas
app.use('/api/auth',require('./routes/auth'));


//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});