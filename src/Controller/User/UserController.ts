import {
  getUserSQL,
  createUserSQL,
  updateUserSQL,
  deleteUserSQL,
} from "../../Models/User/UserModels";

const logger = require("../../Helper/Logger");

const getUserData = async (req, res) => {
  try {
    const { username } = req.body;

    const result = await getUserSQL(username);

    return res.status(200).json({ userData: result });
  } catch (error) {
    console.error("Server Unknown Error:", error);
    return res.status(500).json({ error: "Failed to insert user" });
  }
};

const createUserData = async (req, res) => {
  const { username, password } = req.body;
  try {
    await createUserSQL(username, password);

    logger.info(`User Created Account (${username})`);

    return res.status(200).json({ message: "User Inserted !" });
  } catch (error) {
    logger.error(`Server Unknown Error: ${error}`);
    console.error("Server Unknown Error:", error);
    return res.status(500).json({ error: "Failed to insert user" });
  }
};

const updateUserData = async (req, res) => {
  const { userid, username, password } = req.body;

  try {
    const data = await updateUserSQL(userid, username, password);
    logger.info(`User Account Updated (${userid}), data: ${data}`);
    return res.status(200).json({ message: "User Updated !" });
  } catch (error) {
    logger.error(`Server Unknown Error: ${error}`);
    console.error("Server Unknown Error:", error);
    return res.status(500).json({ error: "Failed to insert user" });
  }
};

const deleteUserData = async (req, res) => {
  const { userid } = req.body;

  try {
    await deleteUserSQL(userid);
    logger.info(`User Deleted Updated (${userid})`);
    return res.status(200).json({ message: "User Deleted !" });
  } catch (error) {
    logger.error(`Server Unknown Error: ${error}`);
    console.error("Server Unknown Error:", error);
    return res.status(500).json({ error: "Failed to insert user" });
  }
};

module.exports = {
  getUserData,
  createUserData,
  updateUserData,
  deleteUserData,
};
