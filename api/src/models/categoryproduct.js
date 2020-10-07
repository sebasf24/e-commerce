const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('categoryproduct', { 
        id:{
            primaryKey:true, 
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            allowNull: true
        }
/*         categoryId:{
            type: DataTypes.INTEGER,
        },
        productId: {
            type: DataTypes.INTEGER,
        } */   
    });
}

