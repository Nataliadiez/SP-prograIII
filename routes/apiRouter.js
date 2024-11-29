const express = require("express");
const router = express.Router();

const logRoutes = require("./logs.routes.js");
const obrasRoutes = require("./obras.routes.js");

router.use("/logs", logRoutes);
router.use("/obras", obrasRoutes); 

module.exports = router;