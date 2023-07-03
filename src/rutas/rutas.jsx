import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import PaginaPublica from "../componentes/publico/paginaPublica";
import IniciarSeccion from "../componentes/usuarios/iniciaSeccion";
import Registrarse from "../componentes/usuarios/registrarse";
import PaginaPrivada from "../componentes/privado/paginaprivada";
import Feed from "../componentes/publicaciones/feed";
import Perfil from "../componentes/privado/perfil";
import { AuthProvider } from "../contenidos/AuthProvider";
import { Error } from "../componentes/layouts/error";
import { EditarUsuario } from "../componentes/usuarios/editarUsuario";
import { Usuarios } from "../componentes/usuarios/usuarios";
import { Seguidos } from "../componentes/follows/seguidos";
import { Seguidores } from "../componentes/follows/Seguidores";
import { PerfilUsuarios } from "../componentes/usuarios/perfilUsuarios";
import { Publicaciones } from "../componentes/publicaciones/publicaciones";




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
            <Route path="editarPerfil" element={< EditarUsuario/>} />
            <Route path="buscar" element={<Usuarios />} />
            <Route path="siguiendo/:id" element={<Seguidos />} />
            <Route path="seguidores/:id" element={<Seguidores />} />
            <Route path="perfilUsuarios/:id" element={<PerfilUsuarios />} />
            <Route path="publicaciones/:id" element={<Publicaciones />} />
          
          </Route>

          <Route path="*" element={<Error />} >
             <Route index element={<Error />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Rutas;
