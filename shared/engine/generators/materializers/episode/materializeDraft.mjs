const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
const safe = key =>
  typeof key === 'string' && slug.test(key) && !['constructor', '__proto__', 'prototype'].includes(key);

/** Course Stage 5 handoff only. No runtime Configurator, fake title or Sections. */
export function materializeEpisodeDraft(input, context) {
  const { config, production } = input;
  const directory = context.directory;
  const orderPath = context.orderPath;
  if (
    config?.type !== 'episode' ||
    !safe(config.slug) ||
    Object.keys(config).some(key => !['type', 'slug'].includes(key)) ||
    !['focus', 'purpose'].every(key => typeof production?.[key] === 'string' && production[key].trim())
  )
    throw Error('Episode draft requires nonempty reviewed focus and purpose and a safe slot');
  if (
    typeof directory !== 'string' ||
    !directory.startsWith('content/') ||
    directory.split('/').some(key => !safe(key)) ||
    directory.split('/').at(-1) !== config.slug ||
    !Array.isArray(orderPath) ||
    orderPath.length !== directory.split('/').length - 1 ||
    orderPath.some(value => !Number.isSafeInteger(value) || value < 0) ||
    !uuid.test(context.courseId ?? '') ||
    !/^[0-9a-f]{40}$/i.test(context.reviewedCourseSourceBlobSha ?? '')
  )
    throw Error('Episode draft requires verified owning Course placement and reviewed source');
  const document = context.sourceLanguage,
    planned = context.plannedLanguages;
  if (!Array.isArray(planned) || !planned.includes(document) || new Set(planned).size !== planned.length)
    throw Error('Episode draft requires reviewed locale scope');
  const id = context.deriveId?.('episode', directory);
  if (!uuid.test(id ?? '')) throw Error('Episode draft requires parent deterministic deriveId');
  const handoff = {
    config: { type: 'episode', id, slug: config.slug },
    production: {
      focus: production.focus,
      purpose: production.purpose,
      languages: { document, planned },
    },
  };
  const handoffPath = directory + '/draft.ts';
  return {
    id,
    pendingEpisode: true,
    files: [
      {
        path: handoffPath,
        kind: 'typescript',
        content:
          '// TODO (BLOCKER): Episode Stage 1 handoff; scenario is not yet authored or reviewed.\n' +
          "import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';\n\n" +
          'export const episodeStage1 = ' +
          JSON.stringify(handoff, null, 2) +
          ' as const satisfies EpisodeWorkflowStage1Handoff;\n',
      },
    ],
    diagnostics: [
      {
        path: directory,
        code: 'pending-episode-scenario',
        severity: 'blocker',
        message: 'Episode requires separately authorized scenario and content production',
      },
    ],
  };
}
