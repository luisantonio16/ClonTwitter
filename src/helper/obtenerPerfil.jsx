import React from 'react'
import { Global } from './global'

export const ObtenerPerfil = async(id, setEstado) => {

    const respuesta = await fetch(Global.url+"usuarios/perfil/"+id,{
        method: "GET",

        headers:{
            Authorization: localStorage.getItem("token")
        }
    })

    const data = await respuesta.json();
    if(data.status =="Succes"){
        setEstado(data.Usuarios)
    }
    
  return data;
}
