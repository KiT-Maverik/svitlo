import { invokeMaterializer } from '../directMaterialization/directMaterialization';
import { episodeWorkflowStage2_Schema } from '../../../types/workflow/episodeWorkflow.types';
import type { EpisodeWorkflowStage2 } from '../../../types/workflow/episodeWorkflow.types';
import { materializeEpisode } from './materialize.mjs';
import { materializeEpisodeSection } from './materializeEpisodeSection';

export type EpisodeStage5Options = { source: { sourcePath: string; sourceBlobSha: string; sourceCommitSha: string } };
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
export function materializeEpisodeStage5(input: EpisodeWorkflowStage2, options?: EpisodeStage5Options): EpisodeStage5Plan {
  return invokeMaterializer('episode-stage5', options, source => {
    const checked = episodeWorkflowStage2_Schema.safeParse(input);
    if (!checked.success) throw new Error('Invalid reviewed Episode input: ' + checked.error.message);
    const root = input.production.placement.path;
    const document = input.production.languages.document;
    const planned = [...input.production.languages.planned];
    const courseId = input.production.placement.courseId;
    const result = materializeEpisode({
      config: { ...input.config, params: { ...input.config.params, languages: planned } },
      production: { ...input.production, plannedLanguages: planned },
    }, {
      directory: root, sourceLanguage: document, plannedLanguages: planned,
      materializeSection: (node: unknown, context: { directory: string }) =>
        materializeEpisodeSection(node, {
          ...context, documentLanguage: document,
          languagesImport: '#coursesData/' + courseId.at(-1) + '/' + courseId + '/' + root + '/languages',
        }),
    });
    if (result.id !== input.config.id || result.pendingEpisode ||
      !result.files.some((file: {path: string}) => file.path === root + '/index.ts'))
      throw new Error('Episode source renderer did not produce its allocated Configurator');
    const index = result.files.find((file: {path: string}) => file.path === root + '/index.ts');
    if (!index) throw new Error('Missing Episode root index.ts');
    const originalLanguages = 'const languages = ' + JSON.stringify([document]) + ' as const satisfies SupportedLanguages;';
    if (!index.content.includes(originalLanguages)) throw new Error('Unexpected Episode language declaration');
    index.content = index.content
      .replace("import type { SupportedLanguages } from '@svitlo/engine/build';", "import { languages } from './languages';")
      .replace(originalLanguages, '');
    index.content =
      '// TODO (BLOCKER): Human Media Generation Stage 9 requires human verification.\n' +
      '// TODO (BLOCKER): Human QA Stage 10 requires explicit pinned acceptance.\n' +
      '// Reviewed Episode source blob: ' + source.sourceBlobSha + '\n' +
      '// Reviewed Episode HEAD: ' + source.sourceCommitSha + '\n' + index.content;
    return {
      episodeId: result.id,
      exportName: result.exportName,
      files: [...result.files, {
        path: root + '/languages.ts',
        kind: 'typescript',
        content: "import type { SupportedLanguages } from '@svitlo/engine/build';\n" +
          'export const languages = ' + JSON.stringify([document]) + ' as const satisfies SupportedLanguages;\n',
      }],
      diagnostics: result.diagnostics ?? [],
      publishable: false,
    };
  }, input);
}
