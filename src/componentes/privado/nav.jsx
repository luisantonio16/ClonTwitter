import React, { useState } from "react";
import user from "../../assets/imagenes/user.png";
import { NavLink, useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helper/global";
import Swal from 'sweetalert2'



function Nav(){
    const [show, setShow] = useState('nav-menu')
    const {auth, setAuth, setContador} = useAuth();
    const navigate = useNavigate();

    

    const cerraSeccion = ()=>{  
        Swal.fire({
                title: 'Estas Seguro?',
                text: "Deseas cerrar la Seccion",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'si'
              }).then((result) => {
                if (result.isConfirmed) {
                    //vaciamos el local storaje
                    localStorage.clear();
    
                    //vaciamos los estados globales
                    setAuth({});
                    setContador({});
    
                    //hacemos la reddirecion al login
                    setTimeout(()=>{
                        navigate("/login")
                    },1000)             
                }
        })
       
    }

    const cambiar = ()=>{
        if(show == "nav-menu"){
            setShow("nav-menu show")
        }else{
            setShow("nav-menu");
        }
        
    }

    return(
    <>
        <nav className="nav"> 
            <div className="nav-logo">
                 <Link to="/hodiee" className="logo" >Hodiee</Link> 
            </div>
          
            <div className="nav-usuario">
                <div className="nav-usuarios">
                    <span className="nav-usuario-nombre">{auth.nombre}</span>
                </div> 
                <div>
                   <i className="fas fa-bars nav-bar" onClick={cambiar}></i>
               </div>           
            </div>

            <div className={show}>
                <div className="nav-menu-item">
                    <div className="nav-logo-usuario">
                        <article className="picture">
                            {auth.imagen != "default.png" && <img src={Global.url+"usuarios/avatar/"+auth.imagen}  className="nav-imagen-usuario"/>}
                            {auth.imagen == "default.png" && <img src={user} className="nav-imagen-usuario" />}
                        </article>
                        <article>
                             <p className="nav-nombre">{auth.nombre}</p>
                             <p  className="nav-nombre-Usuario">{auth.usuario}</p>
                        </article>
                    </div>

                    <div className="nav-menu-items">
                        <ul>
                            <li>
                                 <i className="fas fa-home nav-icono"></i>
                                 <Link to="/hodiee" className="nav-items">Inicio</Link>    
                            </li>
                            <li>
                                <i className="fas fa-user nav-icono"></i>
                                <Link to="/hodiee/perfil" className="nav-items">Ver perfil</Link>     
                            </li>
                            <li>
                                <i className="fas fa-search nav-icono"></i>
                                <Link to="/hodiee/buscar" className="nav-items">Buscar</Link>    
                            </li>
                            <li>
                                <i className="fas fa-gear nav-icono"></i>
                                <Link to="/hodiee/editarPerfil" className="nav-items">Editar Perfil</Link>    
                            </li>
                            

                        </ul>
                    </div>
                    <div className="nav-footer">
                        <div className="nav-footer-items">
                            <ul>
                                <li>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    <Link onClick={cerraSeccion} className="nav-items">Cerrar Seccion</Link>    
                                </li>
                            </ul>
                        </div>
                       
                    </div>
                </div>
            </div>
          
        </nav> 
   </>
    );    
}

export default Nav;