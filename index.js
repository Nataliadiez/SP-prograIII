const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db/sequelizeConnection.js");
const router = require("./routes/apiRouter.js");
const Obra = require("./models/obras.entity.js")
const Log = require("./models/log.entity.js")
const LogMiddleware = require("./middlewares/LogMiddleware.js");

//multer
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));

//cors
app.use(cors());

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//rutas

//TODO: agregar middleware para que guarde un log
//home
app.get("/", (req, res) => {
    res.render("home");
})

//actualizar DB
app.get("/actualizarDB", async (req, res)=> {
    await sequelize.sync({ alter: true });
    console.log("Base de datos actualizada");
})

app.use(LogMiddleware);
app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
})
