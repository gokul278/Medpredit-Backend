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

    const result = await getSubMainCategoryModels(SubCategoryId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getCategoryController = async (req, res) => {
  try {
    const { SubCategoryId, patientId } = req.body;

    const result = await getCategoryModels(SubCategoryId, patientId);
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
    const { patientId, categoryId, answers } = req.body;

    const doctorId = req.userData.userid;

    const hospitalId = req.userData.hospitalid;

    const result = await postAnswersModels(
      patientId,
      categoryId,
      answers,
      doctorId,
      hospitalId
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getAssistantDoctorController = async (req, res) => {
  try {
    const result = await await getAssistantDoctorModel(req.userData.userid);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

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
};
