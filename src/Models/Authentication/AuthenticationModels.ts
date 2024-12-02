const DB = require("../../Helper/DBConncetion");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const {
  usersigninQuery,
  patientDataCheckQuery,
  doctorDataCheckQuery,
  checkDoctorHospital
} = require("./AuthenticationQuery");

export const usersigninModel = async (username: string, password: string) => {
  const connection = await DB();

  try {
    const values = [username];

    const result = await connection.query(usersigninQuery, values);

    if (result.rows.length == 1) {
      const hashpass = result.rows[0].refUserHashedpass;

      const passStatus = await bcrypt.compare(password, hashpass);
      
      if (passStatus) {
        const accessToken = jwt.sign(
          {
            userid: result.rows[0].refUserId,
          },
          process.env.ACCESS_TOKEN
        );

        return {
          status: true,
          message: "Signin Successfull",
          roleType: result.rows[0].refRoleId,
          token: accessToken,
        };
      } else {
        return { status: false, message: "Invalid Username or Password" };
      }
    } else {
      return { status: false, message: "Invalid Username or Password" };
    }
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const verifyEnteruserDataModel = async (
  roleType: number,
  userId: number
) => {
  const connection = await DB();

  if (roleType === 1 || roleType === 2) {
    const result = await connection.query(doctorDataCheckQuery, [userId]);

    return { status: result.rows[0].result };
  } else if (roleType === 3) {
    const result = await connection.query(patientDataCheckQuery, [userId]);

    return { status: result.rows[0].result };
  }
};
