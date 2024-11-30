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
  rct."refSubCategory" = '0'`;

export const getSubMainCategoryQuery = `SELECT
 rct."refQCategoryId",
 rct."refCategoryLabel"
FROM
  public."refCategory" rct
WHERE
  rct."refSubCategory" = $1`;

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
SELECT ro."refOptionId", ro."refOptionLabel", ro."forwardQId", ro."backwardQId"
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

export const addScores = `
INSERT INTO public."refUserScore" (
"refUserId",
"refQCategoryId",
"refTotalScore",
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

export const getUserScore = `
SELECT
  *
FROM
  public."refUserScore" rus
WHERE
  rus."refUserId" = $1
  AND rus."refQCategoryId" = $2
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
JOIN 
    public."Users" u ON CAST(ram."refDoctorId" AS TEXT) = CAST(u."refUserId" AS TEXT)
WHERE 
    ram."refAssId" = $1;
`;
