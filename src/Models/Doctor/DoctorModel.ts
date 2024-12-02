const DB = require("../../Helper/DBConncetion");

const {
  checkPatientMapQuery,
  addPatientMapQuery,
  getDoctorMap,
} = require("./DoctorQuery");

const { CurrentTime } = require("../../Helper/CurrentTime");

export const checkPatientMapModel = async (doctorId: any, patientId: any) => {
  const connection = await DB();

  try {
    const values = [doctorId, patientId];

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

export const addPatientMapModel = async (doctorId: any, patientId: any) => {
  const connection = await DB();

  try {
    const createdAt = CurrentTime();

    const mapValues = [doctorId, patientId];

    const hospitalId = "1";

    const getDoctorHospitalMap = await connection.query(getDoctorMap, [
      hospitalId,
      doctorId,
    ]);

    const values = [
      getDoctorHospitalMap.rows[0].refDMId,
      patientId,
      createdAt,
      doctorId,
    ];

    const result = await connection.query(addPatientMapQuery, values);

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
