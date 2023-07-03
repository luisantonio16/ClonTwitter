import React, { useEffect, useState } from 'react'
import avatar from "../../assets/imagenes/user.png"
import { Global } from '../../helper/global'
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth'
import { useParams } from 'react-router-dom'
import { ObtenerPerfil } from '../../helper/obtenerPerfil'


export const Seguidores = () => {

    const params = useParams()
    const token = localStorage.getItem("token");

    const { auth } = useAuth();
    const [data, setData] = useState([])
    const [page, setpage] = useState(1)
    const [user, setUsers] = useState([])
    const [seguidos, setSeguidos] = useState([])
    const [cargado, setCargado] = useState(true);
    const [usuario, setUsuario] = useState({});
 

    useEffect(() => {
        listaUsuarios(1);
        ObtenerPerfil(params.id, setUsuario);
    }, [])
   
    const listaUsuarios = async (next = 1) => {

        const respuesta = await fetch(Global.url + "follow/seguidores/" + params.id + "/" + next, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })

        const datosUsuarios = await respuesta.json();
        //limpiams el arrary
        let limparArray = [];
        datosUsuarios.ususariosSeguidos.forEach(element => {
            limparArray = [...limparArray, element.usuario]

        });
        datosUsuarios.ususariosSeguidos = limparArray;
        console.log(datosUsuarios);

        if (datosUsuarios.status == "Succes") {
            let nuevoUsuario = datosUsuarios.ususariosSeguidos
            setUsers(datosUsuarios.usuarios);
            if (data.length >= 1) {
                nuevoUsuario = [...data, ...datosUsuarios.ususariosSeguidos]
            }
            setData(nuevoUsuario);
            setSeguidos(datosUsuarios.seguidos)
        }

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
            setSeguidos([...seguidos, id])

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

            let borrarSeguido = seguidos.filter(ususariosId => id !== ususariosId)
            setSeguidos(borrarSeguido);

        }


    }
    const siguiente = () => {
        if (user.totalPages === page) {
            Swal.fire(
                'Informacion',
                'No hay mas Usuarios',
                'warning'
            )
            return false;
        }

        let next = page + 1;
        setpage(next)
        listaUsuarios(next);
    }

    return (
        <>
            <article className='usuarios-header'>
                <h2 className='usuarios-titulo'>Seguidores de {usuario.nombre}</h2>
            </article>

            <div className='usuarios-container'>

                {data.map(usuarios => {
                    return (
                        <article className='usuario-container--informacion' key={usuarios._id} >
                            <div className='usuarios-imagen'>
                                <div className='usuario-imagen'>
                                    {usuarios.imagen != "default.png" && <img src={Global.url + "usuarios/avatar/" + usuarios.imagen} className="nav-imagen-usuario" />}
                                    {usuarios.imagen == "default.png" && <img src={avatar} className="nav-imagen-usuario" />}
                                </div>
                            </div>
                            <div className='usuarios-informacion'>
                                <div>
                                    <h2 className='usuario-nombre'>{usuarios.nombre + " " + usuarios.apellido}</h2>
                                    <p className='usuario-user'>{usuarios.usuario}</p>
                                </div>
                                <div>
                                    {usuarios.biografia != "" && <p className='usuario-bio'>{usuarios.biografia}</p>}
                                    {!usuarios.biografia && <p className='usuario-bio'>Biografia del Usuario</p>}
                                </div>
                            </div>
                            {usuarios._id != auth._id &&
                                <div className='usuario-buttons'>
                                    {seguidos.includes(usuarios._id) && <button className="btn-siguiendo" onClick={() => dejarSeguidor(usuarios._id)}>Dejar de seguir</button>}
                                    {!seguidos.includes(usuarios._id) && <button className="btn-seguir" onClick={() => guardarSeguidor(usuarios._id)}>Seguir</button>}
                                </div>
                            }
                        </article>
                    )
                })}

            </div>
            <div className='buttons-paginas'>
                <a onClick={siguiente} className='button-siguiente'>Ver mas personas</a>
            </div>
        </>

    )
  

}
