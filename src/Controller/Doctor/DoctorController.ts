import { encrypt } from "../../Helper/Encryption";
const bcrypt = require("bcrypt");
const { CurrentTime } = require("../../Helper/CurrentTime");

import {
  checkPatientMapModel,
  addPatientMapModel,
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

module.exports = {
  checkPatientMapController,
  addPatientMapController,
};
