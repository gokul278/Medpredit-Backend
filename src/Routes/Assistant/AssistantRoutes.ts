import express from "express";

const {
  verifyToken,
} = require("../../Controller/Authentication/AuthenticationControllers");

const {
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
  getPastReportController,
} = require("../../Controller/Assistant/AssistantController");

const AssistantRoutes = express.Router();

AssistantRoutes.post("/getPatientData", verifyToken, getPatientDataController);

AssistantRoutes.post("/postNewPatient", verifyToken, postNewPatientController);

AssistantRoutes.post("/postFamilyUser", verifyToken, postFamilyUserController);

AssistantRoutes.post(
  "/getMainCategory",
  verifyToken,
  getMainCategoryController
);

AssistantRoutes.post(
  "/getSubMainCategory",
  verifyToken,
  getSubMainCategoryController
);

AssistantRoutes.post("/getCategory", verifyToken, getCategoryController);

AssistantRoutes.post("/getQuestions", verifyToken, getQuestionsController);

AssistantRoutes.post("/postAnswers", verifyToken, postAnswersController);

AssistantRoutes.get(
  "/getAssistantDoctor",
  verifyToken,
  getAssistantDoctorController
);

AssistantRoutes.post("/resetScore", verifyToken, resetScoreController);

AssistantRoutes.post("/postPastReport", verifyToken, postPastReportController);

AssistantRoutes.post(
  "/postCurrentReport",
  verifyToken,
  postCurrentReportContoller
);

AssistantRoutes.post("/getPastReport", verifyToken, getPastReportController);

export default AssistantRoutes;