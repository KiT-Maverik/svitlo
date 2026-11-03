import type { LanguageCode } from '@svitlo/engine/localization';
import { SECTION_TYPES, type ContentBlock, type ContentBlock_Reference, type Question, type Section_Type } from '@svitlo/engine/content';
import { resolveEntityPath } from '@svitlo/engine';

export type LocaleSource = { code: LanguageCode; isFallback?: true };
export type LessonCollection = { data: unknown; localeSources: Record<string, LocaleSource> };
export type LessonContentBlock = {
  id: string;
  slug: string;
  blockType: string;
  sceneId?: string;
  text?: string;
  value?: string;
  locales?: Record<string, unknown>;
  questions?: Record<string, Record<string, unknown>>;
  [key: string]: unknown;
};
export type LessonRenderableBlock = Exclude<ContentBlock<'response'>, { type: 'quiz' }>;
export type LessonSectionResponse = {
  id: string;
  slug: string;
  type: Section_Type;
  title: string;
  navigationLabel: string;
  skippable?: true;
  content: Record<string, Record<string, LessonContentBlock>>;
  order: ContentBlock_Reference[];
  blocks: LessonRenderableBlock[];
  /** Server-assembled array of typed responses, ready for the client renderer. */
  questions: Question<'response'>[];
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
  sections: Record<string, LessonSectionResponse>;
  sectionOrder: string[];
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

/** Add Response discriminators for nested content where current authored contracts omit them. */
function decorateResponse(value: unknown, language: LanguageCode): unknown {
  if (Array.isArray(value)) return value.map(entry => decorateResponse(entry, language));
  if (!value || typeof value !== 'object') return value;
  const source = value as Record<string, unknown>;
  const children = Object.fromEntries(
    Object.entries(source).map(([key, child]) => [key, decorateResponse(child, language)]),
  );
  if (typeof source.id !== 'string' || typeof source.slug !== 'string') return children;
  const locale = { code: language };
  if (typeof source.value === 'string') return { ...children, type: 'text', locale };
  if (typeof source.locales === 'string') {
    const { locales: text, ...rest } = children;
    return { ...rest, type: 'markdown', text, locale };
  }
  return { ...children, locale };
}

function assembleBlocks(
  content: unknown,
  order: unknown,
  location: string,
  language: LanguageCode,
): Pick<LessonSectionResponse, 'content' | 'order' | 'blocks'> {
  const catalog = record(content, location);
  const normalized: LessonSectionResponse['content'] = {};
  const keys: string[] = [];
  for (const [kind, entries] of Object.entries(catalog)) {
    normalized[kind] = {};
    for (const [key, raw] of Object.entries(record(entries, location + '/' + kind))) {
      const block = record(decorateResponse(raw, language), location + '/' + kind + '/' + key);
      const slug = string(block.slug, location + '/' + kind + '/' + key + '.slug');
      if (slug !== key) throw new Error('Block slug mismatch at ' + location + '/' + kind + '/' + key);
      const id = string(block.id, location + '/' + kind + '/' + key + '.id');
      const reference = kind + '/' + key;
      keys.push(reference);
      const resolved: LessonContentBlock = { ...block, id, slug, type: kind, blockType: kind, locale: { code: language } };
      if (kind === 'markdown') {
        resolved.text = string(block.text, location + '/' + reference + '.text');
      }
      if (kind === 'scene') {
        resolved.messages = record(block.messages, location + '/' + reference + '.messages');
        resolved.locale = { code: language };
        resolved.sceneId = location + '/' + reference;
      }
      normalized[kind][key] = resolved;
    }
  }
  if (!Array.isArray(order) || order.length !== keys.length) {
    throw new Error('Invalid content order at ' + location);
  }
  const references = order.map((raw, index) => {
    const ref = record(raw, location + '.order[' + index + ']');
    return {
      type: string(ref.type, location + '.order[' + index + '].type'),
      slug: string(ref.slug, location + '.order[' + index + '].slug'),
    };
  });
  const names = references.map(ref => ref.type + '/' + ref.slug);
  if (new Set(names).size !== names.length || names.some(name => !keys.includes(name))) {
    throw new Error('Content order must reference every block once at ' + location);
  }
  const blocks = references
    .filter(reference => reference.type !== 'quiz')
    .map(({ type, slug }) => normalized[type][slug] as unknown as LessonRenderableBlock);
  return { content: normalized, order: references, blocks };
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
      indexedQuestions[kind][key] = record(decorateResponse(question, language), 'questions.data.' + kind + '.' + key);
    }
  }
  const sections: LessonResponse['sections'] = {};
  for (const [key, rawSection] of Object.entries(record(data.sections, 'config.data.sections'))) {
    const section = record(rawSection, 'config.data.sections.' + key);
    const sectionSlug = string(section.slug, 'sections.' + key + '.slug');
    if (sectionSlug !== key) throw new Error('Section slug mismatch at ' + key);
    const sectionType = string(section.type, 'sections.' + key + '.type');
    if (!SECTION_TYPES.includes(sectionType as Section_Type)) {
      throw new Error('Unsupported section type at ' + key + ': ' + sectionType);
    }
    const content = assembleBlocks(section.content, section.order, relativePath + '/' + key, language);
    const hasQuiz = Object.keys(content.content.quiz ?? {}).length > 0;
    if ((sectionType === 'quiz') !== hasQuiz) {
      throw new Error('Quiz section type and content disagree at ' + key);
    }
    const sectionQuestions: Question<'response'>[] = [];
    for (const block of Object.values(content.content.quiz ?? {})) {
      const slugs = block.questionSlugs;
      if (!Array.isArray(slugs) || slugs.some(value => typeof value !== 'string') ||
          new Set(slugs).size !== slugs.length || slugs.length === 0) {
        throw new Error('Invalid quiz questionSlugs in ' + relativePath + '/' + key);
      }
      const resolved: Record<string, Record<string, unknown>> = {};
      for (const questionSlug of slugs as string[]) {
        const matches = Object.values(indexedQuestions).flatMap(bank =>
          bank[questionSlug] ? [bank[questionSlug]] : []);
        if (matches.length !== 1) {
          throw new Error('Quiz references missing or ambiguous question ' + questionSlug +
            ' in ' + relativePath + '/' + key);
        }
        resolved[questionSlug] = matches[0];
        // The published catalog is typed at authoring/build time; verify its
        // discriminator before crossing the JSON boundary into the UI.
        const response = matches[0];
        const responseType = string(response.type, 'questions.data.' + questionSlug + '.type');
        if (!(responseType in indexedQuestions)) {
          throw new Error('Unsupported question response type: ' + responseType);
        }
        sectionQuestions.push(response as Question<'response'>);
      }
      block.questions = resolved;
    }
    sections[key] = {
      id: string(section.id, 'sections.' + key + '.id'),
      slug: sectionSlug,
      type: sectionType as Section_Type,
      title: string(section.title, 'sections.' + key + '.title'),
      navigationLabel: string(section.navigationLabel, 'sections.' + key + '.navigationLabel'),
      ...(section.skippable === true ? { skippable: true as const } : {}),
      ...content,
      questions: sectionQuestions,
    };
  }
  const sectionOrder = data.sectionOrder;
  if (!Array.isArray(sectionOrder) || sectionOrder.length !== Object.keys(sections).length ||
      sectionOrder.some(value => typeof value !== 'string' || !(value in sections)) ||
      new Set(sectionOrder).size !== sectionOrder.length) {
    throw new Error('Invalid sectionOrder for ' + relativePath);
  }
  const options = ['allowNavigation', 'allowSkipping', 'showIndexes'] as const;
  for (const option of options) {
    if (typeof settings[option] !== 'boolean') {
      throw new Error('Invalid ' + option + ' for ' + relativePath);
    }
  }
  if (typeof parameters.requireQuiz !== 'boolean') throw new Error('Invalid requireQuiz for ' + slug);
  const quizCount = Object.values(sections).filter(section => section.type === 'quiz').length;
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
    sectionOrder: sectionOrder as string[],
    localeSources: {
      config: config.localeSources,
      flashcards: flashcards.localeSources,
      questions: questions.localeSources,
    },
  };
}
