const validarModificacion = (req, res, next) => {
    const { nombre, anioDeCreacion, tipo } = req.body;
    const { id } = req.params;

    if (typeof nombre !== "string" || !isNaN(Number(nombre))) {
        return res.render("mensaje", { mensaje: "Error! el nombre debe ser un string válido (no numérico)." });
    }
    if(isNaN(Number(id)) || Number(id) <= 0){
        return res.render("mensaje", { mensaje: "Error! el id debe ser un entero y mayor a 0." });
    }
    if(isNaN(Number(anioDeCreacion)) || Number(anioDeCreacion) <= 0){
        return res.render("mensaje", { mensaje: "Error! el año debe ser un entero" });
    }

    if (tipo !== "escultura" && tipo !== "pintura") {
        return res.render("mensaje", { mensaje: "La obra debe ser pintura o escultura" });
    }

    next();
}

module.exports = validarModificacion;
