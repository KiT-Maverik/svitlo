/** Read-only, deterministic review projection of the canonical LessonV2 data model. */
import fs from 'node:fs';
import path from 'node:path';
import { resolveEntityPath } from '@svitlo/engine/build';

const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const pointer = parts => '/' + parts.map(part => String(part).replaceAll('~', '~0').replaceAll('/', '~1')).join('/');
const segment = (value, label) => {
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(value)) {
    throw new Error(`Invalid ${label}: ${String(value)}`);
  }
  return value;
};
const required = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing or blank ${label}`);
  return value;
};
const compact = value => JSON.stringify(value);

/** Traverse the published, slug-addressed order without accepting legacy positional Props. */
export function orderedLessonChildren(owner, label) {
  if (!isRecord(owner) || !Array.isArray(owner.children) ||
      new Set(owner.children).size !== owner.children.length)
    throw new Error(label + ' is missing valid ordered children');
  return owner.children.map(key => {
    if (typeof key !== 'string' || !/^[A-Za-z][A-Za-z0-9]*$/.test(key) ||
        !Object.hasOwn(owner, key) || !isRecord(owner[key]))
      throw new Error(label + ' has invalid child placement: ' + String(key));
    return owner[key];
  });
}

/** Extract the actual language registry rather than maintaining a duplicate list. */
export function supportedLanguages(repositoryRoot) {
  const source = fs.readFileSync(path.join(repositoryRoot, 'shared/engine/schemas/languages.schemas.ts'), 'utf8');
  const registry = source.match(/export\s+const\s+DEFAULT_SUPPORTED_LANGUAGES\s*=\s*\[([\s\S]*?)\]\s*as\s+const/);
  if (!registry) throw new Error('Cannot locate DEFAULT_SUPPORTED_LANGUAGES');
  const locales = [...registry[1].matchAll(/\blanguage:\s*['"]([^'"]+)['"]/g)].map(match => match[1]);
  if (!locales.length || new Set(locales).size !== locales.length)
    throw new Error('Invalid supported language registry');
  return locales;
}

/** Mirrors the runtime generator's field-level explicit fallback rules. */
export function localizeReviewValue(input, requested, allowedLanguages, knownLanguages = allowedLanguages) {
  const languages = new Set(allowedLanguages);
  const known = new Set(knownLanguages);
  if (!languages.has(requested)) throw new Error(`Unsupported requested language: ${requested}`);
  const sources = {};
  const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const ptr = parts => '/' + parts.map(part => String(part).replaceAll('~', '~0').replaceAll('/', '~1')).join('/');
  function visit(value, parts) {
    if (Array.isArray(value)) return value.map((item, index) => visit(item, [...parts, index]));
    if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) return value;
    if (!isObject(value)) throw new Error(`Unsupported value at ${ptr(parts)}`);
    const keys = Object.keys(value);
    if (keys.length === 2 && keys.includes('language') && keys.includes('value')) {
      throw new Error(`Legacy single-language fallback is not allowed at ${ptr(parts)}`);
    }
    const isLegacyFallback =
      keys.includes('fallback') &&
      keys.some(key => key !== 'fallback') &&
      keys.filter(key => key !== 'fallback').every(key => known.has(key));
    if (isLegacyFallback) throw new Error(`Field-level fallback is not allowed at ${ptr(parts)}`);
    const localized =
      keys.length > 0 &&
      keys.every(key => known.has(key)) &&
      Object.values(value).some(item => typeof item === 'string');
    if (localized) {
      const missing = [...languages].filter(code => !Object.hasOwn(value, code));
      const invalid = keys.filter(key => typeof value[key] !== 'string');
      const unexpected = keys.filter(key => !languages.has(key));
      if (missing.length || invalid.length || unexpected.length) {
        throw new Error(
          `Incomplete locale dictionary at ${ptr(parts)} (missing: ${missing.join(', ')}; unexpected: ${unexpected.join(', ')}; invalid: ${invalid.join(', ')})`,
        );
      }
      sources[ptr(parts)] = { code: requested };
      return value[requested];
    }
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, child]) => child !== undefined)
        .map(([key, child]) => [key, visit(child, [...parts, key])]),
    );
  }
  return { value: visit(input, []), sources };
}

/** Only search the lesson tree: no imports, eval, mutation, or JSX. */
export function sourceIndex(repositoryRoot, lessonRelativePath) {
  if (lessonRelativePath.split(/[\\/]/).includes('..') || path.isAbsolute(lessonRelativePath))
    throw new Error('Invalid lesson source directory');
  const lessonRoot = path.resolve(repositoryRoot, lessonRelativePath);
  if (!lessonRoot.startsWith(path.resolve(repositoryRoot, 'content') + path.sep))
    throw new Error('Invalid lesson source directory');
  const files = [];
  function walk(directory) {
    for (const entry of fs
      .readdirSync(directory, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      if (entry.isSymbolicLink()) throw new Error(`Symlink in lesson source tree: ${entry.name}`);
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && /\.tsx?$/.test(entry.name) && !/\.spec\.tsx?$/.test(entry.name)) {
        files.push({
          relative: path.relative(repositoryRoot, full).replaceAll(path.sep, '/'),
          text: fs.readFileSync(full, 'utf8'),
        });
      }
    }
  }
  walk(lessonRoot);
  return {
    files,
    hasFile(relative) {
      return fs.existsSync(path.join(repositoryRoot, relative));
    },
  };
}

export function renderLessonMarkdown({
  lesson,
  locale,
  languages,
  packagePath,
  sourceFiles,
  sourceRef = 'main',
  purpose = 'review',
}) {
  const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const escape = value =>
    String(value)
      .replaceAll('\r', '')
      .replace(/([\\`*_[\]<>|])/g, '\\$1');
  const headingText = value => escape(value).replaceAll('\n', ' ');
  const canonical = value => {
    if (typeof value !== 'string' || !value.trim()) throw new Error('Missing or invalid text');
    return value;
  };
  if (!record(lesson)) throw new Error('Lesson must be an object');
  if (!/^content\/[a-z][a-z0-9-]*$/.test(packagePath)) throw new Error('Invalid package path');
  const textbook = packagePath.slice('content/'.length);
  const relative = resolveEntityPath(canonical(lesson.id));
  const slug = segment(lesson.slug, 'lesson slug');
  const supported = lesson.params?.languages;
  if (
    !Array.isArray(supported) ||
    !supported.length ||
    supported.length !== new Set(supported).size ||
    supported.some(code => !languages.includes(code))
  ) {
    throw new Error('Missing, duplicate or unsupported lesson languages');
  }
  if (!supported.includes(locale)) throw new Error(`Lesson ${relative} does not support locale ${locale}`);
  if (Object.hasOwn(lesson, 'section') || Object.hasOwn(lesson, 'questions') ||
      Object.hasOwn(lesson, 'flashcards')) {
    throw new Error('Lesson must contain slug-addressed Section Data only; assessment banks are reviewed independently');
  }
  const sections = orderedLessonChildren(lesson, 'Lesson');
  if (!record(lesson.locale) || typeof lesson.locale.title !== 'string' || !lesson.locale.title.trim()) {
    throw new Error('Lesson Data must contain a resolved locale.title');
  }
  const localized = lesson;
  const lessonRoot = `${packagePath}/data/lessons/${relative}`;
  const files = sourceFiles?.files ?? [];
  const quoteRef = encodeURIComponent(sourceRef);
  const link = file =>
    `https://github.com/KiT-Maverik/svitlo/blob/${quoteRef}/${file.split('/').map(encodeURIComponent).join('/')}`;
  const source = (id, fallback) => {
    const found = files.find(file => file.text.includes(`'${id}'`) || file.text.includes(`"${id}"`));
    const target =
      found?.relative ??
      (files.some(file => file.relative === fallback)
        ? fallback
        : (files.find(file => file.relative.endsWith('.data.ts'))?.relative ?? fallback));
    return `[source](${link(target)})`;
  };
  const lines = [];
  const add = text => lines.push(text);
  const blockTypes = new Set([
    'text',
    'markdown',
    'checkpoint',
    // A Checkpoint publishes nested CheckpointItem Props; these are not top-level blocks.
    'checkpointItem',
    'code',
    'audio',
    'video',
    'youtube',
    'image',
    'carousel',
    'scene',
    'subtitles',
  ]);
  const mediaTypes = new Set(['image', 'audio', 'video', 'youtube', 'carousel']);
  const sourceEntry = `${lessonRoot}/index.ts`;
  function writeValue(label, value, depth = 0, fallback = sourceEntry) {
    const prefix = '  '.repeat(depth);
    const title = escape(label);
    if (value === undefined) return;
    if (Array.isArray(value)) {
      add(`${prefix}- **${title}** (${value.length})`);
      value.forEach((item, index) => writeValue(`${index + 1}`, item, depth + 1, fallback));
      return;
    }
    if (record(value)) {
      const type = value.type;
      if (typeof type === 'string' && Object.hasOwn(value, 'id') && Object.hasOwn(value, 'slug')) {
        if (!blockTypes.has(type)) throw new Error(`Unsupported content block type: ${type}`);
        add(
          `${prefix}- **${title} · ${escape(type)}** (\`${escape(value.slug)}\`, \`${escape(value.id)}\`; ${source(value.id, fallback)})`,
        );
        if (mediaTypes.has(type)) {
          add(
            `${prefix}  - *Media is not embedded. Paths, accessible descriptions, captions and display/fallback metadata are shown below.*`,
          );
        }
        const entries = Object.entries(value).filter(([key]) => !['id', 'slug', 'type'].includes(key));
        for (const [key, child] of entries) writeValue(key, child, depth + 1, fallback);
        return;
      }
      if (Object.keys(value).length === 0) {
        add(`${prefix}- **${title}:** (none)`);
        return;
      }
      add(`${prefix}- **${title}**`);
      for (const [key, child] of Object.entries(value)) writeValue(key, child, depth + 1, fallback);
      return;
    }
    if (typeof value === 'string') {
      if (value.includes('\n') || (label === 'locales' && value.includes('**'))) {
        add(`${prefix}- **${title}:**`);
        const fence = '~'.repeat(Math.max(4, ...(value.match(/~+/g) ?? []).map(run => run.length + 1)));
        add(`${prefix}  ${fence}${label === 'locales' ? 'markdown' : ''}`);
        for (const line of value.replaceAll('\r', '').split('\n')) add(`${prefix}  ${line}`);
        add(`${prefix}  ${fence}`);
      } else {
        add(`${prefix}- **${title}:** ${value === '' ? '*(empty)*' : escape(value)}`);
      }
      return;
    }
    if (value === null || typeof value === 'number' || typeof value === 'boolean') {
      add(`${prefix}- **${title}:** \`${String(value)}\``);
      return;
    }
    throw new Error(`Unsupported Lesson field: ${label}`);
  }

  add(`# ${headingText(localized.locale.title)}`);
  add('');
  add(`- Lesson: \`${lesson.id}\` (${headingText(slug)})`);
  add(`- Language: \`${locale}\` (supported: ${supported.map(code => `\`${code}\``).join(', ')})`);
  add(`- Canonical: ${source(lesson.id, sourceEntry)}`);
  add('- **Media representations:** descriptive metadata only; binary media and interactive Scenes are not rendered.');
  add('');
  if (localized.skills?.length) writeValue('Target Skills', localized.skills);
  if (localized.params) writeValue('Lesson parameters', { ...localized.params, languages: undefined });
  add('');
  add('## Lesson');
  add('');
  for (const [index, section] of sections.entries()) {
    if (!record(section) || typeof section.id !== 'string' || typeof section.slug !== 'string') {
      throw new Error(`Invalid section ${index + 1}`);
    }
    if (!record(section.locale) || typeof section.locale.title !== 'string') {
      throw new Error(`Section ${section.slug} is missing resolved locale.title`);
    }
    add(
      `### ${index + 1}. ${headingText(section.locale.title)} · ${headingText(section.slug)} (${headingText(section.type)})`,
    );
    add('');
    add(`- ID: \`${section.id}\``);
    add(`- Navigation: ${headingText(section.locale.navigationLabel)}`);
    add(`- Canonical: ${source(section.id, sourceEntry)}`);
    const blocks = orderedLessonChildren(section, 'Section ' + section.slug);
    for (const [key, value] of Object.entries(section)) {
      if (['id', 'slug', 'type', 'children', 'params'].includes(key) || section.children.includes(key)) continue;
      writeValue(key, value);
    }
    if (section.type === 'quiz') {
      if (!record(section.params)) throw new Error(`Quiz Section ${section.slug} is missing params`);
      add('- **Quiz references independently published Question UUIDs; answer contents are not embedded.**');
      writeValue('Quiz parameters and selected Question UUIDs', section.params);
      if (purpose === 'flashcards') {
        blocks.forEach((block, i) => writeValue(`Block ${i + 1}`, block));
      }
    } else {
      blocks.forEach((block, i) => writeValue(`Block ${i + 1}`, block));
      if (purpose === 'flashcards' && section.type === 'flashcards') {
        if (!record(section.params?.selection) || !Array.isArray(section.params.selection.flashcardIds))
          throw new Error('Flashcards Section is missing selected Flashcard UUIDs');
        writeValue('Selected independent Flashcard UUIDs', section.params.selection.flashcardIds);
      }
    }
    add('');
  }
  add('## Assessment resources');
  add('');
  add(
    'Question and Flashcard contents are published and reviewed independently; Section UUID selections appear above.',
  );
  add('');
  return lines.join('\n').trimEnd() + '\n';
}

export function inferBlockType(block) {
  if (!isRecord(block) || typeof block.type !== 'string') {
    throw new Error('Content blocks must declare a type discriminant');
  }
  return block.type;
}
