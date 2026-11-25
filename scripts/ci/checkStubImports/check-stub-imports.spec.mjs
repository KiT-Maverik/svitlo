import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { test } from 'node:test';

import { addedLines, main, scanReferences } from './check-stub-imports.mjs';

const factories = 'shared/engine/configurators/courses/defineCourseChildStubs/defineCourseChildStubs.ts';

function withRepo(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-stub-source-'));
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  const put = (file, body) => {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, body);
  };
  const commit = () => {
    git('add', '-A');
    git('commit', '-qm', 'Fixture');
    return git('rev-parse', 'HEAD');
  };
  try {
    git('init', '-q');
    git('config', 'user.name', 'Test');
    git('config', 'user.email', 'test@example.test');
    put(
      factories,
      [
        'export const defineLessonStub = () => 1;',
        'export const defineEpisodeStub = () => 2;',
        'export const defineAssessmentStub = () => 3;',
        '',
      ].join('\n'),
    );
    put(
      'shared/engine/build.ts',
      "export * from './configurators/courses/defineCourseChildStubs/defineCourseChildStubs';\n",
    );
    run({ root, git, put, commit });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('detects aliases, namespace exports and indirect static re-exports', () => {
  withRepo(({ root, put, commit }) => {
    const base = commit();
    put('content/demo/adapter.ts', "export { defineAssessmentStub as saved } from '@svitlo/engine/build';\n");
    put(
      'content/demo/use.ts',
      [
        "import { defineLessonStub as quick } from '@svitlo/engine/build';",
        "import * as engine from '@svitlo/engine/build';",
        "import { saved as assessment } from './adapter';",
        'export const a = quick();',
        'export const b = engine.defineEpisodeStub();',
        'export const c = assessment();',
        '',
      ].join('\n'),
    );
    const head = commit();
    const hits = scanReferences(root, addedLines(root, base, head));
    for (const line of [1, 4, 5, 6]) {
      assert.ok(
        hits.some(x => x.file === 'content/demo/use.ts' && x.line === line),
        'missing line ' + line,
      );
    }
    const errors = [];
    const report = console.error;
    console.error = text => errors.push(text);
    try {
      assert.throws(() => main([base, head], root), /forbidden/);
      assert.ok(errors.some(e => /content\/demo\/use.ts/.test(e)));
    } finally {
      console.error = report;
    }
  });
});

test('detects a new use of a preexisting imported factory alias', () => {
  withRepo(({ root, put, commit }) => {
    put(
      'content/demo/keep.ts',
      "import { defineEpisodeStub as create } from '@svitlo/engine/build';\nconst older = create;\n",
    );
    const base = commit();
    put(
      'content/demo/keep.ts',
      "import { defineEpisodeStub as create } from '@svitlo/engine/build';\nconst older = create;\nexport const newlyAdded = older();\n",
    );
    const head = commit();
    assert.ok(scanReferences(root, addedLines(root, base, head)).some(x => x.line === 3));
  });
});

test('ignores comments, strings, unrelated same-name functions and historical untouched files', () => {
  withRepo(({ root, put, commit }) => {
    put('content/demo/old.ts', "import { defineLessonStub } from '@svitlo/engine/build';\n");
    const base = commit();
    put(
      'content/demo/new.ts',
      [
        '// defineLessonStub()',
        'const plain = "defineEpisodeStub()";',
        'const defineLessonStub = () => true;',
        'export const allowed = defineLessonStub();',
        '',
      ].join('\n'),
    );
    const head = commit();
    assert.deepEqual(scanReferences(root, addedLines(root, base, head)), []);
    assert.doesNotThrow(() => main([base, head], root));
  });
});

test('does not treat rename-only historical references as new imports', () => {
  withRepo(({ root, put, commit, git }) => {
    put('content/demo/old.ts', "import { defineAssessmentStub } from '@svitlo/engine/build';\n");
    const base = commit();
    git('mv', 'content/demo/old.ts', 'content/demo/renamed.ts');
    const head = commit();
    assert.deepEqual(scanReferences(root, addedLines(root, base, head)), []);
  });
});
