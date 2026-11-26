import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { LanguageScope, PublicationLanguageOptions, RequireLanguages } from '#types';

import { resolvePublicationLanguages 
  scopeBuild,
} from '../../_shared__configurators';
import {
  educationStandard_Config_Schema,
  educationStandard_Props_Schema,
  type EducationStandard_Config,
  type EducationStandard_Props,
} from './defineEducationStandard.schemas';

type EducationStandardBase = Pick<EducationStandard_Props, 'id' | 'slug' | 'name' | 'params'> & {
  description: Pick<EducationStandard_Props['description'], 'methodological'>;
};
type EducationStandardLocale = { description: Pick<EducationStandard_Props['description'], 'frontend'> };

type EducationStandardPublication = {
  base: EducationStandardBase;
  locale: Partial<Record<LanguageCode, EducationStandardLocale>>;
};

/** Single-method, immutable EducationStandard; authoring always covers every canonical language. */
export type EducationStandard_Configurator<Slug extends string = string> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'educationStandard';
  readonly build: {
    props(options: PublicationLanguageOptions<AllLanguageCodes>): EducationStandardPublication;
  };
} & LanguageScope<AllLanguageCodes>;

export function defineEducationStandard<const Slug extends string>(
  config: Omit<EducationStandard_Config, 'slug'> & { slug: Slug } & RequireLanguages<
      EducationStandard_Config,
      AllLanguageCodes
    >,
): EducationStandard_Configurator<Slug> {
  const authored = structuredClone(config);
  const { id } = authored;
  const slug = config.slug;

  const props = (options: PublicationLanguageOptions<AllLanguageCodes>): EducationStandardPublication => {
    const languages = resolvePublicationLanguages(options);
    // Validate the entire original dictionary, regardless of the requested publication subset.
    const current = educationStandard_Config_Schema.parse(structuredClone(authored));
    const base: EducationStandardBase = {
      id: current.id,
      slug: current.slug,
      name: current.name,
      description: { methodological: current.description.methodological },
      ...(current.params === undefined ? {} : { params: current.params }),
    };
    const locale: EducationStandardPublication['locale'] = {};
    for (const language of languages) {
      const description = { frontend: current.description.frontend[language] };
      educationStandard_Props_Schema.parse({
        ...base,
        description: { ...base.description, ...description },
      });
      locale[language] = { description };
    }
    return { base, locale };
  };

  const result = { id, slug, type: 'educationStandard' as const, build: scopeBuild({ props }) } as const;
  return result as typeof result & LanguageScope<AllLanguageCodes>;
}
