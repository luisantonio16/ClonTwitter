import React, { useEffect, useState } from "react";
import { Global } from '../../helper/global';
import trash from '../../assets/imagenes/trash50px.png'
import imagen from '../../assets/imagenes/user.png'
import { Link, useParams } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'

export const Publicaciones = () => {

    const params = useParams();
    const token = localStorage.getItem('token');
    const {auth} = useAuth();
    const [publicacion, setPublicacion] = useState([]);
    const [pub, setPub] = useState([]);
    const [page, setpage] = useState(1)
  

    useEffect(() => {
        obtenerPublicacion(1, true);

    }, [])


    const obtenerPublicacion = async (page, newPerfil = false) => {
        const respuesta = await fetch(Global.url + "publicacion/usuario/" + params.id + "/" + page, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })

        const dataPub = await respuesta.json();

        if (dataPub.status == "Succes") {
            let nuevaPub = dataPub.publicaciones.docs;
            setPub(dataPub);
            if (!newPerfil && publicacion.length >= 1) {
                nuevaPub = [...publicacion, ...dataPub.publicaciones.docs]
            }
            if (newPerfil) {
                nuevaPub = dataPub.publicaciones.docs;
            }
            setPublicacion(nuevaPub)

        }
    }

    const siguiente = () => {
        if (pub.publicaciones.totalPages == page) {
            Swal.fire(
                'Informacion',
                'No hay mas Usuarios',
                'warning'
            )
            return false;
        }

        let next = page + 1;
        setpage(next)
        obtenerPublicacion(next);
    }

    const eliminarPub = async (pubId, iduser) => {
       
        if(auth._id != iduser){
            return false;

        }else{
            const respuesta = await fetch(Global.url + "publicacion/eliminar/" + pubId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: token
                }
            });
    
            const pubEliminar = await respuesta.json();
       
            console.log(pubEliminar);
            setpage(1)
            obtenerPublicacion(1, true)
            console.log("se elimino");
        }
       
    }

    



    return (
        <>
            <article className='perfil-usuarios-publicaciones'>
                <h2 className='publicaciones-titulo'>Publicacionees</h2>
                {publicacion.map(pub => {

                    return (
                        <>

                            <div className='publicaciones' key={pub._id}>
                                <div  className="publicaciones-container">
                                    <div className='publicaciones-imagen-usuario'>
                                        <img src={Global.url + "usuarios/avatar/" + pub.usuario.imagen} className="publicacion-imagen-usuario" />
                                    </div>
                                    <div className='publicaciones-usuarios-info'>
                                        <div>
                                            <h1 className='publicaciones-titulo-usuario'>{pub.usuario.nombre} <span className='separador'>|<span className='pub-fecha'>{pub.fechaCreado}</span></span></h1>
                                        </div>
                                        <div className="publicaciones-bio">
                                            <h1 className='publicacion-bio'>{pub.texto}</h1>
                                        </div>
                                    </div>
                                    <div className='pub-eliminar'>
                                        <img src={trash} onClick={() => eliminarPub(pub._id, pub.usuario._id)} />
                                    </div>

                                </div>
                                <article className='publicacion-imagen'>
                                    {pub.archivo && <img src={Global.url + "publicacion/media/" + pub.archivo} className='imagen-publicacion' />}
                                </article>

                            </div>

                        </>
                    )
                })

                }


            </article>
            <div className='buttons-paginas'>
                <a onClick={siguiente} className='button-siguiente'>Mas Publicaciones</a>
            </div>

        </>
    )
}
