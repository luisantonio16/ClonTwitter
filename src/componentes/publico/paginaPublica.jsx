import React from "react";
import Header from "./header";
import { Navigate, Outlet } from "react-router-dom";
import '../../assets/css/estilos.css'
import useAuth from "../../hooks/useAuth";


function paginaPublica() {

  const { auth} = useAuth();
  return (
    <>
      {/*Header */}
      <Header />
      {/*Contenido Principal */}
      <div className="contenido-Principal">
        {!auth ? 
         <Outlet/>

         :
         <Navigate to={"/hodiee"} />
        }
         
      </div>
    </>
  );
}

export default paginaPublica;
