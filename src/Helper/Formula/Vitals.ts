export const Vitals = (answers: any, mappedResult: any) => {
  answers.sort((a, b) => a.questionId - b.questionId);

  let comp1 = 0;
  let comp2 = "";
  let comp3 = "";
  let comp4 = "No Answer";
  let comp5 = "No Answer";
  let comp6 = 0;
  let comp7 = 0;
  let comp8 = 0;
  let comp9 = 0;
  let comp10 = 0;

  answers.forEach((element: any) => {
    if (element.questionId === 149) {
      comp1 = element.answer;
    } else if (element.questionId === 150) {
      comp2 = mappedResult
        .flat()
        .find(
          (option) => option.refOptionId === element.answer
        )?.refOptionLabel;
    } else if (element.questionId === 151) {
      comp3 = mappedResult
        .flat()
        .find(
          (option) => option.refOptionId === element.answer
        )?.refOptionLabel;
    } else if (element.questionId === 153) {
      let temp = answers.find((element) => element.questionId === 152)
        ? answers.find((element) => element.questionId === 152)
        : 0;

      if (temp.answer === 523) {
        comp4 = mappedResult
          .flat()
          .find(
            (option) => option.refOptionId === element.answer
          )?.refOptionLabel;
      }
    } else if (element.questionId === 154) {
      let temp = answers.find((element) => element.questionId === 152)
        ? answers.find((element) => element.questionId === 152)
        : 0;

      if (temp.answer === 523) {
        comp5 = mappedResult
          .flat()
          .find(
            (option) => option.refOptionId === element.answer
          )?.refOptionLabel;
      }
    } else if (element.questionId === 155) {
      comp6 = element.answer;
    } else if (element.questionId === 156) {
      comp7 = element.answer;
    } else if (element.questionId === 157) {
      comp8 = element.answer;
    } else if (element.questionId === 158) {
      comp9 = element.answer;
    } else if (element.questionId === 159) {
      comp10 = element.answer;
    }
  });

  return [
    0,
    comp1,
    comp2,
    comp3,
    comp4,
    comp5,
    comp6,
    comp7,
    comp8,
    comp9,
    comp10,
  ];
};
