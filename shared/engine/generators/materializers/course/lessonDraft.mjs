import { normalizeWorkflowLocalized } from '../normalizeWorkflowLocalized.mjs';
import { renderBlockerTodo } from '../renderBlockerTodo.mjs';
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
 * Course Stage 5 emits a Course-owned proposal at the canonical Lesson draft path.
 * It does not execute Lesson Stage 1 or create a Lesson Configurator.
 *
 * @param {import('../../../types/workflow/courseWorkflow.types').CourseWorkflowStage3NewLesson} node
 * @param {{lessonId: string, textbookRoot: string, reviewedSourceSha: string, languageContext: import('../../../types/workflow/courseWorkflow.types').CourseWorkflowStage1Languages}} context
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
  const languages = context.languageContext;
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
    typeof document !== 'string' ||
    !document.trim() ||
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
  if (
    Object.keys(node.production).some(
      key =>
        ![
          'kind',
          'methodology',
          'objective',
          'depth',
          'sequenceReason',
          'assessmentEvidence',
          'assessment',
          'sourceEvidence',
        ].includes(key),
    )
  )
    throw new Error('Lesson seed contains unsupported Course proposal fields');
  const { kind: _placementKind, ...proposal } = node.production;
  const source = {
    config: {
      ...node.config,
      id: context.lessonId,
      locale: {
        ...node.config.locale,
        title: normalizeWorkflowLocalized(title, document, 'lesson.locale.title', languages.planned),
      },
    },
    proposal,
    languageContext: { document, planned: [...languages.planned] },
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
          renderBlockerTodo(
            'Complete the separately authorized Lesson Stage 1 from this Course seed, obtain its required review, and replace this seed with approved Lesson authoring before removing the marker.',
          ) +
          '\n' +
          "import type { CourseWorkflowLessonSeed } from '@svitlo/engine/build';\n\n" +
          'export default ' +
          JSON.stringify(source, null, 2) +
          ' satisfies CourseWorkflowLessonSeed;\n',
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
