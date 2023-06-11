import React from "react";


function iniciarSeccion () {
  return (
    <>
     <section className="login">
          <div className="login-container">
               <h2 className="login-title">Login</h2>
              <form className="login-form">
                <div className="login-text">
                    <input type="text" placeholder="Usuario" />

                </div>
                <div className="login-text">
                    <input type="text" placeholder="Contraseña" />
                </div>
                <div className="login-text">
                    <input type="submit" value="Enviar" />
                </div>
              </form>
          </div>
     </section>
    </>
  );
}

export default iniciarSeccion;