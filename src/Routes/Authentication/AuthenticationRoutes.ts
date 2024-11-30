import express from "express";

const {
  usersignin,
  verifyToken,
  verifyEnteruserData,
} = require("../../Controller/Authentication/AuthenticationControllers");

const AuthenticationRoutes = express.Router();

AuthenticationRoutes.post("/user/singin", usersignin);

AuthenticationRoutes.post(
  "/verifyEnteruserData",
  verifyToken,
  verifyEnteruserData
);

export default AuthenticationRoutes;
