import express from "express";

const {
  verifyToken,
} = require("../../Controller/Authentication/AuthenticationControllers");

const {
  checkPatientMapController,
  addPatientMapController,
  getCurrentReportDataController,
  createReportController,
  getPastReportDataController,
  getReportPDFController,
} = require("../../Controller/Doctor/DoctorController");

const DoctorRoutes = express.Router();

DoctorRoutes.post("/addEmployee", verifyToken);

DoctorRoutes.post("/checkPatientMap", verifyToken, checkPatientMapController);

DoctorRoutes.post("/addPatientMap", verifyToken, addPatientMapController);

DoctorRoutes.post(
  "/getCurrentReportData",
  verifyToken,
  getCurrentReportDataController
);

DoctorRoutes.post("/createReport", verifyToken, createReportController);

DoctorRoutes.post(
  "/getPastReportData",
  verifyToken,
  getPastReportDataController
);

DoctorRoutes.post("/getReportPDF", verifyToken, getReportPDFController);

export default DoctorRoutes;
