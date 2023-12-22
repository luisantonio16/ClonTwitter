import React, { useEffect, useState } from 'react'
import avatar from "../../assets/imagenes/user.png"
import { Global } from '../../helper/global'
import Swal from 'sweetalert2'
import { Link, json } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'


export const Usuarios = () => {

    const token = localStorage.getItem('token');

    const { auth } = useAuth();
    const [data, setData] = useState([])
    const [page, setpage] = useState(1)
    const [user, setUsers] = useState([])
    const [isfollowing, setFollowing] = useState(false);
    const [seguidos, setSeguidos] = useState([])
    const [cargado, setCargado] = useState(true);



    useEffect(() => {
        listaUsuarios(1)
    }, [])

    const listaUsuarios = async (next = 1) => {

        const respuesta = await fetch(Global.url + "usuarios/lista/" + next, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const datosUsuarios = await respuesta.json();
        

        if (datosUsuarios.status == "Succes") {
            let nuevoUsuario = datosUsuarios.Usuarios.docs;
            setUsers(datosUsuarios);
            if (data.length >= 1) {
                nuevoUsuario = [...data, ...datosUsuarios.Usuarios.docs]
            }
            setData(nuevoUsuario);
            setSeguidos(datosUsuarios.seguidos)
        }

    }

    const siguiente = () => {
        if (user.totalpaginas === page) {
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
    
    return (
        <>
            <section className='usuarios'>
                <article className='usuarios-header'>
                    <h2 className='usuarios-titulo'>Lista de Usuarios</h2>
                </article>
                <div className='usuarios-container'>

                    {data.map(usuarios => {
                        return (
                            <article className='usuario-container--informacion' key={usuarios._id} >
                                <div className='usuarios-imagen'>
                                    <div className='usuario-imagen'>
                                        {usuarios.imagen != "default.png" && <img src={usuarios.imagen} className="nav-imagen-usuario" />}
                                        {usuarios.imagen == "default.png" && <img src={avatar} className="nav-imagen-usuario" />}
                                    </div>
                                </div>
                                <div className='usuarios-informacion'>
                                    <div>
                                        <Link to={"/hodiee/perfilUsuarios/"+usuarios._id} className='usuario-nombre link'>{usuarios.nombre + " " + usuarios.apellido}</Link>
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
            </section>
        </>
    )
}
