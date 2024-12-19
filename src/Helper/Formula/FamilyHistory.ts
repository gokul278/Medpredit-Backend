export const FamilyHistory = (answers: any, mappedResult: any) => {
  const q1 = answers.find((element) => element.questionId === 114)
    ? answers.find((element) => element.questionId === 114)
    : 0;

  const q1ans =
    mappedResult.flat().find((option) => option.refOptionId === q1.answer)
      ?.refOptionMark || 0;

  return [q1ans];
};
