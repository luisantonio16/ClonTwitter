import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "../../hooks/useforms";
import  useAuth  from "../../hooks/useAuth";
import { Global } from "../../helper/global";
import Swal from 'sweetalert2'


function iniciarSeccion () {

  const {form,changed} = useForm({});
  const {setAuth} = useAuth();

  
  const login = async (e) =>{
    e.preventDefault();

    let usuario = form;

    //hacemos la peticion al backend
    const respuesta = await fetch(Global.url+"usuarios/login",{
      method:"POST",
      body:JSON.stringify(usuario),
      headers:{
        'Content-Type':'application/json'
      }
    })

    const alerta =()=>{

    }

    const datos = await respuesta.json();

    if(datos.status == "Succes"){
      //persitimos los datos en el localstorage
          localStorage.setItem('token', datos.token);
          localStorage.setItem('usuario', JSON.stringify(datos.usuario));

          //alerta de que notificacion, para indicar que todo salio bien
          Swal.fire(
             'Welcome!',
             datos.usuario.nombre,
             'success'
          )
           //cargamos el usuario al
            setAuth(datos.usuario);

           //redirecionamos
           setTimeout(()=>{
            window.location.reload();
          }, 1000)

    }else{ 
        Swal.fire(
          'Precaucion',
          'Usuario incorrecto',
          'warning'
        )
    }

    console.log(datos);

  }


  return (
    <>
    <section className="Registrarse">
          <div className="Registrarse-container">
              <div className="Cabeza">
                  <h2 className="Registrarse-title">Hodiee</h2>
              </div>
                <form className="Registrarse-form" onSubmit={login}>
                  <h2 className="Registrarse-title">Login</h2>
                  <div className="Registrarse-text">
                      <input type="text" placeholder="usuario o correo electronico" name="email" onChange={changed}/>
                  </div>

                  <div className="Registrarse-text">
                      <input type="password" placeholder="Contraseña" name="contraseña" onChange={changed}  />
                  </div>
                  <div className="Registrarse-text">
                      <input type="submit" value="Enviar" />
                  </div>
                </form>
                <div className="cuenta-login">
                    <p className="Registrarse-text">Aun no tienes una cuenta.?</p>
                    <NavLink className="btn-ir" to="/registrarse">Registraste aqui</NavLink>
                </div>
          </div>
     </section>
    </>
  );
}

export default iniciarSeccion;