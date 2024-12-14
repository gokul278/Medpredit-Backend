export const Tabacco = (answers: any) => {
  let tobacco = "Risk";
  let smokingtobacco = "";
  let smokelesstobaccouse = "";
  let home = "";
  let workplace = "";
  let attitudetoward = "";
  let packyear = 0;
  let riskpackyear = "";
  let riskpastsmoking = "";
  let highrisksmokeless = "No";

  const q1 = answers.find((element) => element.questionId === 56)
    ? answers.find((element) => element.questionId === 56).answer
    : 0;
  const q2 = answers.find((element) => element.questionId === 57)
    ? answers.find((element) => element.questionId === 57).answer
    : 0;
  const q3 = answers.find((element) => element.questionId === 58)
    ? answers.find((element) => element.questionId === 58).answer
    : 0;
  const q4 = answers.find((element) => element.questionId === 60)
    ? answers.find((element) => element.questionId === 60).answer
    : 0;
  const q5 = answers.find((element) => element.questionId === 62)
    ? answers.find((element) => element.questionId === 62).answer
    : 0;
  const q6 = answers.find((element) => element.questionId === 63)
    ? answers.find((element) => element.questionId === 63).answer
    : 0;
  const q7 = answers.find((element) => element.questionId === 64)
    ? answers.find((element) => element.questionId === 64).answer
    : 0;
  const q8 = answers.find((element) => element.questionId === 65)
    ? answers.find((element) => element.questionId === 65).answer
    : 0;
  const q9 = answers.find((element) => element.questionId === 66)
    ? answers.find((element) => element.questionId === 66).answer
    : 0;
  const q10 = answers.find((element) => element.questionId === 67)
    ? answers.find((element) => element.questionId === 67).answer
    : 0;
  const q11 = answers.find((element) => element.questionId === 68)
    ? answers.find((element) => element.questionId === 68).answer
    : 0;
  const q14 = answers.find((element) => element.questionId === 73)
    ? answers.find((element) => element.questionId === 73).answer
    : 0;
  const q15 = answers.find((element) => element.questionId === 74)
    ? answers.find((element) => element.questionId === 74).answer
    : 0;
  const q16 = answers.find((element) => element.questionId === 75)
    ? answers.find((element) => element.questionId === 75).answer
    : 0;
  const q17 = answers.find((element) => element.questionId === 76)
    ? answers.find((element) => element.questionId === 76).answer
    : 0;

  //Calculate Smoking Tobacco
  if (q1 === 195) {
    smokingtobacco = "Current smoker"; //Current smoker
  }

  if (q2 === 197) {
    smokingtobacco = "Habitual current  smoker"; //Habitual current  smoker
    highrisksmokeless = "Yes";
  }

  if (q1 === 196 && q7 === 214) {
    smokingtobacco = "Past smoker"; //Past smoker
  }

  if (q8 === 216) {
    smokingtobacco = "Habitual past smoker"; //Habitual past smoker
  }

  if (q1 === 196 && q7 === 215 && q16 === 238 && q17 === 240) {
    smokingtobacco = "Non smoker"; // non smoker
    tobacco = "No Risk";
  }

  //Calculate Smokeless Tobacco Uage
  if (q10 === 219) {
    smokelesstobaccouse = "Current user";
  }

  if (q11 === 221) {
    smokelesstobaccouse = "Habitual current  user";
  }

  if (q10 === 220 && q14 === 233) {
    smokelesstobaccouse = "Past user";
  }

  if (q15 === 235) {
    smokelesstobaccouse = "Habitual past smoker";
  }

  if (q10 === 220 && q14 === 234) {
    smokelesstobaccouse = "Non user";
  }

  //Passive Smoking

  //Home
  if (q16) {
    if (q16 === 237) {
      home = "At Risk";
    } else if (q16 === 238) {
      home = "Not a Risk";
    }
  }

  //WorkPlace
  if (q17) {
    if (q17 === 239) {
      workplace = "At Risk";
    } else if (q17 === 240) {
      workplace = "Not a Risk";
    }
  }

  // Attitude towards
  if (q5 === 209) attitudetoward = "Willing to quit";
  if (q6 === 211) attitudetoward = "Adviced to quit";
  if (q5 === 210 && (q6 === 212 || q6 === 213)) {
    attitudetoward = "Neither willing nor advised to quit";
  }

  //   Calculate Pack Years

  if (q3 && q2) {
    const a = parseInt(q3, 10) / 52; // Ensure proper radix for parseInt
    let b = 0;

    // Calculate b based on q2
    if (q2 === 197) {
      b = parseInt(q4, 10);
    } else if (q2 === 198) {
      b = parseInt(q4, 10) / 7;
    }

    // Calculate packyear
    packyear = (a * b) / 20;

    // Determine risk level
    if (isNaN(packyear) || packyear === 0) {
      riskpackyear = "No Risk";
    } else if (packyear > 0 && packyear <= 1) {
      riskpackyear = "Low Risk";
    } else if (packyear > 1 && packyear <= 5) {
      riskpackyear = "Moderate Risk";
    } else if (packyear > 5) {
      riskpackyear = "Severe Risk";
    }
  }

  //Calculate Risk of Past Smoking
  if (q9) {
    let c = parseInt(q9) / 52;

    if (c < 5) {
      riskpastsmoking = "Low risk of past smoking";
    } else if (c >= 5 && c <= 10) {
      riskpastsmoking = "Moderate risk of past smoking";
    } else if (c > 10) {
      riskpastsmoking = "High risk of past smoking";
    }
  }

  console.log(q9);

  console.log("1", tobacco);
  console.log("2", smokingtobacco);
  console.log("3", smokelesstobaccouse);
  console.log("4", home);
  console.log("5", workplace);
  console.log("6", attitudetoward);
  console.log("7", packyear);
  console.log("8", riskpackyear);
  console.log("9", riskpastsmoking);
  console.log("10", highrisksmokeless);

  return [
    tobacco,
    smokingtobacco,
    smokelesstobaccouse,
    home,
    workplace,
    attitudetoward,
    packyear,
    riskpackyear,
    riskpastsmoking,
    highrisksmokeless,
  ];
};
