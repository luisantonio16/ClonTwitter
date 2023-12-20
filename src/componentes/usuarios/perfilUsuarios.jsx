import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helper/global';
import trash from '../../assets/imagenes/trash50px.png'
import imagen from '../../assets/imagenes/user.png'
import { Link, useParams } from 'react-router-dom';
import { ObtenerPerfil } from '../../helper/obtenerPerfil';
import Swal from 'sweetalert2'



export const PerfilUsuarios = () => {

    const params = useParams();
    const token = localStorage.getItem('token')

    const { auth } = useAuth();
    const [usuario, setUsuario] = useState([])
    const [contador, setContador] = useState([])
    const [publicacion, setPublicacion] = useState([])
    const [pub, setPub] = useState([])
    const [page, setpage] = useState(1)
    const [follow, isFollow] = useState(false)


    useEffect(() => {
        perfil();
        obtenerContadores();
        obtenerPublicacion(1, true)

    }, [])




    const obtenerContadores = async () => {
        const respuestas = await fetch(Global.url + "usuarios/contar/" + params.id, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })

        const data = await respuestas.json();
        if (data) {
            setContador(data)
        }

    }

    const perfil = async () => {
        let datos = await ObtenerPerfil(params.id, setUsuario);
        console.log(datos);
        if (datos.seguidos && datos.seguidos._id) isFollow(true)

    }

    const guardarSeguidor = async (id) => {

        //hacemos la peticion AJAX al backend para guardar el seguidor
        const respuesta = await fetch(Global.url + "follow/follow", {
            method: "POST",
            body: JSON.stringify({ seguido: id }),
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },

        })

        const datosSeguidos = await respuesta.json();

        if (datosSeguidos.status == "Succes") {
            isFollow(true)

        }

    }

    const dejarSeguidor = async (id) => {
        //hacemos la peticion AJAX al backend para dej de seguir
        const respuesta = await fetch(Global.url + "follow/delete-follow/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },

        })

        const datosSeguidos = await respuesta.json();

        if (datosSeguidos.status == "Succes") {

            isFollow(false)

        }


    }

    const obtenerPublicacion = async (page, newPerfil = false) => {
        const respuesta = await fetch(Global.url + "publicacion/usuario/" + params.id + "/" + page, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem('token')
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
            console.log(nuevaPub);

        }
    }

    const siguiente = () => {
        if (pub.totalPaginas === page) {
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

    const eliminarPub = async (pubId) => {

        if (auth._id != publicacion.usuario._id) {
             return false;
        }

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
    }

    return (
        <>
            <section className="perfil-usuarios">
                <div className='perfil-usuarios-container'>
                    <article className="perfil-usuario">
                        <div className="contenedor-perfil-usuarios">
                            <div className="perfil-imagen">
                                {usuario.imagen != "default.png" && <img src={Global.url+"usuarios/avatar/" +usuario.imagen} className="nav-imagen-usuario" />}
                                {usuario.imagen == "default.png" && <img src={imagen} className="nav-imagen-usuario" />}

                            </div>
                            <div className="perfil-usuarios-datos">
                                <div>
                                    <h2 className="perfil-nombre">{usuario.nombre}</h2>
                                    <h3 className="perfil-nombre-usuario">{usuario.usuario}</h3>
                                    <p className='perfil-bio'>{usuario.biografia}</p>
                                </div>
                            </div>
                            <div>
                                {usuario._id != auth._id &&
                                    (follow ?
                                        <button className='btn-siguiendo' onClick={(() => dejarSeguidor(usuario._id))}>dejar de seguir</button>
                                        :
                                        <button className='btn-seguir' onClick={(() => guardarSeguidor(usuario._id))}>seguir</button>
                                    )
                                }
                            </div>


                        </div>
                    </article>
                    <article className="perfil-usuarios-info">
                        <div className="perfil-seguido">
                            <Link className="link-perfil" to={"/hodiee/siguiendo/" + usuario._id}>
                                <h2 className="">siguiendo</h2>
                                <p>{contador.siguiendo}</p>
                            </Link>

                        </div>
                        <div className="perfil-seguidores">
                            <Link className="link-perfil" to={"/hodiee/seguidores/" + usuario._id}>
                                <h2>Seguidores</h2>
                                <p>{contador.seguidores}</p>
                            </Link>

                        </div>
                        <div className="perfil-publicaciones">
                            <Link className="link-perfil" to={"/hodiee/publicaciones/" + usuario._id}>
                                <h2>Publicaciones</h2>
                                <p>{contador.publicaciones}</p>
                            </Link>
                        </div>
                    </article>
                </div>

                <div className='perfil-linea'></div>

                <article className='perfil-usuarios-publicaciones'>
                    <h2 className='publicaciones-titulo'>Publicaciones</h2>
                    {publicacion.map(pub => {

                        return (
                            <>

                                <div className='publicaciones' key={pub._id}>
                                    <div className="publicaciones-container">
                                        <div className='publicaciones-imagen-usuario'>
                                            {pub.usuario.imagen != "default.png" && <img src={Global.url + "usuarios/avatar/" + pub.usuario.imagen} className='publicacion-imagen-usuario' />}

                                            {pub.usuario.imagen == "default.png" && <img src={imagen} className="publicacion-imagen-usuario" />}
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
                                            <img src={trash} onClick={() => eliminarPub(pub._id)} />
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

            </section>
        </>
    )
}
