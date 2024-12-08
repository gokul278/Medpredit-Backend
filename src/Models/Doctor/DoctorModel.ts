const DB = require("../../Helper/DBConncetion");

const {
  checkPatientMapQuery,
  addPatientMapQuery,
  getDoctorMap,
} = require("./DoctorQuery");

const { CurrentTime } = require("../../Helper/CurrentTime");

export const checkPatientMapModel = async (
  doctorId: any,
  patientId: any,
  hospitalId: any
) => {
  const connection = await DB();

  try {
    const values = [doctorId, patientId, hospitalId];

    const result = await connection.query(checkPatientMapQuery, values);

    return {
      status: result.rows.length > 0 ? true : false,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const addPatientMapModel = async (
  doctorId: any,
  patientId: any,
  hospitalId: any
) => {
  const connection = await DB();

  try {
    const createdAt = CurrentTime();

    const hospitalID = hospitalId;

    const getDoctorHospitalMap = await connection.query(getDoctorMap, [
      hospitalID,
      doctorId,
    ]);

    const values = [
      getDoctorHospitalMap.rows[0].refDMId,
      patientId,
      createdAt,
      doctorId,
    ];

    await connection.query(addPatientMapQuery, values);

    return {
      status: true,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};
