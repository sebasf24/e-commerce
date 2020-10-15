const { DataTypes }= require('sequelize');

//Modelo de usuario
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        dni:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validated:{
              isEmail: true,
            }
        },
        username:{
            type: DataTypes.STRING,
            unique:true,
            allowNull:false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        image:{
            type: DataTypes.BLOB('long')
        },
        typeUser:{
            type: DataTypes.ENUM('Admin','cliente'),
        
        }
     
    });
  };