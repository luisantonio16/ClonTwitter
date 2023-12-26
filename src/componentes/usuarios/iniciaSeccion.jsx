import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "../../hooks/useforms";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helper/global";
import Swal from 'sweetalert2'


function iniciarSeccion() {

  const { form, changed } = useForm({});
  const { setAuth } = useAuth();
  const [usuario, setUsuario] = useState(false);


  const login = async (e) => {
    e.preventDefault();
   

    let usuario = form;
    let campos = document.querySelectorAll('.form-input');
    
    setUsuario(true);
 
   

    //hacemos la peticion al backend
    const respuesta = await fetch(Global.url + "usuarios/login", {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json'
      }
    })



    const datos = await respuesta.json();

    if (datos.status == "Succes") {
      setUsuario("enviando")

      //persitimos los datos en el localstorage
      localStorage.setItem('token', datos.token);
      localStorage.setItem('usuario', JSON.stringify(datos.usuario));
     
      //cargamos el usuario al
      setAuth(datos.usuario);
      setUsuario(false);

      //redirecionamos
      setTimeout(() => {
        window.location.reload();
      }, 1000)


    } else {
      Swal.fire(
        'Precaucion',
        'Usuario incorrecto',
        'warning'
      )
      setUsuario(false);

    }

    console.log(datos);

  }


  return (
    <>
      <section className="Registrarse">

        {usuario ?
          <>
            <div className="loading show">
              <div className="spin"></div>
              <h2 className="SpinTitle">Cargado...</h2>
            </div>
          </> :
          <div className="Registrarse-container">

              <h2 className="Registrarse-title">Hod<span>iee</span></h2>

            <form className="Registrarse-form" onSubmit={login}>
              <h2 className="form-title">Login</h2>
              <div className="Registrarse-text">
                <input type="text" placeholder="usuario o correo electronico" name="email" onChange={changed} className="form-input"/>
                <label htmlFor="name" className="form-label">usuario o correo electronico</label>
              </div>

              <div className="Registrarse-text">
                <input type="password" placeholder="Contraseña" name="contraseña" onChange={changed} className="form-input" />
                <label htmlFor="name" className="form-label">Contraseña</label>
              </div>

              <div className="Registrarse-text">
                <input type="submit" value='Iniciar Sesión' className="form-btn" />
              </div>
            </form>
            <div className="cuenta-login">
              <p className="Registrarse-text">Aun no tienes una cuenta.?</p>
              <NavLink className="btn-ir" to="/registrarse">Registraste aqui</NavLink>
            </div>
          </div>


        }

      </section>
    </>
  );
}

export default iniciarSeccion;