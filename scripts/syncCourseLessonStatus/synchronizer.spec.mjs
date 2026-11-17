import test from 'node:test';
import assert from 'node:assert/strict';
import {
  collectInventory, parseParent, parseLessonClaim, managedBounds, replaceManagedBlock,
  outsideHash, sameInventory, resolveClaims, renderLessonsBlock, validateReport, START, END,
} from './synchronizer.mjs';

const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const body = '<!-- svitlo-course-flow:v1 -->\n- Course UUID: ' + courseId +
  '\n- Textbook: content/math\n- Source plan: content/math/data/courses/7/' +
  courseId + '/course.yaml\n\n## Workflow\n- [ ] One\n\n' + START + '\nold\n' + END + '\n';
const book = {
  id: courseId, type: 'course',
  content: { items: {
    alpha: { type: 'module', content: { items: {
      first: { type: 'chapter', content: { items: {
        introduction: { type: 'lesson', lessonId, title: 'Foundations' },
      }, order: ['introduction'] } },
      review: { type: 'lesson', lessonId },
    }, order: ['first', 'review'] } },
    direct: { type: 'lesson', key: 'direct' },
  }, order: ['alpha', 'direct'] },
};

test('parent identity and exact managed sentinel (no non-managed edits)', () => {
  assert.equal(parseParent(body).courseId, courseId);
  assert.ok(managedBounds(body));
  const replacement = START + '\n## Lessons\nupdated\n' + END;
  const changed = replaceManagedBlock(body, replacement);
  assert.equal(outsideHash(body), outsideHash(changed));
  assert.match(changed, /- \[ \] One/);
  assert.equal(replaceManagedBlock(changed, replacement), changed);
  assert.throws(() => replaceManagedBlock('missing markers', replacement), /markers/);
  assert.throws(() => managedBounds(body + START), /markers/);
  assert.throws(() => managedBounds(END + body), /Misordered|markers/);
});

test('editorial hierarchy deduplicates repeated Lesson UUID, retains placements and missing IDs', () => {
  const result = collectInventory(book, 'editorial', courseId);
  assert.equal(result.lessons.length, 1);
  assert.deepEqual(result.lessons[0].placements, ['alpha / first / introduction', 'alpha / review']);
  assert.equal(result.unresolved.length, 1);
  const technicalNode = node => ({
    config: { ...node, content: node.content ? {
      items: Object.fromEntries(Object.entries(node.content.items).map(([k, v]) => [k, technicalNode(v)])),
      order: node.content.order,
    } : undefined },
  });
  const technical = { config: technicalNode(book).config };
  assert.equal(sameInventory(result, collectInventory(technical, 'technical', courseId)), true);
  assert.throws(() => collectInventory({ ...book, id: lessonId }, 'editorial', courseId), /mismatch/);
  assert.throws(() => collectInventory({ ...book, content: { ...book.content, order: ['alpha'] } },
    'editorial', courseId), /mismatch/);
});

test('PR identity uses exact UUIDs and never fuzzy title/branch matching', () => {
  const claim = parseLessonClaim('<!-- svitlo-course-lesson:v1 -->\nCourse: ' + courseId +
    '\nLesson: ' + lessonId + '\nParent PR: #639\n');
  assert.deepEqual(claim, { courseId, lessonId, parentPr: 639 });
  assert.equal(parseLessonClaim('Course: ' + courseId), null);
  assert.throws(() => parseLessonClaim('<!-- svitlo-course-lesson:v1 -->\nCourse: fake'), /UUID|Expected/);
  const example = { lessonId, number: 5, state: 'open', draft: true, merged: false };
  assert.equal(resolveClaims(lessonId, [example]).status, 'Draft · #5');
  assert.equal(resolveClaims(lessonId, [{ ...example, draft: false }]).status, 'Open · #5');
  assert.equal(resolveClaims(lessonId, [{ ...example, state: 'closed', merged: true }]).status, 'Merged · #5');
  assert.equal(resolveClaims(lessonId, [{ ...example, state: 'closed' }]).status, 'Closed unmerged · #5');
  assert.equal(resolveClaims(lessonId, []).status, 'Not started');
  assert.equal(resolveClaims(lessonId, [example, { ...example, number: 6 }]).status, 'Needs resolution');
});

test('bounded reports refuse malformed rows and escape Markdown', () => {
  const report = {
    repo: 'KiT-Maverik/svitlo', pr: 639, sha: 'a'.repeat(40),
    courseId, textbook: 'content/math', outsideHash: outsideHash(body), complete: false,
    allocated: true, lessons: [{
      lessonId, title: 'Escape | Markdown < unsafe', placements: ['alpha / introduction'],
      status: 'Reused / existing', pr: null, source: 'implemented',
    }], unresolved: [{ placement: 'direct', reason: 'Lesson UUID not allocated' }],
    diagnostics: [{ reason: 'Independent approval not verified' }],
  };
  assert.equal(validateReport(report), report);
  const markdown = renderLessonsBlock(report);
  assert.match(markdown, /INCOMPLETE/);
  assert.match(markdown, /Escape \\| Markdown/);
  assert.equal(replaceManagedBlock(body, markdown).includes('## Workflow\n- [ ] One'), true);
  assert.throws(() => renderLessonsBlock({ ...report, lessons: [{ ...report.lessons[0], pr: -1 }] }), /Invalid/);
});
