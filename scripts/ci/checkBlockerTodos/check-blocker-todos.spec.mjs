import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { scanDiff, scanFull, scanSource, scanChanged, scanPendingReview, main } from './check-blocker-todos.mjs';
import { renderBlockerTodo, renderBlockerSpecification } from '../../../shared/engine/generators/materializers/renderBlockerTodo.mjs';

const blocker = '// ' + 'TODO (BLOCKER): Complete translations';
const ordinary = '// TODO: Refactor later';
const asset = '// TODO(asset): Replace file';

function git(root, ...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

function withRepo(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-blockers-'));
  try {
    git(root, 'init', '-q');
    git(root, 'config', 'user.name', 'Test');
    git(root, 'config', 'user.email', 'test@example.test');
    const put = (file, content) => {
      fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
      fs.writeFileSync(path.join(root, file), content);
    };
    const commit = () => {
      git(root, 'add', '-A');
      git(root, 'commit', '-qm', 'Fixture');
      return git(root, 'rev-parse', 'HEAD');
    };
    run({ root, put, commit, git: (...args) => git(root, ...args) });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('full scans tracked source and ignores ordinary TODOs, documentation and untracked files', () => {
  withRepo(({ root, put, commit }) => {
    put('content/math/constants.ts', "export const languages = ['en'];\n" + blocker + '\n');
    put('content/math/ordinary.ts', ordinary + '\n' + asset + '\n');
    put('README.md', blocker + '\n');
    commit();
    put('content/math/untracked.ts', blocker + '\n');
    assert.deepEqual(scanFull(root), [{ file: 'content/math/constants.ts', line: 2, text: blocker }]);
  });
});

test('diff ignores inherited blockers in touched files', () => {
  withRepo(({ root, put, commit }) => {
    put('content/astronomy/constants.ts', blocker + '\nexport const n = 1;\n');
    const base = commit();
    put('content/astronomy/constants.ts', blocker + '\nexport const n = 2;\n' + ordinary + '\n');
    const head = commit();
    assert.deepEqual(scanDiff(root, base, head), []);
    assert.deepEqual(scanFull(root), [{ file: 'content/astronomy/constants.ts', line: 1, text: blocker }]);
  });
});

test('diff catches added blockers and reports actual new line numbers', () => {
  withRepo(({ root, put, commit }) => {
    put('content/astronomy/constants.ts', 'const value = 1;\n');
    const base = commit();
    put('content/astronomy/constants.ts', 'const value = 1;\n' + ordinary + '\n' + blocker + '\n');
    const head = commit();
    assert.deepEqual(scanDiff(root, base, head), [{ file: 'content/astronomy/constants.ts', line: 3, text: blocker }]);
    const previous = console.error;
    const diagnostics = [];
    console.error = message => diagnostics.push(message);
    try {
      assert.throws(() => main(['diff', base, head], root), /unresolved TODO/);
      assert.match(diagnostics[0], /file=content\/astronomy\/constants.ts,line=3/);
    } finally {
      console.error = previous;
    }
  });
});

test('new YAML comments are caught; Markdown and nonblocking markers are ignored', () => {
  withRepo(({ root, put, commit }) => {
    put('initial.ts', ordinary + '\n');
    const base = commit();
    const yamlBlocker = '# ' + 'TODO (BLOCKER): Provide locale';
    put('lesson.yaml', yamlBlocker + '\n');
    put('notes.md', blocker + '\n');
    put('new.ts', ordinary + '\n' + asset + '\n');
    const head = commit();
    assert.deepEqual(scanDiff(root, base, head), [{ file: 'lesson.yaml', line: 1, text: yamlBlocker }]);
  });
});

test('renaming an unchanged file with an inherited blocker is not a new blocker', () => {
  withRepo(({ root, put, commit, git }) => {
    put('old.ts', blocker + '\n');
    const base = commit();
    git('mv', 'old.ts', 'new.ts');
    const head = commit();
    assert.deepEqual(scanDiff(root, base, head), []);
  });
});

test('the canonical marker includes a space and source comments', () => {
  withRepo(({ root, put, commit }) => {
    put(
      'source.ts',
      [
        '// TODO(BLOCKER): no space is not canonical',
        '// TODO (BLOCKER): yes',
        'const quoted = "' + blocker + '";',
        '/* TODO (BLOCKER): block comment */',
        '{/* TODO (BLOCKER): JSX comment */}',
      ].join('\n'),
    );
    commit();
    assert.deepEqual(
      scanFull(root).map(item => item.line),
      [2, 4, 5],
    );
  });
});

test('quoted JSX-like comment text does not trigger the repository-wide guard', () => {
  const faux = "'{/* " + "TODO (BLOCKER): fixture text */}',";
  assert.deepEqual(scanSource('scripts/ci/checkBlockerTodos/check-blocker-todos.spec.mjs', faux), []);
  assert.deepEqual(scanSource('source.ts', 'const code = ' + JSON.stringify(faux) + ';'), []);
  assert.deepEqual(
    scanSource('example.tsx', '{/* ' + 'TODO (BLOCKER): real JSX comment */}').map(x => x.line),
    [1],
  );
});

test('full and diff ignore string values while checking inline and multiline comments', () => {
  withRepo(({ root, put, commit }) => {
    const marker = 'TODO (BLOCKER):';
    put('a.ts', 'export const original = 1;\n');
    const base = commit();
    put(
      'a.ts',
      [
        'const fixture = "' + '/* ' + marker + ' documentation */" + "value";',
        'const template = ' + String.fromCharCode(96),
        '// ' + marker + ' inside template literal',
        String.fromCharCode(96) + ';',
        'export const updated = 2; // ' + marker + ' real inline comment',
        '/*',
        ' * ' + marker + ' real multiline comment',
        ' */',
        'const jsxString = "{/* ' + marker + ' fixture */}";',
      ].join('\n'),
    );
    const head = commit();
    assert.deepEqual(
      scanFull(root).map(x => x.line),
      [5, 7],
    );
    assert.deepEqual(
      scanDiff(root, base, head).map(x => x.line),
      [5, 7],
    );
  });
});

test('quoted YAML values are not comments, but actual YAML comments block', () => {
  const marker = 'TODO (BLOCKER):';
  assert.deepEqual(
    scanSource(
      'lesson.yaml',
      ['message: "# ' + marker + ' not a comment"', 'next: true # ' + marker + ' incomplete locale'].join('\n'),
    ).map(x => x.line),
    [2],
  );
});

test('CLI rejects invalid modes and shorthand commit refs', () => {
  assert.throws(() => main([]), /Usage/);
  assert.throws(() => main(['full', 'extra']), /Usage/);
  assert.throws(() => scanDiff('.', 'main', 'HEAD'), /40-character/);
});

test('the workflow checks authored draft Course/Lesson/Bank diffs and full main promotion', () => {
  const wf = fs.readFileSync(
    path.join(path.resolve(fileURLToPath(new URL('../../..', import.meta.url))), '.github/workflows/blocker-todos.yml'),
    'utf8',
  );
  assert.match(wf, /grep -Eq.*data\/\(courses\|lessons\)/);
  assert.match(wf, /check-blocker-todos\.mjs report-diff/);
  assert.match(wf, /check-blocker-todos\.mjs changed/);
  assert.match(wf, /TARGET_BRANCH.*main/);
  assert.match(wf, /check-blocker-todos\.mjs full/);
});

test('Draft TODO reports warnings without blocking authors or hiding errors', () => {
  withRepo(({ root, put, commit }) => {
    put('content/math/data/lessons/a/id/lesson.yaml', 'kind: lesson\n');
    const base = commit();
    put('content/math/data/lessons/a/id/lesson.yaml', '# TODO (BLOCKER): pending bank\n');
    const head = commit();
    const previous = console.error;
    const messages = [];
    console.error = message => messages.push(message);
    try {
      assert.doesNotThrow(() => main(['report-diff', base, head], root));
      assert.ok(messages[0].startsWith('::warning file=content/math/data/lessons/a/id/lesson.yaml'));
      assert.throws(() => main(['report-diff', base, 'bad'], root), /40-character/);
    } finally {
      console.error = previous;
    }
  });
});

test('Ready gate rejects an inherited blocker inside a changed authored source file', () => {
  withRepo(({ root, put, commit }) => {
    const target = 'content/math/data/lessons/a/id/questions/index.ts';
    put(target, blocker + '\nexport const before = 1;\n');
    const base = commit();
    put(target, blocker + '\nexport const before = 2;\n');
    const head = commit();
    assert.deepEqual(scanDiff(root, base, head), []);
    assert.equal(scanChanged(root, base, head).length, 1);
    const previous = console.error;
    console.error = () => {};
    try {
      assert.throws(() => main(['changed', base, head], root), /unresolved TODO/);
    } finally {
      console.error = previous;
    }
  });
});

test('canonical Lesson/Course Review zeros block Ready even without TODO markers', () => {
  const lesson = 'content/math/data/lessons/a/lesson-id/review.ts';
  const course = 'content/math/data/courses/b/course-id/review.ts';
  const accepted = 'export const review = { ai: { locales: 13 }, human: { acceptance: 14, locales: { uk: 15 } } };\n';
  const unreviewed =
    'export const review = { ai: { stage: { pr: 0, language: "uk" }, locales: 0 }, human: { acceptance: 0, locales: { uk: 0 } } };\n';
  assert.deepEqual(scanPendingReview(lesson, accepted), []);
  assert.deepEqual(scanPendingReview(course, accepted), []);
  assert.equal(scanPendingReview(lesson, unreviewed).length, 1);
  assert.equal(scanPendingReview(course, unreviewed).length, 1);
  assert.deepEqual(scanPendingReview('content/math/data/skills/review.ts', unreviewed), []);
  assert.deepEqual(scanPendingReview(lesson, '// pr: 0 is unreviewed\n' + accepted), []);
  withRepo(({ root, put, commit }) => {
    put(lesson, accepted);
    const base = commit();
    put(lesson, unreviewed);
    const head = commit();
    assert.equal(scanChanged(root, base, head).length, 1);
    assert.equal(scanDiff(root, base, head).length, 1);
    const previous = console.error;
    console.error = () => {};
    try {
      assert.throws(() => main(['changed', base, head], root), /pending Review evidence/);
      assert.throws(() => main(['full'], root), /pending Review evidence/);
    } finally {
      console.error = previous;
    }
  });
});

test('generated short and reviewed-brief TODOs are detected in full, diff and changed modes', () => {
  withRepo(({ root, put, commit }) => {
    put('generated.ts', 'export const prior = true;\n');
    const base = commit();
    put('generated.ts', [
      'const literal = ' + JSON.stringify('/* TODO (BLOCKER): quoted */') + ';',
      renderBlockerTodo('Implement the missing asset and verify its file before removal.'),
      renderBlockerSpecification('Implement the verified Scene and remove this brief.', 'Reviewed plan\n  Step 1 */ escaped\nStep 2'),
      'export const finished = false;',
    ].join('\n'));
    const head = commit();
    assert.deepEqual(scanFull(root).map(x => x.line), [2, 4]);
    assert.deepEqual(scanDiff(root, base, head).map(x => x.line), [2, 4]);
    assert.deepEqual(scanChanged(root, base, head).map(x => x.line), [2, 4]);
  });
});
