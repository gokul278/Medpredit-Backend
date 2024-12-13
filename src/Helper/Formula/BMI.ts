export const BMI = (answers: any) => {
  answers.sort((a, b) => a.questionId - b.questionId);

  console.log(answers);
  

  const height:number = answers[0].answer;
  const weight:number = answers[1].answer;
  const waistcircumference:number = answers[2].answer;
  const hipcircumference:number = answers[3].answer;

  const bmi = (weight / Math.pow((height/100), 2)).toFixed(2);

  const ratio = (waistcircumference / hipcircumference).toFixed(2);

  return [bmi, height, weight, ratio];
};
