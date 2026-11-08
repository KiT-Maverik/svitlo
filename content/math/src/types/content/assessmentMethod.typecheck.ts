import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/contracts/content';
import type { AssessmentMethodId, Locale_Languages, Question } from '@svitlo/contracts/content';

const valid: AssessmentMethodId = assessmentMethods_AssessmentMethod_Ids.retrieval;
void valid;

// @ts-expect-error A semantic key is not a stable method UUID.
const badKey: AssessmentMethodId = 'retrieval';
void badKey;

// @ts-expect-error UUIDs outside the authored dictionary are not allowed.
const badUuid: AssessmentMethodId = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
void badUuid;

// The canonical question response includes an assessment method and restrictions.
type NumericQuestion = Extract<Question<'response', Locale_Languages>, { type: 'answerWithNumber' }>;
type Assert<T extends true> = T;
type HasAssessmentMethod = Assert<'assessmentMethod' extends keyof NumericQuestion ? true : false>;
type HasRestrictions = Assert<'restrictions' extends keyof NumericQuestion ? true : false>;
void (undefined as unknown as HasAssessmentMethod);
void (undefined as unknown as HasRestrictions);
