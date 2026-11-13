import type { LanguageCode } from '@svitlo/contracts/localization';
import {
  SECTION_TYPES,
  type ContentBlock,
  type Quiz_Parameters,
  type Section,
  type SkillId,
  type Locale_Languages,
  type Section_Type,
  type ContentBlock_Scene,
  DEFAULT_LESSON_EVENTS,
} from '@svitlo/contracts/content';
import { resolveEntityPath } from '../utils/entityPath/resolveEntityPath.utils';
import { prepareQuizQuestions } from './prepareQuizQuestions';

export type LocaleSource = { code: LanguageCode };
export type LessonCollection = { data: unknown; localeSources: Record<string, LocaleSource> };
/** Published section content is already ordered and discriminated. */
export type LessonContentBlock = ContentBlock<'response', Locale_Languages> & { slug: string };
export type LessonRenderableBlock = LessonContentBlock;
export type LessonSectionResponse = Section<'response', Locale_Languages>;
export type LessonResponse = {
  id: string;
  slug: string;
  title: string;
  locale: { code: LanguageCode };
  parameters: {
    requireQuiz: boolean;
    languages: LanguageCode[];
    sections: { allowNavigation: boolean; allowSkipping: boolean; showIndexes: boolean };
  };
  flashcards: unknown[];
  skills: SkillId[];
  questions: Record<string, Record<string, Record<string, unknown>>>;
  sections: LessonSectionResponse[];
  events?: Readonly<Record<string, ContentBlock_Scene<'response', Locale_Languages> | false>>;
  localeSources: {
    config: Record<string, LocaleSource>;
    flashcards: Record<string, LocaleSource>;
    questions: Record<string, LocaleSource>;
  };
};

function record(value: unknown, where: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Invalid lesson resource at ' + where + ': expected object');
  }
  return value as Record<string, unknown>;
}

function string(value: unknown, where: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error('Invalid lesson resource at ' + where + ': expected non-empty string');
  }
  return value;
}

function collection(value: unknown, name: string): LessonCollection {
  const document = record(value, name);
  const sources = record(document.localeSources, name + '.localeSources');
  for (const [pointer, source] of Object.entries(sources)) {
    const meta = record(source, name + '.localeSources.' + pointer);
    string(meta.code, name + '.localeSources.' + pointer + '.code');
    if (Object.keys(meta).length !== 1) {
      throw new Error('Unexpected locale source metadata in ' + name + ' at ' + pointer);
    }
  }
  return { data: document.data, localeSources: sources as Record<string, LocaleSource> };
}

/** Authoring data already carries a discriminant; only rename published localized fields. */
function decorateResponse(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(decorateResponse);
  if (!value || typeof value !== 'object') return value;
  const source = value as Record<string, unknown>;
  const children = Object.fromEntries(Object.entries(source).map(([key, child]) => [key, decorateResponse(child)]));
  if (typeof source.id !== 'string' || typeof source.slug !== 'string') return children;
  if (source.type === 'markdown' && typeof source.locales === 'string') {
    const { locales: text, ...rest } = children;
    return { ...rest, text };
  }
  return children;
}

const supportedBlockTypes = new Set([
  'text',
  'markdown',
  'checkpoint',
  'scene',
  'code',
  'audio',
  'video',
  'youtube',
  'image',
  'carousel',
]);

function assembleBlocks(content: unknown, location: string): LessonContentBlock[] {
  if (!Array.isArray(content)) throw new Error('Expected ordered content array at ' + location);
  const seen = new Set<string>();
  return content.map((raw, index) => {
    const where = location + '[' + index + ']';
    const block = record(decorateResponse(raw), where);
    const id = string(block.id, where + '.id');
    const slug = string(block.slug, where + '.slug');
    const type = string(block.type, where + '.type');
    if (!supportedBlockTypes.has(type)) throw new Error('Unsupported content block type at ' + where + ': ' + type);
    const key = type + '/' + slug;
    if (seen.has(key)) throw new Error('Duplicate content block ' + key + ' at ' + location);
    seen.add(key);
    if (type === 'markdown') string(block.text, where + '.text');
    if (type === 'scene') record(block.locales, where + '.locales');
    return { ...block, id, slug, type } as LessonContentBlock;
  });
}

/** Pure response assembly: runtime consumes only the three published JSON collections. */
export function assembleLessonResponse(
  id: string,
  language: LanguageCode,
  raw: { config: unknown; flashcards: unknown; questions: unknown },
): LessonResponse {
  const config = collection(raw.config, 'config');
  const flashcards = collection(raw.flashcards, 'flashcards');
  const questions = collection(raw.questions, 'questions');
  for (const [kind, item] of Object.entries({ config, flashcards, questions })) {
    for (const [pointer, source] of Object.entries(item.localeSources)) {
      if (source.code !== language) {
        throw new Error(
          'Unexpected locale source in ' +
            kind +
            ' at ' +
            pointer +
            ': requested ' +
            language +
            ', source ' +
            source.code,
        );
      }
    }
  }
  const relativePath = resolveEntityPath(id);
  const data = record(config.data, 'config.data');
  if (data.id !== id) {
    throw new Error('Lesson JSON identity mismatch: expected ' + id);
  }
  const slug = string(data.slug, 'config.data.slug');
  const parameters = record(data.parameters, 'config.data.parameters');
  const languages = parameters.languages;
  if (!Array.isArray(languages) || !languages.includes(language)) {
    throw new Error('Lesson ' + relativePath + ' does not support language ' + language);
  }
  const settings = record(parameters.sections, 'config.data.parameters.sections');
  if (!Array.isArray(flashcards.data)) throw new Error('Invalid flashcards for ' + relativePath);
  const questionCatalog = record(questions.data, 'questions.data');
  const indexedQuestions: LessonResponse['questions'] = {};
  for (const [kind, entries] of Object.entries(questionCatalog)) {
    indexedQuestions[kind] = {};
    for (const [key, value] of Object.entries(record(entries, 'questions.data.' + kind))) {
      const question = record(value, 'questions.data.' + kind + '.' + key);
      if (question.slug !== key) throw new Error('Question slug mismatch at ' + kind + '/' + key);
      indexedQuestions[kind][key] = record(decorateResponse(question), 'questions.data.' + kind + '.' + key);
    }
  }
  if (!Array.isArray(data.sections)) throw new Error('Expected ordered sections array for ' + relativePath);
  const sections: LessonResponse['sections'] = [];
  const sectionSlugs = new Set<string>();
  const sectionIds = new Set<string>();
  for (const [index, rawSection] of data.sections.entries()) {
    const where = 'config.data.sections[' + index + ']';
    const section = record(rawSection, where);
    const sectionSlug = string(section.slug, where + '.slug');
    const sectionId = string(section.id, where + '.id');
    if (sectionSlugs.has(sectionSlug) || sectionIds.has(sectionId)) {
      throw new Error('Duplicate section identity at ' + where);
    }
    sectionSlugs.add(sectionSlug);
    sectionIds.add(sectionId);
    const sectionType = string(section.type, where + '.type');
    if (!SECTION_TYPES.includes(sectionType as Section_Type)) {
      throw new Error('Unsupported section type at ' + where + ': ' + sectionType);
    }
    // New Section configurators publish skippable under params; legacy authored Sections
    // place it at the root. Normalize both paths into the renderer's Section metadata.
    const sectionParams = section.params === undefined ? undefined : record(section.params, where + '.params');
    const authoredSkippable = sectionParams?.skippable ?? section.skippable;
    if (authoredSkippable !== undefined && typeof authoredSkippable !== 'boolean') {
      throw new Error('Invalid Section skippable at ' + where);
    }
    const metadata = {
      id: sectionId,
      slug: sectionSlug,
      title: string(section.title, where + '.title'),
      navigationLabel: string(section.navigationLabel, where + '.navigationLabel'),
      ...(typeof authoredSkippable === 'boolean' ? { skippable: authoredSkippable } : {}),
    };
    if (sectionType === 'quiz') {
      if (section.content !== undefined) throw new Error('Quiz must not contain ContentBlocks at ' + sectionSlug);
      const parameters = record(section.parameters, where + '.parameters');
      const selection = record(parameters.selection, where + '.parameters.selection');
      const layout = record(parameters.layout, where + '.parameters.layout');
      if (!['all', 'sample'].includes(String(selection.mode))) throw new Error('Invalid Quiz selection at ' + where);
      if (!['stack', 'stepper'].includes(String(layout.mode))) throw new Error('Invalid Quiz layout at ' + where);
      if (parameters.isBlocker !== undefined && typeof parameters.isBlocker !== 'boolean')
        throw new Error('Invalid Quiz isBlocker at ' + where);
      if (
        parameters.timeLimitSeconds !== undefined &&
        (typeof parameters.timeLimitSeconds !== 'number' ||
          !Number.isSafeInteger(parameters.timeLimitSeconds) ||
          parameters.timeLimitSeconds <= 0)
      )
        throw new Error('Invalid Quiz timeLimitSeconds at ' + where);
      const quiz = parameters as Quiz_Parameters<'response', Locale_Languages>;
      sections.push({
        ...metadata,
        type: 'quiz',
        parameters: quiz,
        questions: prepareQuizQuestions(indexedQuestions, quiz),
      });
    } else {
      if (section.parameters !== undefined) throw new Error('Unexpected Quiz parameters at ' + where);
      sections.push({
        ...metadata,
        type: sectionType as Exclude<Section_Type, 'quiz'>,
        content: assembleBlocks(section.content, relativePath + '/' + sectionSlug + '/content'),
      });
    }
  }
  const defaultEvents: ReadonlySet<string> = new Set(DEFAULT_LESSON_EVENTS);
  const eventScenes: Record<string, ContentBlock_Scene<'response', Locale_Languages> | false> = {};
  if (data.events !== undefined) {
    const configured = record(data.events, 'config.data.events');
    for (const [eventId, raw] of Object.entries(configured)) {
      if (!/^[a-z][A-Za-z0-9]*$/.test(eventId)) {
        throw new Error('Invalid camelCase lesson event: ' + eventId);
      }
      if (raw === false) {
        if (!defaultEvents.has(eventId)) throw new Error('Custom event cannot be disabled in Lesson Data: ' + eventId);
        eventScenes[eventId] = false;
        continue;
      }
      const block = record(decorateResponse(raw), 'config.data.events.' + eventId);
      if (block.type !== 'scene') throw new Error('Event reaction must be a Scene: ' + eventId);
      string(block.id, 'config.data.events.' + eventId + '.id');
      string(block.slug, 'config.data.events.' + eventId + '.slug');
      record(block.locales, 'config.data.events.' + eventId + '.locales');
      eventScenes[eventId] = block as ContentBlock_Scene<'response', Locale_Languages>;
    }
  }
  const options = ['allowNavigation', 'allowSkipping', 'showIndexes'] as const;
  for (const option of options) {
    if (typeof settings[option] !== 'boolean') {
      throw new Error('Invalid ' + option + ' for ' + relativePath);
    }
  }
  if (typeof parameters.requireQuiz !== 'boolean') throw new Error('Invalid requireQuiz for ' + slug);
  const quizCount = sections.filter(section => section.type === 'quiz').length;
  if (parameters.requireQuiz && quizCount === 0) {
    throw new Error('Lesson ' + relativePath + ' requires at least one Quiz when requireQuiz is true');
  }
  const skills = data.skills;
  if (
    !Array.isArray(skills) ||
    skills.some(value => typeof value !== 'string' || !/^[0-9a-f-]{36}$/i.test(value)) ||
    new Set(skills).size !== skills.length
  ) {
    throw new Error('Invalid Lesson Skill IDs at ' + relativePath);
  }
  return {
    id: string(data.id, 'config.data.id'),
    slug,
    title: string(data.title, 'config.data.title'),
    locale: { code: language },
    parameters: {
      requireQuiz: parameters.requireQuiz,
      languages: languages as LanguageCode[],
      sections: settings as LessonResponse['parameters']['sections'],
    },
    flashcards: flashcards.data,
    skills: skills as SkillId[],
    questions: indexedQuestions,
    sections,
    ...(data.events !== undefined ? { events: eventScenes } : {}),
    localeSources: {
      config: config.localeSources,
      flashcards: flashcards.localeSources,
      questions: questions.localeSources,
    },
  };
}
