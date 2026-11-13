import type { AssessmentMethodSlug, Question_AnswerWithNumber_Props } from '@svitlo/engine/runtime';

const valid: AssessmentMethodSlug = 'retrieval';
void valid;

// @ts-expect-error Unknown method slugs are not valid assessment methods.
const badKey: AssessmentMethodSlug = 'unknownMethod';
void badKey;

// @ts-expect-error Assessment methods use slugs, never UUIDs.
const badUuid: AssessmentMethodSlug = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
void badUuid;

type NumericQuestionParams = Question_AnswerWithNumber_Props['params'];
type Assert<T extends true> = T;
type HasAssessmentMethod = Assert<'assessmentMethod' extends keyof NumericQuestionParams ? true : false>;
type HasRestrictions = Assert<'restrictions' extends keyof NumericQuestionParams ? true : false>;
void (undefined as unknown as HasAssessmentMethod);
void (undefined as unknown as HasRestrictions);
