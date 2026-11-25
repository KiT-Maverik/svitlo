/**
 * Lesson portion of the PR-scoped read-only agent reference library.
 * The Lesson → Markdown renderer is separately owned by the Lesson generator task.
 * This module handles only discovery, CLI invocation, output and error accounting.
 */
import fs from 'node:fs';
import { resolveMaterializedEntrypoint } from '../loadAuthoredConfigurators/resolveMaterializedEntrypoint.mjs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
// Keep reference-library generation dependency-free: the workflow installs only
// the TypeScript parser, not the built Engine workspace. Preserve Engine's
// canonical UUID-addressing contract.
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function resolveEntityPath(id) {
  if (typeof id !== 'string' || !UUID_PATTERN.test(id)) {
    throw new Error('Expected a canonical UUID entity ID');
  }
  const normalized = id.toLowerCase();
  return normalized.slice(-1) + '/' + normalized;
}

const appNamePattern = /^[a-z][a-z0-9-]*$/;
const bucketPattern = /^[0-9a-f]$/;

function directories(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
}

export function discoverLessons(root, packageName = null, lessonId = null) {
  const applications = path.join(root, 'content');
  if (lessonId) {
    // Resolve exactly one UUID-addressed directory. Do not enumerate unrelated
    // Lessons or require their source to be valid for a scoped reference.
    if (!packageName || !/^content\/[a-z][a-z0-9-]*$/.test(packageName) || !UUID_PATTERN.test(lessonId)) {
      throw new Error('Scoped Lesson references require textbook and canonical UUID');
    }
    const id = lessonId.toLowerCase();
    const app = packageName.slice('content/'.length);
    const relative = resolveEntityPath(id);
    const rootDirectory = path.join(applications, app, 'data', 'lessons');
    const bucketDirectory = path.join(rootDirectory, id.slice(-1));
    const directory = path.join(rootDirectory, relative);
    for (const location of [rootDirectory, bucketDirectory, directory]) {
      if (!fs.existsSync(location)) throw new Error('No canonical Lesson source for ' + id);
      if (fs.lstatSync(location).isSymbolicLink() || !fs.statSync(location).isDirectory()) {
        throw new Error('Unsafe scoped Lesson source: ' + location);
      }
    }
    const { source } = resolveMaterializedEntrypoint(directory, { mode: 'draft', legacyLesson: true });
    if (!source) throw new Error('No canonical Lesson source for ' + id);
    return [{ textbook: app, package: packageName, id, relative, source }];
  }
  const lessons = [];
  for (const app of packageName ? [packageName.slice('content/'.length)] : directories(applications)) {
    if (!appNamePattern.test(app)) continue;
    const rootDirectory = path.join(applications, app, 'data', 'lessons');
    for (const bucket of directories(rootDirectory)) {
      if (!bucketPattern.test(bucket)) continue;
      for (const id of directories(path.join(rootDirectory, bucket))) {
        const relative = resolveEntityPath(id);
        if (relative !== `${bucket}/${id}`) throw new Error('Lesson path mismatch: ' + relative);
        const directory = path.join(rootDirectory, bucket, id);
        const { source } = resolveMaterializedEntrypoint(directory, { mode: 'draft', legacyLesson: true });
        if (!source) continue;
        lessons.push({ textbook: app, package: `content/${app}`, id, relative, source });
      }
    }
  }
  return lessons;
}

/**
 * Markdown generator contract (Agent 4):
 * node shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.mjs --package content/<book>
 *   --lesson <uuid> --locale <code> --stdout
 */
export function generateLessonReviewArtifacts({
  root,
  output,
  languages,
  manifest,
  saveManifest,
  run = spawnSync,
  packageName = null,
  lessonId = null,
  supportedLanguages = null,
}) {
  const lessons = discoverLessons(root, packageName, lessonId);
  const generator = path.join(root, 'shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.mjs');
  const generatorAvailable = fs.existsSync(generator) && fs.lstatSync(generator).isFile();
  const result = { discoveredLessons: lessons.length, generated: 0, failures: 0 };
  fs.mkdirSync(path.join(output, 'lessons'), { recursive: true });

  if (lessons.length && !generatorAvailable) {
    manifest.failures.push({
      kind: 'lesson',
      error: 'Missing shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.mjs (Agent 4 dependency)',
    });
    saveManifest();
    result.failures++;
    return result;
  }

  for (const lesson of lessons) {
    let selectedLanguages = languages;
    if (!selectedLanguages) {
      const listed = run(
        process.execPath,
        [generator, '--package', lesson.package, '--lesson', lesson.id, '--list-locales'],
        { cwd: root, encoding: 'utf8', timeout: 180_000, maxBuffer: 32 * 1024 * 1024 },
      );
      try {
        if (listed.error || listed.status !== 0) {
          throw new Error(listed.error?.message || listed.stderr || 'Cannot enumerate Lesson languages');
        }
        selectedLanguages = JSON.parse(listed.stdout);
        if (
          !Array.isArray(selectedLanguages) ||
          selectedLanguages.length === 0 ||
          new Set(selectedLanguages).size !== selectedLanguages.length ||
          !selectedLanguages.every(
            code => typeof code === 'string' && (!supportedLanguages || supportedLanguages.includes(code)),
          )
        ) {
          throw new Error('Invalid Lesson language declaration');
        }
      } catch (error) {
        const message = String(error.message || error).slice(0, 1500);
        manifest.failures.push({ kind: 'lesson', textbook: lesson.package, lesson: lesson.relative, error: message });
        result.failures++;
        saveManifest();
        process.stderr.write('::warning::Lesson languages ' + lesson.id + ': ' + message.replace(/\n/g, ' ') + '\n');
        continue;
      }
    }
    for (const locale of selectedLanguages) {
      const name = `${lesson.textbook}/${lesson.relative}/${locale}`;
      const relative = path.join('lessons', lesson.textbook, lesson.relative, `${locale}.md`);
      const destination = path.join(output, relative);
      const generated = run(
        process.execPath,
        [generator, '--package', lesson.package, '--lesson', lesson.id, '--locale', locale, '--stdout'],
        { cwd: root, encoding: 'utf8', timeout: 180_000, maxBuffer: 32 * 1024 * 1024 },
      );

      const markdown = generated.stdout || '';
      if (generated.error || generated.status !== 0 || !markdown.trim() || markdown.includes('%%MISSING%%')) {
        const error = String(
          generated.error?.message || generated.stderr || `Generator returned ${generated.status} or empty Markdown`,
        )
          .trim()
          .slice(0, 1500);
        manifest.failures.push({
          kind: 'lesson',
          textbook: lesson.package,
          lesson: `${lesson.relative}`,
          locale,
          error,
        });
        saveManifest();
        process.stderr.write(`::warning::Lesson ${name}: ${error.replace(/\n/g, ' ')}\n`);
        result.failures++;
        continue;
      }
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, markdown, 'utf8');
      manifest.generated.push({
        kind: 'lesson',
        textbook: lesson.package,
        lesson: `${lesson.relative}`,
        locale,
        path: relative.split(path.sep).join('/'),
        missing: 0,
        reviewReady: true,
      });
      saveManifest();
      result.generated++;
      process.stdout.write(`Generated ${relative.split(path.sep).join('/')}\n`);
    }
  }
  return result;
}
