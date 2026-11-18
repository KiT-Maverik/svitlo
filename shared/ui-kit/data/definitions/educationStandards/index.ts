/** Build-time reference catalog only. No runtime package entrypoint. */
export * from './data';

import {
  ukrainePrimary2018,
  ukraineBasicSecondary2020,
  ukraineUpperSecondary2024,
  commonCoreMathematics,
  commonCoreEnglishLanguageArts,
  nextGenerationScienceStandards,
  polandPreschool2026,
  polandPrimary2026,
  germanyPrimaryGerman2022,
  germanyPrimaryMathematics2022,
  finlandBasicEducation2014,
  finlandEarlyChildhood2022,
  franceCommonCore2015,
  estoniaBasicSchoolCurriculum,
} from './data';

export const educationStandards = [
  ukrainePrimary2018,
  ukraineBasicSecondary2020,
  ukraineUpperSecondary2024,
  commonCoreMathematics,
  commonCoreEnglishLanguageArts,
  nextGenerationScienceStandards,
  polandPreschool2026,
  polandPrimary2026,
  germanyPrimaryGerman2022,
  germanyPrimaryMathematics2022,
  finlandBasicEducation2014,
  finlandEarlyChildhood2022,
  franceCommonCore2015,
  estoniaBasicSchoolCurriculum,
] as const;
