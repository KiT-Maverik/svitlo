import type { ContentEntity_ConfigType } from './entity.types';
import type { Locale_Languages, Locale_Options } from './locale.types';
import type { ContentBlock } from './blocks';
import type { Question } from './questions';
import type { Quiz_Parameters } from './quiz.types';

export const SECTION_TYPES = [
  'theory',
  'practice',
  'codingTask',
  'learningFlow',
  'quiz',
  'flashcards',
  'scenario',
] as const;
export type Section_Type = (typeof SECTION_TYPES)[number];
type RegularSection_Type = Exclude<Section_Type, 'quiz'>;

type Section_Definition<Languages extends Locale_Languages> =
  { type: RegularSection_Type; content: readonly ContentBlock<'definition', Languages>[] } | { type: 'quiz' };

type Section_Meta<Languages extends Locale_Languages> = {
  id: string;
  slug: string;
  title: Locale_Options<Languages>;
  navigationLabel: Locale_Options<Languages>;
  /** Omitted: inherit Lesson allowSkipping; false: explicitly prohibit skipping. */
  skippable?: boolean;
};

type Section_Data<Languages extends Locale_Languages> = Section_Meta<Languages> &
  (
    | { type: RegularSection_Type; content: readonly ContentBlock<'data', Languages>[] }
    | { type: 'quiz'; parameters: Quiz_Parameters<'data', Languages> }
  );

type Section_Response<Languages extends Locale_Languages> = Omit<
  Section_Meta<Languages>,
  'title' | 'navigationLabel'
> & {
  title: string;
  navigationLabel: string;
} & (
    | { type: RegularSection_Type; content: readonly ContentBlock<'response', Languages>[] }
    | {
        type: 'quiz';
        parameters: Quiz_Parameters<'response', Languages>;
        /** Fully assembled, ordered Question instances for this particular Quiz. */
        questions: readonly Question<'response', Languages>[];
      }
  );

export type Section<Mode extends ContentEntity_ConfigType, Languages extends Locale_Languages> = {
  definition: Section_Definition<Languages>;
  data: Section_Data<Languages>;
  response: Section_Response<Languages>;
}[Mode];
