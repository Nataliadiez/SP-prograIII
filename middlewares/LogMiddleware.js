const Log = require("../models/log.entity.js");

const LogMiddleware = async(req, res, next) => {
    try {
        await Log.create({
            ruta: req.path,
            metodo: req.method,
        });
        console.log(`Log registrado: ${req.method} ${req.path}`);
        
    } catch (error) {
        console.error("Error al registrar log:", error);
    }

    next();
}

module.exports = LogMiddleware;