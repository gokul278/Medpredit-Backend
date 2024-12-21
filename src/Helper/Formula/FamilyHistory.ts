export const FamilyHistory = (answers: any, mappedResult: any) => {
  answers.sort((a, b) => a.questionId - b.questionId);

  let result = [];

  answers.forEach((element, index) => {
    if (index === 0) {
      result.push(0);
    } else {
      result.push(
        mappedResult
          .flat()
          .find((option) => option.refOptionId === element.answer)
          ?.refOptionLabel
      );
    }
  });

  return result;
};
