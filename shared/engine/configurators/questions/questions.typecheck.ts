import { defineText } from '../contentBlocks/defineText/defineText';
import {
  defineSelectOneAnswer,
  defineSelectMultipleAnswers,
  defineMatchBlocks,
  defineAnswerWithText,
  defineAnswerWithNumber,
  defineOrderSequence,
  defineBuildAnswerWithBlocks,
  defineFillBlanksWithBlocks,
  defineFillBlanksWithText,
} from './index';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const block = defineText({ id, type: 'text', slug: 'answer-block', value: 'OK', params: {} });
const common = {
  id,
  slug: 'question-one',
  assessmentMethod: 'retrieval' as const,
  restrictions: ['dyslexia' as const],
  question: [block] as [typeof block],
};
const answers = { correct: { yes: block }, incorrect: { no: block }, distractors: { maybe: block } };

const one = defineSelectOneAnswer({ ...common, type: 'selectOneAnswer', answers });
const multiple = defineSelectMultipleAnswers({ ...common, type: 'selectMultipleAnswers', answers });
const matched = defineMatchBlocks({ ...common, type: 'matchBlocks', pairs: { pair: { left: block, right: block } } });
const text = defineAnswerWithText({ ...common, type: 'answerWithText', correctAnswers: ['yes'], placeholder: 'Answer' });
const number = defineAnswerWithNumber({ ...common, type: 'answerWithNumber', correctAnswers: [2], placeholder: 'Number' });
const order = defineOrderSequence({ ...common, type: 'orderSequence', sequence: [block] });
const build = defineBuildAnswerWithBlocks({ ...common, type: 'buildAnswerWithBlocks', correctSequence: [block], distractors: [block], placeholder: 'Build' });
const blocks = defineFillBlanksWithBlocks({ ...common, type: 'fillBlanksWithBlocks', slots: [{ selector: 'x', correctAnswer: block }], distractors: [block], placeholder: 'Fill' });
const blanks = defineFillBlanksWithText({ ...common, type: 'fillBlanksWithText', slots: [{ selector: 'x', correctAnswers: ['yes'] }], placeholder: 'Fill' });

type OneSlug = Expect<Equal<typeof one.config.base.slug, 'question-one'>>;
type MultipleSlug = Expect<Equal<typeof multiple.config.base.slug, 'question-one'>>;
type MatchSlug = Expect<Equal<typeof matched.config.base.slug, 'question-one'>>;
type TextSlug = Expect<Equal<typeof text.config.base.slug, 'question-one'>>;
type NumberSlug = Expect<Equal<typeof number.config.base.slug, 'question-one'>>;
type OrderSlug = Expect<Equal<typeof order.config.base.slug, 'question-one'>>;
type BuildSlug = Expect<Equal<typeof build.config.base.slug, 'question-one'>>;
type BlocksSlug = Expect<Equal<typeof blocks.config.base.slug, 'question-one'>>;
type BlanksSlug = Expect<Equal<typeof blanks.config.base.slug, 'question-one'>>;
type OneKind = Expect<Equal<typeof one.kind, 'selectOneAnswer'>>;
type NumberType = Expect<Equal<typeof number.config.base.type, 'answerWithNumber'>>;
type CorrectAnswer = Expect<Equal<typeof one.answers.correct.yes, typeof block>>;
type ExactQuestion = Expect<Equal<typeof order.question[0], typeof block>>;

const raw = { id, type: 'text' as const, slug: 'raw', params: {}, value: 'raw' };
// @ts-expect-error Raw ContentBlock configuration is not a nested ContentBlock configurator.
defineSelectOneAnswer({ ...common, type: 'selectOneAnswer', question: [raw], answers });
// @ts-expect-error An answer group cannot contain raw ContentBlock configs.
defineSelectMultipleAnswers({ ...common, type: 'selectMultipleAnswers', answers: { ...answers, correct: { raw } } });
// @ts-expect-error A matching pair cannot contain raw ContentBlock configs.
defineMatchBlocks({ ...common, type: 'matchBlocks', pairs: { bad: { left: raw, right: block } } });
// @ts-expect-error A sequence cannot contain raw ContentBlock configs.
defineOrderSequence({ ...common, type: 'orderSequence', sequence: [raw] });
// @ts-expect-error A fill-in slot requires a nested ContentBlock configurator.
defineFillBlanksWithBlocks({ ...common, type: 'fillBlanksWithBlocks', slots: [{ selector: 'x', correctAnswer: raw }], distractors: [], placeholder: 'Fill' });
// @ts-expect-error Correct answers for number questions must be numeric.
defineAnswerWithNumber({ ...common, type: 'answerWithNumber', correctAnswers: ['2'], placeholder: 'Number' });
// @ts-expect-error Correct answers for text questions must be localized text.
defineAnswerWithText({ ...common, type: 'answerWithText', correctAnswers: [2], placeholder: 'Answer' });
// @ts-expect-error Assessment Method is an enum of known slugs, not any string or contract ID.
defineSelectOneAnswer({ ...common, type: 'selectOneAnswer', assessmentMethod: 'invalid-method', answers });
// @ts-expect-error Restrictions are known perception limitations, not arbitrary strings.
defineSelectOneAnswer({ ...common, type: 'selectOneAnswer', restrictions: ['none'], answers });

void [one, multiple, matched, text, number, order, build, blocks, blanks];
