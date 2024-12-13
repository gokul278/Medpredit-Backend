export const Dietary = (answers: any, mappedResult: any) => {
  let totalMarks = 0;

  answers.forEach((answer) => {
    if (answer.questionId === 48) {
      const salt = answers.find((item) => item.questionId === 47);

      const result = parseInt(salt) / (30 * answer.answer);

      if (result <= 5) {
        totalMarks += 1;
      } else if (result > 5) {
        totalMarks += 2;
      }
    } else if (answer.questionId === 51) {
      const result = answer.answer;
      if (result <= 5) {
        totalMarks += 1;
      } else if (result > 5) {
        totalMarks += 2;
      }
    } else {
      const foundOption = mappedResult
        .flat()
        .find((option) => option.refOptionId === answer.answer);
      if (foundOption) {
        console.log(foundOption);

        totalMarks += parseInt(foundOption.refOptionMark, 10);
      } else {
        console.log(`Answer ${answer.answer} not found in options.`);
      }
    }
  });

  return totalMarks;
};
