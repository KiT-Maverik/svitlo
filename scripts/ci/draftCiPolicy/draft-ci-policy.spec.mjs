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
  const guard = "if: steps.scope.outputs.run == 'true' && (github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft)";
  assert.equal(fast.split(guard).length - 1, 4);
  assert.match(fast, /if: github.event_name == 'pull_request' && !github.event.pull_request.draft && steps.scope.outputs.run == 'true'/);
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
      yaml.includes('  ' + job + ":\n    # Full host/browser/generator suites only at review boundary or explicitly on demand.\n    if: github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft"),
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
