import React from "react";
import { NavLink, json, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useforms";
import { Global } from "../../helper/global";
import Swal from 'sweetalert2'


function registrarse() {

  const { form, changed } = useForm({});
  const navigate = useNavigate();


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
        
        <h2 className="Registrarse-title">Hod<span>iee</span></h2>
        
          <form className="Registrarse-form" onSubmit={guardarUsuario}>
            <h2 className="form-title">Registrarse</h2>
            <div className="Registrarse-text">
              <input type="text" placeholder="Nombre" name="nombre" onChange={changed} className="form-input"/>
              <label htmlFor="name" className="form-label">Nombre</label>
            </div>
            <div className="Registrarse-text">
              <input type="text" placeholder="Apellido" name="apellido" onChange={changed} className="form-input" />
              <label htmlFor="name" className="form-label">Apellido</label>
            </div>
            <div className="Registrarse-text">
              <input type="text" placeholder="Usuario" name="usuario" onChange={changed} className="form-input"/>
              <label htmlFor="name" className="form-label">Usuario</label>
            </div>
            <div className="Registrarse-text">
              <input type="text" placeholder="Email" name="email" onChange={changed}className="form-input"  />
              <label htmlFor="name" className="form-label">Email</label>
            </div>
            <div className="Registrarse-text">
              <input type="password" placeholder="Contraseña" name="contraseña" onChange={changed} className="form-input"/>
              <label htmlFor="name" className="form-label">Contraseña</label>
            </div>
            <div className="Registrarse-text">
              <input type="submit" value="Enviar" className="form-btn" />
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