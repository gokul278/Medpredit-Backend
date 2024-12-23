export const Dietary = (answers: any, mappedResult: any) => {
  answers.sort((a, b) => a.questionId - b.questionId);

  const q1 = answers.find((element) => element.questionId === 122)
    ? answers.find((element) => element.questionId === 122)
    : 0;

  let q1_ans = 0;

  q1.answer.map((ans) => {
    q1_ans += parseInt(
      mappedResult.flat().find((option) => option.refOptionId === ans)
        ?.refOptionMark
    );
  });

  const q2 = answers.find((element) => element.questionId === 123)
    ? answers.find((element) => element.questionId === 123)
    : 0;

  let q2_ans = 0;

  q2.answer.map((ans) => {
    q2_ans += parseInt(
      mappedResult.flat().find((option) => option.refOptionId === ans)
        ?.refOptionMark
    );
  });

  const q3 = answers.find((element) => element.questionId === 124)
    ? answers.find((element) => element.questionId === 124)
    : 0;

  let q3_ans = 0;

  q3.answer.map((ans) => {
    q3_ans += parseInt(
      mappedResult.flat().find((option) => option.refOptionId === ans)
        ?.refOptionMark
    );
  });

  const q4 = answers.find((element) => element.questionId === 125)
    ? answers.find((element) => element.questionId === 125)
    : 0;

  let q4_ans = 0;

  q4.answer.map((ans) => {
    q4_ans += parseInt(
      mappedResult.flat().find((option) => option.refOptionId === ans)
        ?.refOptionMark
    );
  });

  const q5 = answers.find((element) => element.questionId === 126)
    ? answers.find((element) => element.questionId === 126)
    : 0;

  const q5_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q5.answer);

  const q6 = answers.find((element) => element.questionId === 127)
    ? answers.find((element) => element.questionId === 127)
    : 0;

  const q6_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q6.answer);

  const q7 = answers.find((element) => element.questionId === 128)
    ? answers.find((element) => element.questionId === 128)
    : 0;

  const q7_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q7.answer);

  const q8 = answers.find((element) => element.questionId === 129)
    ? answers.find((element) => element.questionId === 129)
    : 0;

  const q8_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q8.answer);

  const q9 = answers.find((element) => element.questionId === 130)
    ? answers.find((element) => element.questionId === 130)
    : 0;

  const q9_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q9.answer);

  const q10 = answers.find((element) => element.questionId === 132)
    ? answers.find((element) => element.questionId === 132)
    : 0;

  const q10_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q10.answer);

  const q11 = answers.find((element) => element.questionId === 133)
    ? answers.find((element) => element.questionId === 133)
    : 0;

  const q11_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q11.answer);

  const q12 = answers.find((element) => element.questionId === 134)
    ? answers.find((element) => element.questionId === 134)
    : 0;

  const q12_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q12.answer);

  const q13 = answers.find((element) => element.questionId === 135)
    ? answers.find((element) => element.questionId === 135)
    : 0;

  const q13_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q13.answer);

  const q14 = answers.find((element) => element.questionId === 136)
    ? answers.find((element) => element.questionId === 136)
    : 0;

  const q14_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q14.answer);

  const q15_1 = answers.find((element) => element.questionId === 137)
    ? answers.find((element) => element.questionId === 137)
    : 0;

  const q15_1_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q15_1.answer);

  const q15_2 = answers.find((element) => element.questionId === 138)
    ? answers.find((element) => element.questionId === 138)
    : 0;

  const q15_2_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q15_2.answer);

  const q15_3 = answers.find((element) => element.questionId === 139)
    ? answers.find((element) => element.questionId === 139)
    : 0;

  const q15_3_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q15_3.answer);

  const q15_4 = answers.find((element) => element.questionId === 140)
    ? answers.find((element) => element.questionId === 140)
    : 0;

  const q15_4_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q15_4.answer);

  const q16 = answers.find((element) => element.questionId === 141)
    ? answers.find((element) => element.questionId === 141)
    : 0;

  const q16_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q16.answer);

  const q17 = answers.find((element) => element.questionId === 142)
    ? answers.find((element) => element.questionId === 142)
    : 0;

  const q17_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q17.answer);

  const q18 = answers.find((element) => element.questionId === 143)
    ? answers.find((element) => element.questionId === 143)
    : 0;

  const q18_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q18.answer);

  const q19 = answers.find((element) => element.questionId === 144)
    ? answers.find((element) => element.questionId === 144)
    : 0;

  const q19_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q19.answer);

  const q20 = answers.find((element) => element.questionId === 145)
    ? answers.find((element) => element.questionId === 145)
    : 0;

  const q20_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q20.answer);

  const q21 = answers.find((element) => element.questionId === 146)
    ? answers.find((element) => element.questionId === 146)
    : 0;

  const q21_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q21.answer);

  const q22 = answers.find((element) => element.questionId === 147)
    ? answers.find((element) => element.questionId === 147)
    : 0;

  const q22_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q22.answer);

  const q23 = answers.find((element) => element.questionId === 148)
    ? answers.find((element) => element.questionId === 148)
    : 0;

  const q23_ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q23.answer);

  let global = 0;

  let comp1_1 = "";
  let comp1_2 = "";
  let comp1_3 = "";
  let comp1_4 = "";
  let comp2_1 = "";
  let comp2_2 = "";
  let comp2_3 = "";
  let comp2_4 = "";
  let comp3_1 = "";
  let comp3_2 = "";
  let comp4_1 = "";
  let comp4_2 = "";
  let comp5_1 = "";
  let comp6_1 = "";
  let comp6_2 = "";
  let comp7_1 = "";
  let comp7_2 = "";
  let comp7_3 = "";

  //Morning Before Meal
  if (q1_ans === 0) comp1_1 = "No Risk";
  else if (q1_ans === 1) comp1_1 = "Low Risk";
  else if (q1_ans === 2) comp1_1 = "Moderate Risk";
  else if (q1_ans >= 3) comp1_1 = "High Risk";

  // Morning Mid meal
  if (q2_ans === 0) comp1_2 = "No Risk";
  else if (q2_ans === 1) comp1_2 = "Low Risk";
  else if (q2_ans === 2) comp1_2 = "Moderate Risk";
  else if (q2_ans >= 3) comp1_2 = "High Risk";

  // Evening Mid meal
  if (q3_ans === 0) comp1_3 = "No Risk";
  else if (q3_ans === 1) comp1_3 = "Low Risk";
  else if (q3_ans === 2) comp1_3 = "Moderate Risk";
  else if (q3_ans >= 3) comp1_3 = "High Risk";

  // After Night meal
  if (q4_ans === 0) comp1_4 = "No Risk";
  else if (q4_ans === 1) comp1_4 = "Low Risk";
  else if (q4_ans === 2) comp1_4 = "Moderate Risk";
  else if (q4_ans >= 3) comp1_4 = "High Risk";

  //cereals
  let temp1Comp2_1 =
    parseInt(q5_ans.refOptionMark) + parseInt(q6_ans.refOptionMark);
  if (temp1Comp2_1 === 0) comp2_1 = "No Risk";
  else if (temp1Comp2_1 === 1) comp2_1 = "Low Risk";
  else if (temp1Comp2_1 >= 2 && temp1Comp2_1 <= 3) comp2_1 = "Moderate Risk";
  else if (temp1Comp2_1 > 3) comp2_1 = "High Risk";

  //Vegetables
  let temp1Comp2_2 =
    parseInt(q7_ans.refOptionMark) + parseInt(q8_ans.refOptionMark);
  if (temp1Comp2_2 === 0) comp2_2 = "No Risk";
  else if (temp1Comp2_2 === 1) comp2_2 = "Low Risk";
  else if (temp1Comp2_2 >= 2 && temp1Comp2_2 <= 3) comp2_2 = "Moderate Risk";
  else if (temp1Comp2_2 > 3) comp2_2 = "High Risk";

  //Fruits
  let temp1Comp2_3 = parseInt(q9_ans.refOptionMark);
  if (temp1Comp2_3 === 0) comp2_3 = "No Risk";
  else if (temp1Comp2_3 === 1) comp2_3 = "Low Risk";
  else if (temp1Comp2_3 >= 2 && temp1Comp2_3 <= 3) comp2_3 = "Moderate Risk";
  else if (temp1Comp2_3 > 3) comp2_3 = "High Risk";

  //Non Vegetarian
  let temp1Comp2_4 =
    parseInt(q10_ans ? q10_ans.refOptionMark : 0) +
    parseInt(q11_ans ? q11_ans.refOptionMark : 0) +
    parseInt(q12_ans ? q12_ans.refOptionMark : 0);
  if (temp1Comp2_4 === 0) comp2_4 = "No Risk";
  else if (temp1Comp2_4 === 1) comp2_4 = "Low Risk";
  else if (temp1Comp2_4 >= 2 && temp1Comp2_4 <= 3) comp2_4 = "Moderate Risk";
  else if (temp1Comp2_4 > 3) comp2_4 = "High Risk";

  //Restriction Oil Intake
  let temp1Comp3_1 = parseInt(q13_ans.refOptionMark);
  if (temp1Comp3_1 === 0) comp3_1 = "No Risk";
  else if (temp1Comp3_1 === 1) comp3_1 = "Low Risk";
  else if (temp1Comp3_1 >= 2 && temp1Comp3_1 <= 3) comp3_1 = "Moderate Risk";
  else if (temp1Comp3_1 > 3) comp3_1 = "High Risk";

  //Type of Oil
  let temp1Comp3_2 =
    parseInt(q14_ans.refOptionMark) +
    parseInt(q15_1_ans.refOptionMark) +
    parseInt(q15_2_ans.refOptionMark) +
    parseInt(q15_3_ans.refOptionMark) +
    parseInt(q15_4_ans.refOptionMark);
  if (temp1Comp3_2 === 0) comp3_2 = "No Risk";
  else if (temp1Comp3_2 === 1) comp3_2 = "Low Risk";
  else if (temp1Comp3_2 >= 2 && temp1Comp3_2 <= 3) comp3_2 = "Moderate Risk";
  else if (temp1Comp3_2 > 3) comp3_2 = "High Risk";

  //Restriction salt
  let temp1comp4_1 = parseInt(q16_ans.refOptionMark);
  if (temp1comp4_1 === 0) comp4_1 = "No Risk";
  else if (temp1comp4_1 === 1) comp4_1 = "Low Risk";
  else if (temp1comp4_1 === 2) comp4_1 = "Moderate Risk";
  else if (temp1comp4_1 === 3) comp4_1 = "High Risk";

  //salt intake
  let temp1comp4_2 = parseInt(q17_ans.refOptionMark);
  if (temp1comp4_2 === 0) comp4_2 = "No Risk";
  else if (temp1comp4_2 === 1) comp4_2 = "Low Risk";
  else if (temp1comp4_2 === 2) comp4_2 = "Moderate Risk";
  else if (temp1comp4_2 === 3) comp4_2 = "High Risk";

  //dairy products
  let temp1comp5_1 = parseInt(q18_ans.refOptionMark);
  if (temp1comp5_1 === 0) comp5_1 = "No Risk";
  else if (temp1comp5_1 === 1) comp5_1 = "Low Risk";
  else if (temp1comp5_1 === 2) comp5_1 = "Moderate Risk";
  else if (temp1comp5_1 === 3) comp5_1 = "High Risk";

  //meal timing (Morning)
  let temp1comp6_1 = parseInt(q19_ans.refOptionMark);
  if (temp1comp6_1 === 0) comp6_1 = "No Risk";
  else if (temp1comp6_1 === 1) comp6_1 = "Low Risk";
  else if (temp1comp6_1 === 2) comp6_1 = "Moderate Risk";
  else if (temp1comp6_1 === 3) comp6_1 = "High Risk";

  //meal timing (evening  )
  let temp1comp6_2 = parseInt(q20_ans.refOptionMark);
  if (temp1comp6_2 === 0) comp6_2 = "No Risk";
  else if (temp1comp6_2 === 1) comp6_2 = "Low Risk";
  else if (temp1comp6_2 === 2) comp6_2 = "Moderate Risk";
  else if (temp1comp6_2 === 3) comp6_2 = "High Risk";

  //Dietary planning
  let temp1comp7_1 = parseInt(q21_ans.refOptionMark);
  if (temp1comp7_1 === 0) comp7_1 = "No Risk";
  else if (temp1comp7_1 === 1) comp7_1 = "Low Risk";
  else if (temp1comp7_1 === 2) comp7_1 = "Moderate Risk";
  else if (temp1comp7_1 === 3) comp7_1 = "High Risk";

  //Home food
  let temp1comp7_2 = parseInt(q22_ans.refOptionMark);
  if (temp1comp7_2 === 0) comp7_2 = "No Risk";
  else if (temp1comp7_2 === 1) comp7_2 = "Low Risk";
  else if (temp1comp7_2 === 2) comp7_2 = "Moderate Risk";
  else if (temp1comp7_2 === 3) comp7_2 = "High Risk";

  //Mindful eating
  let temp1comp7_3 = parseInt(q23_ans.refOptionMark);
  if (temp1comp7_3 === 0) comp7_3 = "No Risk";
  else if (temp1comp7_3 === 1) comp7_3 = "Low Risk";
  else if (temp1comp7_3 === 2) comp7_3 = "Moderate Risk";
  else if (temp1comp7_3 === 3) comp7_3 = "High Risk";

  // Calculateoverall Answer
  let overallAnswer =
    parseInt(q5_ans.refOptionMark) +
    parseInt(q6_ans.refOptionMark) +
    parseInt(q7_ans.refOptionMark) +
    parseInt(q8_ans.refOptionMark) +
    parseInt(q9_ans.refOptionMark) +
    parseInt(q10_ans ? q10_ans.refOptionMark : 0) +
    parseInt(q11_ans ? q11_ans.refOptionMark : 0) +
    parseInt(q12_ans ? q12_ans.refOptionMark : 0) +
    parseInt(q13_ans.refOptionMark) +
    parseInt(q14_ans.refOptionMark) +
    parseInt(q15_1_ans.refOptionMark) +
    parseInt(q15_2_ans.refOptionMark) +
    parseInt(q15_3_ans.refOptionMark) +
    parseInt(q15_4_ans.refOptionMark) +
    parseInt(q16_ans.refOptionMark) +
    parseInt(q18_ans.refOptionMark) +
    parseInt(q19_ans.refOptionMark) +
    parseInt(q20_ans.refOptionMark) +
    parseInt(q21_ans.refOptionMark) +
    parseInt(q22_ans.refOptionMark) +
    parseInt(q23_ans.refOptionMark);

  if (q1_ans + q2_ans + q3_ans + q4_ans === 0 && overallAnswer === 0) {
    global = 0;
  } else if (
    q1_ans === 1 ||
    q2_ans === 1 ||
    q3_ans === 1 ||
    q4_ans === 1 ||
    (overallAnswer >= 1 && overallAnswer <= 18)
  ) {
    global = 1;
  } else if (
    q1_ans === 2 ||
    q2_ans === 2 ||
    q3_ans === 2 ||
    q4_ans === 2 ||
    (overallAnswer >= 19 && overallAnswer <= 36)
  ) {
    global = 2;
  } else if (
    q1_ans >= 3 ||
    q2_ans >= 3 ||
    q3_ans >= 3 ||
    q4_ans >= 3 ||
    overallAnswer >= 37
  ) {
    global = 3;
  }

  return [
    global,
    comp1_1,
    comp1_2,
    comp1_3,
    comp1_4,
    comp2_1,
    comp2_2,
    comp2_3,
    comp2_4,
    comp3_1,
    comp3_2,
    comp4_1,
    comp4_2,
    comp5_1,
    comp6_1,
    comp6_2,
    comp7_1,
    comp7_2,
    comp7_3,
  ];
};
