const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");

const Log = sequelize.define("Log", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ruta:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    metodo:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: true,
    createdAt: "creadoEn",
    updatedAt: false
});

module.exports = Log;