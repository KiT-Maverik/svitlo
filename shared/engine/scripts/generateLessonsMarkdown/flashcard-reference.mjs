/**
 * Flashcard-authoring supplement to the canonical Lesson review Markdown.
 * Read-only: only resolved Lesson Props, directly referenced media and documents
 * adjacent to the selected Lesson's own TS modules are considered.
 */
import fs from 'node:fs';
import path from 'node:path';

const tick = String.fromCharCode(96);
const UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
const extensions = {
  images: 'svg|png|jpg|jpeg|webp|gif|avif',
  audio: 'mp3|wav|ogg|m4a|flac',
  video: 'mp4|webm',
  subtitles: 'vtt|srt',
};
const mediaTypes = {
  image: [['src', 'images', 'image']],
  audio: [['fileLocation', 'audio', 'audio']],
  video: [
    ['fileLocation', 'video', 'video'],
    ['poster', 'images', 'poster image'],
  ],
  subtitles: [['fileLocation', 'subtitles', 'subtitles']],
  youtube: [['href', null, 'external video']],
};
const isObject = value => value && typeof value === 'object' && !Array.isArray(value);
const clean = value =>
  String(value)
    .replaceAll('\r', '')
    .replaceAll('\\', '\\\\')
    .replaceAll(tick, '\\' + tick)
    .replace(/([*_[\]<>|])/g, '\\$1')
    .replaceAll('\n', ' ');
const code = value => {
  const text = String(value);
  const fence = tick.repeat(Math.max(1, ...(text.match(/`+/g) ?? []).map(run => run.length + 1)));
  return fence + (text.includes(tick) ? ' ' : '') + text + (text.includes(tick) ? ' ' : '') + fence;
};
const sourceLink = (sha, relative) =>
  'https://github.com/KiT-Maverik/svitlo/blob/' + sha + '/' + relative.split('/').map(encodeURIComponent).join('/');

function readSourceFile(root, relative, maxBytes = 65536) {
  if (typeof relative !== 'string' || relative.startsWith('/') || relative.split('/').includes('..')) {
    throw new Error('Unsafe Lesson reference path');
  }
  const absolute = path.join(root, relative);
  let cursor = path.resolve(root);
  for (const component of relative.split('/')) {
    cursor = path.join(cursor, component);
    if (!fs.existsSync(cursor)) return null;
    if (fs.lstatSync(cursor).isSymbolicLink()) throw new Error('Symlinked Lesson reference: ' + relative);
  }
  const stat = fs.statSync(absolute);
  if (!stat.isFile()) return null;
  if (stat.size > maxBytes) throw new Error('Oversized Lesson reference document: ' + relative);
  return fs.readFileSync(absolute, 'utf8');
}

function sourceForBlock(block, sourceFiles) {
  const quoted = ["'" + block.id + "'", '"' + block.id + '"'];
  return (sourceFiles.files ?? [])
    .filter(file => quoted.some(q => file.text.includes(q)))
    .sort((a, b) => b.relative.length - a.relative.length || a.relative.localeCompare(b.relative, 'en'))[0]?.relative;
}

function parseReference(value, kind, book, root, verifyAtSha) {
  if (typeof value !== 'string' || !value.trim()) return { status: 'Missing reference' };
  if (/^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Invalid URL');
      return { status: 'External authored URL (network existence not verified)', remote: value };
    } catch {
      return { status: 'Invalid external URL', raw: value };
    }
  }
  if (!kind) return { status: 'Non-HTTP external source; cannot verify', raw: value };
  const expected = new RegExp('^(' + UUID + ')\\.(' + extensions[kind] + ')$', 'i');
  const prefix = '/textbooks/' + book + '/assets/' + kind + '/';
  const candidate = value.startsWith(prefix) ? value.slice(prefix.length) : value;
  const match = expected.exec(candidate);
  if (!match) return { status: 'Noncanonical local/display reference (no media UUID inferred)', raw: value };
  const name = match[0];
  const relative = 'content/' + book + '/assets/' + kind + '/' + name;
  const actual = path.join(root, relative);
  let exists = true;
  let cursor = path.resolve(root);
  for (const component of relative.split('/')) {
    cursor = path.join(cursor, component);
    if (!fs.existsSync(cursor)) {
      exists = false;
      break;
    }
    if (fs.lstatSync(cursor).isSymbolicLink()) throw new Error('Symlinked referenced media: ' + relative);
  }
  if (exists) exists = fs.statSync(actual).isFile();
  const unresolved = match[1] === '00000000-0000-0000-0000-000000000000';
  const committed = !unresolved && typeof verifyAtSha === 'function' && verifyAtSha(relative);
  const status = unresolved
    ? 'Unresolved scaffold filename; not a produced resource'
    : exists && committed
      ? 'File on disk and present at source SHA'
      : exists
        ? 'File on disk; not confirmed at source SHA'
        : committed
          ? 'Present at source SHA, unavailable in working tree'
          : 'Referenced file missing or uncommitted';
  return { status, relative, name, uuid: match[1], exists, committed };
}

function learningContext(block) {
  if (!isObject(block)) return '';
  const text =
    block.type === 'code'
      ? block.params?.codeAsText
      : (block.locale?.value ??
        block.locale?.description ??
        block.locale?.caption ??
        block.locale?.alt ??
        block.locale?.title ??
        block.locale?.label);
  if (typeof text !== 'string') return '';
  return text.replace(/\s+/g, ' ').trim().slice(0, 220);
}

function documentBlock(lines, label, content) {
  const runs = content.match(/~+/g) ?? [];
  const fence = '~'.repeat(Math.max(4, ...runs.map(run => run.length + 1)));
  lines.push(label, '', fence + 'markdown', content.trimEnd(), fence, '');
}

/** Render only additional evidence useful to Question/Flashcard designers. */
export function renderFlashcardReference({
  lesson,
  locale,
  packagePath,
  sourceFiles,
  sourceRef,
  root,
  lessonDirectory,
  sourceBranch,
  verifyAtSha,
}) {
  if (!/^[0-9a-f]{40}$/.test(sourceRef)) throw new Error('Flashcard reference requires an exact Git source SHA');
  if (!isObject(lesson) || !Array.isArray(lesson.section)) throw new Error('Missing built Lesson sections');
  const book = packagePath.slice('content/'.length);
  const lessonRoot = path.relative(root, lessonDirectory).split(path.sep).join('/');
  if (!lessonRoot.startsWith(packagePath + '/data/lessons/')) throw new Error('Unexpected Lesson directory');
  const lines = [
    '## Flashcard authoring reference',
    '',
    '- **Provenance:** derived from the typed Lesson Configurator; not an independent editorial source.',
    '- **Source SHA:** ' + code(sourceRef),
    '- **Source branch:** ' + code(sourceBranch || '(detached HEAD)'),
    '- **Textbook:** ' + code(packagePath),
    '- **Lesson UUID:** ' + code(lesson.id),
    '- **Lesson slug:** ' + code(lesson.slug),
    '- **Effective locale:** ' + code(locale),
    '- **Declared Lesson languages:** ' + (lesson.params.languages ?? []).map(code).join(', '),
    '- **Content build status:** resolved typed Lesson Props; media readiness and editorial approval are separate.',
    '- **Reference completeness:** pending media checks.',
    '',
    '### Methodological reference',
    '',
  ];
  const methodologyPath = lessonRoot + '/methodology.md';
  const methodology = readSourceFile(root, methodologyPath);
  if (methodology === null) {
    lines.push(
      'No canonical ' +
        code('methodology.md') +
        ' exists in this Lesson directory. Objectives, prerequisites and review approval cannot be inferred.',
      '',
    );
  } else {
    lines.push(
      'Verbatim canonical methodology (' +
        '[source](' +
        sourceLink(sourceRef, methodologyPath) +
        ')' +
        '); its presence does not certify approval:',
      '',
    );
    documentBlock(lines, '', methodology);
  }
  lines.push(
    '### Directly referenced media reuse candidates',
    '',
    'Only media referenced by the resolved Lesson and locale are listed. Labels are evidence from authored fields, not automatic recognition of images or sounds.',
    '',
  );

  let occurrences = 0;
  let missingMedia = 0;
  const seen = new Set();
  for (const section of lesson.section) {
    if (!isObject(section)) throw new Error('Malformed Lesson Section');
    if (!Array.isArray(section.content)) throw new Error('Section is missing ordered content: ' + section.slug);
    function visit(block, ancestry, index, siblings) {
      if (!isObject(block) || typeof block.type !== 'string' || typeof block.id !== 'string')
        throw new Error('Malformed referenced ContentBlock in Section ' + section.slug);
      const owner = ancestry.length ? ancestry.join(' / ') + ' / ' + block.slug : block.slug;
      const before = siblings.slice(0, index).reverse().map(learningContext).find(Boolean);
      const after = siblings
        .slice(index + 1)
        .map(learningContext)
        .find(Boolean);
      const fields = mediaTypes[block.type] ?? [];
      const blockSource = sourceForBlock(block, sourceFiles);
      const specPath = blockSource ? path.posix.join(path.posix.dirname(blockSource), 'specification.md') : null;
      const spec = specPath ? readSourceFile(root, specPath, 24576) : null;
      for (const [field, kind, role] of fields) {
        const raw = block.locale?.[field];
        const key = [section.id, ancestry.join('/'), block.id, field, raw].join('|');
        if (seen.has(key)) continue;
        seen.add(key);
        occurrences++;
        if (occurrences > 256) throw new Error('Too many Lesson media occurrences for one reference');
        const resource = parseReference(raw, kind, book, root, verifyAtSha);
        if (!resource.committed && !resource.remote) missingMedia++;
        const authored = ['alt', 'caption', 'title', 'label', 'description']
          .filter(name => typeof block.locale?.[name] === 'string' && block.locale[name].trim())
          .map(name => name + ': ' + clean(block.locale[name]));
        lines.push('#### ' + occurrences + '. ' + clean(role) + ' — ' + clean(owner), '');
        lines.push(
          '- Section: ' + code(section.slug) + ' (' + code(section.id) + ')',
          '- Owning block: ' + code(block.slug) + ' (' + code(block.id) + '), type ' + code(block.type),
          '- Block source: ' +
            (blockSource ? '[source](' + sourceLink(sourceRef, blockSource) + ')' : 'not located in Lesson TS sources'),
          '- Resolved locale: ' + code(locale) + '; field: ' + code('locale.' + field),
          '- Reference status: ' + clean(resource.status),
        );
        if (resource.uuid) {
          lines.push(
            '- **Media resource UUID (not the block UUID):** ' + code(resource.uuid),
            '- Resource filename: ' + code(resource.name),
            '- Repository media path: ' +
              (resource.committed
                ? '[file](' + sourceLink(sourceRef, resource.relative) + ')'
                : code(resource.relative) + ' (not verified at source SHA)'),
          );
        } else if (resource.remote) {
          lines.push('- Authored external reference: ' + code(resource.remote));
        } else if (resource.raw) {
          lines.push('- Exact authored display/reference value: ' + code(resource.raw));
        }
        lines.push(
          '- Teaching Section: ' + clean(section.locale?.title || section.slug),
          '- Previous instructional context: ' + (before ? clean(before) : 'not authored as nearby text'),
          '- Following instructional context: ' + (after ? clean(after) : 'not authored as nearby text'),
        );
        for (const item of authored) lines.push('- Authored ' + item);
        if (spec !== null)
          lines.push('- Media production specification: [source](' + sourceLink(sourceRef, specPath) + ')');
        lines.push(
          '- Active-recall stimulus: ' +
            (authored.length || spec !== null
              ? 'candidate only, supported by authored metadata/specification; human review required'
              : 'undetermined; no semantic description was authored'),
          '',
        );
        if (spec !== null) documentBlock(lines, 'Referenced production specification:', spec);
      }
      if (block.type === 'scene') {
        // A Scene is a code-driven interaction, not an inferred physical media file.
        lines.push(
          '#### Scene source — ' + clean(owner),
          '',
          '- Scene block UUID: ' + code(block.id),
          '- Source: ' + (blockSource ? '[source](' + sourceLink(sourceRef, blockSource) + ')' : 'not located'),
          '- Source locale: ' + code(locale),
          '- Embedded Scene media: not inferred from opaque Scene Props; inspect the actual Scene implementation.',
          '',
        );
        if (spec !== null)
          documentBlock(
            lines,
            'Referenced Scene specification: [source](' + sourceLink(sourceRef, specPath) + ')',
            spec,
          );
      }
      if (block.type === 'carousel') {
        const slides = block.locale?.slides;
        if (!Array.isArray(slides)) throw new Error('Carousel is missing resolved slides: ' + block.slug);
        slides.forEach((child, n) => visit(child, [...ancestry, block.slug], n, slides));
      }
      if (block.type === 'checkpoint') {
        if (!Array.isArray(block.content)) throw new Error('Checkpoint is missing resolved items: ' + block.slug);
        block.content.forEach(item => {
          if (!isObject(item) || item.type !== 'checkpointItem' || !Array.isArray(item.answer))
            throw new Error('Invalid Checkpoint Item in ' + block.slug);
          const elements = [item.question, ...item.answer];
          elements.forEach((child, n) => visit(child, [...ancestry, block.slug, item.slug], n, elements));
        });
      }
    }
    section.content.forEach((block, index, blocks) => visit(block, [], index, blocks));
  }
  if (occurrences === 0) lines.push('No directly referenced media found in this Lesson locale.', '');
  const completeness = missingMedia
    ? 'incomplete media evidence (' +
      missingMedia +
      ' missing/unverified reference(s)); full instructional text remains above'
    : 'all listed local media verified at SHA; external source availability not checked';
  lines[11] = '- **Reference completeness:** ' + completeness;
  lines.push(
    '### Independent assessment references',
    '',
    'Questions and Flashcards are published separately. The Lesson only selects existing UUIDs; no bank contents or approval is implied.',
    '',
  );
  for (const section of lesson.section) {
    const ids =
      section.type === 'quiz'
        ? section.params?.selection?.questionIds
        : section.type === 'flashcards'
          ? section.params?.selection?.flashcardIds
          : null;
    if (ids) {
      if (!Array.isArray(ids) || !ids.every(id => typeof id === 'string'))
        throw new Error('Invalid assessment selection in Section ' + section.slug);
      lines.push(
        '- ' +
          clean(section.type) +
          ' Section ' +
          code(section.slug) +
          ' (' +
          code(section.id) +
          '): ' +
          ids.map(code).join(', '),
      );
    }
  }
  lines.push('');
  const output = lines.join('\n').trimEnd() + '\n';
  if (Buffer.byteLength(output, 'utf8') > 2 * 1024 * 1024)
    throw new Error('Flashcard reference exceeds the maximum output size');
  return output;
}
