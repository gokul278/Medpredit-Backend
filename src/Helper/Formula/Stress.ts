export const Stress = (answers: any[], mappedResult: any[]) => {
  let totalMarks = 0;

  let caused = "";
  let felt = "";
  let acted = "";
  let feelbetter = "";

  answers.forEach((answer) => {
    if (answer.questionId === 27) {
      caused += answer.answer + ",";
    } else if (answer.questionId === 28) {
      felt += answer.answer + ",";
    } else if (answer.questionId === 29) {
      acted += answer.answer + ",";
    } else if (answer.questionId === 30) {
      feelbetter += answer.answer + ",";
    }

    const foundOption = mappedResult
      .flat()
      .find((option) => option.refOptionId === answer.answer);
    if (foundOption) {
      totalMarks += parseInt(foundOption.refOptionMark, 10);
    }
  });

  caused = caused.slice(0, -1);
  felt = felt.slice(0, -1);
  acted = acted.slice(0, -1);
  feelbetter = feelbetter.slice(0, -1);

  return [totalMarks, caused, felt, acted, feelbetter];
};
