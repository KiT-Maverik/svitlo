/**
 * Host-neutral Data -> presentation Props projection.
 * Ordered domain placements remain slug-addressed; renderers receive arrays only
 * at this boundary. No authored Configurator or framework-specific dependency.
 */
import {
  carousel_Slide_Data_Schema,
  primitiveContentBlockResolved_Schema,
  checkpointItem_Data_Schema,
  contentBlockResolved_Schema,
  type Checkpoint_Allowed_Data,
  type ContentBlock_Carousel_Data,
  type ContentBlock_Carousel_SlideData,
  type ContentBlock_Checkpoint_Data,
  type ContentBlock_CheckpointItem_Data,
  type ContentBlock_Data,
  type Lesson_Data,
  type LocalizedAssessment,
  type LocalizedEpisode,
  type Section_Data,
} from '@svitlo/engine/runtime';

export type CarouselViewProps = Omit<ContentBlock_Carousel_Data, 'children'> & {
  locale: { title?: string; slides: ContentBlock_Carousel_SlideData[] };
};

export type CheckpointItemViewProps = Omit<ContentBlock_CheckpointItem_Data, 'answer'> & {
  answer: Checkpoint_Allowed_Data[];
};

export type CheckpointViewProps = Omit<ContentBlock_Checkpoint_Data, 'children'> & {
  content: CheckpointItemViewProps[];
};

export type ContentBlockViewProps =
  | Exclude<ContentBlock_Data, { type: 'carousel' | 'checkpoint' }>
  | CarouselViewProps
  | CheckpointViewProps;

type WithoutChildren<T> = T extends unknown ? Omit<T, 'children'> : never;
export type SectionViewProps = WithoutChildren<Section_Data> & { content: ContentBlockViewProps[] };

export type LessonViewProps = Pick<Lesson_Data, 'id' | 'type' | 'slug' | 'params' | 'locale' | 'skills' | 'events'> & {
  section: SectionViewProps[];
};
export type EpisodeViewProps = Pick<LocalizedEpisode, 'id' | 'type' | 'slug' | 'params' | 'locale'> & {
  section: SectionViewProps[];
};
export type AssessmentViewProps = Pick<LocalizedAssessment, 'id' | 'type' | 'slug' | 'params' | 'locale'> & {
  section: SectionViewProps[];
};

const safeKey = /^[a-z][a-zA-Z0-9]*$/;
const dangerous = new Set(['__proto__', 'constructor', 'prototype']);

function asRecord(value: unknown, at: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw Error('Invalid presentation Data at ' + at);
  return value as Record<string, unknown>;
}

function ordered(owner: Record<string, unknown>, at: string): unknown[] {
  const children = owner.children;
  if (!Array.isArray(children) || new Set(children).size !== children.length)
    throw Error('Invalid presentation child order at ' + at);
  return children.map((key: unknown) => {
    if (typeof key !== 'string' || !safeKey.test(key) || dangerous.has(key) || !Object.hasOwn(owner, key))
      throw Error('Invalid presentation placement at ' + at);
    return asRecord(owner[key], at + '/' + key);
  });
}

function enabled(value: unknown): boolean {
  const record = asRecord(value, 'child');
  const params = record.params;
  return !params || asRecord(params, 'params').disabled !== true;
}

export function toContentBlockProps(value: unknown): ContentBlockViewProps {
  const source = asRecord(value, 'block');
  contentBlockResolved_Schema.parse(source);
  if (source.type === 'carousel') {
    const slides = ordered(source, 'carousel')
      .filter(enabled)
      .map(slide => carousel_Slide_Data_Schema.parse(slide));
    if (!slides.length) throw Error('Carousel needs an enabled slide');
    const title = asRecord(source.locale ?? {}, 'carousel locale').title;
    if (title !== undefined && typeof title !== 'string') throw Error('Invalid Carousel title');
    return {
      id: source.id,
      slug: source.slug,
      type: 'carousel',
      params: source.params,
      locale: { ...(typeof title === 'string' ? { title } : {}), slides },
    } as CarouselViewProps;
  }
  if (source.type === 'checkpoint') {
    const content = ordered(source, 'checkpoint').filter(enabled).map(raw => {
      const item = checkpointItem_Data_Schema.parse(raw);
      return {
        id: item.id,
        slug: item.slug,
        type: item.type,
        ...(item.check ? { check: item.check } : {}),
        question: item.question,
        answer: ordered(item.answer, 'checkpoint answer')
          .filter(enabled)
          .map(answer => {
            primitiveContentBlockResolved_Schema.parse(answer);
            return answer as Checkpoint_Allowed_Data;
          }),
      };
    });
    if (!content.length) throw Error('Checkpoint needs an enabled item');
    return {
      id: source.id, slug: source.slug, type: 'checkpoint', params: source.params,
      locale: source.locale, content,
    } as CheckpointViewProps;
  }
  return source as ContentBlockViewProps;
}

function section(value: unknown): SectionViewProps {
  const data = asRecord(value, 'section');
  if (!['content', 'practice', 'codingTask', 'learningFlow', 'quiz', 'flashcards'].includes(String(data.type)))
    throw Error('Unsupported presentation Section: ' + String(data.type));
  const content = ordered(data, 'section').filter(enabled).map(toContentBlockProps);
  return {
    id: data.id,
    slug: data.slug,
    type: data.type,
    params: data.params,
    locale: data.locale,
    content,
  } as SectionViewProps;
}

function sections(owner: Record<string, unknown>): SectionViewProps[] {
  return ordered(owner, String(owner.type)).filter(enabled).map(section);
}

export function toLessonProps(data: Lesson_Data): LessonViewProps {
  if ('draft' in data && data.draft === true) throw Error('Draft Lesson cannot be rendered as completed Lesson');
  return {
    id: data.id,
    type: data.type,
    slug: data.slug,
    params: data.params,
    locale: data.locale,
    skills: data.skills,
    events: data.events,
    section: sections(data),
  };
}

export function toEpisodeProps(data: LocalizedEpisode): EpisodeViewProps {
  return {
    id: data.id, type: data.type, slug: data.slug,
    params: data.params, locale: data.locale, section: sections(data),
  };
}

export function toAssessmentProps(data: LocalizedAssessment): AssessmentViewProps {
  const before = asRecord(data.before, 'assessment before');
  const after = asRecord(data.after, 'assessment after');
  return {
    id: data.id, type: data.type, slug: data.slug, params: data.params, locale: data.locale,
    section: [
      ...ordered(before, 'assessment before').filter(enabled).map(section),
      section(data.quiz),
      ...ordered(after, 'assessment after').filter(enabled).map(section),
    ],
  };
}
