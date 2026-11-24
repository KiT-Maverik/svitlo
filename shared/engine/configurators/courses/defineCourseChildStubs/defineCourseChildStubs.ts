import { createHash } from 'node:crypto';

import { allLanguageCodes, type AllLanguageCodes, type LanguageCode } from '#schemas';
import type { LanguageScope, PublicationLanguageOptions } from '#types';

import { resolvePublicationLanguages } from '../../_shared__configurators';
import { defineAssessmentDraft } from '../../assessments/defineAssessment';
import { episode_Draft_Props_Schema } from '../../episodes/defineEpisode';
import { lesson_Draft_Props_Schema } from '../../lessons/defineLesson';
import { defineText } from '../../contentBlocks/defineText';
import { defineContentSection } from '../../sections/defineContentSection';

/** Stable authoring-only identifiers for the two real preview children. */
const previewId = (parentId: string, role: string): string => {
  const hash = createHash('sha1').update(parentId + '/' + role).digest('hex');
  return [hash.slice(0, 8), hash.slice(8, 12), '5' + hash.slice(13, 16), '8' + hash.slice(17, 20), hash.slice(20, 32)].join('-');
};

const preview = (id: string) => {
  const message = defineText({
    id: previewId(id, 'message'),
    slug: 'message',
    type: 'text',
    params: {},
    locale: { value: 'Not implemented' },
  });
  return defineContentSection({
    id: previewId(id, 'preview'),
    slug: 'preview',
    type: 'content',
    params: {},
    locale: { title: 'Not implemented', navigationLabel: 'Preview' },
    content: { items: { message }, order: ['message'] },
  });
};

type StubInput<Slug extends string> = { id: string; slug: Slug };
type Kind = 'lesson' | 'episode';

const createStub = <const K extends Kind, const Slug extends string>(
  type: K,
  { id, slug }: StubInput<Slug>,
) => {
  const section = preview(id);
  const params = type === 'lesson'
    ? {
        languages: [...allLanguageCodes] as LanguageCode[],
        quizRequiredForCompletion: false,
        sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
      }
    : { languages: [...allLanguageCodes] as LanguageCode[] };

  const validate = (): void => {
    const built = section.build.props({ languages: ['en'] });
    if (!built.base.content.some(block => block.type === 'text' && typeof block.locale === 'object' && block.locale !== null && 'value' in block.locale && block.locale.value === 'Not implemented')) {
      throw new Error('Stub preview must include a Not implemented Text ContentBlock');
    }
  };
  const props = (options: PublicationLanguageOptions<AllLanguageCodes>) => {
    const languages = resolvePublicationLanguages(options);
    const child = section.build.props({ languages });
    const base = {
      id,
      slug,
      type,
      draft: true as const,
      params: { ...params, languages: [...languages] },
      ...(type === 'lesson' ? { skills: [] as string[] } : {}),
      locale: { title: 'Not implemented' },
      section: [child.base],
    };
    (type === 'lesson' ? lesson_Draft_Props_Schema : episode_Draft_Props_Schema).parse(base);
    return { base, locale: undefined };
  };
  const overrides = (_patch: never, _options: PublicationLanguageOptions<AllLanguageCodes>): never => {
    throw new Error(type + ' stub cannot be overridden; complete the ' + type + ' first');
  };
  const result = {
    id,
    slug,
    type,
    draft: true as const,
    preview: section,
    validate,
    build: { props, overrides },
    config: {
      base: { id, slug, type, params, locale: { title: 'Not implemented' } },
      locales: () => ({ locale: {} }),
      validate,
    },
  };
  return result as typeof result & LanguageScope<AllLanguageCodes>;
};

/** A Course placement, never a completed pedagogical Lesson. */
export const defineLessonStub = <const Slug extends string>(config: StubInput<Slug>) =>
  createStub('lesson', config);

/** A Course placement, never a completed narrative Episode. */
export const defineEpisodeStub = <const Slug extends string>(config: StubInput<Slug>) =>
  createStub('episode', config);

/** Reuse the existing typed Assessment draft with the canonical preview children. */
export const defineAssessmentStub = <const Slug extends string>({ id, slug }: StubInput<Slug>) =>
  defineAssessmentDraft({
    id,
    slug,
    type: 'assessment',
    params: { languages: allLanguageCodes },
    locale: { title: 'Not implemented' },
    preview: preview(id),
  });

export type Lesson_Stub_Configurator = ReturnType<typeof defineLessonStub>;
export type Episode_Stub_Configurator = ReturnType<typeof defineEpisodeStub>;
export type Assessment_Stub_Configurator = ReturnType<typeof defineAssessmentStub>;
