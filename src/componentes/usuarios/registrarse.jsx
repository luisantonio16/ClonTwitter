import React from "react";
import { NavLink } from "react-router-dom";

function registrarse () {
  return (
    <>
      <section className="Registrarse">
          <div className="Registrarse-container">
            <div className="Cabeza">
                <h2 className="Registrarse-title">Hodiee</h2>
            </div>
              <form className="Registrarse-form">
                <h2 className="Registrarse-title">Registrarse</h2>
                <div className="Registrarse-text">
                    <input type="text" placeholder="Nombre" name="nombre" />
                </div>
                <div className="Registrarse-text">
                    <input type="text" placeholder="Apellido" name="apellido"  />
                </div>
                <div className="Registrarse-text">
                    <input type="text" placeholder="Usuario" name="usuario"  />
                </div>
                <div className="Registrarse-text">
                    <input type="text" placeholder="Email" name="email"  />
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
                  <NavLink className="btn-ir" to="/login">Inicia Seccion</NavLink>

              </div>
          </div>
     </section>
    </>
  );
}

export default registrarse;