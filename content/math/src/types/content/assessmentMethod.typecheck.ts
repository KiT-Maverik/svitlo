import type { AssessmentMethodKey, Locale_Languages, Question } from '+@svitlo/contracts/content';

const valid: AssessmentMethodKey = 'retrieval';
void valid;

// @ts-expect-error Unknown method slugs are not valid assessment methods.
const badKey: AssessmentMethodKey = 'unknownMethod';
void badKey;

// @ts-expect-error Question assessment methods reference slugs, never UUIDs.
const badUuid: AssessmentMethodKey = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
void badUuid;

// The canonical question response includes an assessment method and restrictions.
type NumericQuestion = Extract<Question<'response', Locale_Languages>, { type: 'answerWithNumber' }>;
type Assert<T extends true> = T;
type HasAssessmentMethod = Assert<'assessmentMethod' extends keyof NumericQuestion ? true : false>;
type HasRestrictions = Assert<'restrictions' extends keyof NumericQuestion ? true : false>;
void (undefined as unknown as HasAssessmentMethod);
void (undefined as unknown as HasRestrictions);
