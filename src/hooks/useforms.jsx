import React, { useState } from "react"


export const useForm = (obcjet = {}) =>{

    const [form, setForm] = useState(obcjet);

    const changed = ({target})=>{
       const {name, value} = target;

       setForm({
        ...form,
        [name]:value
       })
    }

    return{
        form,
        changed
    }
}