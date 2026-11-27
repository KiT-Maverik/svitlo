import type { LanguageCode } from '#schemas';
import type {
  ChildrenSupporting,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
  RequireLanguages,
} from '#types';

import {
  buildChildData,
  mergeForValidation,
  onlyLocales,
  resolvePublicationLanguages,
  scopeBuild,
  selectPublicationLocales,
  splitLocalizedFields,
  validateRequestedPublication,
} from '../../_shared__configurators';
import { text_Data_Schema } from '../../contentBlocks/primitive/defineText/defineText.schemas';
import {
  assessment_Config_Schema,
  assessment_Draft_Data_Schema,
  type Assessment_Config,
  type Assessment_Content_Section_Configurator,
  type Assessment_Draft_DataBase,
} from './defineAssessment.schemas';

type LocaleBody = { locale?: { title?: string }; preview?: Assessment_Draft_DataBase['preview'] };
type Files = Partial<Record<LanguageCode, LocaleBody>>;
type Publication = { base: Assessment_Draft_DataBase; locale: Files | undefined };
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Course Stage 5 owns a visible, intentionally incomplete Assessment.
 * It contains a real ContentSection and a real "Not implemented" Text block,
 * but no Quiz or Question IDs. Only the completed defineAssessment is publishable.
 */
export const defineAssessmentDraft = <
  const Slug extends string,
  const Languages extends readonly [LanguageCode, ...LanguageCode[]],
  const Preview extends Assessment_Content_Section_Configurator,
>(config: {
  id: Assessment_Config['id'];
  slug: Slug;
  type: 'assessment';
  params: Omit<Assessment_Config['params'], 'languages'> & { languages: Languages };
  locale: RequireLanguages<Assessment_Config['locale'], Languages>;
  preview: Preview & ChildrenSupporting<Languages, { preview: Preview }>['preview'];
}) => {
  const metadataSchema = assessment_Config_Schema.omit({ before: true, quiz: true, after: true });
  const { preview, ...metadata } = config;
  const authored = structuredClone(metadata);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, slug, type } = authored;
  const validate = () => {
    copyAuthored();
    const candidate: unknown = preview;
    if (!isRecord(candidate) || candidate.type !== 'content' ||
        !isRecord(candidate.config) || !isRecord(candidate.config.base) ||
        !isRecord(candidate.config.base.params) ||
        candidate.config.base.params.disabled === true) {
      throw new Error('Assessment draft preview requires an enabled Content Section');
    }
    const language = authored.params.languages[0];
    const source = preview.build.data({ languages: [language] });
    const effective: Record<string, unknown> = mergeForValidation(
      source.base as Record<string, unknown>,
      source.locale?.[language] ?? {},
    );
    if (!Array.isArray(effective.children)) {
      throw new Error('Assessment draft preview requires ordered children');
    }
    const hasPlaceholder = effective.children.some((key: unknown) => {
      if (typeof key !== 'string') return false;
      const text = text_Data_Schema.safeParse(effective[key]);
      return text.success &&
        text.data.params.disabled !== true &&
        text.data.locale.value === 'Not implemented';
    });
    if (!hasPlaceholder) {
      throw new Error('Assessment draft requires an enabled Not implemented Text ContentBlock');
    }
  };

  const data = (options: PublicationLanguageOptions<Languages>): Publication => {
    const languages = resolvePublicationLanguages(options);
    const own = copyAuthored();
    if (languages.some(language => !own.params.languages.includes(language)))
      throw new Error('Assessment draft does not support the requested language');
    validate();
    const section = buildChildData(preview);
    const split = splitLocalizedFields(own.locale);
    const files: Files = {};
    for (const [language, fields] of Object.entries(split.locale ?? {})) {
      files[language as LanguageCode] = { locale: fields as LocaleBody['locale'] };
    }
    const selected = selectPublicationLocales(files, languages) ?? {};
    for (const language of languages) {
      if (!section.locale?.[language]) continue;
      (selected[language] ??= {}).preview = mergeForValidation(
        section.base,
        section.locale[language],
      ) as Assessment_Draft_DataBase['preview'];
    }
    const base: Publication['base'] = {
      id,
      slug,
      type,
      params: { ...own.params, languages: [...languages] },
      draft: true,
      ...(Object.keys(split.base ?? {}).length ? { locale: split.base as { title?: string } } : {}),
      preview: section.base,
    };
    const result: Publication = {
      base: structuredClone(base),
      locale: Object.keys(selected).length ? structuredClone(selected) : undefined,
    };
    validateRequestedPublication(assessment_Draft_Data_Schema, result, languages);
    return result;
  };

  const overrides = (_patch: never, _options: PublicationLanguageOptions<Languages>): Publication => {
    throw new Error('Assessment draft preview cannot be overridden; complete the Assessment first');
  };
  const result = {
    id,
    slug,
    type,
    draft: true as const,
    preview,
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base: {
        id,
        slug,
        type,
        params: { ...structuredClone(authored.params), languages: [...authored.params.languages] },
        locale: {},
      },
      locales: (): { locale: DeepPartial<Assessment_Config['locale']> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type Assessment_Draft_Configurator = ReturnType<typeof defineAssessmentDraft>;
