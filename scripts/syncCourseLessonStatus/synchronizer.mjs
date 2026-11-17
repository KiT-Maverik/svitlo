import { createHash } from 'node:crypto';

export const START = '<!-- svitlo-course-lessons:start -->';
export const END = '<!-- svitlo-course-lessons:end -->';
export const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
export const REPO = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
export const TEXTBOOK = /^content\/[a-z][a-z0-9-]*$/;
const SHA = /^[a-f0-9]{40}$/;

export function canonicalUUID(value) {
  if (typeof value !== 'string' || !UUID.test(value)) throw new Error('Invalid canonical UUID: ' + String(value).slice(0, 80));
  return value.toLowerCase();
}

function matchUnique(body, pattern, label) {
  const found = [...body.matchAll(pattern)];
  if (found.length !== 1) throw new Error('Expected exactly one ' + label);
  return found[0][1];
}

export function managedBounds(body) {
  if (typeof body !== 'string' || body.length > 1000000) throw new Error('Invalid Course PR description');
  const starts = body.split(START).length - 1;
  const ends = body.split(END).length - 1;
  if (starts !== 1 || ends !== 1) throw new Error('Missing, duplicated or imbalanced Lessons markers');
  const start = body.indexOf(START);
  const end = body.indexOf(END);
  if (end <= start) throw new Error('Misordered Lessons markers');
  return { start, end: end + END.length };
}

export function replaceManagedBlock(body, newBlock) {
  const { start, end } = managedBounds(body);
  if (typeof newBlock !== 'string' || !newBlock.startsWith(START + '\n') ||
      !newBlock.trimEnd().endsWith(END) || newBlock.length > 64000 ||
      newBlock.split(START).length !== 2 || newBlock.split(END).length !== 2) {
    throw new Error('Invalid replacement Lessons block');
  }
  return body.slice(0, start) + newBlock.trimEnd() + body.slice(end);
}

export function outsideHash(body) {
  const { start, end } = managedBounds(body);
  return createHash('sha256').update(body.slice(0, start) + body.slice(end)).digest('hex');
}

export function parseParent(body) {
  if (typeof body !== 'string' || body.split('<!-- svitlo-course-flow:v1 -->').length !== 2) {
    throw new Error('Exactly one Course Flow identity marker required');
  }
  managedBounds(body);
  const courseId = canonicalUUID(matchUnique(body, /^- Course UUID:\s*([0-9a-f-]+)\s*$/gim, 'Course UUID'));
  const textbook = matchUnique(body, /^- Textbook:\s*(content\/[a-z0-9-]+)\s*$/gm, 'textbook');
  if (!TEXTBOOK.test(textbook)) throw new Error('Invalid textbook package');
  const source = matchUnique(body, /^- Source plan:\s*(\S+)\s*$/gm, 'source plan');
  const expected = textbook + '/data/courses/' + courseId.slice(-1) + '/' + courseId + '/course.yaml';
  if (source !== expected && source !== expected.replace(/course\.yaml$/, 'config.yaml')) {
    throw new Error('Course source plan must point to its canonical UUID directory');
  }
  return { courseId, textbook, courseDirectory: textbook + '/data/courses/' + courseId.slice(-1) + '/' + courseId };
}

export function parseLessonClaim(body) {
  if (typeof body !== 'string' || !body.includes('<!-- svitlo-course-lesson:v1 -->')) return null;
  if (body.split('<!-- svitlo-course-lesson:v1 -->').length !== 2) throw new Error('Duplicated Lesson PR identity marker');
  return {
    courseId: canonicalUUID(matchUnique(body, /^Course:\s*([0-9a-f-]+)\s*$/gim, 'Lesson PR Course')),
    lessonId: canonicalUUID(matchUnique(body, /^Lesson:\s*([0-9a-f-]+)\s*$/gim, 'Lesson PR Lesson')),
    parentPr: Number(matchUnique(body, /^Parent PR:\s*#([1-9][0-9]*)\s*$/gm, 'Lesson PR parent')),
  };
}

const stringValue = v => typeof v === 'string' ? v : null;
const plainObject = v => v !== null && typeof v === 'object' && !Array.isArray(v);
function displayName(node, key) {
  const locale = node.locale?.title;
  return (stringValue(node.title) || stringValue(locale) || stringValue(locale?.en) ||
    stringValue(node.slug) || stringValue(node.key) || key).slice(0, 180);
}

/**
 * Static Course plan/technical Config traversal. No authored TypeScript evaluation.
 * Editorial nodes are typed {type,key,lessonId?,content:{items,order}};
 * technical nodes wrap identical placement semantics in {config:{...}}.
 */
export function collectInventory(document, mode, expectedId) {
  if (!['editorial', 'technical'].includes(mode)) throw new Error('Unsupported Course inventory format');
  if (!plainObject(document)) throw new Error('Course document must be a mapping');
  const root = mode === 'technical' ? document.config : (document.course ?? document);
  if (!plainObject(root)) throw new Error('Missing Course root');
  if (canonicalUUID(root.id) !== canonicalUUID(expectedId)) throw new Error('Course source UUID mismatch');
  const lessons = new Map();
  const unresolved = [];
  let allocated = false;
  function visit(collection, parents, depth) {
    if (collection == null) return;
    if (depth > 12 || !plainObject(collection) || !plainObject(collection.items) || !Array.isArray(collection.order)) {
      throw new Error('Invalid Course items/order collection');
    }
    const keys = Object.keys(collection.items);
    if (keys.length > 10000 || new Set(collection.order).size !== collection.order.length ||
        keys.length !== collection.order.length ||
        keys.some(k => !collection.order.includes(k))) throw new Error('Course items/order mismatch');
    for (const key of collection.order) {
      if (!/^[a-zA-Z][a-zA-Z0-9_-]{0,99}$/.test(key)) throw new Error('Unsafe Course placement key');
      const wrapper = collection.items[key];
      const node = mode === 'technical' ? wrapper?.config : (wrapper?.config ?? wrapper);
      if (!plainObject(node)) throw new Error('Missing Course node at ' + key);
      const placement = [...parents, key].join(' / ');
      if (node.type === 'module' || node.type === 'chapter') {
        visit(node.content, [...parents, key], depth + 1);
      } else if (node.type === 'lesson') {
        allocated = true;
        if (node.lessonId == null || node.lessonId === '') {
          unresolved.push({ placement, reason: 'Lesson UUID not allocated', title: displayName(node, key) });
          continue;
        }
        const id = canonicalUUID(node.lessonId);
        const previous = lessons.get(id);
        if (previous) previous.placements.push(placement);
        else lessons.set(id, { lessonId: id, title: displayName(node, key), placements: [placement] });
      } else if (node.type === 'episode') {
        // Episodes are separate, Course-owned narrative entities, never Lesson identity.
      } else {
        throw new Error('Unsupported Course node type at ' + placement + ': ' + String(node.type));
      }
    }
  }
  visit(root.content, [], 0);
  return { lessons: [...lessons.values()].map(x => ({ ...x, placements: x.placements.sort() }))
    .sort((a, b) => a.lessonId.localeCompare(b.lessonId)), unresolved, allocated };
}

export function sameInventory(a, b) {
  return JSON.stringify(a.lessons.map(x => [x.lessonId, x.placements])) ===
    JSON.stringify(b.lessons.map(x => [x.lessonId, x.placements])) &&
    JSON.stringify(a.unresolved) === JSON.stringify(b.unresolved);
}

export function resolveClaims(lessonId, claims) {
  const matches = claims.filter(p => p.lessonId === lessonId).sort((a, b) => a.number - b.number);
  const active = matches.filter(p => p.state === 'open');
  if (active.length > 1) return { status: 'Needs resolution', pr: null,
    diagnostic: 'Multiple active implementation PRs: ' + active.map(p => '#' + p.number).join(', ') };
  const current = active[0] ?? [...matches].filter(p => p.merged).at(-1) ??
    [...matches].filter(p => p.state === 'closed').at(-1);
  if (!current) return { status: 'Not started', pr: null, diagnostic: null };
  if (current.state === 'open') return { status: (current.draft ? 'Draft' : 'Open') + ' · #' + current.number,
    pr: current.number, diagnostic: null };
  if (current.merged) return { status: 'Merged · #' + current.number, pr: current.number, diagnostic: null };
  return { status: 'Closed unmerged · #' + current.number, pr: current.number,
    diagnostic: 'Historical closed-unmerged PR; verify replacement or restart' };
}

function escaped(value) {
  return String(value ?? '').slice(0, 500).replace(/[\r\n\t\x00-\x1f\x7f]/g, ' ')
    .replace(/[\\|<>&*_\[\]()!#]/g, '\\$&')
    .replaceAll(String.fromCharCode(96), '\\' + String.fromCharCode(96));
}
function verifiedString(value, max = 500) {
  return typeof value === 'string' && value.length <= max && !/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(value);
}

export function validateReport(report) {
  if (!plainObject(report) || !REPO.test(report.repo) ||
      !Number.isSafeInteger(report.pr) || report.pr < 1 ||
      !SHA.test(report.sha) || !UUID.test(report.courseId) ||
      !TEXTBOOK.test(report.textbook) || !/^[a-f0-9]{64}$/.test(report.outsideHash) ||
      !Array.isArray(report.lessons) || report.lessons.length > 1000 ||
      !Array.isArray(report.unresolved) || report.unresolved.length > 1000 ||
      !Array.isArray(report.diagnostics) || report.diagnostics.length > 100 ||
      typeof report.complete !== 'boolean' || typeof report.allocated !== 'boolean') {
    throw new Error('Invalid Course status report');
  }
  const ids = new Set();
  for (const row of report.lessons) {
    if (!plainObject(row) || !UUID.test(row.lessonId) || ids.has(row.lessonId) ||
        !verifiedString(row.title, 180) || !Array.isArray(row.placements) ||
        !row.placements.length || row.placements.length > 100 ||
        !row.placements.every(x => verifiedString(x, 500)) ||
        !['implemented', 'editorial-draft', 'absent', 'unverified'].includes(row.source) ||
        !verifiedString(row.status, 150) ||
        !(row.pr === null || (Number.isSafeInteger(row.pr) && row.pr > 0))) {
      throw new Error('Invalid Lesson status row');
    }
    ids.add(row.lessonId);
  }
  for (const d of [...report.unresolved, ...report.diagnostics]) {
    if (!plainObject(d) || !verifiedString(d.reason, 500) ||
        (d.placement !== undefined && !verifiedString(d.placement, 500))) throw new Error('Invalid status diagnostic');
  }
  return report;
}

export function renderLessonsBlock(report) {
  validateReport(report);
  const count = { pending: 0, active: 0, merged: 0, reused: 0, unresolved: report.unresolved.length };
  const rows = [];
  for (const lesson of report.lessons) {
    if (lesson.status === 'Needs resolution') count.unresolved++;
    else if (lesson.status.startsWith('Draft') || lesson.status.startsWith('Open')) count.active++;
    else if (lesson.status.startsWith('Merged')) count.merged++;
    else if (lesson.status === 'Reused / existing') count.reused++;
    else count.pending++;
    const label = lesson.pr ? '[' + escaped(lesson.status) + '](https://github.com/' +
      report.repo + '/pull/' + lesson.pr + ')' : escaped(lesson.status);
    rows.push('| ' + escaped(lesson.title) + ' | ' + lesson.lessonId + ' | ' +
      lesson.placements.map(escaped).join('; ') + ' | ' + label + ' | ' + escaped(lesson.source) + ' |');
  }
  const out = [START, '## Lessons', '', 'Inventory SHA: ' + report.sha, '',
    'Coverage: **' + (report.complete ? 'complete' : 'INCOMPLETE') + '** · ' +
    'Unique Lessons: **' + report.lessons.length + '** · Pending: ' + count.pending +
    ' · Draft/open: ' + count.active + ' · Merged PR: ' + count.merged +
    ' · Reused: ' + count.reused + ' · Unresolved: ' + count.unresolved, ''];
  if (!report.allocated && !report.lessons.length) out.push('Lesson inventory not allocated yet.', '');
  if (rows.length) out.push('| Lesson | UUID | Module / Chapter placement(s) | Production PR status | Source/readiness |',
    '| --- | --- | --- | --- | --- |', ...rows, '');
  if (report.unresolved.length) {
    out.push('### Unallocated Lesson slots', '');
    for (const u of report.unresolved.slice(0, 20)) out.push('- ' + escaped(u.placement) + ': ' + escaped(u.reason));
    out.push('');
  }
  if (report.diagnostics.length) {
    out.push('### Diagnostics / next actions', '');
    for (const d of report.diagnostics.slice(0, 20)) out.push('- ' + escaped(d.reason));
    out.push('');
  }
  out.push('A merged PR is not proof of Lesson editorial approval, translation coverage or runtime readiness.', END);
  const text = out.join('\n');
  if (text.length > 64000) throw new Error('Course inventory exceeds managed block limit');
  return text;
}
