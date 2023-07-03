import React, { useEffect, useState } from "react";
import imagen from '../../assets/imagenes/user.png'
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helper/global";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useForm } from "../../hooks/useforms";


function Perfil() {

    const token = localStorage.getItem('token')
    const { auth, contador } = useAuth();
    const {form, changed} = useForm();
    const [image, setImage] = useState()

    const guardarPublicacion = async(e)=>{
        e.preventDefault();
       
        //hacemos la peticion AJAX para guardar la publicacion
        const respuesta = await fetch(Global.url+"publicacion/guardar",{
            method:"POST",
            body:JSON.stringify(form),
            headers:{
                'Content-Type':'application/json',
                 Authorization: token
            }
            
        });

        const data = await respuesta.json();

        if(data.status == "Succes"){
          console.log(data);
        }

        //ahora subimos la imagen de la publicacion
            
        const fileInpunt = document.querySelector('#file')

        if(data.status == "Succes" && fileInpunt.files[0]){
            const publicacionId = data.publicacion._id
            console.log(publicacionId);
            const formData = new FormData();
            formData.append('file0', fileInpunt.files[0]);

            // hacemos la peticion ajax para subir la imagen de la publicacion
            const archivo = await fetch(Global.url+"publicacion/subirarchivo/"+publicacionId, {
                method:"post",
                body:formData,
                headers:{
                     Authorization: token
                }
            })

            const dataArchivo = await archivo.json();
            if(dataArchivo || data){
                const myForms = document.querySelector('#form')
                myForms.reset();
            }
        }

    }

    return (
        <>
       
        <section className="perfil">
            <article className="perfil-usuario">
                <div className="contenedor-perfil">
                    <div className="perfil-imagen">
                        {auth.imagen != "default.png" && <img src={Global.url + "usuarios/avatar/" + auth.imagen} className="nav-imagen-usuario" />}
                        {auth.imagen == "default.png" && <img src={imagen} className="nav-imagen-usuario" />}

                    </div>
                    <div className="perfil-datos">
                        <h2 className="perfil-nombre">{auth.nombre}</h2>
                        <h3 className="perfil-nombre-usuario">{auth.usuario}</h3>

                    </div>
                </div>
            </article>

            <article className="perfil-seguidos">
                <div className="perfil-seguido">
                    <Link className="link-perfil" to={"/hodiee/siguiendo/"+auth._id}>
                        <h2 className="">siguiendo</h2>
                        <p>{contador.siguiendo}</p>
                    </Link>

                </div>
                <div className="perfil-seguidores">
                    <Link className="link-perfil" to={"/hodiee/seguidores/"+auth._id}>
                        <h2>Seguidores</h2>
                        <p>{contador.seguidores}</p>
                    </Link>

                </div>
                <div className="perfil-publicaciones">
                    <Link className="link-perfil" to={"/hodiee/publicaciones/"+auth._id}>
                        <h2>Publicaciones</h2>
                        <p>{contador.publicaciones}</p>
                    </Link>
                </div>
            </article>

          

        </section>

        <article className="publicacion">
                <form className="form-publicacion" id="form" onSubmit={guardarPublicacion}>
                    <div className="publicacion-info">
                        <label htmlFor="publicacion-titulo" className="publicacion-titulo">Que Piensas hoy.?</label>
                        <textarea name="texto"  className="publicacion-decs" rows={"4"} onChange={changed}></textarea>
                    </div>
                    <div className="contenido-publicacion">
                        <label htmlFor="publicacion-subtitle">comparte una foto</label>
                        <div className="imagen-publicacion">

                        </div>
                        <input type="file" name="file0" id="file" className="image-publicacion"/>
                    </div>
                    <div className="buttons-publicacion">
                        <input type="submit"  className="button-pub" value="Publicar" />
                    </div>

                </form>
            </article>
        </>
    );
}

export default Perfil;