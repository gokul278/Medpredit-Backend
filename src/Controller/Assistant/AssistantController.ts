import { encrypt } from "../../Helper/Encryption";
const bcrypt = require("bcrypt");

import {
  getPatientDataModels,
  postNewPatientModels,
  getMainCategoryModels,
  getSubMainCategoryModels,
  getCategoryModels,
  getQuestionsModels,
  postAnswersModels,
  postFamilyUserModel,
  getAssistantDoctorModel,
  resetScoreModel,
  postPastReportModel,
  postCurrentReportModels,
  getPastReportModels
} from "../../Models/Assistant/AssistantModels";

const { CurrentTime } = require("../../Helper/CurrentTime");

const getPatientDataController = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const result = await getPatientDataModels(mobileNumber);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const postNewPatientController = async (req, res) => {
  try {
    const {
      refUserFname,
      refUserLname,
      refUserEmail,
      refUserPassword,
      refDOB,
      refMaritalStatus,
      refEducation,
      refProfession,
      refSector,
      refAddress,
      refDistrict,
      refPincode,
      refUserMobileno,
      refGender,
    } = req.body;

    const salt = 10;

    const hashedPassword = await bcrypt.hash(refUserPassword, salt);

    console.log(hashedPassword);

    const HigherUser = req.userData.userid;
    const hospitalId = req.userData.hospitalid;

    const createdBy = req.userData.userid;
    const createdAt = CurrentTime();

    const values = {
      refUserFname,
      refUserLname,
      refUserEmail,
      refUserPassword,
      hashedPassword,
      refDOB,
      refMaritalStatus,
      refEducation,
      refProfession,
      refSector,
      refAddress,
      refDistrict,
      refPincode,
      refUserMobileno,
      createdBy,
      createdAt,
      HigherUser,
      hospitalId,
      refGender,
    };

    if (!refUserPassword) {
      console.error("Password is missing in the request body");
      return res.status(400).json({ error: "Password is required" });
    }

    const result = await postNewPatientModels(values);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong", error);
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const postFamilyUserController = async (req, res) => {
  try {
    const {
      refUserId,
      refUserFname,
      refUserLname,
      refUserEmail,
      refDOB,
      refMaritalStatus,
      refEducation,
      refProfession,
      refSector,
      refAddress,
      refDistrict,
      refPincode,
      refUserMobileno,
      refGender,
    } = req.body;

    const doctorId = req.userData.userid;

    const values = {
      refUserId,
      refUserFname,
      refUserLname,
      refUserEmail,
      refDOB,
      refMaritalStatus,
      refEducation,
      refProfession,
      refSector,
      refAddress,
      refDistrict,
      refPincode,
      refUserMobileno,
      refGender,
      doctorId,
    };

    const result = await postFamilyUserModel(values);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong", error);
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getMainCategoryController = async (req, res) => {
  try {
    let doctorId = req.userData.userid;

    const { employeeId, patientId } = req.body;

    if (employeeId) {
      doctorId = employeeId;
    }

    const result = await getMainCategoryModels(doctorId, patientId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getSubMainCategoryController = async (req, res) => {
  try {
    const { SubCategoryId } = req.body;

    const doctorId = 0;
    const patientId = 0;

    const result = await getSubMainCategoryModels(
      SubCategoryId,
      doctorId,
      patientId
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getCategoryController = async (req, res) => {
  try {
    const { SubCategoryId, patientId, employeeId } = req.body;
    let doctorId = req.userData.userid;

    if (employeeId) {
      doctorId = employeeId;
    }

    const result = await getCategoryModels(SubCategoryId, patientId, doctorId);
    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getQuestionsController = async (req, res) => {
  try {
    const { patientId, questionId } = req.body;

    const result = await getQuestionsModels(
      patientId,
      questionId,
      req.userData.userid
    );
    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const postAnswersController = async (req, res) => {
  try {
    const { patientId, categoryId, answers, employeeId } = req.body;

    let doctorId = req.userData.userid;

    const createdBy = req.userData.userid;

    if (employeeId) {
      doctorId = employeeId;
    }

    const result = await postAnswersModels(
      patientId,
      categoryId,
      answers,
      doctorId,
      createdBy
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getAssistantDoctorController = async (req, res) => {
  try {
    const result = await getAssistantDoctorModel(req.userData.userid);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const resetScoreController = async (req, res) => {
  try {
    const { scoreId } = req.body;

    const result = await resetScoreModel(scoreId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const postPastReportController = async (req, res) => {
  try {
    const { patientId } = req.body;

    const result = await postPastReportModel(patientId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const postCurrentReportContoller = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;

    let doctorIdVal = req.userData.userid;

    if (doctorId) {
      doctorIdVal = doctorId;
    }

    const result = await postCurrentReportModels(doctorIdVal, patientId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getPastReportController = async(req,res) =>{

  try {
    const {scoreId} = req.body;

    const result = await getPastReportModels(scoreId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
}

module.exports = {
  getPatientDataController,
  postNewPatientController,
  getMainCategoryController,
  getSubMainCategoryController,
  getCategoryController,
  getQuestionsController,
  postAnswersController,
  postFamilyUserController,
  getAssistantDoctorController,
  resetScoreController,
  postPastReportController,
  postCurrentReportContoller,
  getPastReportController
};
