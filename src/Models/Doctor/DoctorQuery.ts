export const checkPatientMapQuery = `
SELECT
  *
FROM
  public."refPatientMap" rpm
  JOIN public."refDoctorMap" rdm ON rdm."refDMId" = CAST(rpm."refDoctorId" AS INTEGER)
WHERE
  rdm."refDoctorId" = $1
  AND rpm."refPatientId" = $2
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
  public."refDoctorMap"
WHERE
  "refHospitalId" = $1
  AND "refDoctorId" = $2
  `;
