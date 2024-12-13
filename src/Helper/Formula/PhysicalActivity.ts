export const PhysicalAactivity = (answers: any) => {
  answers.sort((a, b) => a.questionId - b.questionId);

  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;
  let e = 0;

  let PhysicalActivityScore: any = 0;

  let reclaining: any = 0;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].questionId === 1 && answers[i].answer === 1) {
      const days = answers[i + 1].answer;
      const [hrs, mins] = answers[i + 2].answer.split(":");

      a = parseInt(days) * (parseInt(hrs) * 60 + parseInt(mins));

      i += 2;
    } else if (answers[i].questionId === 4 && answers[i].answer === 5) {
      const days = answers[i + 1].answer;
      const [hrs, mins] = answers[i + 2].answer.split(":");

      b = parseInt(days) * (parseInt(hrs) * 60 + parseInt(mins));

      i += 2;
    } else if (answers[i].questionId === 7 && answers[i].answer === 9) {
      const days = answers[i + 1].answer;
      const [hrs, mins] = answers[i + 2].answer.split(":");

      c = parseInt(days) * (parseInt(hrs) * 60 + parseInt(mins));

      i += 2;
    } else if (answers[i].questionId === 10 && answers[i].answer === 13) {
      const days = answers[i + 1].answer;
      const [hrs, mins] = answers[i + 2].answer.split(":");

      d = parseInt(days) * (parseInt(hrs) * 60 + parseInt(mins));

      i += 2;
    } else if (answers[i].questionId === 13 && answers[i].answer === 17) {
      const days = answers[i + 1].answer;
      const [hrs, mins] = answers[i + 2].answer.split(":");

      e = parseInt(days) * (parseInt(hrs) * 60 + parseInt(mins));

      i += 2;
    } else if (answers[i].questionId === 16) {
      // console.log(answers[i].answer);

      const hrs = answers[i].answer.split(":")[0];
      const mins = answers[i].answer.split(":")[1];

      reclaining = answers[i].answer;

      const totalhours = parseFloat(hrs) + (parseFloat(mins) / 60);
      console.log("------------->",answers[i].answer);

      if (totalhours > 8) {
        PhysicalActivityScore = "Risk";
      } else {
        PhysicalActivityScore = a + b + c + d + e;
      }
    }
  }

  

  const workVigorous = a;
  const workModerate = b;
  const Bicycle = c;
  const LiesureVigorous = d;
  const LiesureModerate = e;

  return [
    PhysicalActivityScore,
    workVigorous,
    workModerate,
    Bicycle,
    LiesureVigorous,
    LiesureModerate,
    reclaining,
  ];
};
