export const Stress = (answers: any[], mappedResult: any[]) => {
  let totalMarks = 0;

  let caused = "";
  let felt = [];
  let acted = [];
  let feelbetter = "";

  answers.forEach((answer) => {
    if (answer.questionId === 27) {
      caused = answer.answer;
    } else if (answer.questionId === 28) {
      felt.push(answer.answer);
    } else if (answer.questionId === 29) {
      acted.push(answer.answer);
    } else if (answer.questionId === 30) {
      feelbetter = answer.answer;
    }

    const foundOption = mappedResult
      .flat()
      .find((option) => option.refOptionId === answer.answer);
    if (foundOption) {
      totalMarks += parseInt(foundOption.refOptionMark, 10);
    }
  });

  return [totalMarks, caused, felt, acted, feelbetter];
};
