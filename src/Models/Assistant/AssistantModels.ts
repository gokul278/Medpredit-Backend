import { calculateDaysDifference } from "../../Helper/CurrentTime";
import { Alcohol } from "../../Helper/Formula/Alcohol";
import { BMI } from "../../Helper/Formula/BMI";
import { Dietary } from "../../Helper/Formula/Dietary";
import { FamilyHistory } from "../../Helper/Formula/FamilyHistory";
import { PhysicalAactivity } from "../../Helper/Formula/PhysicalActivity";
import { Sleep } from "../../Helper/Formula/Sleep";
import { Stress } from "../../Helper/Formula/Stress";
import { Tabacco } from "../../Helper/Formula/Tobacco";

const DB = require("../../Helper/DBConncetion");

const {
  getPatientDataQuery,
  nextUserId,
  postNewUser,
  postnewCommunication,
  postnewUserDomain,
  getUserId,
  getMainCategoryQuery,
  getSubMainCategoryQuery,
  getOptions,
  getFirstQuestionQuery,
  getUserScore,
  getPasswordQuery,
  getAssistantDoctorQuery,
  resetScoreQuery,
  postPastReport,
  postCurrentReport,
  reportDetailsQuery,
  questionDetailsQuery,
  resetPatientTransactionQuery,
  getLatestPTIdQuery,
  addPatientTransactionQuery,
  addUserScoreDetailsQuery,
  getResetScoreRefQuery,
  getUserScoreVerifyQuery,
  getProfileQuery,
  getCatgeoryQuery,
  getReportSessionQuery,
} = require("./AssistantQuery");

const { checkPatientMapQuery } = require("../Doctor/DoctorQuery");
const { CurrentTime, getDateOnly } = require("../../Helper/CurrentTime");

export const getPatientDataModels = async (mobileNumber: any) => {
  const connection = await DB();

  try {
    const values = [mobileNumber];

    const result = await connection.query(getPatientDataQuery, values);

    return {
      status: true,
      data: result.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const postNewPatientModels = async (values: any) => {
  const connection = await DB();
  try {
    const nextUserIdData = await connection.query(nextUserId);

    await connection.query("BEGIN;");

    const patientId =
      100000 +
      parseInt(
        nextUserIdData.rows[0].nextrefusercustid
          ? nextUserIdData.rows[0].nextrefusercustid
          : 1
      );

    const newUservaluesInsert = [
      "MED" + patientId,
      "3",
      values.refUserFname,
      values.refUserLname,
      values.refDOB,
      values.refGender,
      values.refMaritalStatus,
      values.refEducation,
      values.refProfession,
      values.refSector,
      values.createdAt,
      values.createdBy,
    ];

    await connection.query(postNewUser, newUservaluesInsert);

    const getuseridVal = await connection.query(getUserId, ["MED" + patientId]);

    const newrefCommunicationValue = [
      getuseridVal.rows[0].refUserId,
      values.refUserMobileno,
      values.refUserEmail,
      values.refAddress,
      values.refDistrict,
      values.refPincode,
      values.createdAt,
      values.createdBy,
    ];

    await connection.query(postnewCommunication, newrefCommunicationValue);

    const newUserDomainValue = [
      getuseridVal.rows[0].refUserId,
      values.refUserPassword,
      values.hashedPassword,
      values.createdAt,
      values.createdBy,
    ];

    await connection.query(postnewUserDomain, newUserDomainValue);

    return {
      status: true,
    };
  } catch (error) {
    await connection.query("ROLLBACK;");
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.query("COMMIT;");
    await connection.end();
  }
};

export const getMainCategoryModels = async (
  doctorId: any,
  patientId: any,
  hospitalId: any
) => {
  const connection = await DB();

  try {
    const checkPatient = await connection.query(checkPatientMapQuery, [
      doctorId,
      parseInt(patientId),
      hospitalId,
    ]);

    if (checkPatient.rows.length > 0) {
      const result = await connection.query(getMainCategoryQuery);

      return {
        status: true,
        data: result.rows,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getSubMainCategoryModels = async (
  categoryId: any,
  doctorId: any,
  patientId: any
) => {
  const connection = await DB();
  try {
    const values = [categoryId];

    const result = await connection.query(getSubMainCategoryQuery, values);

    const getReportSession = await connection.query(getReportSessionQuery, [
      patientId,
    ]);

    let latestreportDate = null;

    if (getReportSession.rows.length > 0) {
      const todayDate = getDateOnly();

      const refPTcreatedDate: string =
        getReportSession.rows[0].refPTcreatedDate;

      function parseDateOnly(dateStr: string): Date {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day); // Create Date object with date only
      }

      // Parse the dates
      const today: Date = parseDateOnly(todayDate);
      const createdDate: Date = parseDateOnly(refPTcreatedDate);

      const diffInMilliseconds: number =
        today.getTime() - createdDate.getTime(); // Use getTime() to get the timestamp
      const diffInDays: number = diffInMilliseconds / (1000 * 60 * 60 * 24); // Convert to days

      latestreportDate = Math.abs(diffInDays);
    }

    return {
      status: true,
      data: result.rows,
      latestreportDate: latestreportDate,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getCategoryModels = async (
  categoryId: any,
  patientId: any,
  doctorId: any,
  hospitalId: any
) => {
  const connection = await DB();

  try {
    const values = [categoryId];

    const result = await connection.query(getSubMainCategoryQuery, values);

    let resultArray = [];

    for (const element of result.rows) {
      const score = await connection.query(getUserScore, [
        patientId,
        element.refQCategoryId,
        hospitalId,
        doctorId,
      ]);

      const UserScoreVerify = await connection.query(getUserScoreVerifyQuery, [
        element.refQCategoryId,
      ]);

      resultArray.push({
        refQCategoryId: element.refQCategoryId,
        UserScoreVerify: UserScoreVerify.rows,
        refCategoryLabel: element.refCategoryLabel,
        refScore: score.rows.length > 0 ? score.rows[0].refPTScore : null,
        refScoreId: score.rows.length > 0 ? score.rows[0].refPTId : null,
      });
    }

    return {
      status: true,
      data: resultArray,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getQuestionsModels = async (
  patientId: any,
  questionId: any,
  userid: any
) => {
  const connection = await DB();

  try {
    const getQuestion = await connection.query(getFirstQuestionQuery, [
      questionId,
    ]);

    const mappedResult = await Promise.all(
      getQuestion.rows.map(async (question) => {
        // Parse options specific to the current question
        const optionsValue = question.refOptions.split(",").map(Number);

        // Fetch options for the current question
        const optionResult = await connection.query(getOptions, [optionsValue]);

        return {
          questionId: question.refQId,
          questionText: question.refQuestion,
          questionType: question.refOptionType,
          options: optionResult.rows, // Specific options for this question
        };
      })
    );

    return {
      status: true,
      questions: mappedResult,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const postAnswersModels = async (
  patientId: any,
  categoryId: any,
  answers: any,
  doctorId: any,
  createdBy: any,
  hospitalId: any
) => {
  const connection = await DB();
  const createdAt = CurrentTime();

  const PTcreatedDate = getDateOnly();

  try {
    await connection.query("BEGIN;");

    const getQuestion = await connection.query(getFirstQuestionQuery, [
      categoryId,
    ]);

    const mappedResult: any = await Promise.all(
      getQuestion.rows.map(async (question) => {
        const optionsValue = question.refOptions.split(",").map(Number);

        const optionResult = await connection.query(getOptions, [optionsValue]);

        return optionResult.rows;
      })
    );

    const map = await connection.query(checkPatientMapQuery, [
      doctorId,
      patientId,
      hospitalId,
    ]);

    const mapId = map.rows[0].refPMId;

    console.log("---------->", categoryId);

    let score = [];
    let multiCategoryId = [];

    if (categoryId === "8") {
      score = PhysicalAactivity(answers);
      multiCategoryId = ["8", "15", "16", "17", "19", "20", "21"];
    } else if (categoryId === "9") {
      score = Stress(answers, mappedResult);
      multiCategoryId = ["9", "25", "26", "27", "28"];
    } else if (categoryId === "10") {
      score = Tabacco(answers);
      multiCategoryId = [
        "10",
        "33",
        "34",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
      ];
    } else if (categoryId === "11") {
      score = Alcohol(answers, mappedResult);
      multiCategoryId = ["11", "29", "30", "31", "32"];
    } else if (categoryId === "12") {
    } else if (categoryId === "13") {
      score = BMI(answers);
      multiCategoryId = ["13", "22", "23", "24"];
    } else if (categoryId === "43") {
      score = Sleep(answers, mappedResult);
      multiCategoryId = ["43", "44", "45", "46", "47", "48", "49", "50"];
    } else if (categoryId === "51") {
      score = FamilyHistory(answers, mappedResult);
      multiCategoryId = ["51"];
    }

    const getlatestPTId = await connection.query(getLatestPTIdQuery);

    let lastestPTId = 1;

    if (getlatestPTId.rows.length > 0) {
      lastestPTId = parseInt(getlatestPTId.rows[0].refPTId) + 1;
    }

    await Promise.all(
      score.map(async (element, index) => {
        console.log(lastestPTId + index, element, multiCategoryId[index]);

        await connection.query(addPatientTransactionQuery, [
          lastestPTId + index,
          mapId,
          element,
          "1",
          PTcreatedDate,
          createdAt,
          createdBy,
        ]);

        await connection.query(addUserScoreDetailsQuery, [
          lastestPTId + index,
          multiCategoryId[index],
          createdAt,
          createdBy,
        ]);
      })
    );

    return {
      status: true,
    };
  } catch (error) {
    await connection.query("ROLLBACK;");
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.query("COMMIT;");
    await connection.end();
  }
};

export const postFamilyUserModel = async (values: any) => {
  const connection = await DB();
  const createdAt = CurrentTime();

  try {
    const getPassword = await connection.query(getPasswordQuery, [
      values.refUserId,
    ]);

    const password = getPassword.rows[0].refUserPassword;
    const hashedPassword = getPassword.rows[0].refUserHashedpass;

    const nextUserIdData = await connection.query(nextUserId);

    await connection.query("BEGIN;");

    const patientId =
      100000 +
      parseInt(
        nextUserIdData.rows[0].nextrefusercustid
          ? nextUserIdData.rows[0].nextrefusercustid
          : 1
      );

    const newUservaluesInsert = [
      "MED" + patientId,
      "3",
      values.refUserFname,
      values.refUserLname,
      values.refDOB,
      values.refGender,
      values.refMaritalStatus,
      values.refEducation,
      values.refProfession,
      values.refSector,
      createdAt,
      values.doctorId,
    ];

    await connection.query(postNewUser, newUservaluesInsert);

    const getuseridVal = await connection.query(getUserId, ["MED" + patientId]);

    const newrefCommunicationValue = [
      getuseridVal.rows[0].refUserId,
      values.refUserMobileno,
      values.refUserEmail,
      values.refAddress,
      values.refDistrict,
      values.refPincode,
      createdAt,
      values.doctorId,
    ];

    await connection.query(postnewCommunication, newrefCommunicationValue);

    const newUserDomainValue = [
      getuseridVal.rows[0].refUserId,
      password,
      hashedPassword,
      createdAt,
      values.doctorId,
    ];

    await connection.query(postnewUserDomain, newUserDomainValue);

    return {
      status: false,
    };
  } catch (error) {
    await connection.query("ROLLBACK;");
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.query("COMMIT;");
    await connection.end();
  }
};

export const getAssistantDoctorModel = async (
  assistantId: any,
  hospitalId: any
) => {
  const connection = await DB();
  try {
    const result = await connection.query(getAssistantDoctorQuery, [
      assistantId,
      hospitalId,
    ]);

    return {
      status: true,
      data: result.rows,
    };
  } catch (error) {
    await connection.query("ROLLBACK;");
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.query("COMMIT;");
    await connection.end();
  }
};

export const resetScoreModel = async (
  refPatientId: any,
  refQCategoryId: any,
  refHospitalId: any,
  doctorId: any
) => {
  const connection = await DB();
  try {
    await connection.query("BEGIN;");

    let multiCategoryId = [];

    console.log(refQCategoryId);

    if (refQCategoryId === 8) {
      multiCategoryId = ["8", "15", "16", "17", "19", "20", "21"];
    } else if (refQCategoryId === 13) {
      multiCategoryId = ["13", "22", "23", "24"];
    } else if (refQCategoryId === 9) {
      multiCategoryId = ["9", "25", "26", "27", "28"];
    } else if (refQCategoryId === 10) {
      multiCategoryId = [
        "10",
        "33",
        "34",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
      ];
    } else if (refQCategoryId === 11) {
      multiCategoryId = ["11", "29", "30", "31", "32"];
    } else if (refQCategoryId === 43) {
      multiCategoryId = ["43", "44", "45", "46", "47", "48", "49", "50"];
    } else if (refQCategoryId === 51) {
      multiCategoryId = ["51"];
    }

    await Promise.all(
      multiCategoryId.map(async (element) => {
        const refScore = await connection.query(getResetScoreRefQuery, [
          refPatientId,
          doctorId,
          refHospitalId,
          element,
        ]);

        await connection.query(resetScoreQuery, [refScore.rows[0].refUSDId]);
        await connection.query(resetPatientTransactionQuery, [
          refScore.rows[0].refPTId,
        ]);
      })
    );

    return {
      status: true,
    };
  } catch (error) {
    await connection.query("ROLLBACK;");
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.query("COMMIT;");
    await connection.end();
  }
};

export const postPastReportModel = async (patientId: any) => {
  const connection = await DB();

  try {
    const values = [patientId];

    const result = await connection.query(postPastReport, values);

    return {
      status: true,
      data: result.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const postCurrentReportModels = async (
  doctorId: any,
  patientId: any
) => {
  const connection = await DB();

  try {
    const result = await connection.query(postCurrentReport, [
      doctorId,
      patientId,
    ]);

    let categoryId = "";
    let categoryLabel = "";

    let isCategoryZeroAvailable = result.rows.some(
      (row) => row.refQCategoryId === "0"
    );

    if (result.rows.length === 0) {
      isCategoryZeroAvailable = true;
    }

    if (!isCategoryZeroAvailable) {
      const validCategory = ["8", "9", "10", "11", "13", "43", "51"];

      for (const element of validCategory) {
        if (!result.rows.some((row: any) => row.refQCategoryId === element)) {
          isCategoryZeroAvailable = false;
          categoryId = element;
          const result = await connection.query(getCatgeoryQuery, [element]);
          categoryLabel = result.rows[0].refCategoryLabel;
          break;
        } else {
          isCategoryZeroAvailable = "report";
        }
      }
    }

    return {
      status: true,
      currentCatgoryStatus: isCategoryZeroAvailable,
      categoryId: categoryId,
      categoryLabel: categoryLabel,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getPastReportModels = async (scoreId: any) => {
  const connection = await DB();

  try {
    const reportDetails = await connection.query(reportDetailsQuery, [scoreId]);

    const questionDetails = await connection.query(questionDetailsQuery, [
      reportDetails.rows[0].createdAt,
      reportDetails.rows[0].refUserId,
    ]);

    return {
      status: true,
      reportDetails: reportDetails.rows[0],
      questionDetails: questionDetails.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getUserScoreVerifyModel = async (categoryId: any) => {
  const connection = await DB();

  try {
    const result = await connection.query(getUserScoreVerifyQuery, [
      categoryId,
    ]);

    console.log(categoryId, result.rows);

    return {
      status: true,
      scoreVerify: result.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getProfileModel = async (userId: any) => {
  const connection = await DB();

  try {
    const result = await connection.query(getProfileQuery, [userId]);

    return {
      status: true,
      data: result.rows[0],
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};
