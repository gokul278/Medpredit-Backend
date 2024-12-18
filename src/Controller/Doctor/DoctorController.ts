import { encrypt } from "../../Helper/Encryption";
const bcrypt = require("bcrypt");
const { CurrentTime } = require("../../Helper/CurrentTime");

import {
  checkPatientMapModel,
  addPatientMapModel,
  getCurrentReportDataModel,
  createReportModel,
  getPastReportDataModel,
  getReportPDFModel,
} from "../../Models/Doctor/DoctorModel";

const addEmployeeController = async (req, res) => {
  try {
    const {
      refRoleId,
      refHospitalId,
      refHigherMapping,
      refUserFname,
      refUserLname,
      refDOB,
      refGender,
      refMaritalStatus,
      refEducation,
      refUserMobileno,
      refUserEmail,
      refAddress,
      refPincode,
      refUserPassword,
      refAllopathic,
      refSuperSpec,
      refBranchSuperSpec,
      refAddDeg,
      refTypeAddDeg,
      refSpecBranch,
      refRegCouncil,
      refNameRegCouncil,
      refMCINo,
      refCROcpSector,
      refCRInstituteType,
      refCRInstituteName,
      refCRDesignation,
      refCRDepartment,
      refCRAddress,
      refExperience,
    } = req.borefUserMobilenody;

    const values = [
      refRoleId,
      refHospitalId,
      refHigherMapping,
      refUserFname,
      refUserLname,
      refDOB,
      refGender,
      refMaritalStatus,
      refEducation,
      refUserMobileno,
      refUserEmail,
      refAddress,
      refPincode,
      refUserPassword,
      refAllopathic,
      refSuperSpec,
      refBranchSuperSpec,
      refAddDeg,
      refTypeAddDeg,
      refSpecBranch,
      refRegCouncil,
      refNameRegCouncil,
      refMCINo,
      refCROcpSector,
      refCRInstituteType,
      refCRInstituteName,
      refCRDesignation,
      refCRDepartment,
      refCRAddress,
      refExperience,
    ];
  } catch (error) {
    console.error("Something went Wrong", error);
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const checkPatientMapController = async (req, res) => {
  try {
    const { patientId, employeeId, hospitalId } = req.body;

    let doctorId = req.userData.userid;

    if (employeeId) {
      doctorId = employeeId;
    }

    const result = await checkPatientMapModel(doctorId, patientId, hospitalId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const addPatientMapController = async (req, res) => {
  try {
    const { patientId, employeeId, hospitalId } = req.body;

    let doctorId = req.userData.userid;

    if (employeeId) {
      doctorId = employeeId;
    }

    const result = await addPatientMapModel(doctorId, patientId, hospitalId);
    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getCurrentReportDataController = async (req, res) => {
  try {
    const { employeeId, patientId, hospitalId } = req.body;

    let doctorId = employeeId;

    if (!doctorId) {
      doctorId = req.userData.userid;
    }

    const result = await getCurrentReportDataModel(
      doctorId,
      patientId,
      hospitalId
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const createReportController = async (req, res) => {
  try {
    const { patientId, employeeId, hospitalId } = req.body;

    let doctorId = employeeId;

    if (!employeeId) {
      doctorId = req.userData.userid;
    }

    const result = await createReportModel(
      patientId,
      doctorId,
      hospitalId,
      req.userData.userid
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getPastReportDataController = async (req, res) => {
  try {
    const { patientId, employeeId, hospitalId, reportDate } = req.body;

    console.log(reportDate);

    let doctorId = employeeId;

    if (!employeeId) {
      doctorId = req.userData.userid;
    }

    const result = await getPastReportDataModel(
      patientId,
      doctorId,
      hospitalId,
      reportDate
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getReportPDFController = async (req, res) => {
  try {
    const { patientId, reportDate } = req.body;

    console.log(patientId, reportDate);

    const result = await getReportPDFModel(patientId, reportDate);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

module.exports = {
  checkPatientMapController,
  addPatientMapController,
  getCurrentReportDataController,
  createReportController,
  getPastReportDataController,
  getReportPDFController,
};
