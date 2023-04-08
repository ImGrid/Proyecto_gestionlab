import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

export const Listar = () => {

  const obtenerRegistros = () => {
    var datos = localStorage.getItem("registroslogin");
    if(datos){
      return JSON.parse(datos);
    }else{
      return [];
    }
  }


  const [registroslogin, setRegistrosLogin] = useState(obtenerRegistros());

  const botonEliminar = (miIndex) => {
    Swal.fire({
      title: '¿Está seguro de querer eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var registrosFiltrados = registroslogin.filter((e, index) => {
          return miIndex !== index
        });
        setRegistrosLogin(registrosFiltrados);
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
  }
  
  const botonAsignar = (miIndex) => {
    Swal.fire({
      title: 'Ingrese la cantidad de equipos que desea reservar',
      input: 'number',
      inputPlaceholder: 'Cantidad',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reservar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Ingrese una cantidad válida';
        } else if (parseInt(value) <= 0) {
          return 'Ingrese una cantidad mayor a 0';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        var cantidadReservada = parseInt(result.value);
        var registrosActualizados = registroslogin.map((e, index) => {
          if (miIndex === index) {
            var mal = parseInt(e.mal);
            var total = parseInt(e.total);
            var buen = parseInt(e.buen);
            if (cantidadReservada > buen) {
              Swal.fire({
                icon: 'error',
                title: 'No hay equipos disponibles para los estudiantes',
              });
            } else {
              if (cantidadReservada <= buen) {
                buen = buen - cantidadReservada;
                total = total - cantidadReservada;
                Swal.fire({
                  icon: 'success',
                  title: 'Reservado!',
                  text: 'La cantidad ha sido reservada.',
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'No hay equipos disponibles para los estudiantes',
                });
              }
            }
            return { ...e, mal: mal.toString(), buen: buen.toString(), total: total.toString() };
          } else {
            return e;
          }
        });
        setRegistrosLogin(registrosActualizados);
      } else if (result.isDenied) {
        Swal.fire({
          icon: 'error',
          title: 'Cancelado',
          text: 'La reserva ha sido cancelada.',
        });
      }
    });
  };


  useEffect(() => {
    localStorage.setItem("registroslogin", JSON.stringify(registroslogin))
  }, [registroslogin])



  return (
    

    
    <div className="bg-light" style={{marginTop:20, padding:20}}>

    <div className="h3">
      Listado De Registro De Equipos
    </div>

    <div className="table-responsive">
      
      { registroslogin.length > 0 ? 

      <>
        <table className="table table-bordered table-hover" style={{marginTop:12}}>
            <thead className="text-center" style={{background:"lightgray"}}>
                <tr>
                    <th>#</th>
                    <th>Descripcion</th>
                    <th>En buen estado</th>
                    <th>En mal estado</th>
                    <th>total</th>
                    <th>Eliminar</th>
                    <th>Reservar</th>
                </tr>
            </thead>
            <tbody className="text-center align-baseline">
                {
                  registroslogin.map((x, index) => (
                    <tr key={index}>
                      <th>{ index+1 }</th>
                      <td>{ x.titulo }</td>
                      <td>{ x.buen }</td>
                      <td>{ x.mal }</td>
                      <td>{ x.total }</td>
                      <td className="text-center">
                        <button className="btn btn-outline-danger" onClick={()=>botonEliminar(index)}>
                          <i class="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-success" onClick={()=>botonAsignar(index)}>
                          <i class="bi bi-blockquote-left"></i>
                        </button>
                      </td>
                    </tr>
                    
                  ))
                }
            </tbody>
        </table>
      </> 
      
      : <p className='h5' style={{color:"red"}}>"No Hay Registros Para Listar"</p>
      }
      
    </div>
 
  </div>

  )
}
