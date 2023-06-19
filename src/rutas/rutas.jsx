import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import PaginaPublica from "../componentes/publico/paginaPublica";
import IniciarSeccion from "../componentes/usuarios/iniciaSeccion";
import Registrarse from "../componentes/usuarios/registrarse";
import PaginaPrivada from "../componentes/privado/paginaprivada";
import Feed from "../componentes/publicaciones/feed";
import Perfil from "../componentes/privado/perfil";
import { AuthProvider } from "../contenidos/AuthProvider";

function Rutas() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PaginaPublica />}>
            <Route index element={<IniciarSeccion />} />
            <Route path="login" element={<IniciarSeccion />} />
            <Route path="registrarse" element={<Registrarse />} />
          </Route>

          <Route path="/hodiee" element={<PaginaPrivada />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Rutas;
