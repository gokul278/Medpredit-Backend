export const getPatientDataQuery = `SELECT
  *
FROM
  public."refCommunication" rc
  JOIN public."Users" u ON u."refUserId" = rc."refUserId"
WHERE
  rc."refUserMobileno" = $1 AND u."refRoleId" = 3`;

export const nextUserId = `
SELECT 
  COUNT(*) + 1 AS NextrefUserCustId
FROM 
  public."Users" us
WHERE 
  us."refRoleId" = 3;`;

export const postNewUser = `
  INSERT INTO
  public."Users" (
    "refUserCustId",
    "refRoleId",
    "refUserFname",
    "refUserLname",
    "refDOB",
    "refGender",
    "refMaritalStatus",
    "refEducation",
    "refOccupationLvl",
    "refSector",
    "createdAt",
    "createdBy"
  )
VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
`;

export const getUserId = `
SELECT * FROM public."Users" u WHERE u."refUserCustId" = $1`;

export const postnewCommunication = `
INSERT INTO public."refCommunication" (
  "refUserId",
  "refUserMobileno",
  "refUserEmail",
  "refAddress",
  "refDistrict",
  "refPincode",
  "createdAt",
  "createdBy"
) VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  $8
);
`;

export const postnewUserDomain = `
INSERT INTO public."refUserDomain" (
  "refUserId",
  "refUserPassword",
  "refUserHashedpass",
  "createdAt",
  "createdBy"
) VALUES (
  $1,
  $2,
  $3,
  $4,
  $5
);
`;

export const getMainCategoryQuery = `SELECT
 rct."refQCategoryId",
 rct."refCategoryLabel"
FROM
  public."refCategory" rct
WHERE
  rct."refQSubCategory" = '0'`;

export const getSubMainCategoryQuery = `
SELECT
  rct."refQCategoryId",
  rct."refCategoryLabel"
FROM
  public."refCategory" rct
WHERE
  rct."refQSubCategory" = $1`;

export const getFirstQuestionQuery = `
SELECT
  *
FROM
  public."refQuestions" ro
WHERE
  ro."refQCategoryId" = $1
ORDER BY
  ro."refQId"
`;

export const getOptions = `
SELECT ro."refOptionId", ro."refOptionLabel", ro."forwardQId", ro."backwardQId", ro."refOptionMark"
FROM public."refOptions" ro 
WHERE ro."refOptionId" = ANY($1);
`;

export const getAnswers = `
SELECT * FROM public."refUserAnswers" rua WHERE rua."refUserId" = $1 AND rua."refQId" = $2
`;

export const addOptions = `
INSERT INTO
  public."refUserAnswers" (
    "refUserId",
    "refQCategoryId",
    "refQId",
    "refAnswer",
    "createdAt",
    "createdBy"
  )
VALUES
  ($1, $2, $3, $4, $5, $6)
;`;

export const updateOptions = `
UPDATE
  public."refUserAnswers"
SET
  "refAnswer" = $1,
  "updatedAt" = $2,
  "updatedBy" = $3
WHERE
  "refUserId" = $4
  AND "refQId" = $5
`;

export const getLatestPTIdQuery = `
SELECT
  rpt."refPTId"
FROM
  public."refPatientTransaction" rpt
ORDER BY
  rpt."refPTId" DESC;
`;

export const addPatientTransactionQuery = `
insert into
  public."refPatientTransaction" (
    "refPTId",
    "refPMId",
    "refPTScore",
    "refPTStatus",
    "refPTcreatedDate",
    "createdAt",
    "createdBy"
  )
values
  ($1, $2, $3, $4, $5, $6, $7)
`;

export const addUserScoreDetailsQuery = `
insert into
  public."refUserScoreDetail" (
    "refPTId",
    "refQCategoryId",
    "createdAt",
    "createdBy"
  )
values
  ($1, $2, $3, $4)
`;

export const getUserScore = `
SELECT
  *
FROM
  public."refUserScoreDetail" rusd
  JOIN public."refPatientTransaction" rpt ON rpt."refPTId" = CAST(rusd."refPTId" AS INTEGER)
  JOIN public."refPatientMap" rpm ON rpm."refPMId" = CAST(rpt."refPMId" AS INTEGER)
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(rpm."refDoctorId" AS INTEGER)
WHERE
  rpm."refPatientId" = $1
  AND rusd."refQCategoryId" = $2
  AND rdm."refHospitalId" = $3
  AND rdm."refDoctorId" = $4
  AND DATE (rpt."refPTcreatedDate") = CURRENT_DATE
`;

export const getPasswordQuery = `
SELECT
  *
FROM
  public."refUserDomain"
WHERE
  "refUserId" = $1
`;

export const getAssistantDoctorQuery = `
SELECT
  ram."refAMId",
  ram."refDoctorId",
  ram."refAssId",
  u."refUserFname" AS "DoctorFirstName",
  u."refUserLname" AS "DoctorLastName"
FROM
  public."refAssMap" ram
  JOIN public."Users" u ON CAST(ram."refDoctorId" AS TEXT) = CAST(u."refUserId" AS TEXT)
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(ram."refDoctorId" AS INTEGER)
WHERE
  ram."refAssId" = $1
  AND rdm."refHospitalId" = $2
`;

export const getResetScoreRefQuery = `
SELECT
  *
FROM
  public."refUserScoreDetail" rusd
  JOIN public."refPatientTransaction" rpt ON rpt."refPTId" = CAST(rusd."refPTId" AS INTEGER)
  JOIN public."refPatientMap" rpm ON rpm."refPMId" = CAST(rpt."refPMId" AS INTEGER)
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(rpm."refDoctorId" AS INTEGER)
WHERE
  rpm."refPatientId" = $1
  AND rdm."refDoctorId" = $2
  AND rdm."refHospitalId" = $3
  AND rusd."refQCategoryId" = $4
  AND DATE (rpt."refPTcreatedDate") = CURRENT_DATE
`;

export const resetScoreQuery = `
DELETE FROM
  public."refUserScoreDetail" rusd
WHERE
  rusd."refUSDId" = $1;
`;

export const resetPatientTransactionQuery = `
DELETE FROM
  public."refPatientTransaction" rpt
WHERE
  rpt."refPTId" = $1;
`;

export const postPastReport = `
SELECT
  rus."refUSDId",
  rpm."refPatientId",
  rus."refQCategoryId",
  rpt."refPTScore",
  TO_CHAR(CAST(rus."createdAt" AS TIMESTAMP), 'DD-MM-YYYY') AS "createdAt",
  rpm."refDoctorId",
  (
    SELECT
      u."refUserFname" || ' ' || u."refUserLname"
    FROM
      public."Users" u
    WHERE
      u."refUserId" = CAST(rpm."refDoctorId" AS INTEGER)
  ) AS doctorName,
  rdm."refHospitalId",
  (
    SELECT
      rh."refHospitalName"
    FROM
      public."refHospital" rh
    WHERE
      rh."refHospitalId" = CAST(rdm."refHospitalId" AS INTEGER)
  ) AS hospitalName,
  (
    SELECT
      rh."refHospitalAddress"
    FROM
      public."refHospital" rh
    WHERE
      rh."refHospitalId" = CAST(rdm."refHospitalId" AS INTEGER)
  ) AS hospitalAddress,
  (
    SELECT
      rh."refHospitalPincode"
    FROM
      public."refHospital" rh
    WHERE
      rh."refHospitalId" = CAST(rdm."refHospitalId" AS INTEGER)
  ) AS hospitalPincode
FROM
  public."refUserScoreDetail" rus
  JOIN public."refPatientTransaction" rpt ON rpt."refPTId" = CAST(rus."refPTId" AS INTEGER)
  JOIN public."refPatientMap" rpm ON rpm."refPMId" = CAST(rpt."refPMId" AS INTEGER)
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(rpm."refDoctorId" AS INTEGER)
WHERE
  rpm."refPatientId" = $1
  AND rus."refQCategoryId" = '0'
  AND DATE(rpt."refPTcreatedDate") <= CURRENT_DATE
  ORDER BY rus."refUSDId" DESC
`;

export const postCurrentReport = `
SELECT
  *
FROM
  public."refUserScoreDetail" rusd
  JOIN public."refPatientTransaction" rpt ON rpt."refPTId" = CAST(rusd."refPTId" AS INTEGER)
  JOIN public."refPatientMap" rpm ON rpm."refPMId" = CAST(rpt."refPMId" AS INTEGER)
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(rpm."refDoctorId" AS INTEGER)
WHERE
  rdm."refHospitalId" = '1'
  AND rdm."refDoctorId" = $1
  AND rpm."refPatientId" = $2
  AND DATE(rusd."createdAt") = CURRENT_DATE;
`;

export const getCatgeoryQuery = `
SELECT
  rc."refCategoryLabel"
FROM
  public."refCategory" rc
WHERE
  rc."refQCategoryId" = $1
`;

export const reportDetailsQuery = `
 SELECT
  rus."refScoreId",
  rus."refUserId",
  rus."refQCategoryId",
  rus."refTotalScore",
  TO_CHAR(CAST(rus."createdAt" AS TIMESTAMP), 'DD-MM-YYYY') AS "createdAt",
  rpm."refDoctorId",
  (
    SELECT
      u."refUserFname" || ' ' || u."refUserLname"
    FROM
      public."Users" u
    WHERE
      u."refUserId" = CAST(rpm."refDoctorId" AS INTEGER)
  ) AS doctorName,
  rdm."refHospitalId",
  (
    SELECT
      rh."refHospitalName"
    FROM
      public."refHospital" rh
    WHERE
      rh."refHospitalId" = CAST(rdm."refHospitalId" AS INTEGER)
  ) AS hospitalName,
  (
    SELECT
      rh."refHospitalAddress"
    FROM
      public."refHospital" rh
    WHERE
      rh."refHospitalId" = CAST(rdm."refHospitalId" AS INTEGER)
  ) AS hospitalAddress,
  (
    SELECT
      rh."refHospitalPincode"
    FROM
      public."refHospital" rh
    WHERE
      rh."refHospitalId" = CAST(rdm."refHospitalId" AS INTEGER)
  ) AS hospitalPincode
FROM
  public."refUserScoreDetail" rus
  JOIN public."refPatientMap" rpm ON rpm."refPMId" = CAST(rus."refPMId" AS INTEGER)
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(rpm."refDoctorId" AS INTEGER)
WHERE
  rus."refScoreId" = $1
`;

export const questionDetailsQuery = `
SELECT
  rc."refQCategoryId",
  rc."refCategoryLabel",
  rc."refQSubCategory",
  rus."refTotalScore"
FROM
  public."refCategory" rc
LEFT JOIN
  public."refUserScoreDetail" rus
ON
  CAST(rus."refQCategoryId" AS INTEGER) = rc."refQCategoryId"
  AND DATE(rus."createdAt") = $1
  AND rus."refUserId" = $2;
`;

export const getUserScoreVerifyQuery = `
SELECT
  *
FROM
  public."refUserScoreVerify" rusv
WHERE
  rusv."refQCategoryId" = $1
`;

export const getProfileQuery = `
SELECT
  u."refUserCustId",
  (CASE 
     WHEN u."refRoleId" = 1 THEN 'Dr. ' 
     ELSE '' 
   END) || u."refUserFname" || ' ' || u."refUserLname" AS "refUserName",
  u."refRoleId"
FROM
  public."Users" u
WHERE
  u."refUserId" = $1;
  `;
