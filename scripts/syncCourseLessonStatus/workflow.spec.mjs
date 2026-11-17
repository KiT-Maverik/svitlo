import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const file = fileURLToPath(new URL('../../.github/workflows/sync-course-lessons.yml', import.meta.url));
const contents = fs.readFileSync(file, 'utf8');
const workflow = YAML.parse(contents);

test('Course status synchronization isolates read-only analysis and trusted write', () => {
  assert.ok(workflow.on.pull_request_target.types.includes('closed'));
  assert.ok(workflow.on.issue_comment.types.includes('created'));
  assert.deepEqual(workflow.permissions, {});
  assert.equal(workflow.jobs.analyze.permissions['pull-requests'], 'read');
  assert.equal(workflow.jobs.update.permissions['pull-requests'], 'write');
  assert.equal(workflow.jobs.update.concurrency['cancel-in-progress'], false);
  const checkouts = workflow.jobs.analyze.steps.filter(step => step.uses === 'actions/checkout@v4');
  assert.equal(checkouts.length, 2);
  assert.ok(checkouts.every(step => step.with['persist-credentials'] === false));
  assert.equal(workflow.jobs.update.steps.filter(step => step.uses === 'actions/checkout@v4').length, 1);
  assert.ok(contents.includes("github.actor != 'github-actions[bot]'"));
  assert.ok(!contents.includes('contents: write'));
  assert.ok(!contents.includes('git push'));
});
