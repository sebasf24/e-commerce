const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Price: {
      type: DataTypes.NUMBER,
      allowNull: false},
    Stock: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    img: {
      type: DataTypes.BLOB
    }
  });
};
