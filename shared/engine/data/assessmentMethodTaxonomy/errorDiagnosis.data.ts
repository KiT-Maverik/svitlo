import { buildAssessmentMethodConfig } from '../../utils/builders/config/buildAssessmentMethodConfig.utils';
import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/contracts/content';
import { assessmentMethodTranslations } from './translations';

export const errorDiagnosis_AssessmentMethod_Data = buildAssessmentMethodConfig({
  id: assessmentMethods_AssessmentMethod_Ids.errorDiagnosis,
  ...assessmentMethodTranslations.errorDiagnosis,
});
