import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu } from './Menu';
import Swal from 'sweetalert2';


export const Login = () => {
  const [miLogin, setMiLogin] = useState(false);
  const [usu, setUsu] = useState('');
  const [pas, setPas] = useState('');

  function iniciarSesion(e) {
    e.preventDefault();
    var txtusu = document.getElementById('txtusu').value;
    var txtpas = document.getElementById('txtpas').value;
    if (txtusu.length === 0 || txtpas.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Complete Los Datos Faltantes!!'
      });
    } else {
      axios
        .post('http://localhost:3000/login', { user: usu, password: pas })
        .then((response) => {
          setMiLogin(true);
          localStorage.setItem('miLogin', true);
          localStorage.setItem('usu', usu);
          document.getElementById('form_login').style.display = 'none';
        })
        .catch((error) => {
          console.error(error);
          setMiLogin(false);
          if (error.response && error.response.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Usuario y/o Contraseña Incorrectos!!'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Usuario y/o Contraseña Incorrectos!!'
            });
          }
          document.getElementById('txtusu').value = '';
          document.getElementById('txtpas').value = '';
          document.getElementById('txtusu').focus();
        });
    }
  }
  

  useEffect(() => {
    const sesion = localStorage.getItem('miLogin');
    if (sesion) {
      setMiLogin(JSON.parse(sesion));
      setUsu(localStorage.getItem('usu'));
    }
  }, []);

  return (
    <div className="container" style={{ background: 'lightgray', marginTop: 20, padding: 20 }}>
      {!miLogin ? (
        <form id="form_login">
          <div>
            <h1 style={{ color: 'blue', textAlign: 'center' }}>LOGIN</h1>
            <label htmlFor="txtusu">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              id="txtusu"
              style={{ textAlign: 'center' }}
              className="form-control"
              onChange={(e) => setUsu(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="txtpas">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="txtpas"
              style={{ textAlign: 'center' }}
              className="form-control"
              onChange={(e) => setPas(e.target.value)}
              required
            />
          </div>
          <br />
          <input type="submit" className="btn btn-primary" value="Login" onClick={iniciarSesion} />
        </form>
      ) : (
        <Menu usu={usu} />
      )}
    </div>
  );
};
