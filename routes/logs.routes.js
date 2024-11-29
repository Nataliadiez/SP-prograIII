const express = require("express");
const router = express.Router();
const Log = require("../models/log.entity.js");

// Obtener todos los logs
router.get("/", async (req, res) => {
    try {
        const obtenerTodos = await Log.findAll();
        res.render("log", { todos: obtenerTodos });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error del servidor" });
    }
});


module.exports = router;
