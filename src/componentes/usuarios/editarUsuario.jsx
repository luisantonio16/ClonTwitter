import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helper/global';
import { serializarforms } from '../../helper/serializarforms';
import Swal from 'sweetalert2'
import imagen from '../../assets/imagenes/user.png'

export const EditarUsuario = () => {
    const {auth, setAuth} = useAuth();


     const token = localStorage.getItem('token')

    const updateUsuario = async(e)=>{
        e.preventDefault();

       let nuevoUsuario = serializarforms(e.target);
       delete nuevoUsuario.file0;

       //hacemos la peticion ajax
       const respuesta = await fetch(Global.url+"usuarios/actualizar" , {
        method: 'PUT',
        body: JSON.stringify(nuevoUsuario),
        headers:{
            "Content-Type": "application/json",
            "Authorization": token
        }
       });

       const datos = await respuesta.json();
        if(datos.status == "Succecs"){
            delete datos.usuario.contraseña;
            setAuth(datos.usuario)
            Swal.fire(
                'correcto!',
                "El usuario se actualizo correctamente",
                'success'
            )
        }
        console.log(datos);

        const fileInpunt = document.querySelector('#file')

        if(datos.status == "Succecs" && fileInpunt.files[0]){
            const formData = new FormData();
            formData.append('file0', fileInpunt.files[0]);

            // hacemos la peticion ajax para subir la imagen de perfil
            const archivo = await fetch(Global.url+"usuarios/subirarchivo", {
                method:"post",
                body:formData,
                headers:{
                    "Authorization":token
                }
            })

            const dataArchivo = await archivo.json();

            setAuth(dataArchivo.usuario)
            console.log(dataArchivo);

        }
    }

    
  return (
    <section className='editar'>
        <div className='editar-container'>
            {/* Aqui vai o formulário */}
            <form className='form' onSubmit={updateUsuario}>
                <div className="Cotent-text">
                       <h2 className='editar-titulo'>Editar Perfil</h2>
                </div>

                <div className="Cotent-text">
                    <input type="text" placeholder="nombre" name="nombre" className='form-items' defaultValue={auth.nombre}  />
                </div>
                <div className="Cotent-text">
                    <input type="text" placeholder="apellido" name="apellido" className='form-items' defaultValue={auth.apellido} />
                </div>
                <div className="Cotent-text">
                    <input type="text" placeholder="usuario" name="usuario" className='form-items'  defaultValue={auth.usuario} />
                </div>
                <div className="Cotent-text">
                   <textarea name='biografia' className='form-items' placeholder='Biografia'  defaultValue={auth.biografia} />
                </div>
                <div className="Cotent-text">
                    <input type="text" placeholder="email" name="email" className='form-items'  defaultValue={auth.email} />
                </div>
                <div className="Cotent-text">
                    <input type="password" placeholder="contraseña" name="Contraseña" className='form-items' />
                </div>
                <div className="Cotent-text cotent-imagen">
                    <label htmlFor="imagen">imagen de perfil</label>
                    <div className="avatar">
                        {auth.imagen != "default.png" && <img src={Global.url+"usuarios/avatar/"+auth.imagen} className="nav-imagen-usuario"/>}
                        {auth.imagen == "default.png" && <img src={imagen} className="nav-imagen-usuario"/>}
                    </div>
                    <input type="file" name='file0' id="file"/>
                    <br />
                    <br />
                </div>
                <div className="Cotent-text">
                    <input type="submit" className='form-item-btn'  />
                </div>

            </form>
        </div>

    </section>
  )
}
