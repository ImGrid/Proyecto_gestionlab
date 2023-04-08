const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const verificacion = express.Router();

verificacion.use((req, res, next) => {
  const token = req.cookies.token || req.headers['x-access-token'] || req.headers.authorization;
  
  if (!token) {
    res.status(401).send({
      error: 'es necesario un token de autentificacion',
    });
    return;
  }
  
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  
  if (token) {
    jwt.verify(token, app.get('key'), (error, decoded) => {
      if (error) {
        return res.json({
          mensaje: 'token no valido',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});
  
app.get('/info', verificacion, (req, res) => {
  res.json('INFORMACION TRANSFERIDA');
});