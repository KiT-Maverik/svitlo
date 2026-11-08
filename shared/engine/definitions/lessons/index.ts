import { z } from 'zod';
import { defineStructured, taggedChild, localizedText, uuid, slug, resolvedProps } from '../structured';
import type { DefinitionLanguages, TaggedDefinition } from '../structured';
import { sectionChild } from '../sections';
import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/contracts/content';

const questionTypes = [
  'selectOneAnswer','selectMultipleAnswers','matchBlocks','answerWithText',
  'answerWithNumber','orderSequence','buildAnswerWithBlocks',
  'fillBlanksWithBlocks','fillBlanksWithText',
] as const;
const questions = () => z.record(z.enum(questionTypes),
  z.record(z.string(),taggedChild(...questionTypes)));
const customEvents = z.record(z.string(),z.unknown()).optional();

export const lessonSchema = <L extends DefinitionLanguages>(languages:L) =>
  z.strictObject({
    type:z.literal('lesson'), id:uuid,slug,
    title:localizedText(languages),
    flashcards:z.array(taggedChild('flashcard')),
    skills:z.array(uuid),
    parameters:z.strictObject({
      requireQuiz:z.boolean(),languages:z.tuple([z.enum(languages)],z.enum(languages)),
      sections:z.strictObject({
        allowNavigation:z.boolean(),allowSkipping:z.boolean(),showIndexes:z.boolean(),
      }),
    }),
    questions:questions().optional(),
    sections:z.array(sectionChild()),
    events:customEvents,
  });

export function defineLesson<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof lessonSchema<L>>>) {
  return defineStructured('lesson',source,lessonSchema<L>,resolvedProps('lesson'),['title']);
}
export type LessonDefinition = TaggedDefinition<'lesson'>;
export const lessonChild = () => taggedChild('lesson');
