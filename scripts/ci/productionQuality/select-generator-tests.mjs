#!/usr/bin/env node
/**
 * @fileoverview Execute authoritative Engine generator test files.
 * A Production Quality call can omit files also selected by its mandatory
 * exhaustive root Engine npm test; the final gate must require BOTH jobs.
 * Never shares compiled outputs, changes npm hooks or skips security jobs.
 */
import { spawnSync } from 'node:child_process';
import { globSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(fileURLToPath(new URL('../../..', import.meta.url)));

// Authoritative targeted generator suites; retire a selector when its last owned test is removed.
export const generatorSelectors = Object.freeze([
  'shared/engine/.test-build/generators/lessons/*.spec.js',
  'shared/engine/generators/courses/publishCourseData.spec.mjs',
  'shared/engine/generators/skills/publishSkillTree.spec.mjs',
  'shared/engine/scripts/generateSkills/prepareSkillsPublication.spec.mjs',
  'shared/engine/scripts/generateLessonProps/generateLessonProps.spec.mjs',
  'shared/engine/scripts/generateCourseProps/generateCourseProps.spec.mjs',
  'shared/engine/.test-build/assemblers/assembleCourseLesson/assembleCourseTree.spec.js',
  'shared/engine/.test-build/assemblers/courseToc/*.spec.js',
  'shared/engine/scripts/generateCourseReviewArtifacts/generate-course-review-artifacts.spec.mjs',
  'shared/engine/scripts/generatorCliIntegration/generatorCliIntegration.spec.mjs',
  'shared/engine/scripts/sceneScaffolding/sceneScaffolding.spec.mjs',
  'shared/engine/scripts/generateQuestionReviewArtifacts/*.spec.mjs',
  'shared/engine/scripts/generateFlashcardReviewArtifacts/generate-flashcard-review-artifacts.spec.mjs',
  'scripts/generateTranslationReviewArtifacts/agent-reference-command.spec.mjs',
  'scripts/generateTranslationReviewArtifacts/education-standards-reference.spec.mjs',
  'scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.spec.mjs',
  'shared/engine/scripts/generateLessonReviewArtifacts/generate-lesson-review-artifacts.spec.mjs',
  'shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.spec.mjs',
  'shared/engine/scripts/generateAssessmentResources/generateAssessmentResources.spec.mjs',
  'shared/engine/scripts/loadAuthoredConfigurators/resolveMaterializedEntrypoint.spec.mjs',
  'shared/engine/scripts/loadAuthoredConfigurators/typedEditorialDrafts.spec.mjs',
  'shared/engine/generators/materializers/course/*.spec.mjs',
  'shared/engine/generators/materializers/module/*.spec.mjs',
  'shared/engine/generators/materializers/chapter/*.spec.mjs',
  'shared/engine/.test-build/generators/materializers/directMaterialization/*.spec.js',
  'shared/engine/.test-build/generators/materializers/lesson/*.spec.js',
  'shared/engine/.test-build/generators/materializers/scene/*.spec.js',
  'shared/engine/.test-build/generators/materializers/episode/*.spec.js',
  'shared/engine/.test-build/generators/materializers/questStage/*.spec.js',
  'shared/engine/.test-build/generators/materializers/questTask/*.spec.js',
  'scripts/textbook-tooling/generateScenes/generate-scenes.spec.mjs',
  'shared/engine/.test-build/generators/materializers/bankSource/*.spec.js',
  'scripts/textbook-tooling/verifyAssessmentSelections/verifyAssessmentSelections.spec.mjs',
  'scripts/textbook-tooling/buildTextbook/stageTextbookAssets.spec.mjs',
]);

/** Root Engine npm test must keep its exhaustive Node file selection. */
export function rootEngineTestSelectors(testScript) {
  if (typeof testScript !== 'string') throw new Error('Engine npm test command missing');
  const match =
    /^tsc -p tsconfig\.test\.json && node --test (.+?) && node \.\.\/\.\.\/scripts\/checkEngineRuntimeGraph\/check-engine-runtime-graph\.mjs && node --test /.exec(
      testScript,
    );
  if (!match) throw new Error('Engine npm test routing changed; refuse to skip generator tests');
  const paths = match[1]
    .trim()
    .split(/\s+/)
    .map(path => 'shared/engine/' + path);
  if (!paths.length) throw new Error('Empty Engine npm test selection');
  return paths;
}

function expand(root, selectors) {
  const files = new Set();
  for (const selector of selectors) {
    if (selector.startsWith('/') || selector.split('/').includes('..') || !/\.spec\.(?:js|mjs)$/.test(selector)) {
      throw new Error('Unsafe test selector: ' + selector);
    }
    const matches = globSync(selector, { cwd: root }).sort();
    if (!matches.length) throw new Error('No compiled tests for selector: ' + selector);
    for (const file of matches) files.add(file);
  }
  return [...files].sort();
}

/** Select actual compiled files, never infer deduplication from glob strings. */
export function planGeneratorTests({ root = repo, uniqueOnly = false, selectors = generatorSelectors } = {}) {
  const all = expand(root, selectors);
  if (!uniqueOnly) return { selected: all, coveredByUnit: [], all };
  const manifest = JSON.parse(readFileSync(join(root, 'shared/engine/package.json'), 'utf8'));
  const unitFiles = new Set(expand(root, rootEngineTestSelectors(manifest.scripts?.test)));
  const selected = all.filter(file => !unitFiles.has(file));
  const coveredByUnit = all.filter(file => unitFiles.has(file));
  if (!selected.length) throw new Error('Missing generator-only tests; refuse an empty production test selection');
  if (selected.length + coveredByUnit.length !== all.length) throw new Error('Generator test coverage mismatch');
  return { selected, coveredByUnit, all };
}

export function selectMode(value) {
  if (value === 'true') return true;
  if (value === '' || value === undefined || value === 'false') return false;
  throw new Error('Expected SVITLO_CI_ONLY_UNIQUE_GENERATOR_TESTS=true or false');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 2) throw new Error('Usage: select-generator-tests.mjs');
    const plan = planGeneratorTests({ uniqueOnly: selectMode(process.env.SVITLO_CI_ONLY_UNIQUE_GENERATOR_TESTS) });
    console.log(
      'Engine generator regression: executing ' +
        plan.selected.length +
        '/' +
        plan.all.length +
        ' files; ' +
        plan.coveredByUnit.length +
        ' covered by required root npm test',
    );
    const result = spawnSync(process.execPath, ['--test', '--test-reporter=dot', ...plan.selected], {
      cwd: repo,
      stdio: 'inherit',
    });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exitCode = result.status || 1;
  } catch (error) {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  }
}
