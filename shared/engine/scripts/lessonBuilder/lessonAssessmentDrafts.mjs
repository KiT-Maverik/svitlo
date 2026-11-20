/**
 * Stage-6-only scaffolding of typed assessment Sections.
 *
 * This is a source draft, not approval: reserved UUIDv8 identifiers with the
 * feedc0de prefix can NEVER be real assessment resources or published Sections.
 * Keep the original approved YAML unchanged and transfer its pending Section
 * source into the independent bank specialist's temporary sectionDrafts.
 */
import { createHash } from 'node:crypto';
import yaml from 'yaml';

export const PENDING_ASSESSMENT_UUID_PREFIX = 'feedc0de-';
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

/** UUIDv8, deterministic in the Lesson's identity/Section/field namespace. */
export function pendingAssessmentUuid(lessonId, type, slug, field) {
  const digest = createHash('sha256')
    .update(['svitlo', 'pending-assessment', 'v1', lessonId, type, slug, field].join(':'))
    .digest('hex');
  return 'feedc0de-' + digest.slice(0, 4) + '-8' + digest.slice(4, 7) +
    '-a' + digest.slice(7, 10) + '-' + digest.slice(10, 22);
}
export const isPendingAssessmentUuid = id =>
  typeof id === 'string' && id.startsWith(PENDING_ASSESSMENT_UUID_PREFIX);

const hasIds = ids =>
  Array.isArray(ids) && ids.length > 0 &&
  ids.every(id => typeof id === 'string' && uuid.test(id) && !isPendingAssessmentUuid(id)) &&
  new Set(ids).size === ids.length;

export function hasCompleteAssessmentParams(config) {
  const params = config?.params;
  if (params?.disabled === true) return false;
  if (config?.type === 'flashcards') return hasIds(params?.selection?.flashcardIds);
  if (config?.type !== 'quiz') return true;
  const selection = params?.selection;
  const interaction = params?.interaction;
  const results = params?.results;
  return (
    hasIds(selection?.questionIds) &&
    ['all', 'sample'].includes(selection.mode) &&
    (selection.mode !== 'sample'
      ? selection.count === undefined
      : Number.isInteger(selection.count) && selection.count > 0 && selection.count <= selection.questionIds.length) &&
    ['stack', 'stepper'].includes(params?.layout?.mode) &&
    ['immediate', 'after-completion'].includes(params?.feedbackMode) &&
    Number.isInteger(interaction?.retries) && interaction.retries >= 0 &&
    ['showErrors', 'showCorrectAnswers', 'allowExplanations', 'allowDeferring',
      'allowQuestionNavigation', 'skippable'].every(key => typeof interaction[key] === 'boolean') &&
    ['immediate', 'after-review', 'hidden'].includes(results?.visibility) &&
    typeof results?.showScore === 'boolean'
  );
}

const selectedField = type => type === 'quiz' ? 'questionIds' : 'flashcardIds';

/**
 * Only unapproved/missing fields receive provisional values. All authored
 * choices survive unchanged in the sidecar; valid, complete Sections are
 * NEVER passed through this function.
 */
function scaffoldParams(paramsInput, lessonId, type, slug) {
  const original = isRecord(paramsInput) ? paramsInput : {};
  const fields = [];
  const choose = (field, value, valid, fallback) => {
    if (valid(value)) return value;
    fields.push('$.params.' + field);
    return fallback;
  };
  const originalSelection = isRecord(original.selection) ? original.selection : {};
  const key = selectedField(type);
  const realIds = hasIds(originalSelection[key]);
  const ids = realIds
    ? originalSelection[key]
    : [pendingAssessmentUuid(lessonId, type, slug, key)];
  if (!realIds) fields.push('$.params.selection.' + key);
  const selection = { ...originalSelection, [key]: ids };
  if (type === 'flashcards') {
    return {
      params: { ...original, selection },
      provisionalFields: fields,
      syntheticSelection: !realIds,
    };
  }
  selection.mode = choose('selection.mode', originalSelection.mode, v => ['all', 'sample'].includes(v), 'all');
  if (selection.mode === 'sample') {
    selection.count = choose(
      'selection.count', originalSelection.count,
      v => Number.isInteger(v) && v > 0 && v <= ids.length, 1,
    );
  } else if (Object.hasOwn(selection, 'count')) {
    delete selection.count;
    fields.push('$.params.selection.mode');
  }
  const originalLayout = isRecord(original.layout) ? original.layout : {};
  const originalInteraction = isRecord(original.interaction) ? original.interaction : {};
  const originalResults = isRecord(original.results) ? original.results : {};
  const interaction = { ...originalInteraction };
  interaction.retries = choose('interaction.retries', originalInteraction.retries,
    v => Number.isInteger(v) && v >= 0, 0);
  for (const key of ['showErrors', 'showCorrectAnswers', 'allowExplanations',
    'allowDeferring', 'allowQuestionNavigation', 'skippable']) {
    interaction[key] = choose('interaction.' + key, originalInteraction[key], v => typeof v === 'boolean', false);
  }
  return {
    params: {
      ...original,
      selection,
      layout: {
        ...originalLayout,
        mode: choose('layout.mode', originalLayout.mode, v => ['stack', 'stepper'].includes(v), 'stack'),
      },
      feedbackMode: choose('feedbackMode', original.feedbackMode,
        v => ['immediate', 'after-completion'].includes(v), 'after-completion'),
      interaction,
      results: {
        ...originalResults,
        visibility: choose('results.visibility', originalResults.visibility,
          v => ['immediate', 'after-review', 'hidden'].includes(v), 'hidden'),
        showScore: choose('results.showScore', originalResults.showScore,
          v => typeof v === 'boolean', false),
      },
    },
    provisionalFields: fields,
    syntheticSelection: !realIds,
  };
}

/**
 * Returns a Config-valid draft Lesson copy, pending annotated fields and
 * temporary specialist handoffs. The accepted input document is not mutated.
 */
export function prepareAssessmentDraft(document) {
  const lesson = structuredClone(document.config);
  if (!isRecord(lesson.section)) lesson.section = { items: {}, order: [] };
  if (!isRecord(lesson.section.items)) lesson.section.items = {};
  if (!Array.isArray(lesson.section.order)) lesson.section.order = [];
  const items = lesson.section.items;
  const order = lesson.section.order;
  const pending = [];
  const drafts = new Map();
  const handoffs = {
    quiz: { items: {}, order: [] },
    flashcards: { items: {}, order: [] },
  };
  const seenIds = new Set([lesson.id]);
  for (const [slug, wrapper] of Object.entries(items)) {
    if (typeof wrapper?.config?.id === 'string') seenIds.add(wrapper.config.id);
  }
  const allocate = (type, slug, field) => {
    const id = pendingAssessmentUuid(lesson.id, type, slug, field);
    if (seenIds.has(id)) throw new Error('Pending assessment UUID collision: ' + id);
    seenIds.add(id);
    return id;
  };
  for (const type of ['quiz', 'flashcards']) {
    const required = document.production?.[type === 'quiz' ? 'quizRequired' : 'flashcardsRequired'] === true ||
      (type === 'quiz' && lesson.params?.quizRequiredForCompletion === true);
    const authored = order.filter(slug => items[slug]?.config?.type === type);
    if (required && authored.length && authored.every(slug => items[slug].config.params?.disabled === true)) {
      throw new Error('Required ' + type + ' Section is explicitly disabled; Methodologist decision needed');
    }
    // The author fixes the position by declaring an ordered Section. With no
    // approved Section identity/position, append a single minimal scaffold.
    if (required && !authored.some(slug => items[slug]?.config?.params?.disabled !== true)) {
      const baseSlug = type === 'quiz' ? 'assessmentQuiz' : 'assessmentFlashcards';
      let slug = baseSlug, n = 2;
      while (Object.hasOwn(items, slug)) slug = baseSlug + n++;
      items[slug] = {
        config: {
          id: allocate(type, slug, 'section-id'), slug, type,
          params: {}, locale: {}, content: { items: {}, order: [] },
        },
      };
      order.push(slug);
    }
    for (const slug of order) {
      const wrapper = items[slug];
      const section = wrapper?.config;
      if (section?.type !== type || section.params?.disabled === true || hasCompleteAssessmentParams(section)) continue;
      if (document.config.section?.items?.[slug]) {
        handoffs[type].items[slug] = structuredClone(document.config.section.items[slug]);
      } else {
        handoffs[type].items[slug] = structuredClone(wrapper);
      }
      handoffs[type].order.push(slug);
      const { params, provisionalFields, syntheticSelection } = scaffoldParams(section.params, lesson.id, type, slug);
      if (syntheticSelection) {
        // A pending UUID never belongs to a real bank, irrespective of syntax.
        const id = params.selection[selectedField(type)][0];
        if (seenIds.has(id)) throw new Error('Pending assessment UUID collision: ' + id);
        seenIds.add(id);
      }
      section.params = params;
      if (!isRecord(section.locale)) section.locale = {};
      if (!isRecord(section.content)) section.content = { items: {}, order: [] };
      pending.push({
        type, slug, reason: 'pending reviewed assessment Section',
        provisionalFields,
        syntheticSelection,
        generatedIdentity: !document.config.section?.items?.[slug],
      });
    }
    if (!handoffs[type].order.length) continue;
    const sourceLanguage = document.production?.documentLanguage;
    const handoff = handoffs[type];
    const bankDraft = type === 'quiz'
      ? { documentLanguage: sourceLanguage, questions: {}, sectionDrafts: handoff }
      : {
          lessonId: document.config.id,
          documentLanguage: sourceLanguage,
          supportedLanguages: document.config.params?.languages,
          flashcards: { items: {}, order: [] },
          sectionDrafts: handoff,
        };
    drafts.set(type === 'quiz' ? 'questions.yaml' : 'flashcards.yaml', yaml.stringify(bankDraft));
  }
  return { lesson, pending, drafts };
}
