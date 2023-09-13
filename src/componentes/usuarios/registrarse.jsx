import React from "react";
import { NavLink, json, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useforms";
import { Global } from "../../helper/global";
import Swal from 'sweetalert2'
const navigate = useNavigate();

function registrarse() {

  const { form, changed } = useForm({});


  const guardarUsuario = async (e) => {
    e.preventDefault();
    let nuevoUsuario = form

    const respuesta = await fetch(Global.url + "usuarios/registrar", {
      method: "post",
      body: JSON.stringify(nuevoUsuario),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const datos = await respuesta.json();
    Swal.fire(
      'Welcome!',
      'Correct',
      'success'
   )

   setTimeout(()=>{
    navigate("/login")  
}, 1000)
   
   
  }

  return (
    <>
      <section className="Registrarse">
        <div className="Registrarse-container">
          <div className="Cabeza">
            <h2 className="Registrarse-title">Hodiee</h2>
          </div>
          <form className="Registrarse-form" onSubmit={guardarUsuario}>
            <h2 className="Registrarse-title">Registrarse</h2>
            <div className="Registrarse-text">
              <input type="text" placeholder="Nombre" name="nombre" onChange={changed} />
            </div>
            <div className="Registrarse-text">
              <input type="text" placeholder="Apellido" name="apellido" onChange={changed} />
            </div>
            <div className="Registrarse-text">
              <input type="text" placeholder="Usuario" name="usuario" onChange={changed} />
            </div>
            <div className="Registrarse-text">
              <input type="text" placeholder="Email" name="email" onChange={changed} />
            </div>
            <div className="Registrarse-text">
              <input type="password" placeholder="Contraseña" name="contraseña" onChange={changed} />
            </div>
            <div className="Registrarse-text">
              <input type="submit" value="Enviar" />
            </div>
          </form>
          <div className="cuenta">
            <p className="Registrarse-text">Ya tienes una cuenta.?</p>
            <NavLink className="btn-ir" to="/login">Inicia Seccion</NavLink>

          </div>
        </div>
      </section>
    </>
  );
}

export default registrarse;