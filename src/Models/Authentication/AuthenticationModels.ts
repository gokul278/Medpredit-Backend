const DB = require("../../Helper/DBConncetion");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const {
  usersigninQuery,
  patientDataCheckQuery,
  doctorDataCheckQuery,
  assistantMapping,
  checkDoctorHospitalQuery,
  changePasswordQuery,
  updatePasswordQuery,
} = require("./AuthenticationQuery");

export const usersigninModel = async (username: string, password: string) => {
  const connection = await DB();

  try {
    const values = [username];

    console.log(values);

    const result = await connection.query(usersigninQuery, values);

    if (result.rows.length > 0) {
      const hashpass = result.rows[0].refUserHashedpass;

      const passStatus = await bcrypt.compare(password, hashpass);

      const accessToken = jwt.sign(
        {
          userid: result.rows[0].refUserId,
        },
        process.env.ACCESS_TOKEN
      );

      if (passStatus) {
        if (result.rows[0].refRoleId === 1) {
          const checkDoctorHospital = await connection.query(
            checkDoctorHospitalQuery,
            [result.rows[0].refUserId]
          );

          if (checkDoctorHospital.rows.length === 1) {
            return {
              status: true,
              message: "Signin Successfull",
              roleType: result.rows[0].refRoleId,
              hospitaId: checkDoctorHospital.rows[0].refHospitalId,
              token: accessToken,
              action: "single",
            };
          } else {
            return {
              status: true,
              message: "Signin Successfull",
              roleType: result.rows[0].refRoleId,
              hospitals: checkDoctorHospital.rows,
              token: accessToken,
              action: "multiple",
            };
          }
        } else if (result.rows[0].refRoleId === 2) {
          const hospitaId = await connection.query(assistantMapping, [
            result.rows[0].refUserId,
          ]);

          return {
            status: true,
            message: "Signin Successfull",
            roleType: result.rows[0].refRoleId,
            hospitaId: hospitaId.rows[0].refHospitalId,
            token: accessToken,
          };
        }
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

export const changePasswordModel = async (
  userid: any,
  pastPassword: any,
  currentPassword: any
) => {
  const connection = await DB();

  try {
    const result = await connection.query(changePasswordQuery, [
      userid,
      pastPassword,
    ]);

    if (result.rows.length > 0) {
      const saltRounds = 10; // Adjust the salt rounds as needed
      const hashedPassword = await bcrypt.hash(currentPassword, saltRounds);

      const result = await connection.query(updatePasswordQuery, [
        currentPassword,
        hashedPassword,
        userid,
      ]);

      if (result) {
        return {
          status: true,
        };
      } else {
        return {
          status: false,
          message: "Try Again",
        };
      }
    } else {
      return {
        status: false,
        message: "Invalid Current Password",
      };
    }
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};
