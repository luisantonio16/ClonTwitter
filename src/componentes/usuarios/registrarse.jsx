import React from "react";


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
                    <input type="text" placeholder="Usuario" />

                </div>
                <div className="Registrarse-text">
                    <input type="text" placeholder="Contraseña" />
                </div>
                <div className="Registrarse-text">
                    <input type="submit" value="Enviar" />
                </div>
              </form>
          </div>
     </section>
    </>
  );
}

export default registrarse;