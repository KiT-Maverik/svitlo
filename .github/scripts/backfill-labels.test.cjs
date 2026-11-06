'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const backfill = require('./backfill-labels.cjs');

test('historical backfill resolves all scoped paths and preserves existing scopes', async () => {
  const pulls = [
    {
      number: 101,
      title: 'Update lesson and web application',
      head: { ref: 'update-lesson' },
      base: { ref: 'main' },
      labels: [],
      files: ['content/math/data/lessons/example.ts', 'apps/web/src/app.ts', 'shared/adapters/src/index.ts'],
    },
    {
      number: 102,
      title: 'Move platform',
      head: { ref: 'move-platform' },
      base: { ref: 'main' },
      labels: [{ name: 'repo: general' }],
      files: ['frontend/platform/src/app.ts', 'apps/platform/src/app.ts'],
    },
    {
      number: 103,
      title: 'Update server',
      head: { ref: 'update-server' },
      base: { ref: 'main' },
      labels: [],
      files: ['backend/server/src/index.ts'],
    },
    {
      number: 104,
      title: 'Repository configuration',
      head: { ref: 'update-config' },
      base: { ref: 'main' },
      labels: [],
      files: ['.github/workflows/fast-gate.yml'],
    },
    {
      number: 105,
      title: 'Update tooling scripts',
      head: { ref: 'scripts-update' },
      base: { ref: 'main' },
      labels: [],
      files: ['scripts/check-workspaces.mjs'],
    },
    {
      number: 106,
      title: 'Update studio guidance',
      head: { ref: 'studio-guidance' },
      base: { ref: 'main' },
      labels: [],
      files: ['studio/rules/github-labels-and-naming.md'],
    },
  ];
  const issues = [
    { number: 201, title: '[Chemistry] Review skills', body: '', labels: [], user: { login: 'KiT-Maverik' } },
    { number: 202, title: '[Health & Safety] Review skills', body: '', labels: [], user: { login: 'external' } },
    {
      number: 203,
      title: 'Check native build',
      body: 'apps/mobile/src/main.ts should work',
      labels: [],
      user: { login: 'external' },
    },
    {
      number: 204,
      title: 'Clarify assessment',
      body: '',
      labels: [{ name: 'shared: engine' }],
      user: { login: 'external' },
    },
  ];
  const added = new Map();
  const removed = [];
  const rest = {
    pulls: { list() {}, listFiles() {} },
    issues: {
      listForRepo() {},
      async addLabels({ issue_number, labels }) {
        added.set(issue_number, [...(added.get(issue_number) || []), ...labels]);
      },
      async removeLabel({ issue_number, name }) {
        removed.push({ issue_number, name });
      },
    },
  };
  const github = {
    rest,
    async paginate(endpoint, options) {
      if (endpoint === rest.pulls.list) return pulls;
      if (endpoint === rest.issues.listForRepo) return issues;
      if (endpoint === rest.pulls.listFiles) {
        return pulls.find(pr => pr.number === options.pull_number).files.map(filename => ({ filename }));
      }
      throw new Error('Unexpected GitHub pagination');
    },
  };
  await backfill({
    github,
    context: { repo: { owner: 'KiT-Maverik', repo: 'svitlo-web' } },
    core: {
      info() {},
      error(message) {
        throw new Error(message);
      },
    },
    shard: 0,
    shards: 1,
  });
  const contains = (number, label) =>
    assert.ok((added.get(number) || []).includes(label), 'Missing ' + label + ' on #' + number);
  for (const label of ['content: math', 'app: web', 'shared: adapters']) contains(101, label);
  contains(102, 'app: platform');
  contains(103, 'backend: server');
  contains(104, 'repo: general');
  contains(105, 'repo: scripts');
  contains(106, 'studio');
  contains(201, 'content: chemistry');
  contains(202, 'content: health-safety');
  contains(203, 'app: mobile');
  assert.ok(removed.some(entry => entry.issue_number === 102 && entry.name === 'repo: general'));
  assert.ok(!(added.get(204) || []).includes('repo: general'), 'Existing scope must suppress fallback');
});
