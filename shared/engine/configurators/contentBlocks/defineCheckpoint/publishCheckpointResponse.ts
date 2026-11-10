import type { ContentBlock, ContentBlock_Checkpoint_Response, Locale_Languages } from '@svitlo/contracts/content';
import type { LanguageCode } from '@svitlo/contracts/localization';

import type { ContentBlock_NonCheckpoint_Configurator } from '../contentBlock.types';
import type { ContentBlock_Checkpoint_Configurator } from './defineCheckpoint';
import { checkCheckpointIntegrity } from './checkpoint.utils';

type ResolvedBlock = Exclude<ContentBlock<'response', Locale_Languages>, { type: 'checkpoint' }>;
type ResolveBlock = (block: ContentBlock_NonCheckpoint_Configurator, language: LanguageCode) => ResolvedBlock;

function localizedText(value: unknown, language: LanguageCode): string | undefined {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const translation = (value as Record<string, unknown>)[language];
    if (typeof translation === 'string') return translation;
  }
  return undefined;
}

/**
 * Bridge a new, keyed authoring Checkpoint to the existing UI Kit response.
 *
 * The caller owns nested ContentBlock resolution (base/locale merge, assets and
 * overrides); this function owns Checkpoint order and its container settings.
 * No raw configurator methods are serialized.
 */
export function publishCheckpointResponse(
  checkpoint: ContentBlock_Checkpoint_Configurator,
  language: LanguageCode,
  resolveBlock: ResolveBlock,
): ContentBlock_Checkpoint_Response<Locale_Languages> {
  checkCheckpointIntegrity({
    ...checkpoint.config.base,
    locale: {
      ...checkpoint.config.base.locale,
      ...checkpoint.config.locales().locale,
    },
    content: checkpoint.content,
  } as Parameters<typeof checkCheckpointIntegrity>[0]);

  const baseTitle = checkpoint.config.base.locale?.title;
  const localeTitle = checkpoint.config.locales().locale.title;
  const overrideTitle = checkpoint.config.overrides.locale?.title;
  const title =
    localizedText(overrideTitle, language) ??
    localizedText(baseTitle, language) ??
    localizedText(localeTitle, language);
  if (title === undefined) throw new Error(`Checkpoint title is missing for language ${language}`);

  const params = {
    ...checkpoint.config.base.params,
    ...checkpoint.config.overrides.params,
  };

  return {
    id: checkpoint.config.base.id,
    type: 'checkpoint',
    ...params,
    title,
    items: checkpoint.content.order.map(slug => {
      const entry = checkpoint.content.items[slug];
      const question = resolveBlock(entry.question, language);
      if (question.type !== 'text') {
        throw new Error(`Checkpoint ${slug} question must resolve to Text`);
      }
      return {
        question: question.value,
        answer: entry.answer.order.map(answerSlug =>
          resolveBlock(entry.answer.items[answerSlug], language),
        ) as [ResolvedBlock, ...ResolvedBlock[]],
        ...(entry.check === true ? { check: true as const } : {}),
      };
    }),
  };
}
