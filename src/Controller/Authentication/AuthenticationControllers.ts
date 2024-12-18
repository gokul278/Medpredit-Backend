import {
  changePasswordModel,
  usersigninModel,
  verifyEnteruserDataModel,
} from "../../Models/Authentication/AuthenticationModels";
import { encrypt } from "../../Helper/Encryption";
const jwt = require("jsonwebtoken");

const usersignin = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Hello");

    const result = await usersigninModel(username, password);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(200).json({ message: "tokenformateinvalid" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(200).json({ message: "timeexpired" });
    req.userData = user;
    next();
  });
};

const verifyEnteruserData = async (req, res) => {
  // console.log(req.userData.userid);

  const userId = req.userData.userid;

  try {
    const { roleType } = req.body;

    const result = await verifyEnteruserDataModel(roleType, userId);

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong --44" });
  }
};

const changePasswordController = async (req, res) => {
  try {
    const { pastPassword, currentPassword } = req.body;

    const result = await changePasswordModel(
      req.userData.userid,
      pastPassword,
      currentPassword
    );

    console.log(result);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong --44" });
  }
};

module.exports = {
  usersignin,
  verifyToken,
  verifyEnteruserData,
  changePasswordController,
};
