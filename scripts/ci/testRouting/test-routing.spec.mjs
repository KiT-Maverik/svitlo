/**
 * @fileoverview Regressions for nested Ready PR test discovery, not a replacement
 * for GitHub Actions execution. Evaluate the actual YAML path filters against
 * representative changed paths, including negative selections, and confirm the
 * tests behind each route rather than asserting that a workflow file exists.
 * No publishing, network access, generated source, or workflow dispatch.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { matchesGlob, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const root = resolve(fileURLToPath(new URL('../../../', import.meta.url)));

function readWorkflow(name) {
  const source = readFileSync(resolve(root, '.github/workflows', name), 'utf8');
  const workflow = YAML.parse(source);
  const pullRequest = workflow.on?.pull_request;
  assert.ok(pullRequest, name + ' must have an automatic pull_request trigger');
  assert.ok(pullRequest.types.includes('ready_for_review'), name + ' must check the Ready transition');
  assert.ok(pullRequest.types.includes('synchronize'), name + ' must check new Ready commits');
  assert.equal(pullRequest.branches, undefined, name + ' must support nested integration parents');
  assert.ok(Array.isArray(pullRequest.paths), name + ' must have scoped source filters');
  return { workflow, paths: pullRequest.paths };
}

/** GitHub-style ordered positive/negative path evaluation for these simple globs. */
function selects(paths, relativePath) {
  let included = false;
  for (const pattern of paths) {
    const excluded = pattern.startsWith('!');
    if (matchesGlob(relativePath, excluded ? pattern.slice(1) : pattern)) {
      included = !excluded;
    }
  }
  return included;
}

function assertRoute(paths, source, owningPattern) {
  assert.equal(selects(paths, source), true, 'Unselected Ready source: ' + source);
  // A route that accidentally drops its owning positive glob must fail.
  assert.equal(
    selects(paths.filter(pattern => pattern !== owningPattern), source),
    false,
    'The trigger test does not detect loss of the required path pattern: ' + owningPattern,
  );
}

function commands(workflow) {
  return Object.values(workflow.jobs).flatMap(job => job.steps ?? []).map(step => step.run ?? '').join('\n');
}

test('ordinary Web-only changes select real negative-selection, component and publication regressions', () => {
  const { workflow, paths } = readWorkflow('web-host-tests.yml');
  for (const source of [
    'apps/web/scripts/prepareTextbook/prepare-textbook.mjs',
    'apps/web/scripts/prepareAppAssets/prepare-app-assets.mjs',
    'apps/web/src/components/layout/LearningLayout/LearningLayout.tsx',
    'apps/web/vitest.config.ts',
    'apps/web/package.json',
  ]) {
    assertRoute(paths, source, 'apps/web/**');
  }
  for (const source of [
    'apps/web/src/app/en/course/lesson/page.tsx',
    'apps/web/src/lib/courseNavigation.ts',
    'apps/web/scripts/buildTestContent/build.mjs',
    'apps/mobile/src/App.tsx',
    'shared/engine/configurators/lessons/defineLesson/defineLesson.ts',
  ]) {
    assert.equal(selects(paths, source), false, 'Unnecessary ordinary Web run: ' + source);
  }

  const course = readWorkflow('course-navigation-web.yml');
  for (const source of [
    'apps/web/src/app/en/course/lesson/page.tsx',
    'apps/web/src/lib/courseNavigation.ts',
    'apps/web/scripts/buildTestContent/build.mjs',
  ]) assert.equal(selects(course.paths, source), true, 'Lost existing Course route: ' + source);

  const script = commands(workflow);
  assert.match(script, /npm run test:components --workspace @svitlo\/web/);
  assert.match(script, /npm run test:integration --workspace @svitlo\/web/);
  assert.doesNotMatch(script, /test:e2e|playwright install|npm run app:build/, 'Do not invoke Course browsers for unrelated edits');
  assert.match(String(workflow.jobs.tests.if), /!github\.event\.pull_request\.draft/);
  assert.match(String(workflow.jobs.tests.if), /base\.ref != 'main'/);
  assert.equal(workflow.jobs.tests.env.SVITLO_WEB_TEST_SELECTION, 'web-fixture-alpha');

  const manifest = JSON.parse(readFileSync(resolve(root, 'apps/web/package.json'), 'utf8'));
  assert.match(manifest.scripts['test:components'], /npm run test:unit:selection && vitest run/);
  assert.match(manifest.scripts['test:unit:selection'], /prepare-textbook\.spec\.mjs/);
  assert.match(manifest.scripts['test:unit:selection'], /prepare-app-assets\.spec\.mjs/);
});

test('UI Kit Ready tests run on direct Engine assessment, standard and language contract edits', () => {
  const { workflow, paths } = readWorkflow('ui-kit-tests.yml');
  const owners = [
    ['shared/engine/configurators/assessmentMethods/defineAssessmentMethod.schemas.ts', 'shared/engine/configurators/assessmentMethods/**'],
    ['shared/engine/configurators/educationStandards/defineEducationStandard/defineEducationStandard.schemas.ts', 'shared/engine/configurators/educationStandards/**'],
    ['shared/engine/configurators/questions/assessmentMethod.schemas.ts', 'shared/engine/configurators/questions/assessmentMethod.schemas.ts'],
    ['shared/engine/configurators/contentBlocks/contentBlock.schemas.ts', 'shared/engine/configurators/contentBlocks/contentBlock.schemas.ts'],
    ['shared/engine/schemas/languages.schemas.ts', 'shared/engine/schemas/languages.schemas.ts'],
    ['shared/engine/utils/languages/getLanguageCode/getLanguageCode.utils.ts', 'shared/engine/utils/languages/**'],
  ];
  for (const [source, pattern] of owners) assertRoute(paths, source, pattern);
  for (const unrelated of [
    'shared/engine/configurators/lessons/defineLesson/defineLesson.ts',
    'shared/engine/generators/materializers/sourceHelpers/sourceIdentifiers.mjs',
    'apps/web/src/app/page.tsx',
  ]) assert.equal(selects(paths, unrelated), false, 'Unnecessary UI Kit run: ' + unrelated);
  const steps = commands(workflow);
  assert.match(steps, /npm test --workspace @svitlo\/ui-kit/);
  assert.match(steps, /node --test scripts\/ci\/testRouting\/test-routing\.spec\.mjs/);
  assert.match(String(workflow.jobs.tests.if), /!github\.event\.pull_request\.draft/);
  assert.match(String(workflow.jobs.tests.if), /base\.ref != 'main'/);
});
