import React, { createContext, useEffect, useState } from "react";
import { Global } from "../helper/global";

const authContext = createContext();

export const AuthProvider = ({children})=>{

    const [auth, setAuth] = useState({});
    const [contador, setContador] = useState({})



    useEffect(()=>{
        authUsuari();

    }, [])

    const authUsuari = async() =>{
        //sacar datos del usuario identificado
        const token = localStorage.getItem('token')
        const usuario = localStorage.getItem('usuario')

       //comprbar el token y el usuario
        if(!token || !usuario){
            return false;
        }

        //transformamos los datos a un objeto JS
        const objetoUsuario = JSON.parse(usuario);
        const idUsuario = objetoUsuario._id;

        //peticion ajax al backend que compruebe el token y que
        //me devuelva todos del usuario identificado
        const respuesta = await fetch(Global.url+"usuarios/perfil/"+idUsuario,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                Authorization : token,
            }
        });

        //hacemos otra peticion ajax para sacar los seguidores
        const seguidores = await fetch(Global.url+"usuarios/contar/"+idUsuario,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                Authorization : token,
            }
        });

        const datos = await respuesta.json();
        const datosSeguidores = await seguidores.json();
        setAuth(datos.Usuarios)  
        setContador(datosSeguidores) 
    }

    return(<authContext.Provider  value={{
        auth,
        setAuth,
        contador,
        setContador
    }}>
        {children}
    </authContext.Provider>    
    );

}

export default authContext;