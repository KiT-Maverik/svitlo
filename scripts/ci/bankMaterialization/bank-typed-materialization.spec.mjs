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
  version: 2,
  meta: {
    bank,
    identity: { folder, bank, id: owner, pkg: 'content/math', parent: 777 },
    sourcePath: folder + '/' + bank + '/draft.ts',
    head: 'a'.repeat(40),
    sourceBlob: gitBlob('export const source = {};\n'),
    reviewVerdict: 'accepted',
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
    treeSha: 'b'.repeat(40),
    deletedSource: { path: data.meta.sourcePath, blobSha: data.meta.sourceBlob },
    files: [
      file(root + bank + '/index.ts', 'export const finished = {};\n'),
      file(root + bank + 'Languages.ts', 'export const languages = ["uk"] as const;\n'),
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
    'alpha/content/front/items/prompt/index.ts',
    'alpha/content/back/index.ts',
    'alpha/content/back/items/answer/index.ts',
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
    assert.throws(() => verifyTypedManifest({ ...valid, treeSha: 'bad' }, valid.meta));
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
    const evidenceDir = path.join(isolated, 'scripts/ci/reviewEvidence');
    mkdirSync(evidenceDir, { recursive: true });
    copyFileSync(
      path.join(root, 'scripts/ci/reviewEvidence/review-evidence.mjs'),
      path.join(evidenceDir, 'review-evidence.mjs'),
    );
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

test('GitHub typed gate requires accepted exact-HEAD and blob evidence and Lesson branch', async () => {
  const prevFetch = globalThis.fetch;
  const oldRepo = process.env.GITHUB_REPOSITORY;
  const oldToken = process.env.GH_TOKEN;
  process.env.GITHUB_REPOSITORY = 'KiT-Maverik/svitlo';
  process.env.GH_TOKEN = 'unit-test-token-not-used-on-network';
  const head = 'a'.repeat(40);
  const source = 'c'.repeat(40);
  const identity = [
    '<!-- svitlo-create-questions-flow:v1 -->',
    '- Lesson UUID: ' + owner,
    '- Textbook: content/math',
    '- Parent Lesson PR: #777',
    '## Workflow',
    '- [x] 1. Lesson Analysis',
    '- [x] 2. Question Design',
    '- [x] 3. Quiz Section Design',
    '- [x] 4. Independent Assessment Review',
    '- [ ] 5. Resource Production',
    '## Review',
  ].join('\n');
  const row = '- Review evidence (v1): 4 | accepted | ' + head + ' | ' + source;
  const reviewed = identity + '\n' + row;
  const child = {
    state: 'open',
    draft: true,
    user: { login: 'author' },
    body: reviewed,
    head: { sha: head, ref: 'agent/assessment-bank', repo: { full_name: process.env.GITHUB_REPOSITORY } },
    base: { ref: 'agent/lesson', sha: 'b'.repeat(40) },
  };
  const parent = {
    state: 'open',
    head: { ref: 'agent/lesson' },
    body:
      '<!-- svitlo-create-lesson-flow:v1 -->\n- Lesson UUID / textbook / slug: `' +
      owner +
      '` / `content/math` / `unitLesson`',
  };
  let overrides = {};
  const resources = () => ({
    'pulls/888': child,
    'pulls/777': parent,
    ['contents/' + folder + '/questions/draft.ts?ref=' + head]: { type: 'file', sha: source },
    ...overrides,
  });
  globalThis.fetch = async url => {
    const raw = String(url).split('/repos/KiT-Maverik/svitlo/')[1];
    const endpoint = decodeURI(raw).replace(/%2F/gi, '/');
    const value = resources()[endpoint];
    if (value === undefined) return new Response('not found', { status: 404 });
    return new Response(JSON.stringify(value), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  try {
    const ok = await inspectTyped(888, 'questions');
    assert.equal(ok.sourceBlob, source);
    assert.equal(ok.reviewCommitSha, head);
    assert.equal(ok.reviewVerdict, 'accepted');
    assert.equal(ok.sourcePath, folder + '/questions/draft.ts');
    const base = { ...ok, head: 'd'.repeat(40) };
    await assert.rejects(inspectTyped(888, 'questions', base), /changed/);

    for (const bad of [
      identity,
      reviewed.replace(head, 'e'.repeat(40)),
      reviewed.replace(source, 'f'.repeat(40)),
      reviewed + '\n' + row,
      reviewed.replace('accepted', 'rejected'),
    ]) {
      overrides = { 'pulls/888': { ...child, body: bad } };
      await assert.rejects(inspectTyped(888, 'questions'), /review evidence/i);
    }

    // Questions N/A is reviewed against the actual materialized parent Lesson.
    const parentHead = 'b'.repeat(40);
    const parentBlob = 'd'.repeat(40);
    const flashBody = reviewed
      .replace('create-questions-flow', 'create-flashcards-flow')
      .replace('Question Design', 'Flashcard Design')
      .replace('Quiz Section Design', 'Flashcards Section Design')
      .replace('Independent Assessment Review', 'Memory Design Review');
    const decisionRow = '- Review evidence (v1): questions-na | accepted | ' + parentHead + ' | ' + parentBlob;
    const parentBody = parent.body + '\n- Questions (own bank): Not Applicable — verified Methodologist rationale';
    const parentSnapshot = {
      ...parent,
      head: { ref: 'agent/lesson', sha: parentHead },
      body: parentBody + '\n' + decisionRow,
    };
    const flashOverrides = {
      'pulls/888': { ...child, body: flashBody },
      'pulls/777': parentSnapshot,
      ['contents/' + folder + '/index.ts?ref=' + parentHead]: { type: 'file', sha: parentBlob },
      ['contents/' + folder + '/flashcards/draft.ts?ref=' + head]: { type: 'file', sha: source },
    };
    overrides = flashOverrides;
    const flash = await inspectTyped(888, 'flashcards');
    assert.equal(flash.parentQuestionsReview.blob, parentBlob);
    for (const bad of [
      parentBody,
      parentSnapshot.body.replace(parentBlob, 'e'.repeat(40)),
      parentSnapshot.body + '\n' + decisionRow,
      parentSnapshot.body.replace('accepted', 'rejected'),
    ]) {
      overrides = { ...flashOverrides, 'pulls/777': { ...parentSnapshot, body: bad } };
      await assert.rejects(inspectTyped(888, 'flashcards'), /review evidence/i);
    }
    overrides = {
      ...flashOverrides,
      'pulls/777': { ...parentSnapshot, body: parentSnapshot.body + '\n- Questions: Completed' },
    };
    await assert.rejects(inspectTyped(888, 'flashcards'), /Questions-first/);

    overrides = { 'pulls/888': { ...child, base: { ref: 'develop', sha: 'b'.repeat(40) } } };
    await assert.rejects(inspectTyped(888, 'questions'), /Lesson parent branch/);
    overrides = { 'pulls/888': { ...child, draft: false } };
    await assert.rejects(inspectTyped(888, 'questions'), /Draft bank PR/);
    overrides = { 'pulls/888': { ...child, body: identity.replace('- [x] 4.', '- [ ] 4.') } };
    await assert.rejects(inspectTyped(888, 'questions'), /Stage 4/);
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
      for (const blockSlug of data.order) files.push({ path: prefix + 'items/' + blockSlug + '/index.ts' });
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
      { path: folder + '/flashcards/card/content/' + side + '/items/' + side + 'Block/index.ts' },
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
