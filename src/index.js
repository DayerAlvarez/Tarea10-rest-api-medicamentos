import app from './app.js'

//Tenemos un script que permite ejecutar el server:
//npm run dev
app.listen(3000, () => {
  console.log('Iniciando en http://localhost:3000');
});
