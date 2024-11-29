const validarId = (req, res, next) => {
    const { id } = req.params;

    if(isNaN(Number(id)) || Number(id) <= 0){
        return res.render("mensaje", { mensaje: "Error! el id debe ser un entero y mayor a 0." });
    }
    next();
}

module.exports = validarId;