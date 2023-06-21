import React from 'react'

export const serializarforms = (form) => {

    const formData = new FormData(form);

    const objetoUsuario = {};

    for(let [name, value] of formData){
        objetoUsuario[name] = value
    }
 return objetoUsuario;
}
