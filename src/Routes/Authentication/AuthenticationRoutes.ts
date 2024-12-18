import express from "express";

const {
  usersignin,
  verifyToken,
  verifyEnteruserData,
  changePasswordController,
} = require("../../Controller/Authentication/AuthenticationControllers");

const AuthenticationRoutes = express.Router();

AuthenticationRoutes.post("/user/singin", usersignin);

AuthenticationRoutes.post(
  "/verifyEnteruserData",
  verifyToken,
  verifyEnteruserData
);

AuthenticationRoutes.post(
  "/changePassword",
  verifyToken,
  changePasswordController
);

export default AuthenticationRoutes;
