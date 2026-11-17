import test from 'node:test';
import assert from 'node:assert/strict';
import { parseArgs } from './sync-course-lessons.mjs';

test('CLI modes cannot share write/read-only flags', () => {
  const sha = 'a'.repeat(40);
  const base = ['--repo', 'KiT-Maverik/svitlo', '--pr', '639', '--sha', sha];
  assert.equal(parseArgs(['analyze', ...base, '--root', '/tmp/checkout', '--out', '/tmp/data.json']).mode, 'analyze');
  assert.equal(parseArgs(['update', ...base, '--report', '/tmp/data.json']).mode, 'update');
  assert.throws(() => parseArgs(['analyze', ...base, '--report', 'x']), /Usage/);
  assert.throws(() => parseArgs(['update', ...base, '--root', '/tmp/checkout', '--report', 'x']), /Usage/);
  assert.throws(() => parseArgs(['update', ...base, '--report', 'x', '--pr', '999']), /Usage/);
  assert.throws(() => parseArgs(['update', ...base, '--report', 'x', '--out', 'evil']), /Usage/);
  assert.throws(
    () => parseArgs(['update', '--repo', '../escape', '--pr', '2', '--sha', sha, '--report', 'x']),
    /Usage/,
  );
});

test('end-to-end Course status analysis and trusted updates preserve manual description', async () => {
  const fs = await import('node:fs');
  const os = await import('node:os');
  const path = await import('node:path');
  const yaml = (await import('yaml')).default;
  const { analyze, update } = await import('./sync-course-lessons.mjs');
  const { START, END, outsideHash } = await import('./synchronizer.mjs');
  const repo = 'KiT-Maverik/svitlo';
  const sha = 'a'.repeat(40);
  const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
  const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
  const parentBody =
    '<!-- svitlo-course-flow:v1 -->\n' +
    '- Course UUID: ' +
    courseId +
    '\n' +
    '- Textbook: content/math\n' +
    '- Source plan: content/math/data/courses/7/' +
    courseId +
    '/course.yaml\n' +
    '\n## Human-approved checklist\n- [ ] Independent review\n\n' +
    START +
    '\nold\n' +
    END +
    '\n';
  let body = parentBody;
  let patchCount = 0;
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'course-status-integration-'));
  const courseFolder = path.join(root, 'content/math/data/courses/7', courseId);
  const previousFetch = globalThis.fetch;
  const previousToken = process.env.GH_TOKEN;
  try {
    fs.mkdirSync(courseFolder, { recursive: true });
    fs.writeFileSync(
      path.join(courseFolder, 'course.yaml'),
      yaml.stringify({
        id: courseId,
        type: 'course',
        supportedLanguages: ['en'],
        content: {
          items: {
            introduction: {
              type: 'lesson',
              lessonId,
              title: 'Foundations',
            },
          },
          order: ['introduction'],
        },
      }),
    );
    const claim =
      '<!-- svitlo-course-lesson:v1 -->\nCourse: ' + courseId + '\nLesson: ' + lessonId + '\nParent PR: #639\n';
    process.env.GH_TOKEN = 'fixture-token';
    globalThis.fetch = async (url, options = {}) => {
      const suffix = String(url).split('/repos/' + repo + '/')[1];
      let result;
      if (suffix === 'pulls/639' && options.method === 'PATCH') {
        body = JSON.parse(options.body).body;
        patchCount++;
        result = { updated: true };
      } else if (suffix === 'pulls/639') {
        result = { state: 'open', body, head: { sha, ref: 'course/math', repo: { full_name: repo } } };
      } else if (suffix === 'pulls?state=all&per_page=100&page=1') {
        result = [
          {
            number: 710,
            body: claim,
            state: 'open',
            draft: true,
            merged_at: null,
            head: { repo: { full_name: repo } },
            base: { ref: 'course/math', repo: { full_name: repo } },
          },
        ];
      } else {
        throw new Error('Unexpected GitHub request: ' + suffix);
      }
      return { ok: true, json: async () => result };
    };
    const report = await analyze({ repo, pr: 639, sha, root });
    assert.equal(report.complete, false);
    assert.equal(report.lessons.length, 1);
    assert.equal(report.lessons[0].source, 'absent');
    assert.equal(report.lessons[0].status, 'Draft · #710');
    const reportFile = path.join(root, 'report.json');
    fs.writeFileSync(reportFile, JSON.stringify(report));
    const opts = { repo, pr: 639, sha, report: reportFile };
    assert.equal((await update(opts)).updated, true);
    assert.equal(patchCount, 1);
    assert.equal(outsideHash(body), outsideHash(parentBody));
    assert.match(body, /Human-approved checklist/);
    assert.match(body, /Draft/);
    assert.equal((await update(opts)).updated, false);
    assert.equal(patchCount, 1);
    body = body.replace('Human-approved checklist', 'Revised checklist');
    await assert.rejects(update(opts), /manual description changed/);
    assert.equal(patchCount, 1);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousToken === undefined) delete process.env.GH_TOKEN;
    else process.env.GH_TOKEN = previousToken;
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('Stage 1 ignores unrelated marker examples but fails closed for associated malformed claims', async () => {
  const fs = await import('node:fs');
  const os = await import('node:os');
  const path = await import('node:path');
  const { analyze, update } = await import('./sync-course-lessons.mjs');
  const { START, END, outsideHash, renderLessonsBlock } = await import('./synchronizer.mjs');
  const repo = 'KiT-Maverik/svitlo';
  const sha = 'b'.repeat(40);
  const courseId = '1e79d8fc-2223-4fa7-bc64-70d8172d3e8b';
  const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
  const marker = '<!-- svitlo-course-lesson:v1 -->';
  const parentBody =
    '<!-- svitlo-course-flow:v1 -->\n' +
    '- Course UUID: ' +
    courseId +
    '\n' +
    '- Textbook: content/astronomy\n' +
    '- Source plan: content/astronomy/data/courses/b/' +
    courseId +
    '/course.yaml\n' +
    '\n## Human-authored Stage 1\n- [ ] Methodology approval pending\n\n' +
    START +
    '\nold\n' +
    END +
    '\n';
  const unrelated = [
    {
      number: 639,
      body: marker + '\nCourse: <course-uuid>\nLesson: <lesson-uuid>\nParent PR: #<number>\n',
      state: 'closed',
      merged_at: '2026-11-17T00:00:00Z',
    },
    { number: 640, body: marker + '\nCourse: invalid\nParent PR: #999\n', state: 'closed' },
    {
      number: 641,
      body: marker + '\nCourse: 00000000-0000-0000-0000-000000000000\n' + 'Lesson: ' + lessonId + '\nParent PR: #999\n',
      state: 'open',
    },
  ];
  let prs = [...unrelated];
  let body = parentBody;
  let patchCount = 0;
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'course-stage-one-'));
  const courseFolder = path.join(root, 'content/astronomy/data/courses/b', courseId);
  const previousFetch = globalThis.fetch;
  const previousToken = process.env.GH_TOKEN;
  try {
    fs.mkdirSync(courseFolder, { recursive: true });
    fs.writeFileSync(
      path.join(courseFolder, 'course.yaml'),
      [
        'id: ' + courseId,
        'type: course',
        'supportedLanguages: [uk]',
        'methodology:',
        '  purpose: First observations',
        'outcomes:',
        '  skills: []',
        '',
      ].join('\n'),
    );
    process.env.GH_TOKEN = 'fixture-token';
    globalThis.fetch = async (url, options = {}) => {
      const suffix = String(url).split('/repos/' + repo + '/')[1];
      let result;
      if (suffix === 'pulls/653' && options.method === 'PATCH') {
        body = JSON.parse(options.body).body;
        patchCount++;
        result = { updated: true };
      } else if (suffix === 'pulls/653') {
        result = {
          state: 'open',
          body,
          head: { sha, ref: 'course/astronomy-grade-one', repo: { full_name: repo } },
        };
      } else if (suffix === 'pulls?state=all&per_page=100&page=1') {
        result = prs;
      } else {
        throw Error('Unexpected GitHub request: ' + suffix);
      }
      return { ok: true, json: async () => result };
    };
    const options = { repo, pr: 653, sha, root };
    const good = await analyze(options);
    assert.equal(good.lessons.length, 0);
    assert.equal(good.allocated, false);
    assert.equal(good.complete, false); // Not yet allocated: no readiness assertion.
    assert.deepEqual(good.diagnostics, []);
    assert.match(renderLessonsBlock(good), /Coverage: \*\*NOT ALLOCATED\*\*/);
    assert.doesNotMatch(renderLessonsBlock(good), /INCOMPLETE/);

    const reportFile = path.join(root, 'report.json');
    fs.writeFileSync(reportFile, JSON.stringify(good));
    assert.equal((await update({ repo, pr: 653, sha, report: reportFile })).updated, true);
    assert.equal(patchCount, 1);
    assert.equal(outsideHash(body), outsideHash(parentBody));
    assert.match(body, /Human-authored Stage 1/);
    assert.doesNotMatch(body, /Invalid Lesson PR marker in/);

    prs = [
      ...unrelated,
      {
        number: 700,
        body: marker + '\nLesson: ' + lessonId + '\nParent PR: #653\n',
        head: { repo: { full_name: repo } },
        base: { ref: 'course/astronomy-grade-one', repo: { full_name: repo } },
      },
    ];
    const malformed = await analyze(options);
    assert.equal(malformed.complete, false);
    assert.match(malformed.diagnostics.map(x => x.reason).join('\n'), /#700: Expected exactly one Lesson PR Course/);
    assert.match(renderLessonsBlock(malformed), /INCOMPLETE/);

    prs = [
      ...unrelated,
      {
        number: 701,
        body: marker + '\nCourse: ' + courseId + '\nLesson: ' + lessonId + '\nParent PR: #999\n',
        head: { repo: { full_name: repo } },
        base: { ref: 'course/astronomy-grade-one', repo: { full_name: repo } },
      },
    ];
    const conflict = await analyze(options);
    assert.match(
      conflict.diagnostics.map(x => x.reason).join('\n'),
      /#701: Lesson PR Course\/parent identity mismatch/,
    );

    prs = [
      ...unrelated,
      {
        number: 702,
        body: marker + '\nCourse: ' + courseId + '\nLesson: ' + lessonId + '\nParent PR: #653\n',
        head: { repo: { full_name: repo } },
        base: { ref: 'main', repo: { full_name: repo } },
      },
    ];
    const wrongBranch = await analyze(options);
    assert.match(
      wrongBranch.diagnostics.map(x => x.reason).join('\n'),
      /#702: Lesson PR must target its Course parent branch/,
    );
    assert.equal(patchCount, 1); // Analysis never updates the PR body.
  } finally {
    globalThis.fetch = previousFetch;
    if (previousToken === undefined) delete process.env.GH_TOKEN;
    else process.env.GH_TOKEN = previousToken;
    fs.rmSync(root, { recursive: true, force: true });
  }
});
