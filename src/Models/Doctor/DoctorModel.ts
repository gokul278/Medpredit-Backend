import { calculateAge, getDateOnly } from "../../Helper/CurrentTime";
import {
  addPatientTransactionQuery,
  addUserScoreDetailsQuery,
  getLatestPTIdQuery,
} from "../Assistant/AssistantQuery";
import {
  getAllCategoryQuery,
  getAllScoreQuery,
  getAllScoreVerifyQuery,
  getDoctorDetailsReport,
  getParticualarScoreQuery,
  getPatientDetailsReport,
  getScoreReport,
  getScoreVerifyReport,
  getStressAnswerQuery,
} from "./DoctorQuery";
const DB = require("../../Helper/DBConncetion");

const {
  checkPatientMapQuery,
  addPatientMapQuery,
  getDoctorMap,
  getPatientDetail,
  getDoctorPatientMapQuery,
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

export const getCurrentReportDataModel = async (
  doctorId: any,
  patientId: any,
  hospitalId: any
) => {
  const connection = await DB();

  try {
    const doctorIdResult = await connection.query(getDoctorMap, [
      hospitalId,
      doctorId,
    ]);

    const patientIdResult = await connection.query(getPatientDetail, [
      patientId,
    ]);

    const doctor = doctorIdResult.rows[0];

    const patient = patientIdResult.rows[0];

    const getAllCategoryResult = await connection.query(getAllCategoryQuery);

    const getAllScoreResult = await connection.query(getAllScoreQuery, [
      patientId,
      doctorId,
    ]);

    const getAllScoreVerify = await connection.query(getAllScoreVerifyQuery);

    const getStressAnswer = await connection.query(getStressAnswerQuery);

    return {
      doctorDetail: {
        doctorName: doctor.refUserFname + " " + doctor.refUserLname,
        doctorId: doctor.refUserCustId,
        hospital: doctor.refHospitalName,
        hospitalAddress:
          doctor.refHospitalAddress + ", " + doctor.refHospitalPincode,
      },
      patientDetail: {
        patientName: patient.refUserFname + " " + patient.refUserLname,
        patientId: patient.refUserCustId,
        gender: patient.refGender,
        age: calculateAge(patient.refDOB),
        address1: patient.refAddress,
        address2: patient.refDistrict + ", " + patient.refPincode,
      },
      allCategory: getAllCategoryResult.rows,
      allScore: getAllScoreResult.rows,
      allScoreVerify: getAllScoreVerify.rows,
      stressAnswer: getStressAnswer.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const createReportModel = async (
  patientId: any,
  doctorId: any,
  hospitalId: any,
  employee: any
) => {
  const connection = await DB();
  try {
    const patientMapId = await connection.query(getDoctorPatientMapQuery, [
      patientId,
      doctorId,
      hospitalId,
    ]);

    const PTcreatedDate = getDateOnly();

    const createdAt = CurrentTime();

    const createdBy = employee;

    const getlatestPTId = await connection.query(getLatestPTIdQuery);

    let lastestPTId = 1;

    if (getlatestPTId.rows.length > 0) {
      lastestPTId = parseInt(getlatestPTId.rows[0].refPTId) + 1;
    }

    await connection.query(addPatientTransactionQuery, [
      lastestPTId,
      patientMapId.rows[0].refPMId,
      "0",
      "1",
      PTcreatedDate,
      createdAt,
      createdBy,
    ]);

    await connection.query(addUserScoreDetailsQuery, [
      lastestPTId,
      "0",
      createdAt,
      createdBy,
    ]);

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

export const getPastReportDataModel = async (
  patientId: any,
  doctorId: any,
  hospitalId: any,
  reportDate: any
) => {
  const connection = await DB();
  try {
    const doctorIdResult = await connection.query(getDoctorMap, [
      hospitalId,
      doctorId,
    ]);

    const patientIdResult = await connection.query(getPatientDetail, [
      patientId,
    ]);

    const doctor = doctorIdResult.rows[0];

    const patient = patientIdResult.rows[0];

    const getAllCategoryResult = await connection.query(getAllCategoryQuery);

    console.log(patientId, doctorId, hospitalId, reportDate);
    const getAllScoreResult = await connection.query(getParticualarScoreQuery, [
      patientId,
      doctorId,
      hospitalId,
      reportDate,
    ]);

    const getAllScoreVerify = await connection.query(getAllScoreVerifyQuery);

    const getStressAnswer = await connection.query(getStressAnswerQuery);

    return {
      doctorDetail: {
        doctorName: doctor.refUserFname + " " + doctor.refUserLname,
        doctorId: doctor.refUserCustId,
        hospital: doctor.refHospitalName,
        hospitalAddress:
          doctor.refHospitalAddress + ", " + doctor.refHospitalPincode,
      },
      patientDetail: {
        patientName: patient.refUserFname + " " + patient.refUserLname,
        patientId: patient.refUserCustId,
        gender: patient.refGender,
        age: calculateAge(patient.refDOB),
        address1: patient.refAddress,
        address2: patient.refDistrict + ", " + patient.refPincode,
      },
      allCategory: getAllCategoryResult.rows,
      allScore: getAllScoreResult.rows,
      allScoreVerify: getAllScoreVerify.rows,
      stressAnswer: getStressAnswer.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getReportPDFModel = async (patientId: any, reportDate: any) => {
  const connection = await DB();
  try {
    console.log(patientId, reportDate);

    const doctorResult = await connection.query(getDoctorDetailsReport, [
      reportDate,
      patientId,
    ]);

    const patientResult = await connection.query(getPatientDetailsReport, [
      reportDate,
      patientId,
    ]);

    const scoreResult = await connection.query(getScoreReport, [
      reportDate,
      patientId,
    ]);

    const scoreVerifyResult = await connection.query(getScoreVerifyReport);

    return {
      status: true,
      doctorDetails: doctorResult.rows[0],
      patientDetails: patientResult.rows[0],
      scoreResult: scoreResult.rows,
      scoreVerifyResult: scoreVerifyResult.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};
