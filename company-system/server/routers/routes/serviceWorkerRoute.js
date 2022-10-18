const express = require("express");
const serviceWorkerRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */
const subscribe=require('../controllers/serviceWorker')

serviceWorkerRoute.post("/subscribe", subscribe);

/// exports
module.exports = serviceWorkerRoute;