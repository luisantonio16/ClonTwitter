import React from "react";
import imagen from '../../assets/imagenes/user.png'
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helper/global";


function Perfil(){
    const {auth, contador} = useAuth();

    return(
        <section className="perfil">
            <article className="perfil-usuario">
                <div className="contenedor-perfil">
                    <div className="perfil-imagen">
                        {auth.imagen != "default.png" && <img src={Global.url+"usuarios/avatar/"+auth.imagen} className="nav-imagen-usuario"/>}
                        {auth.imagen == "default.png" && <img src={imagen}className="nav-imagen-usuario"/>}
                        
                    </div>
                    <div className="perfil-datos">
                         <h2 className="perfil-nombre">{auth.nombre}</h2>
                         <h3 className="perfil-nombre-usuario">{auth.usuario}</h3>

                    </div>      
                </div>
            </article>

            <article className="perfil-seguidos">
                <div className="perfil-seguido">
                    <h2 className="">siguiendo</h2>
                    <p>{contador.siguiendo}</p>
                </div>
                <div className="perfil-seguidores">
                    <h2>Seguidores</h2>
                    <p>{contador.seguidores}</p>
                </div>
                <div className="perfil-publicaciones">
                    <h2>Publicaciones</h2>
                    <p>{contador.publicaciones}</p>
                </div>
            </article>

        </section>
    );
}

export default Perfil;