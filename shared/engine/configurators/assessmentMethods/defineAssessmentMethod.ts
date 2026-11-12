import type { LanguageCodes } from '#schemas';
import type { DeepPartial, LanguageScope, PublicationLanguageOptions, RequireLanguages } from '#types';

import { mergeForValidation, onlyLocales, resolvePublicationLanguages, selectPublicationLocales, splitLocalizedFields } from '../_shared__configurators';
import {
  assessmentMethod_Config_Schema,
  assessmentMethod_Props_Schema,
  assessmentMethod_Override_Config_Schema,
  type AssessmentMethod_Config,
  type AssessmentMethod_Overrides,
  type AssessmentMethod_Props,
} from './defineAssessmentMethod.schemas';

type AssessmentMethodPublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCodes, DeepPartial<AssessmentMethod_Props>>> | undefined;
};

const validate = (config: AssessmentMethod_Config): void => {
  assessmentMethod_Config_Schema.parse(config);
};

/** The locale splitter projects authored dictionaries into Props strings. */
const project = (source: DeepPartial<Pick<AssessmentMethod_Config, 'title' | 'description'>>) => {
  const split = splitLocalizedFields(source);
  return {
    base: split.base as DeepPartial<AssessmentMethod_Props>,
    locale: split.locale as Partial<Record<LanguageCodes, DeepPartial<AssessmentMethod_Props>>> | undefined,
  };
};

/** Explicit Props/Override return types keep declaration output compact. */
export type AssessmentMethod_Configurator<
  Slug extends string = string,
  Languages extends readonly LanguageCodes[] = readonly LanguageCodes[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'assessmentMethod';
  readonly validate: typeof validate;
  readonly build: {
    props(options: PublicationLanguageOptions<Languages>): AssessmentMethodPublication<DeepPartial<AssessmentMethod_Props> & { id: string; slug: string }>;
    overrides(patch: AssessmentMethod_Overrides, options: PublicationLanguageOptions<Languages>): AssessmentMethodPublication<DeepPartial<AssessmentMethod_Props>>;
  };
  readonly config: {
    base: DeepPartial<AssessmentMethod_Props> & { id: string; slug: string };
    validate: typeof validate;
    locales: () => DeepPartial<AssessmentMethod_Config>;
  };
} & LanguageScope<Languages>;

/** Assessment method descriptions and labels retain their authored semantics. */
export function defineAssessmentMethod<
  const Slug extends string,
  const Languages extends readonly LanguageCodes[] = [],
>(config: Omit<AssessmentMethod_Config, 'slug'> & { slug: Slug } & RequireLanguages<AssessmentMethod_Config, Languages>): AssessmentMethod_Configurator<Slug, Languages> {
  const authored = structuredClone(assessmentMethod_Config_Schema.parse(config));
  const { id } = authored;
  const slug = config.slug;
  const copyAuthored = () => assessmentMethod_Config_Schema.parse(structuredClone(authored));

  const props = (options: PublicationLanguageOptions<Languages>): AssessmentMethodPublication<DeepPartial<AssessmentMethod_Props> & { id: string; slug: string }> => {
    const languages = resolvePublicationLanguages(options);
    const current = copyAuthored();
    const own = project({ title: current.title, description: current.description });
    const result: AssessmentMethodPublication<DeepPartial<AssessmentMethod_Props> & { id: string; slug: string }> = {
      base: { id, slug, ...own.base },
      locale: selectPublicationLocales(own.locale as AssessmentMethodPublication<DeepPartial<AssessmentMethod_Props>>['locale'], languages),
    };
    for (const language of languages) {
      assessmentMethod_Props_Schema.parse(mergeForValidation(result.base, result.locale?.[language] ?? {}));
    }
    return result;
  };

  const overrides = (patch: AssessmentMethod_Overrides, options: PublicationLanguageOptions<Languages>): AssessmentMethodPublication<DeepPartial<AssessmentMethod_Props>> => {
    try {
      const languages = resolvePublicationLanguages(options);
      const sparse = assessmentMethod_Override_Config_Schema.parse(patch);
      validate(assessmentMethod_Config_Schema.parse(mergeForValidation(copyAuthored(), sparse)));
      const own = project(sparse);
      const result: AssessmentMethodPublication<DeepPartial<AssessmentMethod_Props>> = {
        base: own.base,
        locale: selectPublicationLocales(own.locale as AssessmentMethodPublication<DeepPartial<AssessmentMethod_Props>>['locale'], languages),
      };
      const resource = props(options);
      for (const language of languages) {
        const original = mergeForValidation(resource.base, resource.locale?.[language] ?? {});
        const patched = mergeForValidation(original, result.base);
        assessmentMethod_Props_Schema.parse(mergeForValidation(patched, result.locale?.[language] ?? {}));
      }
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Assessment Method overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type: 'assessmentMethod' as const,
    validate,
    build: { props, overrides },
    config: {
      base: { id, slug, ...project({ title: authored.title, description: authored.description }).base },
      validate,
      locales: (): DeepPartial<AssessmentMethod_Config> => {
        const current = copyAuthored();
        return onlyLocales({ title: current.title, description: current.description });
      },
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}

