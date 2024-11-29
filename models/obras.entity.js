const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");

const ObraDeArte = sequelize.define("ObraDeArte", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    anioDeCreacion:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo:{
        type: DataTypes.STRING, 
        allowNull: false,
        /* validate: {
            isIn: [['pintura', 'escultura']]//pintura o escultura
        } */
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    timestamps: true,
    createdAt: "creadoEn",
    updatedAt: "modificadoEn",
    tableName: 'obras'
});


module.exports = ObraDeArte;