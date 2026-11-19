/**
 * Stage 1 assessment-section intent lives in production.methodology, not in
 * Engine Config. This reader validates a small fenced YAML inventory inside
 * that Markdown and maps each intent key to one authored Section.
 */
import yaml from 'yaml';

const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const keyPattern = /^[a-z][A-Za-z0-9]*$/;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const sectionTypes = ['quiz', 'flashcards'];

function fail(field, message) {
  throw new Error('lesson.yaml:' + field + ': ' + message);
}
function nonempty(value) {
  return typeof value === 'string' && !!value.trim();
}

/**
 * A fenced inventory is deliberately inside the authored Methodology:
 * no new Engine Config field, separate source or status schema is created.
 * Older complete Lessons without assessment Sections remain readable.
 */
export function verifyAssessmentSectionPlan(document, { requireInventory = false, allowPending = false } = {}) {
  const methodology = document.production?.methodology ?? '';
  const fence = /^~{3}yaml lesson-assessment-sections[ \t]*\r?\n([\s\S]*?)^~{3}[ \t]*$/gm;
  const matches = [...methodology.matchAll(fence)];
  const actual = Object.entries(document.config?.section?.items ?? {}).filter(([, value]) =>
    sectionTypes.includes(value?.config?.type),
  );
  if (!matches.length) {
    if (requireInventory || actual.length)
      fail('production.methodology', 'explicit Quiz and Flashcards Section decisions are required');
    return { pending: [], inventory: null };
  }
  if (matches.length !== 1)
    fail('production.methodology', 'exactly one lesson-assessment-sections inventory is required');
  let inventory;
  try {
    const parsed = yaml.parseDocument(matches[0][1], { version: '1.2', strict: true, uniqueKeys: true });
    if (parsed.errors.length) throw new Error(parsed.errors.map(item => item.message).join('; '));
    inventory = parsed.toJS({ maxAliasCount: 0 })?.assessmentSections;
  } catch (error) {
    fail('production.methodology', 'invalid assessment Section inventory: ' + error.message);
  }
  if (!record(inventory) || Object.keys(inventory).some(key => !sectionTypes.includes(key)))
    fail('production.methodology', 'assessmentSections must contain only quiz and flashcards decisions');

  const expected = new Map();
  for (const type of sectionTypes) {
    const entry = inventory[type];
    if (!record(entry) || !['required', 'notRequired'].includes(entry.decision))
      fail('production.methodology', type + ' decision must be required or notRequired');
    if (!nonempty(entry.rationale) || !record(entry.intents))
      fail('production.methodology', type + ' requires rationale and a stable keyed intents map');
    const intents = Object.entries(entry.intents);
    if ((entry.decision === 'required') !== (intents.length > 0))
      fail('production.methodology', type + ' decision disagrees with number of intents');
    for (const [key, intent] of intents) {
      if (!keyPattern.test(key) || !record(intent) || !nonempty(intent.purpose) ||
          !nonempty(intent.placement) || !nonempty(intent.bankDependency))
        fail('production.methodology', type + '.' + key + ' needs key, purpose, placement, and bankDependency');
      if (type === 'quiz' &&
          (!Array.isArray(intent.skills) || !intent.skills.length ||
           intent.skills.some(id => typeof id !== 'string' || !uuid.test(id)) ||
           !Array.isArray(intent.assessmentMethods) || !intent.assessmentMethods.length ||
           intent.assessmentMethods.some(method => !nonempty(method))))
        fail('production.methodology', 'quiz.' + key + ' requires Skill UUIDs and AssessmentMethodKeys');
      if (intent.skills !== undefined &&
          (!Array.isArray(intent.skills) || intent.skills.some(id => typeof id !== 'string' || !uuid.test(id))))
        fail('production.methodology', type + '.' + key + ' has invalid Skill UUIDs');
      expected.set(type + ':' + key, { key, type });
    }
  }

  const seen = new Set();
  const pending = [];
  for (const [slug, section] of actual) {
    const type = section.config.type;
    const notes = section.production?.productionNotes;
    const intent = typeof notes === 'string' ? /^Assessment intent: ([a-z][A-Za-z0-9]*)[ \t]*$/m.exec(notes) : null;
    const bank = typeof notes === 'string' ? /^Bank integration: (pending|connected)[ \t]*$/m.exec(notes) : null;
    if (!intent || !bank)
      fail('config.section.items.' + slug + '.production.productionNotes',
        'assessment Section requires Assessment intent: <key> and Bank integration: pending|connected');
    const key = type + ':' + intent[1];
    if (!expected.has(key) || seen.has(key))
      fail('config.section.items.' + slug, 'unmatched or duplicate ' + type + ' Methodologist intent ' + intent[1]);
    if (section.config.slug !== slug)
      fail('config.section.items.' + slug + '.config.slug', 'Section slug must match its collection key');
    if (section.config.params?.disabled === true)
      fail('config.section.items.' + slug + '.config.params.disabled', 'required assessment Section cannot be disabled');
    if (!document.config.section.order?.includes(slug))
      fail('config.section.order', 'missing Methodologist-required assessment Section ' + slug);
    seen.add(key);
    if (bank[1] === 'pending') pending.push({ slug, type, intentKey: intent[1] });
  }
  for (const key of expected.keys()) {
    if (!seen.has(key))
      fail('config.section.items', 'Methodologist-required assessment Section omitted: ' + key);
  }
  if (!allowPending && pending.length)
    fail('config.section.items', 'unverified bank integrations remain pending: ' + pending.map(x => x.slug).join(', '));
  return { pending, inventory };
}
