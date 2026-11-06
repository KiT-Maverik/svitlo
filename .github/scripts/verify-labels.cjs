'use strict';

// Lightweight CI guard: check label taxonomy, path coverage, and auto-labeler parity.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const labels = JSON.parse(fs.readFileSync(path.join(root, '.github/labels.json'), 'utf8'));
const matcher = fs.readFileSync(path.join(root, '.github/labeler.yml'), 'utf8');
assert.ok(Array.isArray(labels) && labels.length > 0, 'Label catalogue must not be empty');
const names = new Set();
for (const { name, color, description } of labels) {
  assert.ok(typeof name === 'string' && name.includes(': '), 'Malformed label name');
  assert.ok(!names.has(name.toLowerCase()), 'Duplicate label: ' + name);
  assert.match(color, /^[0-9a-f]{6}$/i, 'Invalid color: ' + name);
  assert.ok(description && description.length <= 100, 'Invalid description: ' + name);
  names.add(name.toLowerCase());
}
assert.ok(names.has('area: repo'), 'Missing fallback area: repo');
const ruleNames = [...matcher.matchAll(/^'([^']+)':\s*$/gm)].map(match => match[1]);
const scopeLabels = labels.filter(label =>
  /^(area|content|app|backend): /.test(label.name) && label.name !== 'area: repo'
);
for (const label of scopeLabels) {
  assert.ok(ruleNames.includes(label.name), 'Missing auto-labeler rule: ' + label.name);
}
for (const name of ruleNames) {
  assert.ok(names.has(name.toLowerCase()), 'Auto-labeler references undefined label: ' + name);
}
assert.equal(ruleNames.length, new Set(ruleNames).size, 'Duplicate auto-labeler rule');
const scope = (prefix, dir) => {
  if (!fs.existsSync(path.join(root, dir))) return;
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = prefix + ': ' + entry.name;
    assert.ok(names.has(name), 'Missing label for ' + dir + '/' + entry.name + '/: ' + name);
    assert.ok(
      matcher.includes("'" + name + "':") &&
      matcher.includes("'" + dir + '/' + entry.name + '/**'"),
      'Missing path rule for ' + name
    );
  }
};
scope('content', 'content');
scope('app', 'apps');
scope('backend', 'backend');
for (const name of ['adapters', 'contracts', 'engine', 'indexdb', 'ui-kit']) {
  if (fs.existsSync(path.join(root, 'shared', name))) {
    assert.ok(names.has('area: ' + name), 'Missing shared package area: ' + name);
  }
}
assert.ok(matcher.includes("'frontend/platform/**'"), 'Legacy platform path must be supported');
console.log('Validated ' + labels.length + ' label definitions and ' +
  ruleNames.length + ' auto-labeler rules');
