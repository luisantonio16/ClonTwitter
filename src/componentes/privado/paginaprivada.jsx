import React from "react";
import Header from "../privado/header";
import { Outlet } from "react-router-dom";
import Barralateral from "./perfil";


function paginaprivada() {
  return (
    <>
      {/*Header */}
      <Header />
      {/*Contenido Principal */}
      <section className="contenido-Principal">
        <div>
           <Outlet/>
        </div>
      </section>
    </>
  );
}

export default paginaprivada;