import React from "react";
import { Route,Routes,BrowserRouter, Navigate } from "react-router-dom";
import PaginaPublica from "../componentes/publico/paginaPublica";
import IniciarSeccion from "../componentes/usuarios/iniciaSeccion";
import Registrarse from "../componentes/usuarios/registrarse";


function Rutas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaPublica/>}>
                    <Route index element={<IniciarSeccion />}/> 
                    <Route path="login" element={<IniciarSeccion />}/>
                    <Route path="registrarse" element={<Registrarse />}/>

                </Route>
            </Routes>
        </BrowserRouter>
    );

}

export default Rutas;