import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";


function paginaPublica() {
  return (
    <>
      {/*Header */}
      <Header />
      {/*Contenido Principal */}
      <div className="contenido-Principal">
          <Outlet/>
      </div>
    </>
  );
}

export default paginaPublica;
