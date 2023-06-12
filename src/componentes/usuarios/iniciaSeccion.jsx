import React from "react";
import { NavLink } from "react-router-dom";


function iniciarSeccion () {
  return (
    <>
    <section className="Registrarse">
          <div className="Registrarse-container">
            <div className="Cabeza">
                <h2 className="Registrarse-title">Hodiee</h2>
            </div>
              <form className="Registrarse-form">
                <h2 className="Registrarse-title">Login</h2>
                <div className="Registrarse-text">
                    <input type="text" placeholder="usuario o correo electronico" name="nombre" />
                </div>

                <div className="Registrarse-text">
                    <input type="password" placeholder="Contraseña" name="contraseña"  />
                </div>
                <div className="Registrarse-text">
                    <input type="submit" value="Enviar" />
                </div>
              </form>
              <div className="cuenta">
                  <p className="Registrarse-text">Ya tienes una cuenta.?</p>
                  <NavLink className="btn-ir" to="/registrarse">Inicia Seccion</NavLink>
              </div>
          </div>
     </section>
    </>
  );
}

export default iniciarSeccion;