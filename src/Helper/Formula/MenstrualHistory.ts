export const MenstrualHistory = (answers: any, mappedResult: any) => {
  answers.sort((a, b) => a.questionId - b.questionId);

  let result: any = ["0"];

  for (let index = 0; index < answers.length; index++) {
    const element = answers[index];
    if (element.questionId === 77) {
      if (element.answer === 241 || element.answer === 242) {
        const matchingOption = mappedResult
          .flat()
          .find((option) => option.refOptionId === element.answer);
        if (matchingOption) {
          result.push(
            matchingOption.refOptionLabel ? matchingOption.refOptionLabel : "0"
          );
        }
      } else if (element.answer === 243) {
        if (answers[index + 1].answer <= 21) {
          result.push("Increased frequency");
        } else if (
          answers[index + 1].answer >= 22 &&
          answers[index + 1].answer <= 44
        ) {
          result.push("Frequency within normal range");
        } else if (answers[index + 1].answer >= 45) {
          result.push("Decreased frequency");
        }
      }
    } else if (element.questionId === 79) {
      if (element.answer < 2) {
        result.push("Decreased");
      } else if (element.answer >= 2 && element.answer <= 5) {
        result.push("Within normal range");
      } else if (element.answer > 5) {
        result.push("Increased duration");
      }
    } else if (element.questionId === 80) {
      if (element.answer === 246) {
        result.push("Heavy flow");
      } else if (element.answer === 247) {
        result.push("No Problem");
      }
    } else if (element.questionId === 81) {
      if (element.answer === 248) {
        result.push("Present");
      } else if (element.answer === 249) {
        result.push("Absent");
      }
    } else if (element.questionId === 82) {
      if (element.answer === 250) {
        result.push("Present");
      } else if (element.answer === 251) {
        result.push("Absent");
      }
    } else if (element.questionId === 83) {
      result.push(element.answer);
    } else if (element.questionId === 84) {
      result.push(element.answer);
    }
  }
  

  return result;
};
