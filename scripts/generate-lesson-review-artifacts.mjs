/**
 * Lesson portion of the PR-scoped read-only agent reference library.
 * The Lesson → Markdown renderer is separately owned by the Lesson generator task.
 * This module handles only discovery, CLI invocation, output and error accounting.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const appNamePattern = /^[a-z][a-z0-9-]*$/;
const lessonSlugPattern = /^[a-z][A-Za-z0-9]*$/;
const groupPattern = /^[0-9]+$/;

function directories(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
}

export function discoverLessons(root) {
  const applications = path.join(root, 'learningApps');
  const lessons = [];
  for (const app of directories(applications)) {
    if (!appNamePattern.test(app)) continue;
    const lessonsRoot = path.join(applications, app, 'data', 'lessons');
    for (const group of directories(lessonsRoot)) {
      if (!groupPattern.test(group)) continue;
      for (const slug of directories(path.join(lessonsRoot, group))) {
        if (!lessonSlugPattern.test(slug)) continue;
        const source = path.join(lessonsRoot, group, slug, `${slug}.data.ts`);
        if (!fs.existsSync(source) || !fs.lstatSync(source).isFile()) continue;
        lessons.push({ textbook: app, package: `learningApps/${app}`, group, slug, source });
      }
    }
  }
  return lessons;
}

/**
 * Markdown generator contract (Agent 4):
 * node scripts/generate-lessons-markdown.mjs --package learningApps/<book>
 *   --lesson <group>/<slug> --locale <code> --stdout
 */
export function generateLessonReviewArtifacts({ root, output, languages, manifest, saveManifest, run = spawnSync }) {
  const lessons = discoverLessons(root);
  const generator = path.join(root, 'scripts/generate-lessons-markdown.mjs');
  const generatorAvailable = fs.existsSync(generator) && fs.lstatSync(generator).isFile();
  const result = { discoveredLessons: lessons.length, generated: 0, failures: 0 };
  fs.mkdirSync(path.join(output, 'lessons'), { recursive: true });

  if (lessons.length && !generatorAvailable) {
    manifest.failures.push({ kind: 'lesson', error: 'Missing scripts/generate-lessons-markdown.mjs (Agent 4 dependency)' });
    saveManifest();
    result.failures++;
    return result;
  }

  for (const lesson of lessons) {
    for (const locale of languages) {
      const name = `${lesson.textbook}/${lesson.group}/${lesson.slug}/${locale}`;
      const relative = path.join('lessons', lesson.textbook, lesson.group, lesson.slug, `${locale}.md`);
      const destination = path.join(output, relative);
      const generated = run(process.execPath, [
        generator, '--package', lesson.package,
        '--lesson', `${lesson.group}/${lesson.slug}`,
        '--locale', locale, '--stdout',
      ], { cwd: root, encoding: 'utf8', timeout: 180_000, maxBuffer: 32 * 1024 * 1024 });

      const markdown = generated.stdout || '';
      if (generated.error || generated.status !== 0 || !markdown.trim()) {
        const error = String(generated.error?.message || generated.stderr ||
          `Generator returned ${generated.status} or empty Markdown`).trim().slice(0, 1500);
        manifest.failures.push({ kind: 'lesson', textbook: lesson.package,
          lesson: `${lesson.group}/${lesson.slug}`, locale, error });
        saveManifest();
        process.stderr.write(`::warning::Lesson ${name}: ${error.replace(/\n/g, ' ')}\n`);
        result.failures++;
        continue;
      }
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, markdown, 'utf8');
      manifest.generated.push({ kind: 'lesson', textbook: lesson.package,
        lesson: `${lesson.group}/${lesson.slug}`, locale,
        path: `.agent-ci-artifacts/${relative.split(path.sep).join('/')}` });
      saveManifest();
      result.generated++;
      process.stdout.write(`Generated .agent-ci-artifacts/${relative.split(path.sep).join('/')}\n`);
    }
  }
  return result;
}
