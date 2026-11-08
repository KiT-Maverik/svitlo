import { z } from 'zod';
import { childDefinition, taggedChild, defineStructured, localizedText, uuid, slug, resolvedProps } from '../structured';
import type { DefinitionLanguages, TaggedDefinition } from '../structured';
import type { ContentBlockDefinition } from '../contentBlocks/defineRemaining';

const block = () => childDefinition<ContentBlockDefinition>();
const screen = () => z.strictObject({
  showDefaultContent:z.boolean().optional(),content:z.array(block()).optional(),
});
const quizParameters = () => z.strictObject({
  isBlocker:z.boolean().optional(),timeLimitSeconds:z.number().positive().optional(),
  selection:z.strictObject({mode:z.enum(['all','sample']),questionSlugs:z.array(z.string()).optional(),
    count:z.number().int().positive().optional(),shuffle:z.boolean().optional(),seed:z.number().optional()}),
  layout:z.strictObject({mode:z.enum(['stack','stepper']),showProgress:z.boolean().optional()}),
  feedbackMode:z.enum(['immediate','after-completion']),
  grading:z.strictObject({mode:z.enum(['percentage','points']),successThreshold:z.number()}).optional(),
  interaction:z.strictObject({retries:z.number().int().nonnegative(),showErrors:z.boolean(),
    showCorrectAnswers:z.boolean(),allowExplanations:z.boolean(),allowDeferring:z.boolean(),
    allowQuestionNavigation:z.boolean(),skippable:z.boolean()}),
  questionOptions:z.strictObject({selectOneAnswer:z.strictObject({
    incorrectCount:z.number().int().nonnegative().optional(),includeDistractors:z.boolean().optional(),
    shuffleAnswers:z.boolean().optional(),correctVariant:z.enum(['first','random']).optional(),
  }).optional()}).optional(),
  results:z.strictObject({visibility:z.enum(['immediate','after-review','hidden']),showScore:z.boolean()}),
  screen:z.strictObject({
    starting:screen().optional(),
    ending:z.strictObject({success:screen(),fail:screen(),retry:screen().optional()}).optional(),
  }),
});
const common = <Kind extends string, L extends DefinitionLanguages>(kind:Kind,l:L) => ({
  type:z.literal(kind),id:uuid,slug,title:localizedText(l),
  navigationLabel:localizedText(l),skippable:z.literal(true).optional(),
});
export const regularSectionSchema = <Kind extends RegularKind,L extends DefinitionLanguages>(kind:Kind,l:L) =>
  z.strictObject({...common(kind,l),content:z.array(block())});
export const quizSectionSchema = <L extends DefinitionLanguages>(l:L) =>
  z.strictObject({...common('quiz',l),parameters:quizParameters()});
type RegularKind='theory'|'practice'|'codingTask'|'learningFlow'|'flashcards'|'scenario';
const paths=['title','navigationLabel'] as const;
function regular<Kind extends RegularKind,L extends DefinitionLanguages>(kind:Kind,source:z.input<ReturnType<typeof regularSectionSchema<Kind,L>>>) {
  return { ...defineStructured('section',source,(l:L)=>regularSectionSchema(kind,l),resolvedProps(kind),paths), sectionType:kind };
}
export function defineTheorySection<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof regularSectionSchema<'theory',L>>>) {
  return regular('theory',source);
}
export function definePracticeSection<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof regularSectionSchema<'practice',L>>>) {
  return regular('practice',source);
}
export function defineCodingTaskSection<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof regularSectionSchema<'codingTask',L>>>) {
  return regular('codingTask',source);
}
export function defineLearningFlowSection<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof regularSectionSchema<'learningFlow',L>>>) {
  return regular('learningFlow',source);
}
export function defineFlashcardsSection<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof regularSectionSchema<'flashcards',L>>>) {
  return regular('flashcards',source);
}
export function defineScenarioSection<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof regularSectionSchema<'scenario',L>>>) {
  return regular('scenario',source);
}
export function defineQuizSection<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof quizSectionSchema<L>>>) {
  return { ...defineStructured('section',source,quizSectionSchema<L>,resolvedProps('quiz'),paths), sectionType:'quiz' as const };
}

export type SectionDefinition = TaggedDefinition<'section'> & {readonly sectionType:
  RegularKind | 'quiz' };
export type ScenarioSectionDefinition = SectionDefinition & {readonly sectionType:'scenario'};
export const sectionChild = () =>
  childDefinition<SectionDefinition>(v=>'kind' in v && v.kind==='section' && 'sectionType' in v);
export const scenarioSectionChild = () =>
  childDefinition<ScenarioSectionDefinition>(v=>'kind' in v && v.kind==='section' && 'sectionType' in v && v.sectionType==='scenario');
