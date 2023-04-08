const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/login-example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conectado a MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.log('Error al conectar con MongoDB', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado de MongoDB');
});

module.exports = {
  connect: () => mongoose.connect('mongodb://localhost/login_db'),
  disconnect: () => mongoose.connection.close(),
};
