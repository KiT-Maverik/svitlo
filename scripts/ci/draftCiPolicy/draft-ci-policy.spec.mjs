import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../..', import.meta.url));
const workflow = name => readFileSync(new URL('../../../.github/workflows/' + name, import.meta.url), 'utf8');

test('required statuses remain present and are not skipped for Draft PRs', () => {
  const fast = workflow('fast-gate.yml');
  const content = workflow('content-build.yml');
  assert.match(fast, /name: FastGate \/ verify/);
  assert.match(content, /name: Affected content \/ build, taxonomy and packaging/);
  assert.match(content, /verify:\n[\s\S]*?if: always\(\)/);
  assert.match(fast, /types: \[opened, reopened, synchronize, ready_for_review, edited\]/);
  assert.match(fast, /Typecheck changed workspaces and public API consumers/);
  assert.match(content, /types: \[opened, synchronize, reopened, ready_for_review\]/);
});

test('FastGate limits Ready checks to TypeScript and defers installs for Drafts', () => {
  const fast = workflow('fast-gate.yml');
  const guard =
    "if: steps.reuse.outputs.reuse != 'true' && steps.scope.outputs.run == 'true' && (github.event_name == 'workflow_dispatch' || !github.event.pull_request.draft)";
  assert.equal(fast.split(guard).length - 1, 2);
  assert.match(
    fast,
    /if: steps.reuse.outputs.reuse != 'true' && github.event_name == 'pull_request' && !github.event.pull_request.draft && steps.scope.outputs.run == 'true'/,
  );
  assert.match(fast, /if: github.event_name == 'workflow_dispatch' && steps.scope.outputs.run == 'true'/);
  assert.match(fast, /Draft PR - typechecks are deferred/);
  assert.doesNotMatch(fast, /node --test|test:coverage|test:components|app:build/);
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
  for (const file of ['mobile.yml', 'production-quality.yml']) {
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

test('on-demand agent report generation uses read-only Actions artifacts, without any clean guard', () => {
  const references = workflow('agent-ci-artifacts.yml');
  const oldGuard = new URL('../../../.github/workflows/agent-ci-artifacts-guard.yml', import.meta.url);
  assert.equal(existsSync(oldGuard), false, 'Obsolete check workflow must remain removed');
  assert.match(references, /issue_comment:/);
  assert.match(references, /actions\/upload-artifact@v6/);
  assert.match(references, /retention-days: 1/);
  assert.match(references, /persist-credentials: false/);
  assert.match(references, /SVITLO_AGENT_REPORT_OUTPUT/);
  assert.doesNotMatch(references, /\n  pull_request:|\n  publish:|\n  cleanup:|contents: write|git push/);
  assert.doesNotMatch(references, /\.agent-ci-artifacts\//);
});

test('Desktop bundle assertions execute after production builds, not in root npm test', () => {
  const scripts = JSON.parse(
    readFileSync(new URL('../../../apps/desktop/package.json', import.meta.url), 'utf8'),
  ).scripts;
  assert.equal(scripts.test, 'node --test tests/engine-runtime-imports.spec.mjs');
  assert.equal(scripts['test:integration'], 'node --test tests/packaged-content.spec.mjs');

  const quality = workflow('production-quality.yml');
  const build = quality.indexOf('npm run app:build --workspace "$APP_WORKSPACE"');
  const integration = quality.indexOf('npm run test:integration --workspace "$APP_WORKSPACE"');
  assert.ok(build !== -1 && integration > build, 'Desktop bundle test must follow its app build');
  assert.match(quality, /if: matrix.integration/);
  // Matrix discovery assigns this gate only to apps declaring test:integration.
  assert.match(quality, /plan-app-matrix\.mjs/);

  const desktop = workflow('desktop-ci.yml');
  assert.match(desktop, /npm run test --workspace @svitlo\/desktop/);
  assert.match(desktop, /npm run test:integration --workspace @svitlo\/desktop/);
});
