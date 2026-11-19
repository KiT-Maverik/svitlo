/**
 * Stage-6-only source handoff for unfinished assessment Sections.
 * Never invent Question/Flashcard IDs or relax published Section Config.
 * Any deferred Section is preserved verbatim in its independently owned bank YAML draft.
 */
import yaml from 'yaml';

const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const hasIds = ids => Array.isArray(ids) && ids.length > 0 &&
  ids.every(id => typeof id === 'string' && /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(id)) &&
  new Set(ids).size === ids.length;

export function hasCompleteAssessmentParams(config) {
  const params = config?.params;
  if (config?.type === 'flashcards') return hasIds(params?.selection?.flashcardIds);
  if (config?.type !== 'quiz') return true;
  const selection = params?.selection;
  const interaction = params?.interaction;
  const results = params?.results;
  return hasIds(selection?.questionIds) &&
    ['all', 'sample'].includes(selection.mode) &&
    (selection.mode !== 'sample' || (Number.isInteger(selection.count) && selection.count > 0 &&
      selection.count <= selection.questionIds.length)) &&
    ['stack', 'stepper'].includes(params?.layout?.mode) &&
    ['immediate', 'after-completion'].includes(params?.feedbackMode) &&
    Number.isInteger(interaction?.retries) && interaction.retries >= 0 &&
    ['showErrors', 'showCorrectAnswers', 'allowExplanations', 'allowDeferring',
      'allowQuestionNavigation', 'skippable'].every(key => typeof interaction[key] === 'boolean') &&
    ['immediate', 'after-review', 'hidden'].includes(results?.visibility) &&
    typeof results?.showScore === 'boolean';
}

/**
 * Returns a runtime-facing Lesson copy, explicit outstanding markers and
 * temporary bank-owned YAML. The original accepted lesson.yaml is untouched.
 */
export function prepareAssessmentDraft(document) {
  const lesson = structuredClone(document.config);
  const items = lesson.section?.items ?? {};
  const order = lesson.section?.order ?? [];
  const deferred = {
    quiz: { items: {}, order: [] },
    flashcards: { items: {}, order: [] },
  };
  for (const slug of order) {
    const section = items[slug];
    const type = section?.config?.type;
    if (!Object.hasOwn(deferred, type) || hasCompleteAssessmentParams(section.config)) continue;
    deferred[type].items[slug] = structuredClone(document.config.section.items[slug]);
    deferred[type].order.push(slug);
    delete items[slug];
  }
  if (lesson.section) lesson.section.order = order.filter(slug => Object.hasOwn(items, slug));
  const pending = [];
  const drafts = new Map();
  for (const type of ['quiz', 'flashcards']) {
    const required = document.production?.[type === 'quiz' ? 'quizRequired' : 'flashcardsRequired'] === true ||
      (type === 'quiz' && document.config.params?.requireQuiz === true);
    const complete = Object.values(items).some(section => section?.config?.type === type &&
      section.config.params?.disabled !== true);
    const missing = required && !complete;
    for (const slug of deferred[type].order) pending.push({ type, slug, reason: 'incomplete Section' });
    if (missing && !deferred[type].order.length)
      pending.push({ type, slug: null, reason: 'required Section missing' });
    if (!deferred[type].order.length && !missing) continue;
    const handoff = { items: deferred[type].items, order: deferred[type].order };
    const sourceLanguage = document.production?.documentLanguage;
    const bankDraft = type === 'quiz'
      ? { documentLanguage: sourceLanguage, questions: {}, sectionDrafts: handoff }
      : { lessonId: document.config.id, documentLanguage: sourceLanguage,
          supportedLanguages: document.config.params.languages,
          flashcards: { items: {}, order: [] }, sectionDrafts: handoff };
    drafts.set(type === 'quiz' ? 'questions.yaml' : 'flashcards.yaml', yaml.stringify(bankDraft));
  }
  return { lesson, pending, drafts };
}
