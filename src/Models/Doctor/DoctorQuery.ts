export const checkPatientMapQuery = `
SELECT
  *
FROM
  public."refPatientMap"
WHERE
  "refDoctorId" = $1
  AND "refPatientId" = $2
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
