export const PreviousIllness = (answers: any[]) => {
  answers.sort((a, b) => a.questionId - b.questionId);

  let systemic = "No";
  let systemicage = "No Answer";
  let systemicduration = "No Answer";
  let systemicdiagnosis = "No Answer";
  let systemicfollowup = "No Answer";
  let systemicdiscontinued = "No";
  let systemicdiscontinuedduration = "No Answer";
  let systemicdiscontinuedreason = "No Answer";
  let Diabetes = "No";
  let Diabetesage = "No Answer";
  let Diabetesduration = "No Answer";
  let Diabetesdiagnosis = "No Answer";
  let Diabetesfollowup = "No Answer";
  let Diabetesdiscontinued = "No";
  let Diabetesdiscontinuedduration = "No Answer";
  let Diabetesdiscontinuedreason = "No Answer";
  let Gestational = "No";
  let Gestationalage = "No Answer";
  let Gestationalduration = "No Answer";
  let Gestationaldiagnosis = "No Answer";
  let Gestationalfollowup = "No Answer";
  let Gestationaldiscontinued = "No";
  let Gestationaldiscontinuedduration = "No Answer";
  let Gestationaldiscontinuedreason = "No Answer";
  let Bronchial = "No";
  let Bronchialage = "No Answer";
  let Bronchialduration = "No Answer";
  let Bronchialdiagnosis = "No Answer";
  let Bronchialfollowup = "No Answer";
  let Bronchialdiscontinued = "No";
  let Bronchialdiscontinuedduration = "No Answer";
  let Bronchialdiscontinuedreason = "No Answer";
  let Epilepsy = "No";
  let Epilepsyage = "No Answer";
  let Epilepsyduration = "No Answer";
  let Epilepsydiagnosis = "No Answer";
  let Epilepsyfollowup = "No Answer";
  let Epilepsydiscontinued = "No";
  let Epilepsydiscontinuedduration = "No Answer";
  let Epilepsydiscontinuedreason = "No Answer";
  let Stroke = "No";
  let Strokeage = "No Answer";
  let Strokeduration = "No Answer";
  let Strokediagnosis = "No Answer";
  let Strokefollowup = "No Answer";
  let Strokediscontinued = "No";
  let Strokediscontinuedduration = "No Answer";
  let Strokediscontinuedreason = "No Answer";
  let Artery = "No";
  let Arteryage = "No Answer";
  let Arteryduration = "No Answer";
  let Arterydiagnosis = "No Answer";
  let Arteryfollowup = "No Answer";
  let Arterydiscontinued = "No";
  let Arterydiscontinuedduration = "No Answer";
  let Arterydiscontinuedreason = "No Answer";
  let Kidney = "No";
  let Kidneyage = "No Answer";
  let Kidneyduration = "No Answer";
  let Kidneydiagnosis = "No Answer";
  let Kidneyfollowup = "No Answer";
  let Kidneydiscontinued = "No";
  let Kidneydiscontinuedduration = "No Answer";
  let Kidneydiscontinuedreason = "No Answer";
  let hiv = "No";
  let hivage = "No Answer";
  let hivduration = "No Answer";
  let hivdiagnosis = "No Answer";
  let hivfollowup = "No Answer";
  let hivdiscontinued = "No";
  let hivdiscontinuedduration = "No Answer";
  let hivdiscontinuedreason = "No Answer";
  let Transplant = "No";
  let Transplantage = "No Answer";
  let Transplantduration = "No Answer";
  let Transplantdiagnosis = "No Answer";
  let Transplantfollowup = "No Answer";
  let Transplantdiscontinued = "No";
  let Transplantdiscontinuedduration = "No Answer";
  let Transplantdiscontinuedreason = "No Answer";
  let Cancer = "No";
  let Cancerage = "No Answer";
  let Cancerduration = "No Answer";
  let Cancerdiagnosis = "No Answer";
  let Cancerfollowup = "No Answer";
  let Cancerdiscontinued = "No";
  let Cancerdiscontinuedduration = "No Answer";
  let Cancerdiscontinuedreason = "No Answer";
  let Thyroid = "No";
  let Thyroidage = "No Answer";
  let Thyroidduration = "No Answer";
  let Thyroiddiagnosis = "No Answer";
  let Thyroidfollowup = "No Answer";
  let Thyroiddiscontinued = "No";
  let Thyroiddiscontinuedduration = "No Answer";
  let Thyroiddiscontinuedreason = "No Answer";
  let chronic = "No";
  let chronicage = "No Answer";
  let chronicduration = "No Answer";
  let chronicdiagnosis = "No Answer";
  let chronicfollowup = "No Answer";
  let chronicdiscontinued = "No";
  let chronicdiscontinuedduration = "No Answer";
  let chronicdiscontinuedreason = "No Answer";
  let similar = "";
  let chronicillness = "";

  answers.map((element) => {
    //systemic
    if (element.questionId === 160) {
      systemic = element.answer === 534 ? "Yes" : "No";
    }

    if (systemic === "Yes") {
      if (element.questionId === 161) {
        systemicage = element.answer;
      }

      if (element.questionId === 162) {
        systemicduration = element.answer;
      }

      if (element.questionId === 163) {
        systemicdiagnosis = element.answer;
      }
      if (element.questionId === 164) {
        systemicfollowup = element.answer;
      }
      if (element.questionId === 165) {
        systemicdiscontinued = element.answer === 540 ? "Yes" : "No";
      }
      if (element.questionId === 166) {
        systemicdiscontinuedduration = element.answer;
      }
      if (element.questionId === 167) {
        systemicdiscontinuedreason = element.answer;
      }
    }

    //Diabetes
    if (element.questionId === 168) {
      Diabetes = element.answer === 544 ? "Yes" : "No";
    }

    if (Diabetes === "Yes") {
      if (element.questionId === 169) {
        Diabetesage = element.answer;
      }

      if (element.questionId === 170) {
        Diabetesduration = element.answer;
      }

      if (element.questionId === 171) {
        Diabetesdiagnosis = element.answer;
      }
      if (element.questionId === 172) {
        Diabetesfollowup = element.answer;
      }
      if (element.questionId === 173) {
        Diabetesdiscontinued = element.answer === 550 ? "Yes" : "No";
      }
      if (element.questionId === 174) {
        Diabetesdiscontinuedduration = element.answer;
      }
      if (element.questionId === 175) {
        Diabetesdiscontinuedreason = element.answer;
      }
    }

    //Gestational
    if (element.questionId === 176) {
      Gestational = element.answer === 554 ? "Yes" : "No";
    }

    if (Gestational === "Yes") {
      if (element.questionId === 177) {
        Gestationalage = element.answer;
      }

      if (element.questionId === 178) {
        Gestationalduration = element.answer;
      }

      if (element.questionId === 179) {
        Gestationaldiagnosis = element.answer;
      }
      if (element.questionId === 180) {
        Gestationalfollowup = element.answer;
      }
      if (element.questionId === 181) {
        Gestationaldiscontinued = element.answer === 560 ? "Yes" : "No";
      }
      if (element.questionId === 182) {
        Gestationaldiscontinuedduration = element.answer;
      }
      if (element.questionId === 183) {
        Gestationaldiscontinuedreason = element.answer;
      }
    }

    //Bronchial
    if (element.questionId === 184) {
      Bronchial = element.answer === 564 ? "Yes" : "No";
    }

    if (Bronchial === "Yes") {
      if (element.questionId === 185) {
        Bronchialage = element.answer;
      }

      if (element.questionId === 186) {
        Bronchialduration = element.answer;
      }

      if (element.questionId === 187) {
        Bronchialdiagnosis = element.answer;
      }
      if (element.questionId === 188) {
        Bronchialfollowup = element.answer;
      }
      if (element.questionId === 189) {
        Bronchialdiscontinued = element.answer === 570 ? "Yes" : "No";
      }
      if (element.questionId === 190) {
        Bronchialdiscontinuedduration = element.answer;
      }
      if (element.questionId === 191) {
        Bronchialdiscontinuedreason = element.answer;
      }
    }

    //Epilepsy
    if (element.questionId === 192) {
      Epilepsy = element.answer === 574 ? "Yes" : "No";
    }

    if (Epilepsy === "Yes") {
      if (element.questionId === 193) {
        Epilepsyage = element.answer;
      }

      if (element.questionId === 194) {
        Epilepsyduration = element.answer;
      }

      if (element.questionId === 195) {
        Epilepsydiagnosis = element.answer;
      }
      if (element.questionId === 196) {
        Epilepsyfollowup = element.answer;
      }
      if (element.questionId === 197) {
        Epilepsydiscontinued = element.answer === 580 ? "Yes" : "No";
      }
      if (element.questionId === 198) {
        Epilepsydiscontinuedduration = element.answer;
      }
      if (element.questionId === 199) {
        Epilepsydiscontinuedreason = element.answer;
      }
    }

    //Stroke
    if (element.questionId === 200) {
      Stroke = element.answer === 584 ? "Yes" : "No";
    }

    if (Stroke === "Yes") {
      if (element.questionId === 201) {
        Strokeage = element.answer;
      }

      if (element.questionId === 202) {
        Strokeduration = element.answer;
      }

      if (element.questionId === 203) {
        Strokediagnosis = element.answer;
      }
      if (element.questionId === 204) {
        Strokefollowup = element.answer;
      }
      if (element.questionId === 205) {
        Strokediscontinued = element.answer === 590 ? "Yes" : "No";
      }
      if (element.questionId === 206) {
        Strokediscontinuedduration = element.answer;
      }
      if (element.questionId === 207) {
        Strokediscontinuedreason = element.answer;
      }
    }

    //Artery
    if (element.questionId === 208) {
      Artery = element.answer === 594 ? "Yes" : "No";
    }

    if (Artery === "Yes") {
      if (element.questionId === 209) {
        Arteryage = element.answer;
      }

      if (element.questionId === 210) {
        Arteryduration = element.answer;
      }

      if (element.questionId === 211) {
        Arterydiagnosis = element.answer;
      }
      if (element.questionId === 212) {
        Arteryfollowup = element.answer;
      }
      if (element.questionId === 213) {
        Arterydiscontinued = element.answer === 600 ? "Yes" : "No";
      }
      if (element.questionId === 214) {
        Arterydiscontinuedduration = element.answer;
      }
      if (element.questionId === 215) {
        Arterydiscontinuedreason = element.answer;
      }
    }

    //Kidney
    if (element.questionId === 216) {
      Kidney = element.answer === 604 ? "Yes" : "No";
    }

    if (Kidney === "Yes") {
      if (element.questionId === 217) {
        Kidneyage = element.answer;
      }

      if (element.questionId === 218) {
        Kidneyduration = element.answer;
      }

      if (element.questionId === 219) {
        Kidneydiagnosis = element.answer;
      }
      if (element.questionId === 220) {
        Kidneyfollowup = element.answer;
      }
      if (element.questionId === 221) {
        Kidneydiscontinued = element.answer === 610 ? "Yes" : "No";
      }
      if (element.questionId === 222) {
        Kidneydiscontinuedduration = element.answer;
      }
      if (element.questionId === 223) {
        Kidneydiscontinuedreason = element.answer;
      }
    }

    //Hiv
    if (element.questionId === 224) {
      hiv = element.answer === 614 ? "Yes" : "No";
    }

    if (hiv === "Yes") {
      if (element.questionId === 225) {
        hivage = element.answer;
      }

      if (element.questionId === 226) {
        hivduration = element.answer;
      }

      if (element.questionId === 227) {
        hivdiagnosis = element.answer;
      }
      if (element.questionId === 228) {
        hivfollowup = element.answer;
      }
      if (element.questionId === 229) {
        hivdiscontinued = element.answer === 620 ? "Yes" : "No";
      }
      if (element.questionId === 230) {
        hivdiscontinuedduration = element.answer;
      }
      if (element.questionId === 231) {
        hivdiscontinuedreason = element.answer;
      }
    }

    //Transplant

    if (element.questionId === 232) {
      Transplant = element.answer === 624 ? "Yes" : "No";
    }

    if (Transplant === "Yes") {
      if (element.questionId === 233) {
        Transplantage = element.answer;
      }

      if (element.questionId === 234) {
        Transplantduration = element.answer;
      }

      if (element.questionId === 235) {
        Transplantdiagnosis = element.answer;
      }
      if (element.questionId === 236) {
        Transplantfollowup = element.answer;
      }
      if (element.questionId === 237) {
        Transplantdiscontinued = element.answer === 630 ? "Yes" : "No";
      }
      if (element.questionId === 238) {
        Transplantdiscontinuedduration = element.answer;
      }
      if (element.questionId === 239) {
        Transplantdiscontinuedreason = element.answer;
      }
    }

    //Cancer
    if (element.questionId === 240) {
      Cancer = element.answer === 634 ? "Yes" : "No";
    }

    if (Cancer === "Yes") {
      if (element.questionId === 241) {
        Cancerage = element.answer;
      }

      if (element.questionId === 242) {
        Cancerduration = element.answer;
      }

      if (element.questionId === 243) {
        Cancerdiagnosis = element.answer;
      }
      if (element.questionId === 244) {
        Cancerfollowup = element.answer;
      }
      if (element.questionId === 245) {
        Cancerdiscontinued = element.answer === 640 ? "Yes" : "No";
      }
      if (element.questionId === 246) {
        Cancerdiscontinuedduration = element.answer;
      }
      if (element.questionId === 247) {
        Cancerdiscontinuedreason = element.answer;
      }
    }

    //Thyroid
    if (element.questionId === 248) {
      Thyroid = element.answer === 644 ? "Yes" : "No";
    }

    if (Thyroid === "Yes") {
      if (element.questionId === 249) {
        Thyroidage = element.answer;
      }

      if (element.questionId === 250) {
        Thyroidduration = element.answer;
      }

      if (element.questionId === 251) {
        Thyroiddiagnosis = element.answer;
      }
      if (element.questionId === 252) {
        Thyroidfollowup = element.answer;
      }
      if (element.questionId === 253) {
        Thyroiddiscontinued = element.answer === 650 ? "Yes" : "No";
      }
      if (element.questionId === 254) {
        Thyroiddiscontinuedduration = element.answer;
      }
      if (element.questionId === 255) {
        Thyroiddiscontinuedreason = element.answer;
      }
    }

    //chronic
    if (element.questionId === 256) {
      chronic = element.answer === 654 ? "Yes" : "No";
    }

    if (chronic === "Yes") {
      if (element.questionId === 257) {
        chronicage = element.answer;
      }

      if (element.questionId === 258) {
        chronicduration = element.answer;
      }

      if (element.questionId === 259) {
        chronicdiagnosis = element.answer;
      }
      if (element.questionId === 260) {
        chronicfollowup = element.answer;
      }
      if (element.questionId === 261) {
        chronicdiscontinued = element.answer === 660 ? "Yes" : "No";
      }
      if (element.questionId === 262) {
        chronicdiscontinuedduration = element.answer;
      }
      if (element.questionId === 263) {
        chronicdiscontinuedreason = element.answer;
      }
    }

    //similar
    if (element.questionId === 264) {
      similar = element.answer;
    }

    //chronicillnes
    if (element.questionId === 265) {
      chronicillness = element.answer;
    }
  });

  return [
    0,
    systemic,
    systemicage,
    systemicduration,
    systemicdiagnosis,
    systemicfollowup,
    systemicdiscontinued,
    systemicdiscontinuedduration,
    systemicdiscontinuedreason,
    Diabetes,
    Diabetesage,
    Diabetesduration,
    Diabetesdiagnosis,
    Diabetesfollowup,
    Diabetesdiscontinued,
    Diabetesdiscontinuedduration,
    Diabetesdiscontinuedreason,
    Gestational,
    Gestationalage,
    Gestationalduration,
    Gestationaldiagnosis,
    Gestationalfollowup,
    Gestationaldiscontinued,
    Gestationaldiscontinuedduration,
    Gestationaldiscontinuedreason,
    Bronchial,
    Bronchialage,
    Bronchialduration,
    Bronchialdiagnosis,
    Bronchialfollowup,
    Bronchialdiscontinued,
    Bronchialdiscontinuedduration,
    Bronchialdiscontinuedreason,
    Epilepsy,
    Epilepsyage,
    Epilepsyduration,
    Epilepsydiagnosis,
    Epilepsyfollowup,
    Epilepsydiscontinued,
    Epilepsydiscontinuedduration,
    Epilepsydiscontinuedreason,
    Stroke,
    Strokeage,
    Strokeduration,
    Strokediagnosis,
    Strokefollowup,
    Strokediscontinued,
    Strokediscontinuedduration,
    Strokediscontinuedreason,
    Artery,
    Arteryage,
    Arteryduration,
    Arterydiagnosis,
    Arteryfollowup,
    Arterydiscontinued,
    Arterydiscontinuedduration,
    Arterydiscontinuedreason,
    Kidney,
    Kidneyage,
    Kidneyduration,
    Kidneydiagnosis,
    Kidneyfollowup,
    Kidneydiscontinued,
    Kidneydiscontinuedduration,
    Kidneydiscontinuedreason,
    hiv,
    hivage,
    hivduration,
    hivdiagnosis,
    hivfollowup,
    hivdiscontinued,
    hivdiscontinuedduration,
    hivdiscontinuedreason,
    Transplant,
    Transplantage,
    Transplantduration,
    Transplantdiagnosis,
    Transplantfollowup,
    Transplantdiscontinued,
    Transplantdiscontinuedduration,
    Transplantdiscontinuedreason,
    Cancer,
    Cancerage,
    Cancerduration,
    Cancerdiagnosis,
    Cancerfollowup,
    Cancerdiscontinued,
    Cancerdiscontinuedduration,
    Cancerdiscontinuedreason,
    Thyroid,
    Thyroidage,
    Thyroidduration,
    Thyroiddiagnosis,
    Thyroidfollowup,
    Thyroiddiscontinued,
    Thyroiddiscontinuedduration,
    Thyroiddiscontinuedreason,
    chronic,
    chronicage,
    chronicduration,
    chronicdiagnosis,
    chronicfollowup,
    chronicdiscontinued,
    chronicdiscontinuedduration,
    chronicdiscontinuedreason,
    similar,
    chronicillness,
  ];
};
