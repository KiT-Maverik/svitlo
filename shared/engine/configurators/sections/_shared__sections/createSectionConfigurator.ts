import type { DeepPartial } from '#types';
import type { z } from 'zod';
import {
  onlyLocales,
  onlyStrings,
  createOrderedConfiguratorCollection,
  validateOrderedConfiguratorCollection,
} from '../../_shared__configurators';
import { contentBlockTypes } from '../../contentBlocks';
import type { ContentBlock_Configurator } from '../../contentBlocks';

type SectionInput = {
  readonly id: string;
  readonly slug: string;
  readonly type: string;
  readonly params: { disabled?: true; skippable?: true };
  readonly locale: { title: unknown; navigationLabel: unknown };
  readonly content: { items: Record<string, ContentBlock_Configurator>; order: string[] };
};

/** Shared Section lifecycle, including Quiz; only concrete metadata varies. */
export function createSectionConfigurator<
  const Config extends SectionInput,
  const Items extends Record<string, ContentBlock_Configurator>,
>(
  input: Config & { content: { items: Items; order: string[] } },
  schema: z.ZodType,
  extraValidation?: (config: Config & { content: { items: Items; order: string[] } }) => void,
) {
  const validate = (candidate: Config & { content: { items: Items; order: string[] } }) => {
    const { content, ...metadata } = candidate;
    schema.parse(metadata);
    // Do not recursively invoke each ContentBlock's validator.
    validateOrderedConfiguratorCollection(content, contentBlockTypes);
    extraValidation?.(candidate);
  };
  validate(input);

  const { id, slug, type, params, locale } = input;
  const collection = createOrderedConfiguratorCollection(input.content, contentBlockTypes);
  const overrides: {
    params?: DeepPartial<Config['params']>;
    locale?: DeepPartial<Config['locale']>;
    content?: typeof collection.overrides;
  } = {};

  return {
    id,
    slug,
    type,
    config: {
      base: { id, slug, type, params, locale: onlyStrings(locale) },
      locales: () => ({ locale: onlyLocales(locale) }),
      overrides,
      validate,
    },
    override: {
      params: (value: DeepPartial<Config['params']>) => {
        overrides.params = value;
      },
      locale: (value: DeepPartial<Config['locale']>) => {
        overrides.locale = value;
      },
      content: {
        add: (childSlug: string, child: ContentBlock_Configurator) => {
          collection.override.add(childSlug, child);
          overrides.content = collection.overrides;
        },
        disable: (slugs: (keyof Items & string)[]) => {
          collection.override.disable(slugs);
          overrides.content = collection.overrides;
        },
        order: (slugs: string[]) => {
          collection.override.order(slugs);
          overrides.content = collection.overrides;
        },
      },
    },
    disable: () => {
      overrides.params = { disabled: true } as DeepPartial<Config['params']>;
    },
    content: collection.content,
  } as const;
}
