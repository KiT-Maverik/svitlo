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
 * The reviewed Course→Lesson handoff contract and Lesson Stage 1 source type
 * are imported from the canonical Engine build-only exports now present in #786.
 * No duplicate editorial stage type is introduced.
 *
 * @param {import('../../../types/workflow/courseWorkflow.types').CourseWorkflowStage3NewLesson} node
 * @param {{lessonId: string, sourceLanguage: string, plannedLanguages: readonly string[],
 *   textbookRoot: string, reviewedSourceSha: string}} context
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
  const document = context?.sourceLanguage;
  if (
    !isRecord(node.config.locale) ||
    !(typeof title === 'string'
      ? title.trim()
      : isRecord(title) && typeof title[document] === 'string' && title[document].trim())
  )
    throw new Error('Lesson Draft requires reviewed source-language Lesson title');
  if (
    !Array.isArray(context.plannedLanguages) ||
    !context.plannedLanguages.length ||
    new Set(context.plannedLanguages).size !== context.plannedLanguages.length ||
    !context.plannedLanguages.includes(context.sourceLanguage)
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
  const source = {
    config: {
      id: context.lessonId,
      type: 'lesson',
      slug: node.config.slug,
      skills: node.config.skills,
      locale: node.config.locale,
      ...(node.config.params === undefined ? {} : { params: node.config.params }),
    },
    production: {
      methodology: node.production.methodology,
      objective: node.production.objective,
      depth: node.production.depth,
      sequenceReason: node.production.sequenceReason,
      assessmentEvidence: node.production.assessmentEvidence,
      languages: {
        document: context.sourceLanguage,
        planned: context.plannedLanguages,
      },
      assessment: Object.fromEntries(assessmentKeys.map(key => [key, node.production.assessment[key]])),
      sourceEvidence: 'Course Stage 3/4 reviewed source blob: ' + context.reviewedSourceSha,
    },
  };
  const path =
    textbookRoot +
    '/data/lessons/' +
    context.lessonId.at(-1).toLowerCase() +
    '/' +
    context.lessonId.toLowerCase() +
    '/index.ts';
  return {
    lessonId: context.lessonId,
    files: [
      {
        path,
        kind: 'typescript',
        content:
          '// TODO (BLOCKER): Lesson Stage 1 authoring handoff; not a completed Lesson Configurator.\n' +
          "import type { LessonWorkflowStage1, LessonWorkflowStage1CourseHandoff } from '@svitlo/engine/build';\n\n" +
          'export const lessonStage1 = ' +
          JSON.stringify(source, null, 2) +
          ' as const satisfies LessonWorkflowStage1 & LessonWorkflowStage1CourseHandoff;\n',
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
