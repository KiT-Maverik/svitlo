import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../..', import.meta.url));
const workflow = name => readFileSync(new URL('../../../.github/workflows/' + name, import.meta.url), 'utf8');

test('required statuses remain present and are not skipped for Draft PRs', () => {
  const fast = workflow('fast-gate.yml');
  const content = workflow('content-build.yml');
  assert.match(fast, /name: FastGate \/ verify/);
  assert.match(content, /name: Affected content \/ build, taxonomy and packaging/);
  assert.match(content, /verify:\n[\s\S]*?if: always\(\)/);
  assert.match(fast, /types: \[opened, reopened, synchronize, ready_for_review\]/);
  assert.match(fast, /Verify Draft\/Ready CI policy without npm installation/);
  assert.match(content, /types: \[opened, synchronize, reopened, ready_for_review\]/);
});

test('FastGate keeps cheap Draft guards but defers every expensive step', () => {
  const fast = workflow('fast-gate.yml');
  assert.match(fast, /Refuse temporary agent artifacts in an integration-bound PR/);
  assert.match(fast, /Validate GitHub label catalogue/);
  const guard =
    "if: steps.scope.outputs.run == 'true' && (github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft)";
  assert.equal(fast.split(guard).length - 1, 4);
  assert.match(
    fast,
    /if: github.event_name == 'pull_request' && !github.event.pull_request.draft && steps.scope.outputs.run == 'true'/,
  );
  assert.match(fast, /if: github.event_name == 'workflow_dispatch' && steps.scope.outputs.run == 'true'/);
  assert.match(fast, /Draft PR - expensive package builds and typechecks are deferred/);
});

test('heavy PR suites run on Ready transition and can run manually on Draft branches', () => {
  for (const [file, job] of [
    ['engine-generators.yml', 'generator-tests'],
    ['contentblock-build-api.yml', 'verify'],
    ['db-controllers-e2e.yml', 'browser-controllers'],
    ['desktop-ci.yml', 'desktop'],
  ]) {
    const yaml = workflow(file);
    assert.match(yaml, /types: \[opened, reopened, synchronize, ready_for_review\]/, file);
    assert.match(yaml, /\n  workflow_dispatch:/, file);
    assert.ok(
      yaml.includes(
        '  ' +
          job +
          ":\n    # Full host/browser/generator suites only at review boundary or explicitly on demand.\n    if: github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft",
      ),
      file + ' must guard its expensive job while permitting manual runs',
    );
  }
});

test('mobile and production already require Ready and preserve manual diagnostics', () => {
  for (const file of ['mobile.yml', 'questions.yml']) {
    const yaml = workflow(file);
    assert.match(yaml, /ready_for_review/, file);
    assert.match(yaml, /workflow_dispatch:/, file);
    assert.match(yaml, /!github.event.pull_request.draft/, file);
  }
  assert.ok(root.endsWith('/'));
});

test('PR auto-formatter fixes only development PRs, never protected release sources', () => {
  const formatter = workflow('pr-auto-format.yml');
  assert.match(formatter, /branches: \[develop\]/);
  assert.doesNotMatch(formatter, /branches: \[main, develop\]/);
  assert.match(formatter, /name: Auto-fix changed PR files/);
  assert.match(formatter, /prettier --write --log-level warn/);
  assert.match(formatter, /github\.event\.pull_request\.head\.ref != 'develop'/);
  assert.match(formatter, /github\.event\.pull_request\.head\.ref != 'main'/);
  assert.match(formatter, /PR Auto-format \/ check' \|\| 'PR Auto-format \/ fix'/);
  assert.match(formatter, /name: Independently check formatting on the latest commit/);
  assert.match(formatter, /prettier --check --log-level warn/);
});

test('PR artifact auto-cleanup excludes protected production promotion without weakening guard', () => {
  const cleanup = workflow('translation-review.yml');
  const guard = workflow('agent-ci-artifacts-guard.yml');
  assert.match(cleanup, /branches: \[develop, integration-branch, new-lesson, integration\/italian-localization\]/);
  assert.match(cleanup, /github\.event\.pull_request\.head\.ref != github\.event\.repository\.default_branch/);
  assert.match(cleanup, /github\.event\.pull_request\.head\.ref != 'main'/);
  assert.match(guard, /branches: \[main, develop, integration-branch, new-lesson, integration\/italian-localization\]/);
  assert.match(guard, /name: Agent CI Artifacts \/ clean/);
});

test('Desktop bundle assertions execute after production builds, not in root npm test', () => {
  const scripts = JSON.parse(
    readFileSync(new URL('../../../apps/desktop/package.json', import.meta.url), 'utf8'),
  ).scripts;
  assert.equal(scripts.test, 'node --test tests/engine-runtime-imports.spec.mjs');
  assert.equal(scripts['test:integration'], 'node --test tests/packaged-content.spec.mjs');

  const quality = workflow('questions.yml');
  const build = quality.indexOf('npm run app:build');
  const integration = quality.indexOf('npm run test:integration --workspace @svitlo/desktop');
  assert.ok(build !== -1 && integration > build, 'Desktop bundle test must follow production app builds');

  const desktop = workflow('desktop-ci.yml');
  assert.match(desktop, /npm run test --workspace @svitlo\/desktop/);
  assert.match(desktop, /npm run test:integration --workspace @svitlo\/desktop/);
});
