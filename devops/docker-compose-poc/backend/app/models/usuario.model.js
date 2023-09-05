module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    nombres: {
      type: Sequelize.STRING,
    },
    apellidos: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  });

  return Usuario;
};
