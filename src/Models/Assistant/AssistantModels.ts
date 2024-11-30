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
  getAnswers,
  addOptions,
  updateOptions,
  getFirstQuestionQuery,
  addScores,
  getUserScore,
  getPasswordQuery,
  getAssistantDoctorQuery
} = require("./AssistantQuery");

const { checkPatientMapQuery } = require("../Doctor/DoctorQuery");
const { CurrentTime } = require("../../Helper/CurrentTime");

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

export const getMainCategoryModels = async (doctorId: any, patientId: any) => {
  const connection = await DB();

  try {
    const checkPatient = await connection.query(checkPatientMapQuery, [
      doctorId,
      parseInt(patientId),
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

export const getSubMainCategoryModels = async (categoryId: any) => {
  const connection = await DB();

  try {
    const values = [categoryId];

    const result = await connection.query(getSubMainCategoryQuery, values);

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

export const getCategoryModels = async (categoryId: any, patientId: any) => {
  const connection = await DB();

  try {
    const values = [categoryId];

    const result = await connection.query(getSubMainCategoryQuery, values);

    let resultArray = [];

    for (const element of result.rows) {
      const score = await connection.query(getUserScore, [
        patientId,
        element.refQCategoryId,
      ]);

      resultArray.push({
        refQCategoryId: element.refQCategoryId,
        refCategoryLabel: element.refCategoryLabel,
        refScore: score.rows.length > 0 ? score.rows[0].refTotalScore : null,
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
  hospitalId: any
) => {
  const connection = await DB();
  const createdAt = CurrentTime();

  try {
    await connection.query("BEGIN;");

    for (const element of answers) {
      // Await the query to resolve the promise
      const CheckOption = await connection.query(getAnswers, [
        patientId,
        element.questionId.toString(),
      ]);

      if (CheckOption.rows.length > 0) {
        const answerValue = [
          element.answer,
          createdAt,
          doctorId,
          patientId,
          element.questionId,
        ];
        await connection.query(updateOptions, answerValue);
      } else {
        const answerValue = [
          patientId,
          categoryId,
          element.questionId,
          element.answer,
          createdAt,
          doctorId,
        ];
        await connection.query(addOptions, answerValue);
      }
    }

    await connection.query(addScores, [
      patientId,
      categoryId,
      100,
      createdAt,
      doctorId,
    ]);

    await connection.query("COMMIT;");

    return {
      status: true,
    };
  } catch (error) {
    await connection.query("ROLLBACK;");
    console.error("Something went Wrong", error);
    throw error;
  } finally {
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

export const getAssistantDoctorModel = async (assistantId:any) => {
  const connection = await DB();
  try{

    const result  = await connection.query(getAssistantDoctorQuery, [assistantId])

    return({
      status:true,
      data: result.rows
    })

  }catch (error) {
    await connection.query("ROLLBACK;");
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.query("COMMIT;");
    await connection.end();
  }
};
