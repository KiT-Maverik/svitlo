import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  wrapLocale,
  type WrappedLocaleFiles,
} from '../../_shared__configurators';
import { validateLocalAssetPaths } from '../_shared__contentBlocks';
import {
  image_Config_Schema,
  image_Override_Config_Schema,
  type ContentBlock_Image_Config,
  type ContentBlock_Image_Locale,
  type ContentBlock_Image_Overrides,
  type ContentBlock_Image_PropsBase,
} from './defineImage.schemas';

type ImageLocaleFiles = Partial<Record<LanguageCodes, DeepPartial<ContentBlock_Image_Locale<'props'>>>>;
type ImageEmbeddedLocaleFiles = WrappedLocaleFiles<DeepPartial<ContentBlock_Image_Locale<'props'>>>;
type ImagePropsPublication<Base, LocaleFiles = ImageLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type ImageOverridePropsBase = {
  params?: ContentBlock_Image_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Image_Locale<'props'>>;
};

const parseAndValidate = (config: ContentBlock_Image_Config): ContentBlock_Image_Config => {
  const parsed = image_Config_Schema.parse(config);
  validateLocalAssetPaths(parsed.locale.src, 'locale.src');
  return parsed;
};
const validate = (config: ContentBlock_Image_Config): void => {
  parseAndValidate(config);
};

const buildImageProps = (config: ContentBlock_Image_Config): ImagePropsPublication<ContentBlock_Image_PropsBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Image_Locale<'props'>> }
      : {}),
  } satisfies ContentBlock_Image_PropsBase;
  return { base, locale: locale as unknown as ImageLocaleFiles | undefined };
};

const buildImagePatch = (patch: ContentBlock_Image_Overrides): ImagePropsPublication<ImageOverridePropsBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Image_Locale<'props'>> }
        : {}),
    },
    locale: locale as unknown as ImageLocaleFiles | undefined,
  };
};

/** Define Image. */
/**
 * Build complete Props and validated sparse overrides. Temporary merged
 * configurations are used only for semantic validation.
 */
export const defineImage = <const Slug extends string>(
  config: Omit<ContentBlock_Image_Config, 'slug'> & { slug: Slug },
) => {
  const authored = structuredClone(parseAndValidate(config));
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => image_Config_Schema.parse(structuredClone(authored));
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Image_Config>;

  function props(): ImagePropsPublication<ContentBlock_Image_PropsBase>;
  function props(options: {
    embed: true;
  }): ImagePropsPublication<ContentBlock_Image_PropsBase, ImageEmbeddedLocaleFiles>;
  function props(options?: {
    embed?: true;
  }): ImagePropsPublication<ContentBlock_Image_PropsBase, ImageLocaleFiles | ImageEmbeddedLocaleFiles> {
    const publication = buildImageProps(parseAndValidate(copyAuthored()));
    return options?.embed ? { base: publication.base, locale: wrapLocale(publication.locale) } : publication;
  }

  const overrides = (patch: ContentBlock_Image_Overrides): ImagePropsPublication<ImageOverridePropsBase> => {
    try {
      const parsedPatch = image_Override_Config_Schema.parse(patch);
      const effective = image_Config_Schema.parse(mergeForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      return buildImagePatch(structuredClone(parsedPatch));
    } catch (error) {
      throw new Error(`Invalid Image overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
    }
  };
  return {
    id,
    slug,
    type,
    validate,
    build: { props, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Image_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
};

export type ContentBlock_Image_Configurator = ReturnType<typeof defineImage>;
