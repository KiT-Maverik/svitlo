/**
 * @fileoverview Strict post-generation Question/Flashcard reference and locale
 * gate for every Lesson's effective published languages. Unlike runtime
 * fallback, production must never substitute English for missing translations.
 * This validates the portable textbook tree without touching authored banks.
 */
import fs from 'node:fs';
import path from 'node:path';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
// Reserved UUIDv8 namespace allocated only by the Lesson draft scaffolder.
// It may not become a published Section or Question/Flashcard identity.
const pendingId = id => typeof id === 'string' && id.startsWith('feedc0de-');
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const pendingLabels = new Set(['PENDING QUIZ', 'PENDING FLASHCARDS']);
function containsPendingAssessmentLabel(value) {
  if (typeof value === 'string') return pendingLabels.has(value);
  if (!value || typeof value !== 'object') return false;
  return Object.values(value).some(containsPendingAssessmentLabel);
}

function json(filename) {
  const value = JSON.parse(fs.readFileSync(filename, 'utf8'));
  if (!isRecord(value)) throw new Error('Invalid generated JSON object: ' + filename);
  return value;
}

function directories(folder) {
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder, { withFileTypes: true })
    .filter(item => {
      if (item.isSymbolicLink())
        throw new Error('Symlink in generated Lesson resources: ' + path.join(folder, item.name));
      return item.isDirectory();
    })
    .map(item => item.name)
    .sort();
}

/**
 * No locale patch is required only when the published base contains no
 * locale-bearing content at any depth. Values in a nonempty locale dictionary
 * cannot be treated as language-independent without a reviewed translation.
 */
function invariantOnly(value) {
  if (!value || typeof value !== 'object') return true;
  if (Array.isArray(value)) return value.every(invariantOnly);
  if (isRecord(value.locale) && Object.keys(value.locale).length > 0) return false;
  return Object.entries(value).every(([key, item]) =>
    key === 'locale' ? !isRecord(item) || Object.keys(item).length === 0 : invariantOnly(item),
  );
}

function checkedResource(root, id, entry, language, kind, sectionId, lessonId) {
  const subdir = kind === 'question' ? 'questions' : 'flashcards';
  const directory = path.join(root, 'data', subdir, id.at(-1), id);
  const basePath = path.join(directory, 'base.json');
  if (!fs.existsSync(basePath)) {
    throw new Error('Selected ' + kind + ' has no generated base.json: ' + id + ' in Lesson ' + lessonId);
  }
  const base = json(basePath);
  if (base.id !== id || (kind === 'question' ? base.type !== entry.questionType : base.type !== 'flashcard')) {
    throw new Error('Invalid selected ' + kind + ' resource identity/type: ' + id);
  }
  if (!Array.isArray(entry.languages) || !entry.languages.includes(language)) {
    throw new Error(
      'Selected ' + kind + ' ' + id + ' missing published language ' + language + ' in Section ' + sectionId,
    );
  }
  const locales = entry.localeFiles;
  if (
    !Array.isArray(locales) ||
    new Set(locales).size !== locales.length ||
    locales.some(locale => !entry.languages.includes(locale))
  ) {
    throw new Error('Invalid locale metadata for ' + kind + ' ' + id);
  }
  if (locales.includes(language)) {
    const localeFile = path.join(directory, language + '.json');
    if (!fs.existsSync(localeFile)) {
      throw new Error(
        'Selected ' + kind + ' ' + id + ' missing generated locale ' + language + ' in Section ' + sectionId,
      );
    }
    json(localeFile);
  } else if (locales.length || !invariantOnly(base)) {
    throw new Error(
      'Selected ' + kind + ' ' + id + ' missing required authored locale ' + language + ' in Section ' + sectionId,
    );
  }
}

/** Called after Lesson and Assessment publishers have staged dist/static/data. */
export function verifyAssessmentSelections(staticRoot) {
  const lessons = path.join(staticRoot, 'data/lessons');
  const manifestPath = path.join(staticRoot, 'data/assessments/manifest.json');
  const hasManifest = fs.existsSync(manifestPath);
  const manifest = hasManifest ? json(manifestPath) : null;
  if (hasManifest && (!isRecord(manifest.entries) || Object.hasOwn(manifest, 'lessonId'))) {
    throw new Error('Invalid textbook-scoped assessment manifest: ' + manifestPath);
  }
  let checked = 0;
  for (const bucket of directories(lessons)) {
    if (!/^[0-9a-f]$/.test(bucket)) throw new Error('Invalid generated Lesson bucket: ' + bucket);
    for (const id of directories(path.join(lessons, bucket))) {
      if (!uuid.test(id) || id.at(-1) !== bucket)
        throw new Error('Invalid generated Lesson UUID path: ' + bucket + '/' + id);
      const owner = path.join(lessons, bucket, id);
      const basePath = path.join(owner, 'base.json');
      if (!fs.existsSync(basePath)) throw new Error('Missing generated Lesson base.json: ' + owner);
      const lesson = json(basePath);
      if (lesson.id !== id || !Array.isArray(lesson.section))
        throw new Error('Invalid generated Lesson identity/Sections: ' + owner);
      const languages = lesson.params?.languages;
      if (!Array.isArray(languages) || !languages.length)
        throw new Error('Missing generated Lesson languages: ' + owner);
      if (lesson.section.some(section => pendingId(section.id))) {
        throw new Error('Unresolved generated assessment Section UUID in Lesson ' + id);
      }
      // The Builder can preserve authored non-source translations alongside
      // a pending source-language label. That marker then lives in a sparse
      // language fragment, not necessarily in the base Section JSON.
      if (containsPendingAssessmentLabel(lesson)) {
        throw new Error('Unresolved assessment Section draft label in Lesson ' + id);
      }
      for (const language of languages) {
        const localePath = path.join(owner, language + '.json');
        if (fs.existsSync(localePath) && containsPendingAssessmentLabel(json(localePath))) {
          throw new Error('Unresolved assessment Section draft label in Lesson ' + id + ' / ' + language);
        }
      }
      const sections = lesson.section.filter(
        section => ['quiz', 'flashcards'].includes(section.type) && section.params?.disabled !== true,
      );
      if (!sections.length) continue;
      if (!manifest) throw new Error('Missing assessment manifest for selected Question/Flashcard Section: ' + owner);
      for (const section of sections) {
        const kind = section.type === 'quiz' ? 'question' : 'flashcard';
        const key = kind === 'question' ? 'questionIds' : 'flashcardIds';
        const ids = section.params?.selection?.[key];
        if (!Array.isArray(ids) || !ids.length)
          throw new Error('Missing selected ' + key + ' in Section ' + section.id);
        if (new Set(ids).size !== ids.length)
          throw new Error('Duplicate selected ' + key + ' in Section ' + section.id);
        for (const selectedId of ids) {
          if (pendingId(selectedId)) {
            throw new Error('Unresolved placeholder ' + kind + ' UUID ' + selectedId + ' in Section ' + section.id);
          }
          if (typeof selectedId !== 'string' || !uuid.test(selectedId))
            throw new Error('Invalid ' + kind + ' UUID in Section ' + section.id);
          const entry = manifest.entries[selectedId];
          if (!entry || entry.kind !== kind || !uuid.test(entry.ownerLessonId ?? '')) {
            throw new Error(
              'Missing or wrong-kind ' + kind + ' ' + selectedId + ' in Section ' + section.id + ' (Lesson ' + id + ')',
            );
          }
          for (const language of languages) {
            checkedResource(staticRoot, selectedId, entry, language, kind, section.id, id);
          }
          checked++;
        }
      }
    }
  }
  return checked;
}
