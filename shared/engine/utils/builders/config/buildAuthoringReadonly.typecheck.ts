import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/contracts/content';
import type { AssessmentMethod_Config } from '@svitlo/contracts/content';
import { buildAssessmentMethodConfig } from './buildAssessmentMethodConfig.utils';

const translated = {} as AssessmentMethod_Config['title'];
const assessment = buildAssessmentMethodConfig({
  id: assessmentMethods_AssessmentMethod_Ids.application,
  title: translated,
  description: translated,
});
// @ts-expect-error Assessment Method translations are readonly.
assessment.description.uk = 'Changed';

void assessment;
