import { invokeMaterializer } from '../directMaterialization/directMaterialization';
import { episodeWorkflowStage2_Schema } from '../../../types/workflow/episodeWorkflow.types';
import type { EpisodeWorkflowStage2 } from '../../../types/workflow/episodeWorkflow.types';
import { materializeEpisode } from './materialize.mjs';
import { materializeEpisodeSection } from './materializeEpisodeSection';
import { renderSceneFiles } from '../scene/materializeScene';

export type EpisodeStage5Options = { source: { sourcePath: string; sourceBlobSha: string; sourceCommitSha: string } };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Traverse only actual Episode Section/Block ownership, not arbitrary metadata.
 * The Scene registry is independent; never auto-register unfinished drafts.
 */
function episodeSceneDrafts(input: EpisodeWorkflowStage2, documentLanguage: string, textbook: string) {
  const seen = new Set<string>();
  const files: EpisodeStage5Plan['files'] = [];
  const visit = (value: unknown): void => {
    if (!isRecord(value)) return;
    const config = isRecord(value.config) ? value.config : value;
    if (!isRecord(config) || typeof config.type !== 'string') return;
    if (config.type === 'scene') {
      const id = config.id;
      if (typeof id !== 'string' || seen.has(id)) throw Error('Episode has duplicate or unsafe Scene identity');
      seen.add(id);
      const production = isRecord(value.production) ? value.production : undefined;
      const dir = textbook + '/scenes/' + id.at(-1) + '/' + id + '/';
      for (const [name, content] of renderSceneFiles({
        id,
        slug: config.slug as string,
        documentLanguage,
        specification: typeof production?.specification === 'string' ? production.specification : undefined,
      })) {
        files.push({ path: dir + name, content, kind: name.endsWith('.css') ? 'code' : 'typescript' });
      }
      return;
    }
    const collection = config.type === 'carousel' ? config.slides : config.content;
    if (
      ['content', 'practice', 'codingTask', 'learningFlow', 'checkpointAnswer', 'checkpoint', 'carousel'].includes(config.type) &&
      isRecord(collection) && isRecord(collection.items) && Array.isArray(collection.order)
    ) {
      for (const key of collection.order)
        visit(collection.items[key]);
    } else if (config.type === 'checkpointItem') {
      visit(config.question);
      visit(config.answer);
    }
  };
  for (const key of input.config.section.order)
    visit(input.config.section.items[key]);
  return files;
}
export type EpisodeStage5Plan = {
  episodeId: string;
  exportName: string;
  files: Array<{ path: string; content: string; kind: 'typescript' | 'markdown' | 'specification' | 'code' }>;
  diagnostics: Array<{ path: string; code: string; severity: 'warning'; message?: string }>;
  publishable: false;
};

/** A direct Episode call generates only its owned files.
 * The separate trusted publisher restores the authorized Course parent slot.
 */
export function materializeEpisodeStage5(
  input: EpisodeWorkflowStage2,
  options?: EpisodeStage5Options,
): EpisodeStage5Plan {
  return invokeMaterializer(
    'episode-stage5',
    options,
    source => {
      const checked = episodeWorkflowStage2_Schema.safeParse(input);
      if (!checked.success) throw new Error('Invalid reviewed Episode input: ' + checked.error.message);
      const root = input.production.placement.path;
      const document = input.production.languages.document;
      const planned = [...input.production.languages.planned];
      const courseId = input.production.placement.courseId;
      const textbook = source.source.sourcePath.match(/^(content\/[a-z][a-z0-9-]*)\/data\/courses\//)?.[1];
      if (!textbook) throw Error('Episode Stage 5 requires an owned Course draft in its textbook');
      const sceneDrafts = episodeSceneDrafts(input, document, textbook);
      const result = materializeEpisode(
        {
          config: { ...input.config, params: { ...input.config.params, languages: planned } },
          production: { ...input.production, plannedLanguages: planned },
        },
        {
          directory: root,
          sourceLanguage: document,
          plannedLanguages: planned,
          materializeSection: (node: unknown, context: { directory: string }) =>
            materializeEpisodeSection(node, {
              ...context,
              documentLanguage: document,
              languagesImport: '#coursesData/' + courseId.at(-1) + '/' + courseId + '/' + root + '/languages',
            }),
        },
      );
      if (
        result.id !== input.config.id ||
        result.pendingEpisode ||
        !result.files.some((file: { path: string }) => file.path === root + '/index.ts')
      )
        throw new Error('Episode source renderer did not produce its allocated Configurator');
      const index = result.files.find((file: { path: string }) => file.path === root + '/index.ts');
      if (!index) throw new Error('Missing Episode root index.ts');
      const originalLanguages =
        'const languages = ' + JSON.stringify([document]) + ' as const satisfies SupportedLanguages;';
      if (!index.content.includes(originalLanguages)) throw new Error('Unexpected Episode language declaration');
      index.content = index.content
        .replace(
          "import type { SupportedLanguages } from '@svitlo/engine/build';",
          "import { languages } from './languages';",
        )
        .replace(originalLanguages, '');
      index.content =
        '// TODO (BLOCKER): Human Media Generation Stage 9 requires human verification.\n' +
        '// TODO (BLOCKER): Human QA Stage 10 requires explicit pinned acceptance.\n' +
        '// Reviewed Episode source blob: ' +
        source.source.sourceBlobSha +
        '\n' +
        '// Reviewed Episode HEAD: ' +
        source.source.sourceCommitSha +
        '\n' +
        index.content;
      return {
        episodeId: result.id,
        exportName: result.exportName,
        files: [
          ...result.files,
          ...sceneDrafts,
          {
            path: root + '/languages.ts',
            kind: 'typescript',
            content:
              "import type { SupportedLanguages } from '@svitlo/engine/build';\n" +
              'export const languages = ' +
              JSON.stringify([document]) +
              ' as const satisfies SupportedLanguages;\n',
          },
        ],
        diagnostics: result.diagnostics ?? [],
        publishable: false,
      };
    },
    input,
  );
}
