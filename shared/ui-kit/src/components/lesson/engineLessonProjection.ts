import type {
  ContentBlock_Props,
  Lesson_Props,
  Question_SelectOneAnswer_Props,
  Question_SelectMultipleAnswers_Props,
  Question_MatchBlocks_Props,
  Question_AnswerWithText_Props,
  Question_AnswerWithNumber_Props,
  Question_OrderSequence_Props,
  Question_BuildAnswerWithBlocks_Props,
  Question_FillBlanksWithBlocks_Props,
  Question_FillBlanksWithText_Props,
} from '@svitlo/engine';
import {
  selectOneAnswer_Props_Schema,
  selectMultipleAnswers_Props_Schema,
  matchBlocks_Props_Schema,
  answerWithText_Props_Schema,
  answerWithNumber_Props_Schema,
  orderSequence_Props_Schema,
  buildAnswerWithBlocks_Props_Schema,
  fillBlanksWithBlocks_Props_Schema,
  fillBlanksWithText_Props_Schema,
  prepareQuizQuestions,
  text_Props_Schema,
  markdown_Props_Schema,
  code_Props_Schema,
  image_Props_Schema,
  carousel_Props_Schema,
  video_Props_Schema,
  audio_Props_Schema,
  youtube_Props_Schema,
  scene_Props_Schema,
  checkpoint_Props_Schema,
} from '@svitlo/engine';
import type { LanguageCode } from '@svitlo/contracts/localization';
import type { ContentBlockResponse } from '../widgets/ContentBlockRenderer';
import type { QuestionResponse } from '../widgets/questions/response/QuestionRenderer';
import type { LessonView } from './Lesson';
import type { LessonEventSceneMap } from './LessonEvents';

/**
 * Transitional renderer projection. The authoritative published contract is
 * Engine Lesson_Props; the existing UI widgets still consume flattened response
 * fields. Keep this at the shared UI Kit boundary (never in the Web host).
 *
 * Each block/question is mapped by discriminant. Unsupported types and quiz
 * screens fail visibly instead of silently dropping authored learning content.
 */
const contentBlockSchemas: Record<ContentBlock_Props['type'], { parse(value: unknown): unknown }> = {
  text: text_Props_Schema,
  markdown: markdown_Props_Schema,
  code: code_Props_Schema,
  image: image_Props_Schema,
  carousel: carousel_Props_Schema,
  video: video_Props_Schema,
  audio: audio_Props_Schema,
  youtube: youtube_Props_Schema,
  scene: scene_Props_Schema,
  checkpoint: checkpoint_Props_Schema,
};

export function projectContentBlock(source: ContentBlock_Props): ContentBlockResponse {
  // Engine's assembled Lesson schema checks the Section boundary but not every
  // nested ContentBlock. Parse each concrete Props schema before projection.
  contentBlockSchemas[source.type].parse(source);
  const meta = { id: source.id, slug: source.slug };
  switch (source.type) {
    case 'text':
      return {
        ...meta,
        type: 'text',
        value: source.locale.value,
        ...(source.params.variables ? { variables: source.params.variables } : {}),
        ...(source.params.wrap ? { wrap: { typographyProps: source.params.wrap.typographyProps } } : {}),
      } as unknown as ContentBlockResponse;
    case 'markdown':
      return { ...meta, type: 'markdown', text: source.locale.value, variables: source.locale.variables };
    case 'code':
      return {
        ...meta,
        type: 'code',
        language: source.params.language,
        codeAsText: source.params.codeAsText,
        title: source.locale?.title,
        variables: source.locale?.variables,
      } as unknown as ContentBlockResponse;
    case 'image':
      return { ...meta, type: 'image', ...source.params, ...source.locale } as unknown as ContentBlockResponse;
    case 'carousel':
      return { ...meta, type: 'carousel', ...source.params, ...source.locale } as unknown as ContentBlockResponse;
    case 'video':
      return { ...meta, type: 'video', ...source.locale } as unknown as ContentBlockResponse;
    case 'audio':
      return { ...meta, type: 'audio', ...source.locale } as unknown as ContentBlockResponse;
    case 'youtube':
      return { ...meta, type: 'youtube', mode: source.params.mode, ...source.locale } as unknown as ContentBlockResponse;
    case 'scene': {
      const value = source.locale.value;
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error('Scene ' + source.id + ' needs object-valued renderer props');
      }
      return { ...meta, type: 'scene', locales: value } as unknown as ContentBlockResponse;
    }
    case 'checkpoint':
      return {
        ...meta,
        type: 'checkpoint',
        ...source.params,
        title: source.locale.title,
        items: source.content.map(item => {
          if (!item.answer.length) throw new Error('Empty Checkpoint answer: ' + item.id);
          return {
            question: item.question.locale.value,
            answer: item.answer.map(projectContentBlock),
            check: item.check,
          };
        }),
      } as unknown as ContentBlockResponse;
    default: {
      const unsupported: never = source;
      throw new Error('Unrecognized ContentBlock Props: ' + String(unsupported));
    }
  }
}

type EngineQuestion =
  | Question_SelectOneAnswer_Props
  | Question_SelectMultipleAnswers_Props
  | Question_MatchBlocks_Props
  | Question_AnswerWithText_Props
  | Question_AnswerWithNumber_Props
  | Question_OrderSequence_Props
  | Question_BuildAnswerWithBlocks_Props
  | Question_FillBlanksWithBlocks_Props
  | Question_FillBlanksWithText_Props;

function parseQuestion(value: unknown): EngineQuestion {
  if (!value || typeof value !== 'object' || !('type' in value)) {
    throw new Error('Published Lesson question must have a type');
  }
  switch (value.type) {
    case 'selectOneAnswer':
      return selectOneAnswer_Props_Schema.parse(value) as Question_SelectOneAnswer_Props;
    case 'selectMultipleAnswers':
      return selectMultipleAnswers_Props_Schema.parse(value) as Question_SelectMultipleAnswers_Props;
    case 'matchBlocks':
      return matchBlocks_Props_Schema.parse(value) as Question_MatchBlocks_Props;
    case 'answerWithText':
      return answerWithText_Props_Schema.parse(value) as Question_AnswerWithText_Props;
    case 'answerWithNumber':
      return answerWithNumber_Props_Schema.parse(value) as Question_AnswerWithNumber_Props;
    case 'orderSequence':
      return orderSequence_Props_Schema.parse(value) as Question_OrderSequence_Props;
    case 'buildAnswerWithBlocks':
      return buildAnswerWithBlocks_Props_Schema.parse(value) as Question_BuildAnswerWithBlocks_Props;
    case 'fillBlanksWithBlocks':
      return fillBlanksWithBlocks_Props_Schema.parse(value) as Question_FillBlanksWithBlocks_Props;
    case 'fillBlanksWithText':
      return fillBlanksWithText_Props_Schema.parse(value) as Question_FillBlanksWithText_Props;
    default:
      throw new Error('Unsupported published Question Props type: ' + String(value.type));
  }
}

function projectQuestion(source: EngineQuestion): QuestionResponse {
  const meta = {
    id: source.id,
    slug: source.slug,
    type: source.type,
    question: source.content.question.map(projectContentBlock),
    ...(source.content.hint ? { hint: source.content.hint.map(projectContentBlock) } : {}),
    ...(source.content.explanation
      ? { explanation: source.content.explanation.map(projectContentBlock) }
      : {}),
  };
  switch (source.type) {
    case 'selectOneAnswer':
    case 'selectMultipleAnswers': {
      const answers = source.content.answers;
      const projectMap = (items: Record<string, ContentBlock_Props>) =>
        Object.fromEntries(Object.entries(items).map(([key, value]) => [key, projectContentBlock(value)]));
      return {
        ...meta,
        answers: {
          correct: projectMap(answers.correct),
          incorrect: projectMap(answers.incorrect),
          distractors: projectMap(answers.distractors),
        },
      } as unknown as QuestionResponse;
    }
    case 'matchBlocks':
      return {
        ...meta,
        pairs: Object.fromEntries(
          Object.entries(source.content.pairs).map(([key, pair]) => [
            key,
            { left: projectContentBlock(pair.left), right: projectContentBlock(pair.right) },
          ]),
        ),
      } as unknown as QuestionResponse;
    case 'answerWithText':
      return { ...meta, correctAnswers: source.locale.correctAnswers, placeholder: source.locale.placeholder } as unknown as QuestionResponse;
    case 'answerWithNumber':
      return { ...meta, correctAnswers: source.params.correctAnswers, placeholder: source.locale.placeholder } as unknown as QuestionResponse;
    case 'orderSequence':
      return { ...meta, sequence: source.content.sequence.map(projectContentBlock) } as unknown as QuestionResponse;
    case 'buildAnswerWithBlocks':
      return {
        ...meta,
        correctSequence: source.content.correctSequence.map(projectContentBlock),
        distractors: source.content.distractors.map(projectContentBlock),
        placeholder: source.locale.placeholder,
      } as unknown as QuestionResponse;
    case 'fillBlanksWithBlocks':
      return {
        ...meta,
        slots: source.content.slots.map(slot => ({
          selector: slot.selector,
          correctAnswer: projectContentBlock(slot.correctAnswer),
        })),
        distractors: source.content.distractors.map(projectContentBlock),
        placeholder: source.locale.placeholder,
      } as unknown as QuestionResponse;
    case 'fillBlanksWithText':
      return { ...meta, slots: source.locale.slots, placeholder: source.locale.placeholder } as unknown as QuestionResponse;
    default: {
      const unsupported: never = source;
      throw new Error('Unrecognized Question Props: ' + String(unsupported));
    }
  }
}

function projectQuestionBank(lesson: Lesson_Props): Record<string, Record<string, QuestionResponse>> {
  const bank: Record<string, Record<string, QuestionResponse>> = Object.create(null);
  const usedSlugs = new Set<string>();
  for (const [kind, entries] of Object.entries(lesson.questions ?? {})) {
    const group: Record<string, QuestionResponse> = Object.create(null);
    for (const raw of entries ?? []) {
      const source = parseQuestion(raw);
      const question = projectQuestion(source);
      if (source.type !== kind) throw new Error('Question Bank type mismatch: ' + kind + ':' + source.id);
      if (!source.slug || usedSlugs.has(source.slug)) {
        throw new Error('Duplicate or missing Lesson Question slug: ' + String(source.slug));
      }
      usedSlugs.add(source.slug);
      group[source.slug] = question;
    }
    bank[kind] = group;
  }
  return bank;
}

function projectEvents(value: Lesson_Props['events']): LessonEventSceneMap | undefined {
  if (!value) return undefined;
  const result: Record<string, LessonEventSceneMap[string]> = {};
  for (const [key, event] of Object.entries(value)) {
    if (event === false) {
      result[key] = false;
    } else if (event && typeof event === 'object' && !Array.isArray(event) && event.type === 'scene') {
      result[key] = projectContentBlock(scene_Props_Schema.parse(event)) as Exclude<LessonEventSceneMap[string], false>;
    } else {
      throw new Error('Unsupported published Lesson event reaction: ' + key);
    }
  }
  return result;
}

/** A complete, locale-selected Engine Props Lesson rendered by existing UI Kit widgets. */
export function projectLessonProps(lesson: Lesson_Props, language: LanguageCode): LessonView {
  if (!lesson.params.languages.includes(language)) {
    throw new Error('Lesson does not support selected language: ' + language);
  }
  // Quiz selection happens once per supplied Lesson. The Engine helper owns
  // deterministic sampling, correct-answer selection and display ordering.
  const bank = projectQuestionBank(lesson);
  const sections: LessonView['sections'] = lesson.section
    .filter(section => section.params.disabled !== true)
    .map(section => {
      const meta = {
        id: section.id,
        slug: section.slug,
        title: section.locale.title,
        navigationLabel: section.locale.navigationLabel,
        skippable: section.params.skippable,
      };
      if (section.type === 'quiz') {
        if (section.content.length || section.params.screen?.starting || section.params.screen?.ending) {
          throw new Error('Quiz screen content is not yet supported by the UI Kit: ' + section.id);
        }
        const parameters = { ...section.params, screen: {} };
        return {
          ...meta,
          type: 'quiz',
          parameters,
          questions: prepareQuizQuestions(bank, parameters),
        } as LessonView['sections'][number];
      }
      return {
        ...meta,
        type: section.type === 'content' ? 'learningFlow' : section.type,
        content: section.content.filter(block => block.params.disabled !== true).map(projectContentBlock),
      } as LessonView['sections'][number];
    });
  return {
    id: lesson.id,
    title: lesson.locale.title,
    locale: { code: language },
    parameters: {
      languages: lesson.params.languages,
      sections: lesson.params.sections,
    },
    sections,
    events: projectEvents(lesson.events),
  };
}
