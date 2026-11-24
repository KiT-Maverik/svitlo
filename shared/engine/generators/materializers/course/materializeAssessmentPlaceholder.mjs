const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slugPattern = /^[A-Za-z][A-Za-z0-9]*$/;
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);

/** Course Stage 5 reserves an Assessment without fabricating Questions or
 * inventing a publishable Quiz. The pending inline defineAssessment expression
 * is valid TypeScript and retains its ordered identity; its Build deliberately
 * rejects strict publication because it has no enabled Quiz. The draft seed
 * is authored at the exact nested placement and completed by Assessment Flow.
 */
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
    !slugPattern.test(config.slug ?? '') ||
    !Array.isArray(context.plannedLanguages) ||
    !context.plannedLanguages.includes(context.sourceLanguage)
  )
    throw Error('Invalid reviewed Assessment Stage 2 placement');
  const title = config.locale.title;
  if (
    (typeof title !== 'string' || !title.trim()) &&
    (!isRecord(title) || typeof title[context.sourceLanguage] !== 'string' ||
      !title[context.sourceLanguage].trim())
  )
    throw Error(directory + ': Assessment title is missing reviewed source language');
  const id = context.deriveId('assessment', directory);
  if (!uuid.test(id)) throw Error(directory + ': invalid allocated Assessment UUID');
  const placement = { courseId: context.courseId, path: directory };
  const seed = {
    config: { id, type: 'assessment', slug: config.slug, locale: config.locale },
    production: {
      purpose: production.purpose,
      lessonDependencies: [...production.lessonDependencies],
      placement,
    },
  };
  const sourcePath = directory + '/draft.ts';
  const source =
    "import type { AssessmentWorkflowSeed } from '@svitlo/engine/build';\n" +
    '// TODO (BLOCKER): Complete independently authorized Assessment Stage 1, then Stage 2 and review.\n' +
    'export const assessmentSeed = ' + JSON.stringify(seed, null, 2) +
    ' as const satisfies AssessmentWorkflowSeed;\n';
  const placeholderSource =
    'defineAssessment({ id: ' + JSON.stringify(id) +
    ', type: "assessment", slug: ' + JSON.stringify(config.slug) +
    ', params: { languages }, locale: { title: "Not implemented" },' +
    ' section: { items: {}, order: [] } })';
  return {
    id,
    pendingAssessment: true,
    placeholderSource,
    files: [{ path: sourcePath, kind: 'typescript', content: source }],
    diagnostics: [{
      path: directory,
      code: 'pending-assessment-design',
      severity: 'blocker',
      message: 'Assessment has no reviewed Questions or enabled Quiz; Stage 7 production required',
    }],
  };
}
