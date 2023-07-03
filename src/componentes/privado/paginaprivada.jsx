import React from "react";
import Header from "../privado/header";
import { Navigate, Outlet } from "react-router-dom";
import Barralateral from "./perfil";
import useAuth from "../../hooks/useAuth";


function paginaprivada() {
  const {auth} = useAuth();
  return (
    <>
      {/*Header */}
      <Header />
      {/*Contenido Principal */}
      <section className="contenido-Principal">
        {auth ?
           <Outlet/>
         :
           <Navigate to="/login"/>
      }
       
      </section>
    </>
  );
}

export default paginaprivada;