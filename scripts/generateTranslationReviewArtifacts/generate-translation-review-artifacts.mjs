#!/usr/bin/env node
/**
 * Generate only an explicitly requested PR-scoped Markdown reference family.
 * No implicit all-packages/all-locales operation. --locale omitted means the
 * selected textbook's supported languages (or each Lesson's own languages).
 * Draft %%MISSING%% markers never enter authored data or published resources.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { readSupportedLanguageCodes } from '../../shared/engine/scripts/readSupportedLanguages/read-supported-languages.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const output = path.join(root, '.agent-ci-artifacts');
const families = new Set([
  'skills',
  'lessons',
  'questions',
  'flashcards',
  'courses',
  'assessment-methods',
  'ui-kit',
  'geography-home-copy',
  'education-standards',
]);
const uuidPattern = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

export function parseArguments(args) {
  const options = {};
  for (let i = 0; i < args.length; ++i) {
    const key = args[i];
    if (
      !['--kind', '--package', '--locale', '--component', '--lesson', '--course'].includes(key) ||
      Object.hasOwn(options, key.slice(2)) ||
      !args[i + 1] ||
      args[i + 1].startsWith('--')
    ) {
      throw new Error(
        'Usage: --kind <skills|lessons|questions|flashcards|courses|assessment-methods|ui-kit|geography-home-copy|education-standards> ' +
          '[--package content/<textbook>] [--locale <code>] [--component <name>] [--lesson <uuid>] [--course <uuid>]',
      );
    }
    options[key.slice(2)] = args[++i];
  }
  if (!families.has(options.kind)) throw new Error('An explicit supported --kind is required');
  const hasPackage = ['skills', 'lessons', 'questions', 'flashcards', 'courses'].includes(options.kind);
  if (hasPackage !== Boolean(options.package))
    throw new Error('Only Skills, Lessons, Questions, Flashcards and Courses require --package content/<textbook>');
  if (options.package && !/^content\/[a-z][a-z0-9-]*$/.test(options.package)) {
    throw new Error('Unsafe textbook path: ' + options.package);
  }
  if (options.component && (options.kind !== 'ui-kit' || !/^[a-zA-Z][a-zA-Z0-9]*$/.test(options.component))) {
    throw new Error('--component is only available for UI Kit dictionaries');
  }
  if (
    options.lesson &&
    (!['lessons', 'questions', 'flashcards'].includes(options.kind) || !uuidPattern.test(options.lesson))
  ) {
    throw new Error('--lesson requires Lessons/Questions/Flashcards and a canonical UUID');
  }
  if (options.course && (options.kind !== 'courses' || !uuidPattern.test(options.course))) {
    throw new Error('--course requires Courses and a canonical UUID');
  }
  if (options.locale && !/^[a-z]{2,4}$/.test(options.locale)) throw new Error('Invalid language code');
  if (options.kind === 'flashcards' && (!options.lesson || !options.locale)) {
    throw new Error('Flashcard review requires exactly one --lesson UUID and --locale code');
  }
  return options;
}

function checkTextbook(options) {
  if (!options.package) return;
  const directory = path.join(root, options.package);
  const target = path.join(
    directory,
    options.kind === 'skills' ? 'data/skills' : options.kind === 'courses' ? 'data/courses' : 'data/lessons',
  );
  for (const location of [directory, target]) {
    if (!fs.existsSync(location) || !fs.statSync(location).isDirectory() || fs.lstatSync(location).isSymbolicLink()) {
      throw new Error('Missing or unsafe requested textbook directory: ' + location);
    }
  }
}

function sourceCommit() {
  const info = spawnSync('git', ['log', '-1', '--format=%H', '--', '.', ':(exclude).agent-ci-artifacts/**'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (info.status !== 0 || !/^[0-9a-f]{40}$/.test(info.stdout.trim())) throw new Error('Cannot determine source SHA');
  return info.stdout.trim();
}

function sourceHead() {
  const info = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' });
  if (info.status !== 0 || !/^[0-9a-f]{40}$/.test(info.stdout.trim())) {
    throw new Error('Cannot determine reviewed source HEAD');
  }
  return info.stdout.trim();
}

export function fixTaxonomyLinks(markdown, book, destination) {
  const original = path.join(root, 'content', book, 'docs/generated/skills');
  const sourceRoot = path.join(root, 'content', book, 'data/skills') + path.sep;
  return markdown.replace(/\[([^\]\n]+\.ts)\]\(([^)\n]+)\)/g, (_, label, value) => {
    const resolved = path.resolve(original, decodeURI(value));
    if (!resolved.startsWith(sourceRoot) || path.basename(resolved) !== label) {
      throw new Error('Unsafe canonical taxonomy link: ' + value);
    }
    return (
      '[' + label + '](' + encodeURI(path.relative(path.dirname(destination), resolved).split(path.sep).join('/')) + ')'
    );
  });
}

export async function generate(options) {
  checkTextbook(options);
  const registered = readSupportedLanguageCodes(root);
  if (options.locale && !registered.includes(options.locale)) {
    throw new Error('Unsupported language: ' + options.locale);
  }
  const languages = options.locale ? [options.locale] : registered;
  const manifest = {
    schemaVersion: 3,
    kind: 'pr-scoped-agent-ci-artifacts',
    sourceCommit: options.kind === 'questions' ? sourceHead() : sourceCommit(),
    scope: {
      kind: options.kind,
      package: options.package ?? null,
      locale: options.locale ?? null,
      component: options.component ?? null,
      lesson: options.lesson ?? null,
      course: options.course ?? null,
    },
    packages: options.package ? [options.package] : [],
    locales: options.locale ? [options.locale] : [],
    generated: [],
    failures: [],
  };
  // Replace only reference documents; Lesson lookup and coverage diagnostics have separate owners.
  // Do not let a local generator invocation destroy their PR-scoped handoffs.
  if (fs.existsSync(output)) {
    if (fs.lstatSync(output).isSymbolicLink() || !fs.lstatSync(output).isDirectory()) {
      throw new Error('Unsafe Agent CI Artifacts root');
    }
    for (const entry of fs.readdirSync(output, { withFileTypes: true })) {
      if (['lesson-lookup', 'engine-coverage'].includes(entry.name)) {
        if (!entry.isDirectory() || entry.isSymbolicLink()) {
          throw new Error('Unsafe diagnostic artifact directory: ' + entry.name);
        }
        continue;
      }
      fs.rmSync(path.join(output, entry.name), { recursive: true, force: true });
    }
  } else {
    fs.mkdirSync(output, { recursive: true });
  }
  const saveManifest = () =>
    fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  saveManifest();

  if (options.kind === 'skills') {
    const book = options.package.slice('content/'.length);
    const generator = path.join(root, 'shared/engine/scripts/generateSkillsTaxonomy/generate-skills-taxonomy.mjs');
    for (const locale of languages) {
      const result = spawnSync(
        process.execPath,
        [generator, '--package', options.package, '--locale', locale, '--stdout', '--allow-missing'],
        { cwd: root, encoding: 'utf8', timeout: 180_000, maxBuffer: 32 * 1024 * 1024 },
      );
      try {
        if (
          result.error ||
          result.status !== 0 ||
          !result.stdout?.startsWith('<!-- GENERATED FROM CODE; DO NOT EDIT. -->')
        ) {
          throw new Error(result.error?.message || result.stderr || 'Empty/invalid taxonomy reference');
        }
        const relative = 'taxonomies/' + book + '/' + locale + '.md';
        const destination = path.join(output, relative);
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        const markdown = fixTaxonomyLinks(result.stdout, book, destination);
        const count = label => Number(markdown.match(new RegExp('^' + label + ': (\\d+)$', 'm'))?.[1]);
        const missing = count('Missing translations');
        if (!Number.isSafeInteger(missing) || missing < 0) throw new Error('Missing translation coverage metadata');
        fs.writeFileSync(destination, markdown);
        manifest.generated.push({
          kind: 'taxonomy',
          textbook: options.package,
          locale,
          path: '.agent-ci-artifacts/' + relative,
          domains: count('Domains'),
          groups: count('Groups'),
          skills: count('Skills'),
          missing,
          reviewReady: missing === 0,
        });
        process.stdout.write('Generated ' + relative + '\n');
      } catch (error) {
        const message = String(error.message || error).slice(0, 1500);
        manifest.failures.push({ kind: 'taxonomy', textbook: options.package, locale, error: message });
        process.stderr.write('::warning::Skills ' + book + '/' + locale + ': ' + message.replace(/\n/g, ' ') + '\n');
      }
      saveManifest();
    }
  } else if (options.kind === 'lessons') {
    const { generateLessonReviewArtifacts } =
      await import('../../shared/engine/scripts/generateLessonReviewArtifacts/generate-lesson-review-artifacts.mjs');
    generateLessonReviewArtifacts({
      root,
      output,
      manifest,
      saveManifest,
      packageName: options.package,
      lessonId: options.lesson,
      languages: options.locale ? languages : null,
      supportedLanguages: registered,
    });
  } else if (options.kind === 'questions') {
    const { generateQuestionReviewArtifacts } =
      await import('../../shared/engine/scripts/generateQuestionReviewArtifacts/generate-question-review-artifacts.mjs');
    generateQuestionReviewArtifacts({
      root,
      output,
      manifest,
      saveManifest,
      packageName: options.package,
      lessonId: options.lesson,
      languages,
    });
  } else if (options.kind === 'flashcards') {
    const { generateFlashcardReviewArtifacts } =
      await import('../../shared/engine/scripts/generateFlashcardReviewArtifacts/generate-flashcard-review-artifacts.mjs');
    generateFlashcardReviewArtifacts({
      root,
      output,
      manifest,
      saveManifest,
      packageName: options.package,
      lessonId: options.lesson,
      languages,
    });
  } else if (options.kind === 'courses') {
    const { generateCourseReviewArtifacts } =
      await import('../../shared/engine/scripts/generateCourseReviewArtifacts/generate-course-review-artifacts.mjs');
    await generateCourseReviewArtifacts({
      root,
      output,
      manifest,
      saveManifest,
      packageName: options.package,
      courseId: options.course,
      languages: options.locale ? languages : null,
      supportedLanguages: registered,
    });
  } else if (options.kind === 'assessment-methods') {
    const { generateAssessmentMethodsReviewArtifacts } =
      await import('../../shared/ui-kit/scripts/generateAssessmentMethodsReference/generate-assessment-methods-reference.mjs');
    generateAssessmentMethodsReviewArtifacts({ root, output, languages, manifest, saveManifest, allowMissing: true });
  } else if (options.kind === 'ui-kit') {
    const { uiKitComponents, generateUiKitLocaleReviewArtifacts } =
      await import('../../shared/ui-kit/scripts/generateUiKitLocaleReference/generate-ui-kit-locale-reference.mjs');
    const components = options.component ? [options.component] : uiKitComponents(root);
    const available = uiKitComponents(root);
    if (components.some(component => !available.includes(component))) {
      throw new Error('Unknown UI Kit dictionary: ' + options.component);
    }
    generateUiKitLocaleReviewArtifacts({
      root,
      output,
      languages,
      manifest,
      saveManifest,
      allowMissing: true,
      components,
    });
  } else if (options.kind === 'education-standards') {
    const { generateEducationStandardReviewArtifacts } = await import('./education-standards-reference.mjs');
    generateEducationStandardReviewArtifacts({
      root,
      output,
      languages,
      registered,
      manifest,
      saveManifest,
    });
  } else if (options.kind === 'geography-home-copy') {
    const { generateHomeCopyReviewArtifacts } =
      await import('../../content/geography/scripts/generateHomeCopyReference/generate-home-copy-reference.mjs');
    generateHomeCopyReviewArtifacts({ root, output, languages, manifest, saveManifest, allowMissing: true });
  }

  manifest.locales = [
    ...new Set([
      ...manifest.generated.map(item => item.locale).filter(Boolean),
      ...manifest.failures.map(item => item.locale).filter(Boolean),
    ]),
  ].sort();
  manifest.summary = {
    documents: manifest.generated.length,
    failures: manifest.failures.length,
    missingTranslations: manifest.generated.reduce((sum, item) => sum + (item.missing ?? 0), 0),
    incompleteDocuments: manifest.generated.filter(item => item.reviewReady === false).length,
    taxonomyDocuments: manifest.generated.filter(item => item.kind === 'taxonomy').length,
    lessonDocuments: manifest.generated.filter(item => item.kind === 'lesson').length,
    questionDocuments: manifest.generated.filter(item => item.kind === 'question').length,
    flashcardDocuments: manifest.generated.filter(item => item.kind === 'flashcard').length,
    courseDocuments: manifest.generated.filter(item => item.kind === 'course').length,
    assessmentMethodDocuments: manifest.generated.filter(item => item.kind === 'assessment-method').length,
    uiKitDocuments: manifest.generated.filter(item => item.kind === 'ui-kit-locale').length,
    geographyHomeCopyDocuments: manifest.generated.filter(item => item.kind === 'geography-home-copy').length,
    educationStandardDocuments: manifest.generated.filter(item => item.kind === 'education-standard').length,
  };
  saveManifest();
  if (options.kind === 'questions' && manifest.failures.length) {
    throw new Error('Incomplete Question/Quiz references: ' + manifest.failures.length + ' failed documents.');
  }
  if (manifest.generated.length === 0) {
    throw new Error('No requested Markdown was generated. Inspect .agent-ci-artifacts/manifest.json failures.');
  }
  process.stdout.write(
    'Generated ' +
      manifest.generated.length +
      ' requested documents, ' +
      manifest.failures.length +
      ' failures; source ' +
      manifest.sourceCommit +
      '\n',
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await generate(parseArguments(process.argv.slice(2)));
  } catch (error) {
    process.stderr.write('Agent Markdown generation: ' + (error.message || String(error)) + '\n');
    process.exitCode = 1;
  }
}
