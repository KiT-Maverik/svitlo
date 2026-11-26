import { allLanguageCodes, type AllLanguageCodes, type LanguageCode } from '#schemas';
import type { LanguageScope, PublicationLanguageOptions } from '#types';

import { resolvePublicationLanguages, 
  scopeBuild,
} from '../../_shared__configurators';
import { identityBase_Schema } from '../../_shared__configurators/common.schemas';
import { defineAssessmentDraft } from '../../assessments/defineAssessment';
import { defineText } from '../../contentBlocks/defineText';
import { episode_Draft_Props_Schema } from '../../episodes/defineEpisode';
import { lesson_Draft_Props_Schema } from '../../lessons/defineLesson';
import { defineContentSection } from '../../sections/defineContentSection';

/**
 * Deterministic UUIDs for draft-only preview UI elements. This portable,
 * synchronous 128-bit non-cryptographic hash has no Node dependency: Engine
 * Configurators must also work in browsers and mobile hosts.
 * These are never authored or published as completed content identities.
 */
const previewId = (parentId: string, role: string): string => {
  const input = parentId + '/' + role;
  const hashWord = (seed: number): string => {
    let hash = seed >>> 0;
    for (let index = 0; index < input.length; index++)
      hash = Math.imul(hash ^ input.charCodeAt(index), 0x01000193) >>> 0;
    return hash.toString(16).padStart(8, '0');
  };
  const hex = [0x811c9dc5, 0x17a50f23, 0xc2b2ae35, 0x9e3779b9].map(hashWord).join('');
  return [hex.slice(0, 8), hex.slice(8, 12), '5' + hex.slice(13, 16), '8' + hex.slice(17, 20), hex.slice(20, 32)].join(
    '-',
  );
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

const createStub = <const K extends Kind, const Slug extends string>(type: K, { id, slug }: StubInput<Slug>) => {
  const section = preview(id);
  const params =
    type === 'lesson'
      ? {
          languages: [...allLanguageCodes] as LanguageCode[],
          quizRequiredForCompletion: false,
          sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
        }
      : { languages: [...allLanguageCodes] as LanguageCode[] };

  const validate = (): void => {
    identityBase_Schema.parse({ id, slug });
    const built = section.build.props({ languages: ['en'] });
    if (
      !built.base.content.some(
        block =>
          block.type === 'text' &&
          typeof block.locale === 'object' &&
          block.locale !== null &&
          'value' in block.locale &&
          block.locale.value === 'Not implemented',
      )
    ) {
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
    build: scopeBuild({ props, overrides }),
    config: {
      base: { id, slug, type, params, locale: { title: 'Not implemented' } },
      locales: () => ({ locale: {} }),
      validate,
    },
  };
  return result as typeof result & LanguageScope<AllLanguageCodes>;
};

/** A Course placement, never a completed pedagogical Lesson. */
export const defineLessonStub = <const Slug extends string>(config: StubInput<Slug>) => createStub('lesson', config);

/** A Course placement, never a completed narrative Episode. */
export const defineEpisodeStub = <const Slug extends string>(config: StubInput<Slug>) => createStub('episode', config);

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
