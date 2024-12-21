export const checkPatientMapQuery = `
SELECT
  *
FROM
  public."refPatientMap" rpm
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(rpm."refDoctorId" AS INTEGER)
WHERE
  rdm."refDoctorId" = $1
  AND rpm."refPatientId" = $2
  AND rdm."refHospitalId" = $3
  `;

export const checkDoctor = `
  SELECT
  *
FROM
  public."refDoctorMap" rdm
WHERE
  rdm."refDoctorId" = $1;
  `;

export const addPatientMapQuery = `
  INSERT INTO
  public."refPatientMap" (
    "refDoctorId",
    "refPatientId",
    "createdAt",
    "createdBy"
  )
VALUES
  ($1, $2, $3, $4);  
  `;

export const getDoctorMap = `
SELECT
  *
FROM
  public."refDoctorMap" rdm
  JOIN public."refHospital" rh ON rh."refHospitalId" = CAST(rdm."refHospitalId" AS INTEGER)
  JOIN public."Users" u ON u."refUserId" = CAST(rdm."refDoctorId" AS INTEGER)
WHERE
  rdm."refHospitalId" = $1
  AND rdm."refDoctorId" = $2
  `;

export const getPatientDetail = `
SELECT
  *
FROM
  public."Users" u
  JOIN public."refCommunication" rc ON rc."refUserId" = CAST(u."refUserId" AS INTEGER)
WHERE
  u."refUserId" = $1;
  `;

export const getAllCategoryQuery = `
SELECT
  *
FROM
  public."refCategory" rc
  `;

export const getAllScoreQuery = `
  SELECT
  *
FROM
  public."refUserScoreDetail" rusd
  JOIN public."refPatientTransaction" rpt ON rpt."refPTId" = CAST(rusd."refPTId" AS INTEGER)
  JOIN public."refPatientMap" rpm ON rpm."refPMId" = CAST(rpt."refPMId" AS INTEGER)
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(rpm."refDoctorId" AS INTEGER)
  WHERE rpm."refPatientId" = $1
  AND rdm."refDoctorId" = $2
  AND DATE (rpt."refPTcreatedDate") = CURRENT_DATE
  `;

export const getParticualarScoreQuery = `
  SELECT
  *
FROM
  public."refUserScoreDetail" rusd
  JOIN public."refPatientTransaction" rpt ON rpt."refPTId" = CAST(rusd."refPTId" AS INTEGER)
  JOIN public."refPatientMap" rpm ON rpm."refPMId" = CAST(rpt."refPMId" AS INTEGER)
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(rpm."refDoctorId" AS INTEGER)
  WHERE rpm."refPatientId" = $1
  AND rdm."refDoctorId" = $2
  AND rdm."refHospitalId" = $3
  AND DATE (rpt."refPTcreatedDate") = $4
  `;

export const getAllScoreVerifyQuery = `
  SELECT
  *
FROM
  public."refUserScoreVerify";
  `;

export const getStressAnswerQuery = `
  SELECT
  *
FROM
  public."refOptions" ro
WHERE
  ro."refQCategoryId" = '9'
  AND (
    ro."forwardQId" = '0'
    OR ro."forwardQId" = '28'
    OR ro."forwardQId" = '29'
    OR ro."forwardQId" = '30'
  )
  `;

export const getDoctorPatientMapQuery = `
  SELECT
  *
FROM
  public."refPatientMap" rpm
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(rpm."refDoctorId" AS INTEGER)
WHERE
  rpm."refPatientId" = $1
  AND rdm."refDoctorId" = $2
  AND rdm."refHospitalId" = $3
  `;

export const getPatientDetailsReport = `
  SELECT
  u.*,
  rpt."refPTcreatedDate"
FROM
  public."refPatientTransaction" rpt
  JOIN public."refUserScoreDetail" rusd ON rusd."refPTId" = CAST(rpt."refPTId" AS TEXT)
  JOIN public."refPatientMap" rpm ON rpm."refPMId" = CAST(rpt."refPMId" AS INTEGER)
  JOIN public."Users" u ON u."refUserId" = CAST(rpm."refPatientId" AS INTEGER)
WHERE
  DATE (rpt."refPTcreatedDate") = $1
  AND u."refUserId" = $2
  AND rusd."refQCategoryId" = '0'
  `;

export const getDoctorDetailsReport = `
  SELECT
  u.*,
  rc.*,
  rsd.*,
  rh.*
FROM
  public."refPatientTransaction" rpt
  JOIN public."refUserScoreDetail" rusd ON rusd."refPTId" = CAST(rpt."refPTId" AS TEXT)
  JOIN public."refPatientMap" rpm ON rpm."refPMId" = CAST(rpt."refPMId" AS INTEGER)
  JOIN public."Users" u ON u."refUserId" = CAST(rpm."refDoctorId" AS INTEGER)
  JOIN public."refCommunication" rc ON rc."refUserId" = CAST(u."refUserId" AS INTEGER)
  JOIN public."refStaffDomain" rsd ON rsd."refUserId" = CAST(u."refUserId" AS INTEGER)
  JOIN public."refDoctorMap" rdm ON rdm."refHospitalId" = CAST(rpm."refDoctorId" AS TEXT)
  JOIN public."refHospital" rh ON rh."refHospitalId" = CAST(rdm."refHospitalId" AS INTEGER)
WHERE
  DATE (rpt."refPTcreatedDate") = $1
  AND rusd."refQCategoryId" = '0'
  AND rpm."refPatientId" = $2
  `;

export const getScoreReport = `
  SELECT
  *
FROM
  public."refPatientTransaction" rpt
  JOIN public."refUserScoreDetail" rusd ON rusd."refPTId" = CAST(rpt."refPTId" AS TEXT)
  JOIN public."refPatientMap" rpm ON rpm."refPMId" = CAST(rpt."refPMId" AS INTEGER)
WHERE
  DATE (rpt."refPTcreatedDate") = $1
  AND rpm."refPatientId" = $2
  `;

export const getScoreVerifyReport = `
  SELECT
  *
FROM
  public."refUserScoreVerify"
  `;

export const getAllCategoryFamilyHistory = `
  SELECT * FROM public."refCategory" rc WHERE rc."refQSubCategory" = '51'
  `;
