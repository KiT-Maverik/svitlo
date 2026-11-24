import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, mkdtempSync, mkdirSync, copyFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { typedCommand, inspectTyped } from './bank-typed-gate.mjs';
import { verifyTypedManifest, assertTypedBankInventory } from './bank-typed-materialization.mjs';
import { gitBlob, sha256 } from './bank-gate.mjs';

const owner = 'd3048d21-8690-5255-b62c-984c69ac272c';
const folder = 'content/math/data/lessons/c/' + owner;
const events = {
  questions: '/questions materialize',
  flashcards: '/flashcards materialize',
};
const canonical = bank => ({
  version: 3,
  meta: {
    bank,
    identity: { folder, bank, id: owner, pkg: 'content/math' },
    sourcePath: folder + '/' + bank + '/draft.ts',
    head: 'a'.repeat(40),
    sourceBlob: gitBlob('export const source = {};\n'),
    base: 'agent/lesson',
    baseHead: 'b'.repeat(40),
    lessonBlob: 'c'.repeat(40),
    lessonConstantsBlob: 'd'.repeat(40),
    actor: 'owner',
    number: 888,
    repo: 'KiT-Maverik/svitlo',
    branch: 'agent/assessment-bank',
  },
});
const file = (filename, text) => {
  const bytes = Buffer.from(text);
  return { path: filename, sha256: sha256(bytes), base64: bytes.toString('base64') };
};
function sample(bank) {
  const data = canonical(bank);
  const root = folder + '/';
  return {
    ...data,
    inputSha256: sha256('{}'),
    deletedSource: { path: data.meta.sourcePath, blobSha: data.meta.sourceBlob },
    files: [
      file(root + bank + '/index.ts', 'export const finished = {};\n'),
      file(root + bank + '/first/description.md', '# Owner-reviewed description\n'),
      file(root + bank + '/first.ts', 'export const first = true;\n'),
      file(root + bank + '/first/specification.md', '# reviewed\n'),
    ],
  };
}

test('optional empty Flashcard hint is valid, but front and back must remain populated', () => {
  const meta = canonical('flashcards').meta;
  const root = folder + '/flashcards/';
  const side = slug => ({
    items: slug ? { [slug]: {} } : {},
    order: slug ? [slug] : [],
  });
  const card = {
    config: {
      content: {
        front: side('prompt'),
        back: side('answer'),
        hint: side(null),
      },
    },
  };
  const input = {
    config: {
      flashcards: {
        items: { alpha: card },
        order: ['alpha'],
      },
    },
  };
  const paths = [
    'alpha.ts',
    'alpha/content/front/index.ts',
    'alpha/content/front/prompt/index.ts',
    'alpha/content/back/index.ts',
    'alpha/content/back/answer/index.ts',
    'alpha/content/hint/index.ts',
  ];
  const files = paths.map(name => ({ path: root + name }));
  assert.doesNotThrow(() => assertTypedBankInventory(meta, input, files));
  for (const required of ['front', 'back']) {
    const broken = structuredClone(input);
    broken.config.flashcards.items.alpha.config.content[required] = side(null);
    assert.throws(() => assertTypedBankInventory(meta, broken, files), /must include every reviewed ContentBlock/);
  }
});

test('typed commands require exact top-level issue_comment actor, bank and stage', () => {
  for (const [bank, body] of Object.entries(events)) {
    const event = {
      action: 'created',
      issue: { number: 888, pull_request: {} },
      comment: {
        body,
        user: { login: 'owner' },
      },
    };
    assert.deepEqual(typedCommand(event, 'issue_comment', 'owner'), {
      number: 888,
      bank,
      actor: 'owner',
    });
    assert.deepEqual(
      typedCommand(
        {
          inputs: { bank, pr_number: '888' },
        },
        'workflow_dispatch',
        'owner',
      ),
      { number: 888, bank, actor: 'owner' },
    );
    for (const command of [
      body + ' --force',
      body + '\nanything',
      ' ' + body,
      body + ' typed',
      '/lesson materialize',
    ]) {
      assert.throws(() =>
        typedCommand(
          {
            ...event,
            comment: { ...event.comment, body: command },
          },
          'issue_comment',
          'owner',
        ),
      );
    }
    assert.throws(() => typedCommand(event, 'issue_comment', 'intruder'));
    assert.throws(() => typedCommand({ ...event, action: 'edited' }, 'issue_comment', 'owner'));
    assert.throws(() => typedCommand({ ...event, issue: { number: 888 } }, 'issue_comment', 'owner'));
    assert.throws(() =>
      typedCommand(
        {
          inputs: {
            mode: 'legacy',
            bank,
            pr_number: '888',
          },
        },
        'workflow_dispatch',
        'owner',
      ),
    );
  }
  for (const n of ['0', '-1', 'foo', 'Infinity']) {
    assert.throws(() =>
      typedCommand(
        {
          inputs: {
            bank: 'questions',
            pr_number: n,
          },
        },
        'workflow_dispatch',
        'owner',
      ),
    );
  }
});

test('typed Bank publisher rejects mutated checksums, deletion evidence and non-bank paths', () => {
  for (const bank of Object.keys(events)) {
    const valid = sample(bank);
    assert.doesNotThrow(() => verifyTypedManifest(valid, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, version: 2 }, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, files: valid.files.slice(1) }, valid.meta));
    assert.throws(() => verifyTypedManifest({ ...valid, files: [...valid.files, valid.files[0]] }, valid.meta));
    assert.throws(() =>
      verifyTypedManifest(
        { ...valid, files: valid.files.map((f, i) => (i === 0 ? { ...f, sha256: '0'.repeat(64) } : f)) },
        valid.meta,
      ),
    );
    assert.throws(() =>
      verifyTypedManifest({ ...valid, deletedSource: { ...valid.deletedSource, blobSha: 'c'.repeat(40) } }, valid.meta),
    );
    assert.throws(() =>
      verifyTypedManifest(
        { ...valid, files: valid.files.map((f, i) => (i === 3 ? { ...f, path: folder + '/lesson.ts' } : f)) },
        valid.meta,
      ),
    );
    assert.throws(() =>
      verifyTypedManifest(
        {
          ...valid,
          meta: {
            ...valid.meta,
            head: 'c'.repeat(40),
          },
        },
        valid.meta,
      ),
    );
    assert.throws(() =>
      verifyTypedManifest(
        { ...valid, files: valid.files.map((f, i) => (i === 2 ? { ...f, path: folder + '/other-bank/index.ts' } : f)) },
        valid.meta,
      ),
    );
    const wrong = { ...valid, files: valid.files.map((f, i) => (i === 3 ? { ...f, base64: '////' } : f)) };
    assert.throws(() => verifyTypedManifest(wrong, wrong.meta));
  }
});

test('publisher cannot reintroduce separate Bank language modules', () => {
  for (const bank of Object.keys(events)) {
    const valid = sample(bank);
    const hostile = {
      ...valid,
      files: [...valid.files, file(folder + '/' + bank + 'Languages.ts', 'export const languages = ["uk"] as const;')],
    };
    assert.throws(() => verifyTypedManifest(hostile, hostile.meta), /Unallowlisted|duplicated/);
  }
});

test('both Bank publishers require an exact six-file textbook-scoped Scene scaffold', () => {
  const id = '11111111-1111-4111-8111-11111111111a';
  const root = 'content/math/scenes/a/' + id + '/';
  const files = {
    'index.ts': '// TODO (BLOCKER): Register Scene after review.\nexport { Visual as default } from "./Visual";\n',
    'Visual.tsx': '// TODO (BLOCKER): Implement Scene.\nexport function Visual() { return null; }\n',
    'Visual.module.css': '/* TODO (BLOCKER): Style Scene. */\n.root {}\n',
    'Visual.constants.ts': '// TODO (BLOCKER): Add test IDs.\nexport const testIds = {};\n',
    'Visual.stories.tsx': '// TODO (BLOCKER): Author Storybook fixtures.\nexport const Default = {};\n',
    'Visual.unit.spec.tsx': '// TODO (BLOCKER): Implement tests.\nexport const testId = "pending";\n',
  };
  for (const bank of Object.keys(events)) {
    const valid = sample(bank);
    const proposed = [...valid.files, ...Object.entries(files).map(([name, source]) => file(root + name, source))];
    assert.doesNotThrow(() => verifyTypedManifest({ ...valid, files: proposed }, valid.meta));
    for (const missing of Object.keys(files)) {
      assert.throws(
        () =>
          verifyTypedManifest({ ...valid, files: proposed.filter(item => item.path !== root + missing) }, valid.meta),
        /Incomplete.*Scene/,
      );
    }
    const incomplete = proposed.map(entry =>
      entry.path === root + 'Visual.module.css' ? file(entry.path, '.root {}\n') : entry,
    );
    assert.throws(() => verifyTypedManifest({ ...valid, files: incomplete }, valid.meta), /lacks release blocker/);
    for (const hostile of [
      file('content/other/scenes/a/' + id + '/index.ts', files['index.ts']),
      file('content/math/scenes/b/' + id + '/index.ts', files['index.ts']),
      file('content/math/scenes/a/' + id + '/evil.ts', files['index.ts']),
      file(folder + '/scenes/a/' + id + '/index.ts', files['index.ts']),
    ]) {
      assert.throws(
        () => verifyTypedManifest({ ...valid, files: [...proposed, hostile] }, valid.meta),
        /Unallowlisted/,
      );
    }
  }
});

test('typed publisher imports in a zero-dependency read-only environment', () => {
  const root = fileURLToPath(new URL('../../..', import.meta.url));
  const isolated = mkdtempSync(path.join(tmpdir(), 'svitlo-typed-bank-publisher-'));
  try {
    const names = ['bank-gate.mjs', 'bank-typed-gate.mjs', 'bank-typed-materialization.mjs'];
    const dir = path.join(isolated, 'scripts/ci/bankMaterialization');
    mkdirSync(dir, { recursive: true });
    for (const name of names) {
      copyFileSync(path.join(root, 'scripts/ci/bankMaterialization', name), path.join(dir, name));
    }
    assert.equal(existsSync(path.join(isolated, 'node_modules')), false);
    assert.equal(existsSync(path.join(isolated, 'shared/engine')), false);
    const result = spawnSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        'await import(' + JSON.stringify(pathToFileURL(path.join(dir, names[2])).href) + ')',
      ],
      { encoding: 'utf8', env: { PATH: process.env.PATH ?? '' }, cwd: isolated },
    );
    assert.equal(result.status, 0, result.stderr);
  } finally {
    rmSync(isolated, { recursive: true, force: true });
  }
});

test('workflow separates tokenless candidate analysis from scoped trusted publication', () => {
  const root = fileURLToPath(new URL('../../..', import.meta.url));
  const flow = requireWorkflow(root);
  assert.match(flow, /\/questions materialize/);
  assert.match(flow, /\/flashcards materialize/);
  const analyze = flow.split('\n  typed_analyze:\n')[1]?.split('\n  typed_publish:\n')[0];
  const publish = flow.split('\n  typed_publish:\n')[1];
  assert.ok(analyze && publish);
  assert.match(analyze, /persist-credentials: false/);
  assert.doesNotMatch(analyze, /contents: write/);
  assert.match(publish, /contents: write/);
  assert.doesNotMatch(publish, /npm ci|npm run package:build|BANK_CANDIDATE_ROOT/);
});
function requireWorkflow(root) {
  return readFileSync(path.join(root, '.github/workflows/bank-materialization.yml'), 'utf8');
}

test('Bank gate ignores all editorial prose, but requires current same-repository Draft source and owning Lesson', async () => {
  const prevFetch = globalThis.fetch;
  const oldRepo = process.env.GITHUB_REPOSITORY;
  const oldToken = process.env.GH_TOKEN;
  const repo = 'KiT-Maverik/svitlo';
  process.env.GITHUB_REPOSITORY = repo;
  process.env.GH_TOKEN = 'unit-test-token-not-used-on-network';
  const head = 'a'.repeat(40);
  const baseHead = 'b'.repeat(40);
  const source = 'c'.repeat(40);
  const lessonBlob = 'd'.repeat(40);
  const constantsBlob = 'e'.repeat(40);
  const child = {
    state: 'open',
    draft: true,
    user: { login: 'author' },
    head: { sha: head, ref: 'agent/assessment-bank', repo: { full_name: repo } },
    base: { ref: 'agent/lesson', sha: baseHead, repo: { full_name: repo } },
  };
  let overrides = {};
  let bank = 'questions';
  let changeDuringDiscovery = null;
  let prReads = 0;
  const compare = () => ({
    status: 'ahead',
    merge_base_commit: { sha: baseHead },
    files: [{ filename: folder + '/' + bank + '/draft.ts', status: 'modified', sha: source }],
  });
  const resources = () => ({
    'pulls/888': child,
    ['compare/' + baseHead + '...' + head]: compare(),
    ['contents/' + folder + '/' + bank + '/draft.ts?ref=' + head]: {
      type: 'file',
      path: folder + '/' + bank + '/draft.ts',
      sha: source,
      size: 100,
    },
    ['contents/' + folder + '/index.ts?ref=' + baseHead]: {
      type: 'file',
      path: folder + '/index.ts',
      sha: lessonBlob,
      size: 100,
    },
    ['contents/' + folder + '/constants.ts?ref=' + baseHead]: {
      type: 'file',
      path: folder + '/constants.ts',
      sha: constantsBlob,
      size: 100,
    },
    ...overrides,
  });
  globalThis.fetch = async url => {
    const raw = String(url).split('/repos/' + repo + '/')[1];
    const endpoint = decodeURI(raw).replace(/%2F/gi, '/');
    let value = resources()[endpoint];
    if (endpoint === 'pulls/888' && ++prReads % 2 === 0 && changeDuringDiscovery)
      value = { ...value, ...changeDuringDiscovery };
    if (value === undefined) return new Response('not found', { status: 404 });
    return new Response(JSON.stringify(value), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  try {
    for (bank of Object.keys(events)) {
      delete child.body;
      const ok = await inspectTyped(888, bank);
      assert.equal(ok.sourceBlob, source);
      assert.equal(ok.lessonBlob, lessonBlob);
      assert.equal(ok.lessonConstantsBlob, constantsBlob);
      assert.equal(ok.baseHead, baseHead);
      assert.equal(ok.head, head);
      assert.equal(ok.sourcePath, folder + '/' + bank + '/draft.ts');
      assert.deepEqual(ok.identity, { id: owner, pkg: 'content/math', folder, bank });

      for (const body of [
        '',
        'arbitrary unrelated prose',
        '- [ ] 4. Independent review',
        '- Review evidence (v1): 4 | rejected | ' + head + ' | ' + source,
        '- Review evidence (v1): 4 | accepted | ' + 'e'.repeat(40) + ' | ' + 'f'.repeat(40),
        '- Questions: Not Applicable — no evidence',
      ]) {
        child.body = body;
        assert.deepEqual(await inspectTyped(888, bank, ok), ok);
      }
      prReads = 0;
      changeDuringDiscovery = { body: 'Changed during discovery' };
      assert.deepEqual(await inspectTyped(888, bank, ok), ok);
      changeDuringDiscovery = null;

      for (const key of ['head', 'baseHead', 'sourceBlob', 'lessonBlob', 'lessonConstantsBlob']) {
        await assert.rejects(inspectTyped(888, bank, { ...ok, [key]: 'e'.repeat(40) }), /changed/);
      }
      const comparisonPath = 'compare/' + baseHead + '...' + head;
      for (const invalid of [
        { ...compare(), status: 'diverged' },
        { ...compare(), merge_base_commit: { sha: 'e'.repeat(40) } },
        { ...compare(), files: [] },
        { ...compare(), files: [...compare().files, { filename: 'README.md', status: 'modified' }] },
        { ...compare(), files: [{ ...compare().files[0], status: 'removed' }] },
      ]) {
        overrides = { [comparisonPath]: invalid };
        await assert.rejects(inspectTyped(888, bank), /exactly one draft/);
      }
      overrides = { [comparisonPath]: { ...compare(), files: [{ ...compare().files[0], filename: 'README.md' }] } };
      await assert.rejects(inspectTyped(888, bank), /canonical Bank draft path/);
      const sourcePath = 'contents/' + folder + '/' + bank + '/draft.ts?ref=' + head;
      const sourceFile = resources()[sourcePath];
      for (const bad of [
        { ...sourceFile, sha: 'e'.repeat(40) },
        { ...sourceFile, size: 0 },
        { ...sourceFile, size: 1024 * 1024 + 1 },
        { ...sourceFile, type: 'symlink' },
        { ...sourceFile, path: 'README.md' },
      ]) {
        overrides = { [sourcePath]: bad };
        await assert.rejects(inspectTyped(888, bank), /Pinned typed Bank source/);
      }
      const constantsPath = 'contents/' + folder + '/constants.ts?ref=' + baseHead;
      overrides = { [constantsPath]: { type: 'symlink', path: folder + '/constants.ts', sha: constantsBlob } };
      await assert.rejects(inspectTyped(888, bank), /Owning Lesson constants.ts/);
      const lessonPath = 'contents/' + folder + '/index.ts?ref=' + baseHead;
      overrides = { [lessonPath]: { type: 'symlink', path: folder + '/index.ts', sha: lessonBlob } };
      await assert.rejects(inspectTyped(888, bank), /Owning Lesson source/);

      for (const bad of [
        { ...child, state: 'closed' },
        { ...child, draft: false },
        { ...child, head: { ...child.head, repo: { full_name: 'fork/svitlo' } } },
        { ...child, base: { ...child.base, repo: { full_name: 'fork/svitlo' } } },
        { ...child, head: { ...child.head, ref: child.base.ref } },
        { ...child, head: { ...child.head, ref: 'agent/../unsafe' } },
      ]) {
        overrides = { 'pulls/888': bad };
        await assert.rejects(inspectTyped(888, bank), /Draft bank PR/);
      }
      overrides = {};
      for (const changed of [
        { draft: false },
        { head: { ...child.head, sha: 'e'.repeat(40) } },
        { base: { ...child.base, sha: 'e'.repeat(40) } },
      ]) {
        prReads = 0;
        changeDuringDiscovery = changed;
        await assert.rejects(inspectTyped(888, bank), /changed during source discovery/);
      }
      changeDuringDiscovery = null;
    }
  } finally {
    globalThis.fetch = prevFetch;
    if (oldRepo === undefined) delete process.env.GITHUB_REPOSITORY;
    else process.env.GITHUB_REPOSITORY = oldRepo;
    if (oldToken === undefined) delete process.env.GH_TOKEN;
    else process.env.GH_TOKEN = oldToken;
  }
});

test('all nine Question kinds are checked for complete member source emission', () => {
  const kinds = [
    'selectOneAnswer',
    'selectMultipleAnswers',
    'matchBlocks',
    'answerWithText',
    'answerWithNumber',
    'orderSequence',
    'buildAnswerWithBlocks',
    'fillBlanksWithBlocks',
    'fillBlanksWithText',
  ];
  const meta = canonical('questions').meta;
  const questions = Object.fromEntries(
    kinds.map((kind, i) => [kind, { ['question' + i]: { config: { type: kind } } }]),
  );
  const files = [
    { path: folder + '/' + meta.bank + '/index.ts' },
    ...kinds.flatMap((kind, i) => [
      { path: folder + '/questions/' + kind + '/index.ts' },
      { path: folder + '/questions/' + kind + '/question' + i + '.ts' },
    ]),
  ];
  const bank = { config: { questions } };
  assert.doesNotThrow(() => assertTypedBankInventory(meta, bank, files));
  for (const kind of kinds) {
    assert.throws(
      () =>
        assertTypedBankInventory(
          meta,
          bank,
          files.filter(f => f.path !== folder + '/questions/' + kind + '/index.ts'),
        ),
      /index/,
    );
    const slug = 'question' + kinds.indexOf(kind);
    assert.throws(
      () =>
        assertTypedBankInventory(
          meta,
          bank,
          files.filter(f => f.path !== folder + '/questions/' + kind + '/' + slug + '.ts'),
        ),
      /omitted/,
    );
  }
});

test('every authored Flashcard Card, Side and nested Side Block is emitted', () => {
  const meta = canonical('flashcards').meta;
  const block = slug => ({ items: { [slug]: { config: { type: 'text' } } }, order: [slug] });
  const input = {
    config: {
      flashcards: {
        items: {
          left: { config: { content: { front: block('prompt'), back: block('response') } } },
          right: { config: { content: { front: block('question'), back: block('answer'), hint: block('context') } } },
        },
        order: ['left', 'right'],
      },
    },
  };
  const files = [{ path: folder + '/' + meta.bank + '/index.ts' }];
  for (const slug of input.config.flashcards.order) {
    files.push({ path: folder + '/flashcards/' + slug + '.ts' });
    const sides = input.config.flashcards.items[slug].config.content;
    for (const [side, data] of Object.entries(sides)) {
      const prefix = folder + '/flashcards/' + slug + '/content/' + side + '/';
      files.push({ path: prefix + 'index.ts' });
      for (const blockSlug of data.order) files.push({ path: prefix + ' ' + blockSlug + '/index.ts' });
    }
  }
  assert.doesNotThrow(() => assertTypedBankInventory(meta, input, files));
  for (const output of files.slice(1)) {
    assert.throws(
      () =>
        assertTypedBankInventory(
          meta,
          input,
          files.filter(f => f !== output),
        ),
      /omitted/,
    );
  }
});

test('Flashcard typed inventory refuses unlisted, repeated or empty reviewed Card and Side entries', () => {
  const meta = canonical('flashcards').meta;
  const block = slug => ({ items: { [slug]: { config: { type: 'text' } } }, order: [slug] });
  const input = {
    config: {
      flashcards: {
        items: { card: { config: { content: { front: block('frontBlock'), back: block('backBlock') } } } },
        order: ['card'],
      },
    },
  };
  const files = [
    { path: folder + '/' + meta.bank + '/index.ts' },
    { path: folder + '/flashcards/card.ts' },
    ...['front', 'back'].flatMap(side => [
      { path: folder + '/flashcards/card/content/' + side + '/index.ts' },
      { path: folder + '/flashcards/card/content/' + side + '/' + side + 'Block/index.ts' },
    ]),
  ];
  assert.doesNotThrow(() => assertTypedBankInventory(meta, input, files));
  const cards = input.config.flashcards;
  for (const order of [[], ['card', 'card'], ['absent']]) {
    assert.throws(
      () => assertTypedBankInventory(meta, { config: { flashcards: { ...cards, order } } }, files),
      /Flashcards|Card/,
    );
  }
  assert.throws(
    () =>
      assertTypedBankInventory(
        meta,
        {
          config: {
            flashcards: {
              ...cards,
              items: { ...cards.items, unlisted: cards.items.card },
            },
          },
        },
        files,
      ),
    /every reviewed Card/,
  );
  for (const side of ['front', 'back']) {
    const original = cards.items.card.config.content;
    for (const changed of [
      { ...original[side], order: [] },
      { ...original[side], order: [original[side].order[0], original[side].order[0]] },
      { ...original[side], items: { ...original[side].items, unexpected: {} } },
      { ...original[side], order: ['missing'] },
    ]) {
      const changedInput = {
        config: {
          flashcards: {
            ...cards,
            items: {
              card: { config: { content: { ...original, [side]: changed } } },
            },
          },
        },
      };
      assert.throws(() => assertTypedBankInventory(meta, changedInput, files), /every reviewed ContentBlock/);
    }
  }
});
