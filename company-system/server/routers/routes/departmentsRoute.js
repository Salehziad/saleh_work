const express = require("express");
const DepartmentsRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */
const {addDepartment,getDepartment,updateDepartment,deleteDepartment}=require('../controllers/departments')

DepartmentsRoute.post("/addDepartment", addDepartment);
DepartmentsRoute.post("/updateDepartment", updateDepartment);
DepartmentsRoute.post("/getDepartment", getDepartment);
DepartmentsRoute.post("/deleteDepartment", deleteDepartment);

/// exports
module.exports = DepartmentsRoute;
