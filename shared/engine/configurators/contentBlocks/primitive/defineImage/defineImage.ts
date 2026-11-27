import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ConfigWithLanguages, DeepPartial, LanguageScope, PublicationLanguageOptions } from '#types';

import { runtimeMediaLocale } from '../../_shared__contentBlocks';
import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  resolvePublicationLanguages,
  scopeBuild,
  selectPublicationLocales,
  splitLocalizedFields,
  validateRequestedPublication,
} from '../../../_shared__configurators';
import {
  image_Config_Schema,
  image_Data_Schema,
  image_Override_Config_Schema,
  type ContentBlock_Image_Config,
  type ContentBlock_Image_DataBase,
  type ContentBlock_Image_Locale,
  type ContentBlock_Image_Overrides,
} from './defineImage.schemas';

type ImageLocaleFiles = Partial<Record<LanguageCode, { locale: DeepPartial<ContentBlock_Image_Locale<'data'>> }>>;
type ImageDataPublication<Base, LocaleFiles = ImageLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type ImageOverrideDataBase = {
  params?: ContentBlock_Image_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Image_Locale<'data'>>;
};

const parseAndValidate = (config: ContentBlock_Image_Config): ContentBlock_Image_Config => {
  const parsed = image_Config_Schema.parse(config);
  return parsed;
};
const validate = (config: ContentBlock_Image_Config): void => {
  parseAndValidate(config);
};

const buildImageData = (config: ContentBlock_Image_Config): ImageDataPublication<ContentBlock_Image_DataBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(runtimeMediaLocale(config.locale, 'src'));
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Image_Locale<'data'>> }
      : {}),
  } satisfies ContentBlock_Image_DataBase;
  return {
    base,
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      ImageLocaleFiles | undefined,
  };
};

const buildImagePatch = (patch: ContentBlock_Image_Overrides): ImageDataPublication<ImageOverrideDataBase> => {
  const { base: invariant, locale } = splitLocalizedFields(runtimeMediaLocale(patch.locale ?? {}, 'src'));
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Image_Locale<'data'>> }
        : {}),
    },
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      ImageLocaleFiles | undefined,
  };
};

/** Define Image. */
/**
 * Build complete Props and validated sparse overrides. Temporary merged
 * configurations are used only for semantic validation.
 */
export const defineImage = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<ContentBlock_Image_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_Image_Config,
      Languages
    >,
) => {
  const authored: ContentBlock_Image_Config = structuredClone(config);
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => structuredClone(authored);
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Image_Config>;

  const data = (options: PublicationLanguageOptions<Languages>): ImageDataPublication<ContentBlock_Image_DataBase> => {
    const languages = resolvePublicationLanguages(options);
    const result = buildImageData(parseAndValidate(copyAuthored()));
    result.locale = selectPublicationLocales(result.locale, languages);
    validateRequestedPublication(image_Data_Schema, result, languages);
    return result;
  };

  const overrides = (
    patch: ContentBlock_Image_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): ImageDataPublication<ImageOverrideDataBase> => {
    const languages = resolvePublicationLanguages(options);
    try {
      const parsedPatch = image_Override_Config_Schema.parse(patch);
      const effective = image_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      const output = buildImagePatch(structuredClone(parsedPatch));
      output.locale = selectPublicationLocales(output.locale, languages);
      validateRequestedPublication(image_Data_Schema, data(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(`Invalid Image overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
    }
  };
  const result = {
    id,
    slug,
    type,
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Image_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Image_Configurator = ReturnType<typeof defineImage>;
