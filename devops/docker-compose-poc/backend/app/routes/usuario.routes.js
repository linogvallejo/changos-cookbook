module.exports = (app) => {
  const usuarios = require("../controllers/usuario.controller.js");

  var router = require("express").Router();

  // Crear un nuevo Usuario
  router.post("/", usuarios.create);

  // Recuperar todos los Usuarios
  router.get("/", usuarios.findAll);

  // Recuperar un Usuario a través de su id
  router.get("/:id", usuarios.findOne);

  // Actualizar un Usuario por medio del id en el request
  router.put("/:id", usuarios.update);

  // Eliminar un Usuario con el id especificado en el request
  router.delete("/:id", usuarios.delete);

  app.use("/api/usuarios", router);
};
