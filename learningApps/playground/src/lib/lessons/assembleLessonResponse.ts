import type { LanguageCode } from '@svitlo/engine/localization';
import { SECTION_TYPES, type ContentBlock, type Locale_Languages, type Question, type Section_Type } from '@svitlo/engine/content';
import { resolveEntityPath } from '@svitlo/engine';

export type LocaleSource = { code: LanguageCode; isFallback?: true };
export type LessonCollection = { data: unknown; localeSources: Record<string, LocaleSource> };
/** Published section content is already ordered and discriminated. */
export type LessonContentBlock = ContentBlock<'response', Locale_Languages> & { slug: string };
export type LessonRenderableBlock = Exclude<LessonContentBlock, { type: 'quiz' }>;
export type LessonSectionResponse = {
  id: string;
  slug: string;
  type: Section_Type;
  title: string;
  navigationLabel: string;
  skippable?: true;
  content: LessonContentBlock[];
  /** Questions referenced by this section's quiz blocks, ready for rendering. */
  questions: Question<'response', Locale_Languages>[];
};
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
  questions: Record<string, Record<string, Record<string, unknown>>>;
  sections: LessonSectionResponse[];
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
    if (meta.isFallback !== undefined && meta.isFallback !== true) {
      throw new Error('Invalid fallback metadata in ' + name + ' at ' + pointer);
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
  if (source.type === 'scene' && source.locales && typeof source.locales === 'object') {
    const { locales: messages, ...rest } = children;
    return { ...rest, messages, rendererKey: source.id };
  }
  return children;
}

const supportedBlockTypes = new Set([
  'text', 'markdown', 'checkpoint', 'scene', 'code', 'audio', 'video', 'youtube', 'image', 'quiz',
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
    if (type === 'scene') record(block.messages, where + '.messages');
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
      if (source.isFallback === true ? source.code === language : source.code !== language) {
        throw new Error('Contradictory fallback metadata in ' + kind + ' at ' + pointer +
          ': requested ' + language + ', source ' + source.code);
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
    const content = assembleBlocks(section.content, relativePath + '/' + sectionSlug + '/content');
    const quizBlocks = content.filter(block => block.type === 'quiz');
    if ((sectionType === 'quiz') !== (quizBlocks.length === 1)) {
      throw new Error('Quiz section type and content disagree at ' + sectionSlug);
    }
    const sectionQuestions: Question<'response', Locale_Languages>[] = [];
    for (const block of quizBlocks) {
      const slugs = block.questionSlugs;
      if (!Array.isArray(slugs) || slugs.some(value => typeof value !== 'string') ||
          new Set(slugs).size !== slugs.length || slugs.length === 0) {
        throw new Error('Invalid quiz questionSlugs in ' + relativePath + '/' + sectionSlug);
      }
      for (const questionSlug of slugs) {
        const matches = Object.values(indexedQuestions).flatMap(bank =>
          bank[questionSlug] ? [bank[questionSlug]] : []);
        if (matches.length !== 1) {
          throw new Error('Quiz references missing or ambiguous question ' + questionSlug +
            ' in ' + relativePath + '/' + sectionSlug);
        }
        const response = matches[0];
        const responseType = string(response.type, 'questions.data.' + questionSlug + '.type');
        if (!(responseType in indexedQuestions)) {
          throw new Error('Unsupported question response type: ' + responseType);
        }
        sectionQuestions.push(response as Question<'response', Locale_Languages>);
      }
    }
    sections.push({
      id: sectionId,
      slug: sectionSlug,
      type: sectionType as Section_Type,
      title: string(section.title, where + '.title'),
      navigationLabel: string(section.navigationLabel, where + '.navigationLabel'),
      ...(section.skippable === true ? { skippable: true as const } : {}),
      content,
      questions: sectionQuestions,
    });
  }
  const options = ['allowNavigation', 'allowSkipping', 'showIndexes'] as const;
  for (const option of options) {
    if (typeof settings[option] !== 'boolean') {
      throw new Error('Invalid ' + option + ' for ' + relativePath);
    }
  }
  if (typeof parameters.requireQuiz !== 'boolean') throw new Error('Invalid requireQuiz for ' + slug);
  const quizCount = sections.filter(section => section.type === 'quiz').length;
  if (quizCount > 1 || (parameters.requireQuiz && quizCount !== 1)) {
    throw new Error('Lesson ' + relativePath + ' requires exactly one quiz when requireQuiz is true');
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
    questions: indexedQuestions,
    sections,
    localeSources: {
      config: config.localeSources,
      flashcards: flashcards.localeSources,
      questions: questions.localeSources,
    },
  };
}
