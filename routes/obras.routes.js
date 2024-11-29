const express = require("express");
const router = express.Router();
const Obras = require("../models/obras.entity.js");
const upload = require("../storage/storage.js");
const validarModificacion = require("../middlewares/validarModificacion.js");
const validarId = require("../middlewares/validarId.js");

// Obtener todas las obras
router.get("/", async (req, res) => {
    try {
        const obtenerTodos = await Obras.findAll({
            where:{
                activo: true,
            }
        });
        res.render("obras", {todos: obtenerTodos})
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error del servidor" });
    }
});

//MIDDLEWARE para crear una obra
router.post("/", upload.single("imagen"), (req, res, next) => {
    const { nombre, anioDeCreacion, tipo } = req.body;

    if (typeof nombre !== "string" || !isNaN(Number(nombre))) {
        return res.render("mensaje", { mensaje: "Error! el nombre debe ser un string." });
    }
    if(isNaN(Number(anioDeCreacion)) || Number(anioDeCreacion) <= 0){
        return res.render("mensaje", { mensaje: "Error! el año debe ser un entero y mayor a 0." });
    }

    if (tipo !== "escultura" && tipo !== "pintura") {
        return res.render("mensaje", { mensaje: "La obra debe ser pintura o escultura." });
    }
    next();
});

// Crear una obra
router.post("/", async (req, res) => {
    let mensaje;
    const {nombre, anioDeCreacion, tipo} = req.body;

    try {
        console.log(req.body);
        const nuevo = await Obras.create({ 
            nombre,
            anioDeCreacion,
            tipo,
            activo: true,
            imagen: `${req.file.filename}`
        });
        if(nuevo){
            mensaje = `Creado exitosamente`;
        } else{
            mensaje = `Error al crear.`;
        }
        res.render("mensaje", {mensaje})
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error del servidor" });
    }
});

// Modificar una obra por id
router.put("/:id", validarModificacion, async (req, res) => {
    let mensaje;
    const { nombre, anioDeCreacion, tipo} = req.body;
    const { id } = req.params;

    try {
        const [filasActualizadas] = await Obras.update(
            { nombre, anioDeCreacion, tipo},
            { where: { id } }
        );

        if (filasActualizadas > 0) {
            mensaje = "Obra actualizada correctamente.";
        } else {
            mensaje = "Error. No se encontró la obra o no se pudo actualizar.";
        }
        res.render("mensaje", { mensaje });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error del servidor" });
    }
});

// Baja lógica de una obra
router.delete("/:id", validarId, async (req, res) => {
    let mensaje;
    const { id } = req.params;
    try {
        const eliminado = await Obras.update(
            { activo: false },
            { where: { id } }
        );
        
        if(eliminado){
            mensaje = `Eliminado exitosamente`;
        }else{
            mensaje = `El ${id} no existe o no se ha encontrado`;
        }
        res.render("mensaje", {mensaje})
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error del servidor" });
    }
});

//Reactivación lógica por id
router.patch("/:id", validarId, async (req, res) => {
    let mensaje;
    const { id } = req.params;
    try {
        const eliminado = await Obras.update(
            { activo: true },
            { where: { id } }
        );
        
        if(eliminado){
            mensaje = `Reactivado exitosamente!`;
        }else{
            mensaje = `El ${id} no existe o no se ha encontrado`;
        }
        res.render("mensaje", {mensaje})
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error del servidor" });
    }
});

module.exports = router;
