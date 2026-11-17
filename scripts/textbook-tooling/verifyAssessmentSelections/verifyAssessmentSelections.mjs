/**
 * @fileoverview Verify that every enabled Quiz/Flashcards Section candidate
 * has an independently published, addressable assessment resource for every
 * effective Lesson language. Runs only after strict textbook publication;
 * unlike draft scaffolders it may reject missing banks. Read-only.
 */
import fs from 'node:fs';
import path from 'node:path';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);

function json(filename) {
  const value = JSON.parse(fs.readFileSync(filename, 'utf8'));
  if (!isRecord(value)) throw new Error('Invalid generated JSON object: ' + filename);
  return value;
}

function directories(folder) {
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder, { withFileTypes: true }).filter(item => {
    if (item.isSymbolicLink()) throw new Error('Symlink in generated Lesson resources: ' + path.join(folder, item.name));
    return item.isDirectory();
  }).map(item => item.name).sort();
}

/** Called after Lesson + Assessment publishers have populated dist/static. */
export function verifyAssessmentSelections(staticRoot) {
  const lessons = path.join(staticRoot, 'data/lessons');
  let checked = 0;
  for (const bucket of directories(lessons)) {
    if (!/^[0-9a-f]$/.test(bucket)) throw new Error('Invalid generated Lesson bucket: ' + bucket);
    for (const id of directories(path.join(lessons, bucket))) {
      if (!uuid.test(id) || id.at(-1) !== bucket) throw new Error('Invalid generated Lesson UUID path: ' + bucket + '/' + id);
      const owner = path.join(lessons, bucket, id);
      const basePath = path.join(owner, 'base.json');
      if (!fs.existsSync(basePath)) throw new Error('Missing generated Lesson base.json: ' + owner);
      const lesson = json(basePath);
      if (lesson.id !== id || !Array.isArray(lesson.section)) throw new Error('Invalid generated Lesson identity/Sections: ' + owner);
      const languages = lesson.params?.languages;
      if (!Array.isArray(languages) || !languages.length) throw new Error('Missing generated Lesson languages: ' + owner);
      const sections = lesson.section.filter(section =>
        ['quiz', 'flashcards'].includes(section.type) && section.params?.disabled !== true);
      if (!sections.length) continue;
      const manifestPath = path.join(owner, 'assessment-manifest.json');
      if (!fs.existsSync(manifestPath)) {
        throw new Error('Missing assessment manifest for selected Question/Flashcard Section: ' + owner);
      }
      const manifest = json(manifestPath);
      if (manifest.lessonId !== id || !isRecord(manifest.entries)) {
        throw new Error('Invalid assessment manifest ownership/entries: ' + manifestPath);
      }
      for (const section of sections) {
        const kind = section.type === 'quiz' ? 'question' : 'flashcard';
        const key = kind === 'question' ? 'questionIds' : 'flashcardIds';
        const ids = section.params?.selection?.[key];
        if (!Array.isArray(ids) || !ids.length) throw new Error('Missing selected ' + key + ' in Section ' + section.id);
        if (new Set(ids).size !== ids.length) throw new Error('Duplicate selected ' + key + ' in Section ' + section.id);
        for (const selectedId of ids) {
          if (!uuid.test(selectedId)) throw new Error('Invalid ' + kind + ' UUID in Section ' + section.id);
          const entry = manifest.entries[selectedId];
          if (!entry || entry.lessonId !== id || entry.kind !== kind) {
            throw new Error('Missing or wrong-kind ' + kind + ' ' + selectedId + ' in Section ' + section.id + ' (Lesson ' + id + ')');
          }
          const subdir = kind === 'question' ? 'questions' : 'flashcards';
          const resourcePath = path.join(owner, subdir, selectedId);
          if (!fs.existsSync(path.join(resourcePath, 'base.json'))) {
            throw new Error('Selected ' + kind + ' has no generated base.json: ' + selectedId + ' in Lesson ' + id);
          }
          for (const language of languages) {
            if (!entry.languages?.includes(language)) {
              throw new Error('Selected ' + kind + ' ' + selectedId + ' missing published language ' + language);
            }
            if (entry.localeFiles?.includes(language) && !fs.existsSync(path.join(resourcePath, language + '.json'))) {
              throw new Error('Selected ' + kind + ' ' + selectedId + ' missing generated locale ' + language);
            }
          }
          checked++;
        }
      }
    }
  }
  return checked;
}
