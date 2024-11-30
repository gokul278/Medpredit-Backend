import express from "express";
const {
  getUserData,
  createUserData,
  updateUserData,
  deleteUserData,
} = require("../../Controller/User/UserController");

const userRoutes = express.Router();

userRoutes.get("/userdata", getUserData);
userRoutes.post("/newuser", createUserData);
userRoutes.patch("/updateuser", updateUserData);
userRoutes.delete("/deleteuser", deleteUserData);

export default userRoutes;
