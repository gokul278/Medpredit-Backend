import express from "express";

const {
  verifyToken,
} = require("../../Controller/Authentication/AuthenticationControllers");

const {
  checkPatientMapController,
  addPatientMapController
} = require("../../Controller/Doctor/DoctorController");

const DoctorRoutes = express.Router();

DoctorRoutes.post("/addEmployee", verifyToken);

DoctorRoutes.post("/checkPatientMap", verifyToken, checkPatientMapController);

DoctorRoutes.post("/addPatientMap", verifyToken, addPatientMapController);



export default DoctorRoutes;
