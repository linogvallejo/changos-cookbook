import React from "react";

import UsuariosLista from "./components/usuarios-lista.component";
import AgregarUsuario from "./components/agregar-usuario.component";
import Usuario from "./components/usuario.component";

const routes = [
  {
    path: "/",
    Component: UsuariosLista,
  },
  {
    path: "/usuarios",
    Component: UsuariosLista,
  },
  {
    path: "/add",
    Component: AgregarUsuario,
  },
  {
    path: "/usuarios/:id",
    Component: Usuario,
  },
  { path: "*", Component: () => <div>ERROR 404: Página no encontrada</div> },
];

export default routes;
