/**
 * Question/Flashcard bank ContentBlock bridge. Each actual kind is dispatched
 * to the existing source materializer, not reconstructed by the bank.
 * Composite editorial nodes are plain Configs (not built child Configurators).
 */
import { materializeAudio } from '../audio/materializeAudio';
import { materializeCarousel, type CarouselSource } from '../carousel/materializeCarousel';
import { materializeCheckpoint, type CheckpointSource } from '../checkpoint/materializeCheckpoint';
import {
  materializeCheckpointAnswer,
  type CheckpointAnswerSource,
} from '../checkpointAnswer/materializeCheckpointAnswer';
import { materializeCheckpointItem, type CheckpointItemSource } from '../checkpointItem/materializeCheckpointItem';
import { materializeCode } from '../code/materializeCode';
import { materializeImage } from '../image/materializeImage';
import { materializeMarkdown } from '../markdown/materializeMarkdown';
import { materializeScene } from '../scene/materializeScene';
import { materializeSubtitles } from '../subtitles/materializeSubtitles';
import { materializeText } from '../text/materializeText';
import { materializeVideo } from '../video/materializeVideo';
import { materializeYoutube } from '../youtube/materializeYoutube';
import { assertBankPath, assertBankUuid } from './bankSourceSafety';

export type AssessmentBlockEvidence = {
  /** Independently verified registered executable Scene Config UUIDs. */
  registeredSceneIds: ReadonlySet<string>;
  /** Independently approved real assets or externally resolved media. */
  approvedMediaBlockIds: ReadonlySet<string>;
  /** Unresolved *source* resources verified by the pinned trusted analyzer. */
  unresolvedMediaBlockIds?: ReadonlySet<string>;
  unregisteredSceneIds?: ReadonlySet<string>;
  /** Verified, entirely absent Scene directories approved for new six-file scaffolds. */
  newSceneIds?: ReadonlySet<string>;
  /** Verified complete but unfinished six-file Scene sources: never overwrite them. */
  existingDraftSceneIds?: ReadonlySet<string>;
};
type PlainBlock = { id: string; slug: string; type: string } & Record<string, unknown>;
type BlockNode = { config: PlainBlock; production?: Record<string, unknown> };
type ChildResult = {
  exportName: string;
  files: { path: string; content: string; kind: 'typescript' | 'markdown' | 'code' }[];
  diagnostics: { path: string; code: string; message: string; severity: 'warning' }[];
};

const isRecord = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);
function unwrap(value: unknown, at: string): Record<string, unknown> {
  if (!isRecord(value)) throw new Error(at + ': expected authored Config or Config node');
  const config = isRecord(value.config) ? value.config : value;
  if (typeof config.id !== 'string' || typeof config.type !== 'string' || typeof config.slug !== 'string') {
    throw new Error(at + ': nested Config type, slug and UUID required');
  }
  assertBankUuid(config.id, at);
  return config;
}
function unwrapPlain(value: unknown, at: string): Record<string, unknown> {
  if (!isRecord(value)) throw new Error(at + ': expected authored node');
  return isRecord(value.config) ? value.config : value;
}
/** Preserve reviewed author-only evidence while concrete renderers receive plain Configs. */
function withProduction(config: PlainBlock, authored: unknown): BlockNode {
  return isRecord(authored) && isRecord(authored.production) ? { config, production: authored.production } : { config };
}
/** Read only canonical authored placements. Internal maps are not publication wrappers. */
function ordered(value: unknown, at: string): { items: Record<string, unknown>; order: string[] } {
  if (
    !isRecord(value) ||
    !Array.isArray(value.children) ||
    ['items', 'order', 'slides', 'content'].some(key => Object.hasOwn(value, key))
  ) {
    throw new Error(at + ': expected direct child placements and children order');
  }
  const metadata = new Set(['id', 'type', 'slug', 'params', 'locale', 'children']);
  const items = Object.fromEntries(Object.entries(value).filter(([key]) => !metadata.has(key)));
  const order = value.children;
  const keys = Object.keys(items);
  if (
    new Set(order).size !== keys.length ||
    keys.length !== order.length ||
    order.some(key => typeof key !== 'string' || !Object.hasOwn(items, key))
  ) {
    throw new Error(at + ': every child must be ordered exactly once');
  }
  return { items, order };
}
function asChildResult(out: {
  exportName: string;
  files: readonly { path: string; content: string; kind: string }[];
  diagnostics: readonly { path: string; code: string; message: string; severity: 'warning' }[];
}): ChildResult {
  // ContentBlock source renderers use "specification" for Markdown sidecars;
  // Question/Card child callback contracts use only 'markdown' for the same bytes.
  return {
    exportName: out.exportName,
    files: out.files.map(file => ({
      path: file.path,
      content: file.content,
      kind: file.kind === 'specification' ? 'markdown' : (file.kind as ChildResult['files'][number]['kind']),
    })),
    diagnostics: [...out.diagnostics],
  };
}

/** Use the original materializer for each concrete Block, including composite children. */
export function materializeAssessmentBlock(
  node: BlockNode,
  context: { directory: string; documentLanguage: string },
  planned: readonly string[],
  bankKind: 'questions' | 'flashcards',
  ownerConstantsImport: string,
  evidence: AssessmentBlockEvidence,
): ChildResult {
  if (!node || !isRecord(node.config)) throw new Error('Missing bank ContentBlock');
  const source = node.config;
  assertBankUuid(source.id, 'bank ContentBlock');
  if (node.production?.pending === true) throw new Error('Pending ContentBlock ' + source.id);
  const documentLanguage = context.documentLanguage;
  assertBankPath(context.directory);
  if (!context.directory.startsWith(bankKind + '/')) throw new Error('Bank child outside bank folder');
  if (!/^#lessonsData\/[0-9a-f]\/[0-9a-f-]{36}\/constants$/.test(ownerConstantsImport))
    throw new Error('Bank child must import owning Lesson constants.ts');
  const languagesImport = ownerConstantsImport;
  const options = {
    directory: context.directory,
    documentLanguage,
    languagesImport,
    // The Lesson owns the complete restoration plan. Each nested Bank Block
    // materializes source-language copy only, without duplicate locale TODOs.
    plannedLanguages: [documentLanguage],
    production: node.production,
  };
  if (
    ['image', 'video', 'audio', 'subtitles', 'youtube'].includes(source.type) &&
    !evidence.approvedMediaBlockIds.has(source.id) &&
    !(bankKind === 'questions' && evidence.unresolvedMediaBlockIds?.has(source.id))
  ) {
    throw new Error('Missing verified media evidence for ' + source.type + ' ' + source.id);
  }
  switch (source.type) {
    case 'text':
      return asChildResult(materializeText(source as Parameters<typeof materializeText>[0], options));
    case 'markdown':
      return asChildResult(materializeMarkdown(source as Parameters<typeof materializeMarkdown>[0], options));
    case 'code':
      return asChildResult(materializeCode(source as Parameters<typeof materializeCode>[0], options));
    case 'image':
      return asChildResult(materializeImage(source as Parameters<typeof materializeImage>[0], options));
    case 'video':
      return asChildResult(materializeVideo(source as Parameters<typeof materializeVideo>[0], options));
    case 'youtube':
      return asChildResult(materializeYoutube(source as Parameters<typeof materializeYoutube>[0], options));
    case 'audio':
      return asChildResult(materializeAudio(source as Parameters<typeof materializeAudio>[0], options));
    case 'subtitles':
      return asChildResult(materializeSubtitles(source as Parameters<typeof materializeSubtitles>[0], options));
    case 'scene': {
      const registered = evidence.registeredSceneIds.has(source.id);
      const newDraft = evidence.newSceneIds?.has(source.id) ?? false;
      const existingDraft = evidence.existingDraftSceneIds?.has(source.id) ?? false;
      if (
        !registered &&
        !newDraft &&
        !existingDraft &&
        !(bankKind === 'questions' && evidence.unregisteredSceneIds?.has(source.id))
      ) {
        throw new Error('Scene has no verified executable registry: ' + source.id);
      }
      return asChildResult(
        materializeScene(source as Parameters<typeof materializeScene>[0], {
          directory: context.directory,
          documentLanguage,
          languagesImport,
          registered,
          production:
            node.production === undefined
              ? undefined
              : {
                  ...(typeof node.production.specification === 'string'
                    ? { specification: node.production.specification }
                    : {}),
                  // Preserve Flashcard's separate authored pending contract,
                  // never introduce this redundant status in Question source.
                  ...(bankKind === 'flashcards' && typeof node.production.pending === 'boolean'
                    ? { pending: node.production.pending }
                    : {}),
                },
        }),
      );
    }
    case 'carousel': {
      const slides = ordered(source, 'Carousel slides');
      const items = Object.fromEntries(
        Object.entries(slides.items).map(([key, child]) => [
          key,
          child === false ? false : unwrap(child, 'Carousel slide ' + key),
        ]),
      );
      return asChildResult(
        materializeCarousel({ ...source, ...items } as unknown as CarouselSource, {
          directory: context.directory,
          documentLanguage,
          languagesImport,
          renderChild: (child, directory) => {
            const result = materializeAssessmentBlock(
              withProduction(child as PlainBlock, slides.items[child.slug]),
              { directory, documentLanguage },
              planned,
              bankKind,
              ownerConstantsImport,
              evidence,
            );
            return { ...result };
          },
        }),
      );
    }
    case 'checkpoint': {
      const content = ordered(source, 'Checkpoint items');
      const items = Object.fromEntries(
        Object.entries(content.items).map(([key, child]) => {
          const item = unwrap(child, 'Checkpoint item ' + key);
          const question = unwrap(item.question, 'Checkpoint question ' + key);
          const answer = unwrapPlain(item.answer, 'Checkpoint answer ' + key);
          const answerContent = ordered(answer, 'Checkpoint answer content ' + key);
          const answerItems = Object.fromEntries(
            Object.entries(answerContent.items).map(([slug, block]) => [
              slug,
              block === false ? false : unwrap(block, 'Checkpoint answer block ' + slug),
            ]),
          );
          return [
            key,
            {
              ...item,
              question,
              answer: { ...answer, ...answerItems },
            },
          ];
        }),
      );
      return asChildResult(
        materializeCheckpoint({ ...source, ...items } as unknown as CheckpointSource, {
          directory: context.directory,
          documentLanguage,
          languagesImport,
          renderItem: (item, directory) => {
            // The Checkpoint source renderer correctly consumes *plain* Configs.
            // Keep its matching authored wrappers for delegated descendant calls.
            const authoredItem = unwrap(content.items[item.slug], 'Checkpoint item ' + item.slug);
            const authoredAnswer = unwrapPlain(authoredItem.answer, 'Checkpoint answer ' + item.slug);
            const authoredBlocks = ordered(authoredAnswer, 'Checkpoint answer content ' + item.slug).items;
            return materializeCheckpointItem(item as CheckpointItemSource, {
              directory,
              documentLanguage,
              languagesImport: ownerConstantsImport,
              renderQuestion: (question, questionDir) =>
                materializeAssessmentBlock(
                  withProduction(question as PlainBlock, authoredItem.question),
                  { directory: questionDir, documentLanguage },
                  planned,
                  bankKind,
                  ownerConstantsImport,
                  evidence,
                ),
              renderAnswer: (answer, answerDir) =>
                materializeCheckpointAnswer(answer as CheckpointAnswerSource, {
                  directory: answerDir,
                  documentLanguage,
                  languagesImport: ownerConstantsImport,
                  renderChild: (block, blockDir) =>
                    materializeAssessmentBlock(
                      withProduction(block as PlainBlock, authoredBlocks[block.slug]),
                      { directory: blockDir, documentLanguage },
                      planned,
                      bankKind,
                      ownerConstantsImport,
                      evidence,
                    ),
                }),
            });
          },
        }),
      );
    }
    default:
      throw new Error('No concrete materializer for bank ContentBlock kind: ' + source.type);
  }
}
