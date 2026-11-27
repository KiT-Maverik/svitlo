import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { DeepPartial, LanguageScope, PublicationLanguageOptions, RequireLanguages } from '#types';

import {
  mergeForValidation,
  resolvePublicationLanguages,
  scopeBuild,
  selectPublicationLocales,
  splitLocalizedFields,
} from '../_shared__configurators';
import type { AssessmentMethodSlug } from '../questions/assessmentMethod.schemas';
import {
  assessmentMethod_Config_Schema,
  assessmentMethod_Data_Schema,
  type AssessmentMethod_Config,
  type AssessmentMethod_Data,
} from './defineAssessmentMethod.schemas';

type AssessmentMethodPublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCode, DeepPartial<AssessmentMethod_Data>>> | undefined;
};

/** The locale splitter projects authored dictionaries into Props strings. */
const project = (source: DeepPartial<Pick<AssessmentMethod_Config, 'title' | 'description'>>) => {
  const split = splitLocalizedFields(source);
  return {
    base: split.base as DeepPartial<AssessmentMethod_Data>,
    locale: split.locale as Partial<Record<LanguageCode, DeepPartial<AssessmentMethod_Data>>> | undefined,
  };
};

/** One canonical Props publication method; no contextual overrides. */
export type AssessmentMethod_Configurator<
  Slug extends AssessmentMethodSlug = AssessmentMethodSlug,
  Languages extends readonly LanguageCode[] = readonly LanguageCode[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'assessmentMethod';
  readonly build: {
    data(
      options: PublicationLanguageOptions<Languages>,
    ): AssessmentMethodPublication<DeepPartial<AssessmentMethod_Data> & { id: string; slug: string }>;
  };
} & LanguageScope<Languages>;

/** Assessment method descriptions and labels retain their authored semantics. */
export function defineAssessmentMethod<
  const Slug extends AssessmentMethodSlug,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<AssessmentMethod_Config, 'slug'> & { slug: Slug } & RequireLanguages<AssessmentMethod_Config, Languages>,
): AssessmentMethod_Configurator<Slug, Languages> {
  const authored = structuredClone(config);
  const { id } = authored;
  const slug = config.slug;
  const copyAuthored = () => assessmentMethod_Config_Schema.parse(structuredClone(authored));

  const data = (
    options: PublicationLanguageOptions<Languages>,
  ): AssessmentMethodPublication<DeepPartial<AssessmentMethod_Data> & { id: string; slug: string }> => {
    const languages = resolvePublicationLanguages(options);
    const current = copyAuthored();
    const own = project({ title: current.title, description: current.description });
    const result: AssessmentMethodPublication<DeepPartial<AssessmentMethod_Data> & { id: string; slug: string }> = {
      base: { id, slug, ...own.base },
      locale: selectPublicationLocales(
        own.locale as AssessmentMethodPublication<DeepPartial<AssessmentMethod_Data>>['locale'],
        languages,
      ),
    };
    for (const language of languages) {
      assessmentMethod_Data_Schema.parse(mergeForValidation(result.base, result.locale?.[language] ?? {}));
    }
    return result;
  };

  const result = {
    id,
    slug,
    type: 'assessmentMethod' as const,
    build: scopeBuild({ data }),
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}
