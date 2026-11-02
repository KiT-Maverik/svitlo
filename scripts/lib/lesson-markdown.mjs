/** Read-only, deterministic review projection of the canonical LessonV2 data model. */
import fs from 'node:fs';
import path from 'node:path';

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

/** Extract the actual language registry rather than maintaining a duplicate list. */
export function supportedLanguages(repositoryRoot) {
  const source = fs.readFileSync(path.join(repositoryRoot, 'shared/contracts/src/types/languages.ts'), 'utf8');
  const registry = source.match(/export\s+const\s+DEFAULT_SUPPORTED_LANGUAGES\s*=\s*\[([\s\S]*?)\]\s*as\s+const/);
  if (!registry) throw new Error('Cannot locate DEFAULT_SUPPORTED_LANGUAGES');
  const locales = [...registry[1].matchAll(/\blanguage:\s*['"]([^'"]+)['"]/g)].map(match => match[1]);
  if (!locales.length || new Set(locales).size !== locales.length) throw new Error('Invalid supported language registry');
  return locales;
}

/** Mirrors the runtime generator's field-level explicit fallback rules. */
export function localizeReviewValue(input, requested, allowedLanguages) {
  const allowed = new Set(allowedLanguages);
  if (!allowed.has(requested)) throw new Error(`Unsupported requested language: ${requested}`);
  const sources = {};
  function visit(value, parts) {
    if (Array.isArray(value)) return value.map((item, index) => visit(item, [...parts, index]));
    if (!isRecord(value)) {
      if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) return value;
      throw new Error(`Unsupported value at ${pointer(parts)}`);
    }
    const keys = Object.keys(value);
    if (keys.length === 2 && keys.includes('language') && keys.includes('value')) {
      if (!allowed.has(value.language) || typeof value.value !== 'string' || !value.value.trim()) {
        throw new Error(`Invalid single-language value at ${pointer(parts)}`);
      }
      sources[pointer(parts)] = value.language === requested ? { code: requested } : { code: value.language, isFallback: true };
      return value.value;
    }
    const fallbackPresent = Object.hasOwn(value, 'fallback');
    const localeKeys = keys.filter(key => key !== 'fallback');
    const looksLocalized = fallbackPresent || (keys.length > 0 && keys.every(key => allowed.has(key) && typeof value[key] === 'string'));
    if (looksLocalized) {
      if (!localeKeys.length || localeKeys.some(key => !allowed.has(key) || typeof value[key] !== 'string' || !value[key].trim())) {
        throw new Error(`Invalid locale dictionary at ${pointer(parts)}`);
      }
      if (fallbackPresent && (typeof value.fallback !== 'string' || !allowed.has(value.fallback) || typeof value[value.fallback] !== 'string')) {
        throw new Error(`Invalid fallback at ${pointer(parts)}`);
      }
      const code = Object.hasOwn(value, requested) ? requested : value.fallback;
      if (typeof code !== 'string' || typeof value[code] !== 'string') throw new Error(`Missing ${requested} locale at ${pointer(parts)}`);
      sources[pointer(parts)] = code === requested ? { code } : { code, isFallback: true };
      return value[code];
    }
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, visit(child, [...parts, key])]));
  }
  return { value: visit(input, []), sources };
}

/** Only search the lesson tree: no imports, eval, mutation, or JSX. */
export function sourceIndex(repositoryRoot, lessonRelativePath) {
  if (lessonRelativePath.split(/[\\/]/).includes('..') || path.isAbsolute(lessonRelativePath)) throw new Error('Invalid lesson source directory');
  const lessonRoot = path.resolve(repositoryRoot, lessonRelativePath);
  if (!lessonRoot.startsWith(path.resolve(repositoryRoot, 'learningApps') + path.sep)) throw new Error('Invalid lesson source directory');
  const files = [];
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      if (entry.isSymbolicLink()) throw new Error(`Symlink in lesson source tree: ${entry.name}`);
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && /\.tsx?$/.test(entry.name) && !/\.spec\.tsx?$/.test(entry.name)) {
        files.push({ relative: path.relative(repositoryRoot, full).replaceAll(path.sep, '/'), text: fs.readFileSync(full, 'utf8') });
      }
    }
  }
  walk(lessonRoot);
  return { files, hasFile(relative) { return fs.existsSync(path.join(repositoryRoot, relative)); } };
}

export function renderLessonMarkdown({ lesson, locale, languages, packagePath, sourceFiles, sourceRef = 'new-lesson' }) {
  if (!isRecord(lesson)) throw new Error('Lesson must be an object');
  const textbook = segment(packagePath.split('/')[1], 'textbook');
  if (packagePath !== `learningApps/${textbook}`) throw new Error('Invalid package path');
  const group = segment(lesson.group, 'lesson group');
  if (!/^\d+$/.test(group)) throw new Error('Lesson group must be numbered');
  const slug = segment(lesson.slug, 'lesson slug');
  required(lesson.id, 'lesson id');
  if (!isRecord(lesson.parameters) || !Array.isArray(lesson.parameters.languages) || !lesson.parameters.languages.length) {
    throw new Error('Missing lesson parameters.languages');
  }
  if (new Set(lesson.parameters.languages).size !== lesson.parameters.languages.length || lesson.parameters.languages.some(code => !languages.includes(code))) {
    throw new Error('Duplicate or unsupported lesson languages');
  }
  if (!lesson.parameters.languages.includes(locale)) throw new Error(`Lesson ${group}/${slug} does not support locale ${locale}`);
  if (!isRecord(lesson.sections) || !Object.keys(lesson.sections).length || !isRecord(lesson.questions) || !Array.isArray(lesson.flashcards)) {
    throw new Error(`Lesson ${group}/${slug} is missing sections, questions, or flashcards`);
  }
  const { value: localized, sources } = localizeReviewValue(lesson, locale, lesson.parameters.languages);
  const lessonPath = `${packagePath}/data/lessons/${group}/${slug}`;
  const entry = `${lessonPath}/${slug}.data.ts`;
  const files = sourceFiles?.files ?? [];
  const link = file => `https://github.com/KiT-Maverik/svitlo-web/blob/${encodeURIComponent(sourceRef)}/${file.split('/').map(encodeURIComponent).join('/')}`;
  const source = (id, fallback = entry) => {
    const match = typeof id === 'string' ? files.find(file => file.text.includes(`'${id}'`) || file.text.includes(`"${id}"`)) : null;
    const file = match?.relative ?? fallback;
    return `[source](${link(file)})`;
  };
  const lines = [];
  const add = (...items) => lines.push(...items);
  const inline = value => required(value, 'localized text').replaceAll('\r', '').replaceAll('\n', ' ').replace(/([\\`*_[\]<>|])/g, '\\$1');
  const note = parts => {
    const origin = sources[pointer(parts)];
    if (!origin) throw new Error(`Missing localization source at ${pointer(parts)}`);
    return origin.isFallback ? ` **[source: ${origin.code}; fallback for ${locale}]**` : '';
  };
  const phrase = (value, parts) => `${inline(value)}${note(parts)}`;
  const heading = (level, text) => add(`${'#'.repeat(level)} ${text}`, '');
  const emitText = (label, value, parts, blockMarkdown = false) => {
    add(`**${label}**${note(parts)}`, '');
    required(value, label);
    if (blockMarkdown) add(value.trimEnd(), '');
    else add(value, '');
  };
  const metadata = (object, omit) => {
    const entries = Object.entries(object).filter(([k, v]) => !omit.includes(k) && v !== undefined && v !== null);
    for (const [k, v] of entries) add(`- ${k}: ${typeof v === 'string' ? `\`${inline(v)}\`` : `\`${compact(v)}\``}`);
    if (entries.length) add('');
  };
  const listSceneTexts = (value, parts, keys = []) => {
    if (typeof value === 'string') {
      emitText(keys.join('.') || 'scene text', value, parts);
    } else if (isRecord(value)) {
      for (const [k, child] of Object.entries(value)) listSceneTexts(child, [...parts, k], [...keys, k]);
    } else if (Array.isArray(value)) {
      value.forEach((child, index) => listSceneTexts(child, [...parts, index], [...keys, index]));
    } else throw new Error(`Invalid scene-localized text at ${pointer(parts)}`);
  };
  function emitBlock(block, type, parts, title, fallback) {
    if (!isRecord(block)) throw new Error(`Invalid ${type} block at ${pointer(parts)}`);
    const id = required(block.id, `${type} id`);
    heading(4, `${title} · ${type}`);
    add(`- ID: \`${inline(id)}\``, `- Slug: \`${inline(block.slug ?? title)}\``, `- Type: \`${type}\``, `- Canonical: ${source(id, fallback)}`, '');
    switch (type) {
      case 'text': emitText('Text', block.value, [...parts, 'value']); break;
      case 'markdown': {
        const field = block.text === undefined ? 'locales' : 'text';
        const textPath = [...parts, field];
        if (parts[0] === 'sections' && parts[2] === 'content') {
          const origin = sources[pointer(textPath)];
          const markdownFile = `${lessonPath}/sections/${parts[1]}/markdown/${parts[4]}/${origin?.code ?? locale}.md`;
          if (sourceFiles?.hasFile?.(markdownFile)) add(`- Localized Markdown file: [${origin?.code ?? locale}.md](${link(markdownFile)})`, '');
        }
        emitText('Markdown', block.text ?? block.locales, textPath, true);
        break;
      }
      case 'checkpoint': {
        emitText('Title', block.title, [...parts, 'title']);
        if (!Array.isArray(block.items)) throw new Error(`Invalid checkpoint items at ${pointer(parts)}`);
        block.items.forEach((item, i) => {
          if (!isRecord(item) || !Array.isArray(item.answer) || !item.answer.length) throw new Error(`Invalid checkpoint answer at ${pointer([...parts, 'items', i])}`);
          add(`**Item ${i + 1} — ${phrase(item.question, [...parts, 'items', i, 'question'])}**`, '');
          item.answer.forEach((answer, j) => emitBlock(answer, inferBlockType(answer), [...parts, 'items', i, 'answer', j], `Answer ${i + 1}.${j + 1}`, fallback));
        });
        break;
      }
      case 'quiz': {
        emitText('Welcome', block.welcome, [...parts, 'welcome']);
        if (!isRecord(block.questions) || !Object.keys(block.questions).length) throw new Error(`Empty quiz questions at ${pointer(parts)}`);
        Object.entries(block.questions).forEach(([key, q], index) => emitQuestion(q, key, [...parts, 'questions', key], index + 1, fallback));
        metadata(block, ['id', 'slug', 'welcome', 'questions', 'type', 'locale']);
        break;
      }
      case 'scene': {
        const texts = block.locales ?? block.locale;
        if (!isRecord(texts)) throw new Error(`Missing scene localized data at ${pointer(parts)}`);
        add('Custom scene: implementation referenced in canonical definition; JSX is intentionally not rendered.', '');
        listSceneTexts(texts, [...parts, block.locales ? 'locales' : 'locale']);
        metadata(block, ['id', 'slug', 'locales', 'locale', 'type']);
        break;
      }
      case 'image':
      case 'video':
      case 'audio':
      case 'youtube':
      case 'code': {
        add('Media/code reference (not rendered).', '');
        for (const field of ['title', 'description', 'hint', 'alt', 'src', 'href', 'fileLocation', 'poster']) {
          if (typeof block[field] === 'string') {
            if (sources[pointer([...parts, field])]) emitText(field, block[field], [...parts, field]);
            else add(`- ${field}: \`${inline(block[field])}\``);
          }
        }
        metadata(block, ['id', 'slug', 'type', 'locale', 'title', 'description', 'hint', 'alt', 'src', 'href', 'fileLocation', 'poster']);
        break;
      }
      default: throw new Error(`Unsupported content block type: ${type}`);
    }
  }
  const seenQuestions = new Set();
  function emitQuestion(question, key, parts, index, fallback) {
    if (!isRecord(question)) throw new Error(`Invalid question ${key}`);
    const id = required(question.id, `question ${key} id`);
    const type = question.type ?? 'selectOneAnswer';
    if (seenQuestions.has(id)) return;
    seenQuestions.add(id);
    heading(5, `Question ${index}: ${key} · ${type}`);
    add(`- ID: \`${inline(id)}\``, `- Slug: \`${inline(question.slug ?? key)}\``, `- Canonical: ${source(id, fallback)}`, '');
    if (!Array.isArray(question.question) || !question.question.length) throw new Error(`Missing question content: ${key}`);
    for (const [i, block] of question.question.entries()) emitBlock(block, inferBlockType(block), [...parts, 'question', i], `Prompt ${i + 1}`, fallback);
    if (isRecord(question.answers)) {
      for (const [category, answers] of Object.entries(question.answers)) {
        if (!isRecord(answers)) throw new Error(`Invalid answer category ${category}`);
        for (const [answerKey, block] of Object.entries(answers)) {
          emitBlock(block, inferBlockType(block), [...parts, 'answers', category, answerKey], `${category} answer: ${answerKey}`, fallback);
        }
      }
    }
    for (const kind of ['explanation', 'hint']) {
      if (question[kind] !== undefined) {
        if (!Array.isArray(question[kind])) throw new Error(`Invalid ${kind} for question ${key}`);
        question[kind].forEach((block, i) => emitBlock(block, inferBlockType(block), [...parts, kind, i], `${kind} ${i + 1}`, fallback));
      }
    }
    metadata(question, ['id', 'slug', 'type', 'question', 'answers', 'explanation', 'hint', 'locale']);
  }

  heading(1, inline(localized.title));
  add(`- Entity: \`lesson\``, `- ID: \`${inline(lesson.id)}\``, `- Group / slug: \`${group}/${slug}\``, `- Requested language: \`${locale}\``, `- Canonical: ${source(lesson.id)}`);
  const fallbackCodes = [...new Set(Object.values(sources).filter(v => v.isFallback).map(v => v.code))];
  add(`- Source languages: ${fallbackCodes.length ? fallbackCodes.map(v => `\`${v}\` (explicit fallback)`).join(', ') : `\`${locale}\` (no fallbacks)`}`, '');
  if (sources['/title']?.isFallback) add(`> Lesson title fallback: ${sources['/title'].code}`, '');
  heading(2, 'Sections');
  for (const [sectionKey, section] of Object.entries(localized.sections)) {
    if (!isRecord(section) || !isRecord(section.content)) throw new Error(`Invalid section ${sectionKey}`);
    required(section.id, `section ${sectionKey} id`);
    const sp = ['sections', sectionKey];
    heading(3, `${phrase(section.title, [...sp, 'title'])} · ${sectionKey}`);
    add(`- ID: \`${inline(section.id)}\``, `- Slug: \`${inline(section.slug ?? sectionKey)}\``, `- Canonical: ${source(section.id, `${lessonPath}/sections/${sectionKey}/${sectionKey}.data.ts`)}`, `- Navigation label: ${phrase(section.navigationLabel, [...sp, 'navigationLabel'])}`, '');
    let index = 0;
    for (const [type, catalog] of Object.entries(section.content)) {
      if (!isRecord(catalog)) throw new Error(`Invalid ${type} catalog in ${sectionKey}`);
      for (const [blockKey, block] of Object.entries(catalog)) {
        emitBlock(block, type, [...sp, 'content', type, blockKey], `${++index}. ${blockKey}`, `${lessonPath}/sections/${sectionKey}/${sectionKey}.data.ts`);
      }
    }
  }
  if (Object.keys(localized.questions).length) {
    heading(2, 'Additional question catalog entries');
    for (const [type, catalog] of Object.entries(localized.questions)) {
      if (!isRecord(catalog)) throw new Error(`Invalid question catalog ${type}`);
      for (const [key, question] of Object.entries(catalog)) {
        if (!seenQuestions.has(question?.id)) emitQuestion(question, key, ['questions', type, key], seenQuestions.size + 1, `${lessonPath}/questions/index.data.ts`);
      }
    }
  }
  heading(2, 'Flashcards');
  for (const [index, card] of localized.flashcards.entries()) {
    if (!isRecord(card)) throw new Error(`Invalid flashcard ${index}`);
    required(card.id, `flashcard ${index} id`);
    heading(3, `Flashcard ${index + 1}`);
    add(`- ID: \`${inline(card.id)}\``, `- Canonical: ${source(card.id, `${lessonPath}/flashcards/index.data.ts`)}`, '');
    for (const side of ['front', 'back', 'hint']) {
      if (!Array.isArray(card[side])) throw new Error(`Invalid flashcard ${side} at ${index}`);
      heading(4, side[0].toUpperCase() + side.slice(1));
      card[side].forEach((block, i) => emitBlock(block, inferBlockType(block), ['flashcards', index, side, i], `${side} ${i + 1}`, `${lessonPath}/flashcards/index.data.ts`));
    }
    metadata(card, ['id', 'front', 'back', 'hint']);
  }
  return lines.join('\n').trimEnd() + '\n';
}

export function inferBlockType(block) {
  if (!isRecord(block)) throw new Error('Invalid nested content block');
  if (typeof block.type === 'string') return block.type;
  if (typeof block.blockType === 'string') return block.blockType;
  if (Object.hasOwn(block, 'value')) return 'text';
  if (Object.hasOwn(block, 'items')) return 'checkpoint';
  if (Object.hasOwn(block, 'welcome') && Object.hasOwn(block, 'questions')) return 'quiz';
  if (Object.hasOwn(block, 'text')) return 'markdown';
  if (Object.hasOwn(block, 'href')) return 'youtube';
  if (Object.hasOwn(block, 'codeParams')) return 'code';
  if (Object.hasOwn(block, 'fileLocation') && Object.hasOwn(block, 'poster')) return 'video';
  if (Object.hasOwn(block, 'fileLocation') && Object.hasOwn(block, 'title')) return 'audio';
  if (Object.hasOwn(block, 'alt') && (Object.hasOwn(block, 'locales') || Object.hasOwn(block, 'src'))) return 'image';
  if (Object.hasOwn(block, 'locales') || Object.hasOwn(block, 'locale')) return 'scene';
  throw new Error(`Cannot infer nested content block type: ${block.id ?? '(no id)'}`);
}