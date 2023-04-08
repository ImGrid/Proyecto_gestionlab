import React, { useState, useEffect } from 'react'

export const Registrar = () => {

  const obtenerRegistros = () => {
    var datos = localStorage.getItem("registroslogin");
    if(datos){
      return JSON.parse(datos);
    }else{
      return [];
    }
  }

  const [registroslogin, setRegistrosLogin] = useState(obtenerRegistros());

  const [titulo, setTitulo] = useState("");
  const [buen, setBuenEstado] = useState("");
  const [mal, setMalEstado] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    setTotal(parseInt(buen) + parseInt(mal));
  }, [buen, mal]);

  const botonGuardar = (e) => {
    e.preventDefault();
    var miObjeto = { titulo, buen, mal, total }
    setRegistrosLogin([...registroslogin, miObjeto]);
    limpiarFormulario();
  }

  useEffect(() => {
    localStorage.setItem("registroslogin", JSON.stringify(registroslogin))
  }, [registroslogin] );

  const limpiarFormulario = () => {
    setTitulo("");
    setBuenEstado("");
    setMalEstado("");
    setTotal("");
    document.getElementById("miFormulario").reset();
  }

  return (
    

    <div className="bg-light" style={{marginTop:20, padding:20}}>

    <div className="h3">
      Formulario De Registro De Equipos
      <br/>
      <form id="miFormulario" onSubmit={ botonGuardar } >
        <div className="row" style={{marginTop:20}}>
          <div className="col-12">
            <input className="form-control form-control-lg text-center" type="text" placeholder="Escriba su descripcion"  onChange={(e) => setTitulo(e.target.value)}  required  />
          </div>
        </div>
        
        <div className="row" style={{marginTop:20}}>
          <div className="col-6">
            <input className="form-control form-control-lg text-center" type="number" min="1" max="100000000" placeholder="Ingrese la cantidad en buen estado"  onChange={(e) => setBuenEstado(e.target.value)}  required  />
          </div>
          <div className="col-6">
            <input className="form-control form-control-lg text-center" type="number" min="1" max="100000000" placeholder="Ingrese la cantidad en mal estado"  onChange={(e) => setMalEstado(e.target.value)}  required  />
          </div>
        </div>

      

        <div className="row" style={{marginTop:20}}>
          <div className="col">
            <button className="btn btn-primary btn-lg">Guardar Datos</button>
          </div>
        </div>
      </form>
    </div>
            
  </div>




  )
}
