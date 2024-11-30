export const usersigninQuery = `SELECT * FROM 
public."refCommunication" rc
JOIN public."Users" u
ON rc."refUserId" = u."refUserId"
JOIN public."refUserDomain" rud
ON rc."refUserId" = rud."refUserId"
WHERE rc."refUserMobileno" = $1`;

export const patientDataCheckQuery = `SELECT
  COUNT(*) > 0 AS result
FROM
  public."Users" u
  JOIN public."refCommunication" rc ON rc."refUserId" = u."refUserId"
WHERE
  (
    u."refUserId" IS NULL
    OR CAST(u."refUserId" AS TEXT) = ''
    OR u."refUserCustId" IS NULL
    OR u."refUserCustId" = ''
    OR u."refRoletype" IS NULL
    OR CAST(u."refRoletype" AS TEXT) = ''
    OR u."refHospitalId" IS NULL
    OR CAST(u."refHospitalId" AS TEXT) = ''
    OR u."refUserFname" IS NULL
    OR u."refUserFname" = ''
    OR u."refUserLname" IS NULL
    OR u."refUserLname" = ''
    OR u."refDOB" IS NULL
    OR u."refDOB" = ''
    OR u."refGender" IS NULL
    OR u."refGender" = ''
    OR u."refMaritalStatus" IS NULL
    OR u."refMaritalStatus" = ''
    OR u."refEducation" IS NULL
    OR u."refEducation" = ''
    OR u."refProfession" IS NULL
    OR u."refProfession" = ''
    OR rc."refUserMobileno" IS NULL
    OR rc."refUserMobileno" = ''
    OR rc."refUserEmail" IS NULL
    OR rc."refUserEmail" = ''
    OR rc."refAddress" IS NULL
    OR rc."refAddress" = ''
    OR rc."refPincode" IS NULL
    OR rc."refPincode" = ''
  )
  AND u."refUserId" = $1;`;

export const doctorDataCheckQuery = `SELECT
  COUNT(*) > 0 AS result
FROM
  public."Users" u
  JOIN public."refCommunication" rc ON rc."refUserId" = u."refUserId"
  JOIN public."refStaffDomain" rsd ON rsd."refUserId"= u."refUserId"
WHERE
  (
    u."refUserId" IS NULL
    OR CAST(u."refUserId" AS TEXT) = ''
    OR u."refUserCustId" IS NULL
    OR u."refUserCustId" = ''
    OR u."refRoletype" IS NULL
    OR CAST(u."refRoletype" AS TEXT) = ''
    OR u."refHospitalId" IS NULL
    OR CAST(u."refHospitalId" AS TEXT) = ''
    OR u."refUserFname" IS NULL
    OR u."refUserFname" = ''
    OR u."refUserLname" IS NULL
    OR u."refUserLname" = ''
    OR u."refDOB" IS NULL
    OR u."refDOB" = ''
    OR u."refGender" IS NULL
    OR u."refGender" = ''
    OR u."refMaritalStatus" IS NULL
    OR u."refMaritalStatus" = ''
    OR u."refEducation" IS NULL
    OR u."refEducation" = ''
    OR u."refProfession" IS NULL
    OR u."refProfession" = ''
    OR rc."refUserMobileno" IS NULL
    OR rc."refUserMobileno" = ''
    OR rc."refUserEmail" IS NULL
    OR rc."refUserEmail" = ''
    OR rc."refAddress" IS NULL
    OR rc."refAddress" = ''
    OR rc."refPincode" IS NULL
    OR rc."refPincode" = ''
    OR rsd."refAllopathic" IS NULL
    OR rsd."refAllopathic" = ''
    OR rsd."refMedicalCouncil" IS NULL
    OR rsd."refMedicalCouncil" = ''
    OR rsd."refMCIno" IS NULL
    OR rsd."refMCIno" = ''
    OR rsd."refCRSector" IS NULL
    OR rsd."refCRSector" = ''
    OR rsd."refCRInstitute" IS NULL
    OR rsd."refCRInstitute" = ''
    OR rsd."refCRDesignation" IS NULL
    OR rsd."refCRDesignation" = ''
    OR rsd."refCRDepartment" IS NULL
    OR rsd."refCRDepartment" = ''
    OR rsd."refCRAddress" IS NULL
    or rsd."refCRAddress" = ''
  )
  AND u."refUserId" = $1;`;
