import type { DeepPartial } from '#types';
import type { ContentBlock_NonCheckpoint_Configurator } from '../contentBlock.types';

import { onlyLocales, onlyStrings } from '../../_shared';
import {
  checkpoint_Config_Schema,
  type Checkpoint_Content,
  type Checkpoint_Items,
  type Checkpoint_Item,
  type ContentBlock_Checkpoint_Config,
  type ContentBlock_Checkpoint_Locale,
} from './defineCheckpoint.schemas';
import { checkCheckpointIntegrity } from './checkpoint.utils';

type Checkpoint_Metadata = Omit<ContentBlock_Checkpoint_Config, 'content'>;
type AnswerItems<Items extends Checkpoint_Items, Key extends keyof Items & string> =
  Items[Key]['answer']['items'];

export type Checkpoint_Configurator<
  Items extends Checkpoint_Items = Checkpoint_Items,
  Slug extends string = string,
> = {
  config: {
    base: DeepPartial<Checkpoint_Metadata> & { id: string; slug: Slug; type: 'checkpoint' };
    locales: () => { locale: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>> };
    overrides: DeepPartial<Checkpoint_Metadata>;
  };
  content: Checkpoint_Content<Items>;
  override: {
    params: (newParams: DeepPartial<Checkpoint_Metadata['params']>) => void;
    locale: (newLocale: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>>) => void;
    content: {
      add: <const Key extends string, const Item extends Checkpoint_Item>(
        slug: Key extends keyof Items ? never : Key,
        item: Item,
      ) => Checkpoint_Configurator<Items & Record<Key, Item>, Slug>;
      remove: <Key extends keyof Items & string>(
        slug: Key,
      ) => Checkpoint_Configurator<Omit<Items, Key>, Slug>;
      setOrder: (order: readonly (keyof Items & string)[]) => void;
      answers: <Key extends keyof Items & string>(questionSlug: Key) => {
        add: (slug: string, block: ContentBlock_NonCheckpoint_Configurator) => void;
        remove: (slug: keyof AnswerItems<Items, Key> & string) => void;
        setOrder: (order: readonly (keyof AnswerItems<Items, Key> & string)[]) => void;
      };
    };
  };
  disable: () => void;
};

/** Checkpoint owns only metadata; nested configurators own their own validation and overrides. */
export function defineCheckpoint<
  const Slug extends string,
  const Items extends Checkpoint_Items,
  const Order extends readonly (keyof Items & string)[],
>(
  config: Omit<ContentBlock_Checkpoint_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: Order };
  },
): Checkpoint_Configurator<Items, Slug> {
  checkCheckpointIntegrity(config);

  const { id, type, slug, locale, params } = config;
  const content: Checkpoint_Content<Items> = {
    items: { ...config.content.items } as Items,
    order: [...config.content.order],
  };

  const base = {
    id, type, slug, params, locale: onlyStrings(locale),
  } satisfies DeepPartial<Checkpoint_Metadata>;
  const overrides: DeepPartial<Checkpoint_Metadata> = {};

  /** Apply a candidate transactionally: failed validation cannot corrupt a previous order. */
  function updateContent(next: Checkpoint_Content): void {
    checkCheckpointIntegrity({ ...config, content: next });
    content.items = next.items as Items;
    content.order = [...next.order] as (keyof Items & string)[];
  }

  const definition: Checkpoint_Configurator<Items, Slug> = {
    config: {
      base,
      locales: () => ({ locale: onlyLocales(locale) }),
      overrides,
    },
    content,
    override: {
      params: newParams => { overrides.params = newParams; },
      locale: newLocale => { overrides.locale = newLocale; },
      content: {
        add: (itemSlug, item) => {
          const next = {
            items: { ...content.items, [itemSlug]: item },
            order: [...content.order, itemSlug],
          };
          updateContent(next);
          return definition as unknown as Checkpoint_Configurator<Items & Record<typeof itemSlug, typeof item>, Slug>;
        },
        remove: itemSlug => {
          const items = { ...content.items };
          delete (items as Record<string, unknown>)[itemSlug];
          updateContent({
            items,
            order: content.order.filter(slug => slug !== itemSlug),
          });
          return definition as unknown as Checkpoint_Configurator<Omit<Items, typeof itemSlug>, Slug>;
        },
        setOrder: order => {
          updateContent({ items: content.items, order: [...order] });
        },
        answers: questionSlug => {
          const modify = (transform: (answer: Checkpoint_Item['answer']) => Checkpoint_Item['answer']) => {
            const item = content.items[questionSlug];
            if (!item) throw new Error(`Unknown Checkpoint question: ${questionSlug}`);
            const next = transform(item.answer);
            updateContent({
              items: { ...content.items, [questionSlug]: { ...item, answer: next } },
              order: content.order,
            });
          };
          return {
            add: (answerSlug, block) => modify(answer => ({
              items: { ...answer.items, [answerSlug]: block },
              order: [...answer.order, answerSlug],
            })),
            remove: answerSlug => modify(answer => {
              const items = { ...answer.items };
              delete items[answerSlug];
              return { items, order: answer.order.filter(slug => slug !== answerSlug) };
            }),
            setOrder: order => modify(answer => ({ items: answer.items, order: [...order] })),
          };
        },
      },
    },
    disable: () => { overrides.params = { disabled: true }; },
  };
  // Root slug is retained as a literal without broadening it to 'string'.
  definition.config.base.slug = slug;
  return definition;
}

export type ContentBlock_Checkpoint_Configurator = Checkpoint_Configurator;
