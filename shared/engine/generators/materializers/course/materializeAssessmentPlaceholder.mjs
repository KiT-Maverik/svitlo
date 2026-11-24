import { deriveCourseEntityId } from './deriveCourseEntityId.mjs';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slugPattern = /^[A-Za-z][A-Za-z0-9]*$/;
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * The single source expression used by Course materialization and the pinned
 * trusted parent replacement. Draft owns a genuine preview ContentSection and
 * a Text ContentBlock, never a fake Quiz or Question UUID.
 */
export function assessmentDraftExpression(id, slug) {
  if (!uuid.test(id) || !slugPattern.test(slug))
    throw Error('Invalid Course-owned Assessment preview identity');
  const previewId = deriveCourseEntityId(id, 'assessmentPreview', 'preview');
  const textId = deriveCourseEntityId(id, 'assessmentText', 'preview/message');
  return 'defineAssessmentDraft({ id: ' + JSON.stringify(id) +
    ', type: "assessment", slug: ' + JSON.stringify(slug) +
    ', params: { languages }, locale: { title: "Not implemented" },' +
    ' preview: defineContentSection({ id: ' + JSON.stringify(previewId) +
    ', slug: "preview", type: "content", params: {},' +
    ' locale: { title: "Preview", navigationLabel: "Preview" },' +
    ' content: { items: { message: defineText({ id: ' + JSON.stringify(textId) +
    ', slug: "message", type: "text", params: {}, locale: { value: "Not implemented" } }) },' +
    ' order: ["message"] } }) })';
}

/** Course Stage 5 reserves a previewable, blocked Assessment without Questions. */
export function materializeAssessmentPlaceholder(node, context) {
  const { config, production } = node ?? {};
  const directory = context?.directory;
  if (
    !isRecord(config) ||
    config.type !== 'assessment' ||
    !isRecord(config.locale) ||
    !isRecord(production) ||
    typeof production.purpose !== 'string' ||
    !production.purpose.trim() ||
    !Array.isArray(production.lessonDependencies) ||
    !production.lessonDependencies.length ||
    production.lessonDependencies.some(item => typeof item !== 'string') ||
    typeof directory !== 'string' ||
    !directory ||
    directory.split('/').some(part => !slugPattern.test(part)) ||
    !Array.isArray(context.plannedLanguages) ||
    !context.plannedLanguages.includes(context.sourceLanguage)
  )
    throw Error('Invalid reviewed Assessment Stage 2 placement');
  const reservedSlug = directory.split('/').at(-1);
  if (!slugPattern.test(reservedSlug ?? '')) throw Error(directory + ': invalid Assessment slot key');
  const title = config.locale.title;
  if (
    (typeof title !== 'string' || !title.trim()) &&
    (!isRecord(title) || typeof title[context.sourceLanguage] !== 'string' || !title[context.sourceLanguage].trim())
  )
    throw Error(directory + ': Assessment title is missing reviewed source language');
  const id = context.deriveId('assessment', directory);
  if (!uuid.test(id)) throw Error(directory + ': invalid allocated Assessment UUID');
  const placement = {
    courseId: context.courseId,
    path: directory,
    orderPath: [...context.orderPath],
    reviewedCourseSourceBlobSha: context.reviewedCourseSourceBlobSha,
  };
  const seed = {
    config: { id, type: 'assessment', slug: reservedSlug, locale: config.locale },
    production: {
      purpose: production.purpose,
      lessonDependencies: [...production.lessonDependencies],
      placement,
      languages: { document: context.sourceLanguage, planned: [...context.plannedLanguages] },
    },
  };
  const sourcePath = directory + '/draft.ts';
  const source =
    "import type { AssessmentWorkflowSeed } from '@svitlo/engine/build';\n" +
    '// TODO (BLOCKER): Complete independently authorized Assessment Stage 1, then Stage 2 and review.\n' +
    'export const assessmentSeed = ' +
    JSON.stringify(seed, null, 2) +
    ' as const satisfies AssessmentWorkflowSeed;\n';
  const placeholderSource = assessmentDraftExpression(id, reservedSlug);
  return {
    id,
    pendingAssessment: true,
    placeholderSource,
    files: [{ path: sourcePath, kind: 'typescript', content: source }],
    diagnostics: [
      {
        path: directory,
        code: 'pending-assessment-design',
        severity: 'blocker',
        message: 'Assessment has no reviewed Questions or enabled Quiz; Stage 7 production required',
      },
    ],
  };
}
