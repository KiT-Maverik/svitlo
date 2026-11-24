const uuidPattern = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slugPattern = /^[A-Za-z][A-Za-z0-9]*$/;
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const assessmentKeys = [
  'questionBankRequired',
  'flashcardBankRequired',
  'quizSectionRequired',
  'flashcardsSectionRequired',
];

/**
 * Course Stage 5 → independent Lesson Stage 1 source, not a Lesson Configurator.
 * The unallocated placement and allocated source use the same Lesson-owned type.
 *
 * @param {import('../../../types/workflow/lessonWorkflow.types').LessonWorkflowStage1<false>} node
 * @param {{lessonId: string, textbookRoot: string, reviewedSourceSha: string}} context
 */
export function materializeLessonDraft(node, context) {
  if (
    !isRecord(node) ||
    !isRecord(node.config) ||
    !isRecord(node.production) ||
    node.config.type !== 'lesson' ||
    node.production.kind !== 'new'
  )
    throw new Error('Lesson Draft requires a reviewed Course Stage 3 new-Lesson placement');
  if (!uuidPattern.test(context?.lessonId ?? '')) throw new Error('Lesson Draft requires permanent UUID');
  if (!slugPattern.test(node.config.slug ?? '') || ['constructor', '__proto__', 'prototype'].includes(node.config.slug))
    throw new Error('Lesson Draft requires a safe Course placement slug');
  if (
    !Array.isArray(node.config.skills) ||
    !node.config.skills.length ||
    new Set(node.config.skills).size !== node.config.skills.length ||
    node.config.skills.some(id => typeof id !== 'string' || !uuidPattern.test(id))
  )
    throw new Error('Lesson Draft requires reviewed, unique Skill UUIDs');
  const title = node.config.locale?.title;
  const languages = node.production.languages;
  const document = languages?.document;
  if (
    !isRecord(node.config.locale) ||
    !(typeof title === 'string'
      ? title.trim()
      : isRecord(title) && typeof title[document] === 'string' && title[document].trim())
  )
    throw new Error('Lesson Draft requires reviewed source-language Lesson title');
  if (
    !isRecord(languages) ||
    typeof document !== 'string' || !document.trim() ||
    !Array.isArray(languages.planned) ||
    !languages.planned.length ||
    languages.planned.some(language => typeof language !== 'string' || !language.trim()) ||
    new Set(languages.planned).size !== languages.planned.length ||
    !languages.planned.includes(document)
  )
    throw new Error('Lesson Draft requires reviewed source language in the planned scope');
  if (!/^[0-9a-f]{40}$/i.test(context.reviewedSourceSha ?? ''))
    throw new Error('Lesson Draft requires the pinned reviewed Course source blob SHA');
  for (const key of ['methodology', 'objective', 'depth', 'sequenceReason', 'assessmentEvidence']) {
    if (typeof node.production[key] !== 'string' || !node.production[key].trim())
      throw new Error('Lesson Draft missing reviewed production.' + key);
  }
  if (
    !isRecord(node.production.assessment) ||
    assessmentKeys.some(key => typeof node.production.assessment[key] !== 'boolean')
  )
    throw new Error('Lesson Draft requires four independent assessment decisions');
  if (
    Object.keys(node.config).some(key => !['type', 'slug', 'skills', 'locale', 'params'].includes(key)) ||
    node.config.params?.languages !== undefined
  )
    throw new Error('Lesson Draft cannot include identity, Sections, events or publication languages');
  const textbookRoot = context.textbookRoot;
  if (typeof textbookRoot !== 'string' || !/^content\/[a-z][a-z0-9-]*$/.test(textbookRoot))
    throw new Error('Lesson Draft requires a canonical textbook root');
  const { kind: _placementKind, ...production } = node.production;
  const source = {
    config: { ...node.config, id: context.lessonId },
    production,
  };
  const path =
    textbookRoot +
    '/data/lessons/' +
    context.lessonId.at(-1).toLowerCase() +
    '/' +
    context.lessonId.toLowerCase() +
    '/draft.ts';
  return {
    lessonId: context.lessonId,
    files: [
      {
        path,
        kind: 'typescript',
        content:
          '// TODO (BLOCKER): Lesson Stage 1 authoring handoff; not a completed Lesson Configurator.\n' +
          "import type { LessonWorkflowStage1 } from '@svitlo/engine/build';\n\n" +
          'export const lessonStage1 = ' +
          JSON.stringify(source, null, 2) +
          ' as const satisfies LessonWorkflowStage1;\n',
      },
    ],
    diagnostics: [
      {
        path,
        code: 'pending-lesson-stage1',
        severity: 'blocker',
        message: 'Lesson requires its own authorized methodology/content/bank review and final source materialization',
      },
    ],
  };
}
