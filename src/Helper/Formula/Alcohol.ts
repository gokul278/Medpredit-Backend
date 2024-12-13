export const Alcohol = (answers: any, mappedResult: any) => {
  let totalMarks = 0;

  let alcoholicscore = 0;
  let hazardousscore = 0;
  let alcoholdependence = 0;
  let harmfulalcoholuse = 0;

  answers.forEach((answer) => {
    const foundOption = mappedResult
      .flat()
      .find((option) => option.refOptionId === answer.answer);
    if (foundOption) {
      const ansquestionId = answer.questionId;

      if (ansquestionId === 31) {
        alcoholicscore += parseInt(foundOption.refOptionMark);
      } else if (ansquestionId === 32 || ansquestionId === 33) {
        hazardousscore += parseInt(foundOption.refOptionMark);
      } else if (
        ansquestionId === 34 ||
        ansquestionId === 35 ||
        ansquestionId === 36
      ) {
        alcoholdependence += parseInt(foundOption.refOptionMark);
      } else if (
        ansquestionId === 37 ||
        ansquestionId === 38 ||
        ansquestionId === 39 ||
        ansquestionId === 40
      ) {
        harmfulalcoholuse += parseInt(foundOption.refOptionMark);
      }

      totalMarks += parseInt(foundOption.refOptionMark, 10);
    }
  });

  return [
    totalMarks,
    alcoholicscore ? "Alcoholic" : "Not an Alcoholic",
    hazardousscore ? "Yes" : "No",
    alcoholdependence ? "Present" : "Absent",
    harmfulalcoholuse ? "Present" : "Absent",
  ];
};
