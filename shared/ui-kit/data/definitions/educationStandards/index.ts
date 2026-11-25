import {
  commonCoreEnglishLanguageArts,
  commonCoreMathematics,
  estoniaBasicSchoolCurriculum,
  finlandBasicEducation2014,
  finlandEarlyChildhood2022,
  franceCommonCore2015,
  germanyPrimaryGerman2022,
  germanyPrimaryMathematics2022,
  nextGenerationScienceStandards,
  polandPreschool2026,
  polandPrimary2026,
  ukraineBasicSecondary2020,
  ukrainePrimary2018,
  ukraineUpperSecondary2024,
} from './data';

/** Build-time reference catalog only. No runtime package entrypoint. */
export * from './data';

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
