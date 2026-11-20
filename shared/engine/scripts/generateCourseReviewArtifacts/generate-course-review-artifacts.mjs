/**
 * Produce PR-scoped, Course-owned localized Markdown references.
 * Standalone Lesson bodies and assessment banks are deliberately excluded.
 */
import fs from 'node:fs';
import path from 'node:path';
import Module from 'node:module';
import { pathToFileURL } from 'node:url';
import { readModularCourse } from './course-static-projection.mjs';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const escape = value => String(value).replace(/\r/g, '').replace(/([\\\x60*_[\]<>|])/g, '\\$1');
const allowed = new Set(['course', 'module', 'chapter', 'episode', 'lesson']);

function directory(dir, parent) {
  if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory() || fs.lstatSync(dir).isSymbolicLink() ||
      (parent && !fs.realpathSync(dir).startsWith(fs.realpathSync(parent) + path.sep))) {
    throw new Error('Missing or unsafe Course directory: ' + dir);
  }
}

export function discoverCourses(root, packageName) {
  if (!/^content\/[a-z][a-z0-9-]*$/.test(packageName)) throw new Error('Invalid Course textbook');
  const content = path.join(root, 'content');
  const pkg = path.join(root, packageName);
  const source = path.join(pkg, 'data/courses');
  directory(content, root);
  directory(pkg, content);
  directory(source, pkg);
  const courses = [];
  for (const item of fs.readdirSync(source, { withFileTypes: true })) {
    if (item.isSymbolicLink()) throw new Error('Symlink in Course catalog: ' + item.name);
    if (item.isFile() && item.name.endsWith('.data.ts')) {
      courses.push({ id: null, entry: path.join(source, item.name),
        directory: source, relative: item.name });
    } else if (item.isDirectory() && /^[0-9a-f]$/.test(item.name)) {
      const dir = path.join(source, item.name);
      directory(dir, source);
      for (const child of fs.readdirSync(dir, { withFileTypes: true })) {
        if (child.isSymbolicLink()) throw new Error('Symlink in Course catalog: ' + child.name);
        if (!child.isDirectory()) continue;
        if (!UUID.test(child.name) || child.name.slice(-1) !== item.name)
          throw new Error('Invalid Course identity directory: ' + child.name);
        const owned = path.join(dir, child.name);
        directory(owned, dir);
        const entry = path.join(owned, 'index.ts');
        if (!fs.existsSync(entry)) continue;
        if (!fs.lstatSync(entry).isFile() || fs.lstatSync(entry).isSymbolicLink())
          throw new Error('Unsafe Course entrypoint: ' + entry);
        courses.push({ id: child.name, entry, directory: owned,
          relative: item.name + '/' + child.name });
      }
    }
  }
  return courses.sort((a, b) => a.entry.localeCompare(b.entry, 'en'));
}

/** Execute authored TS only in the low-privilege Actions analysis job. */
export async function loadCourse(entry, packageDirectory) {
  const { build } = await import('esbuild');
  const bundled = await build({
    entryPoints: [entry], bundle: true, write: false, platform: 'node',
    format: 'cjs', packages: 'external', target: 'node20', logLevel: 'silent',
    plugins: [{ name: 'preserve-import-meta', setup(builder) {
      builder.onLoad({ filter: /\.tsx?$/ }, async args => ({
        contents: (await fs.promises.readFile(args.path, 'utf8')).replace(
          /\bimport\.meta\.url\b/g, JSON.stringify(pathToFileURL(args.path).href)),
        loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
      }));
    } }],
  });
  const filename = path.join(packageDirectory, '.course-reference-in-memory.cjs');
  const loaded = new Module(filename);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(packageDirectory);
  loaded._compile(bundled.outputFiles[0].text, filename);
  const courses = Object.values(loaded.exports).filter(value => object(value) &&
    value.type === 'course' && typeof value.build?.props === 'function');
  if (courses.length !== 1) throw new Error('Expected one exported Course in ' + entry);
  return courses[0];
}

/** Sparse objects merge; arrays are atomic and replaced by localized overrides. */
export function mergeCourseReview(base, patch) {
  if (patch === undefined) return structuredClone(base);
  if (!object(base) || !object(patch)) return structuredClone(patch);
  const result = structuredClone(base);
  for (const [key, value] of Object.entries(patch)) result[key] = mergeCourseReview(result[key], value);
  return result;
}

/** Render only the Course-owned tree; a Lesson is an opaque UUID reference. */
export function renderCourseMarkdown({ course, locale, packageName, sourceRef, sources = [] }) {
  if (!object(course) || course.type !== 'course' || !UUID.test(course.id))
    throw new Error('Expected resolved Course Props');
  if (!/^content\/[a-z][a-z0-9-]*$/.test(packageName) ||
      !/^[a-z]{2,4}$/.test(locale) || !/^[0-9a-f]{40}$/.test(sourceRef))
    throw new Error('Invalid Course Markdown scope');
  const lines = [], ids = new Set();
  const add = line => lines.push(line);
  const codeLink = id => {
    const source = sources.find(file => file.text.includes("'" + id + "'") ||
      file.text.includes('"' + id + '"'));
    if (!source) return '';
    return ' · [source](https://github.com/KiT-Maverik/svitlo/blob/' + sourceRef + '/' +
      source.path.split('/').map(encodeURIComponent).join('/') + ')';
  };
  const write = (label, content, depth = 0) => {
    if (depth > 20) throw new Error('Nested Course content exceeds reference limit');
    const pad = '  '.repeat(depth);
    const prefix = pad + '- **' + escape(label) + '**';
    if (Array.isArray(content)) {
      add(prefix + ' (' + content.length + ')');
      content.forEach((child, index) => write(String(index + 1), child, depth + 1));
    } else if (object(content)) {
      add(prefix);
      for (const [key, value] of Object.entries(content)) write(key, value, depth + 1);
    } else if (typeof content === 'string') {
      if (content.includes('\n')) {
        add(prefix + ':');
        const fence = '~'.repeat(Math.max(4, ...(content.match(/~+/g) ?? []).map(run => run.length + 1)));
        add(pad + '  ' + fence);
        content.replace(/\r/g, '').split('\n').forEach(line => add(pad + '  ' + line));
        add(pad + '  ' + fence);
      } else add(prefix + ': ' + (content ? escape(content) : '*(empty)*'));
    } else if (content === null || typeof content === 'number' || typeof content === 'boolean') {
      add(prefix + ': ' + String(content));
    } else throw new Error('Non-serializable Course field: ' + label);
  };
  const walk = (entry, depth) => {
    if (!object(entry) || !UUID.test(entry.id) || !allowed.has(entry.type))
      throw new Error('Invalid Course-owned hierarchy node');
    if (entry.type === 'lesson') {
      add('  '.repeat(depth) + '- Lesson UUID reference: ' + entry.id);
      return;
    }
    if (ids.has(entry.id)) throw new Error('Duplicate Course-owned ID: ' + entry.id);
    ids.add(entry.id);
    if (!object(entry.locale) || typeof entry.locale.title !== 'string' || !entry.locale.title.trim())
      throw new Error('Missing Course-owned locale.title: ' + entry.id);
    add('#'.repeat(Math.min(depth + 1, 6)) + ' ' + escape(entry.locale.title));
    add('');
    add('- ' + entry.type + ': ' + entry.id + ' (' + escape(entry.slug) + ')' + codeLink(entry.id));
    add('- Language: ' + locale);
    write('Locale', entry.locale);
    if (entry.type === 'episode') {
      // Episode Sections, Scenes and blocks are Course-owned; no Lesson banks are followed.
      if (entry.section !== undefined) write('Episode Sections', entry.section);
      add('');
      return;
    }
    if (!Array.isArray(entry.content))
      throw new Error('Missing ordered Course children for ' + entry.id);
    add('');
    entry.content.forEach(child => walk(child, depth + 1));
  };
  walk(course, 0);
  const md = lines.join('\n').trimEnd() + '\n';
  if (Buffer.byteLength(md, 'utf8') > 2 * 1024 * 1024)
    throw new Error('Course Markdown exceeds the 2 MiB document limit');
  return md;
}

function courseSources(root, item) {
  const files = [];
  const read = file => files.push({
    path: path.relative(root, file).split(path.sep).join('/'),
    text: fs.readFileSync(file, 'utf8'),
  });
  const walk = dir => {
    directory(dir);
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) throw new Error('Symlink in Course sources');
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.isFile() && /\.tsx?$/.test(entry.name) && !/\.spec\.tsx?$/.test(entry.name))
        read(file);
    }
  };
  if (item.relative.endsWith('.data.ts')) read(item.entry);
  else walk(item.directory);
  return files;
}

export async function generateCourseReviewArtifacts({
  root, output, manifest, saveManifest, packageName, courseId = null,
  languages = null, supportedLanguages, loader = loadCourse,
}) {
  const available = discoverCourses(root, packageName).filter(item =>
    !courseId || item.id === courseId || item.id === null);
  if (!available.length) throw new Error('No authored Courses in requested scope');
  let matches = 0, generated = 0, failures = 0;
  const fail = (course, locale, error) => {
    const message = String(error?.message ?? error).slice(0, 1500);
    manifest.failures.push({ kind: 'course', textbook: packageName, course, locale, error: message });
    failures++;
    saveManifest();
    process.stderr.write('::warning::Course ' + course + '/' + (locale ?? 'source') +
      ': ' + message.replace(/\n/g, ' ') + '\n');
  };
  for (const item of available) {
    let entity;
    try {
      entity = item.id && loader === loadCourse
        ? readModularCourse(item, supportedLanguages)
        : await loader(item.entry, path.join(root, packageName));
      if (entity.type !== 'course' || !UUID.test(entity.id) ||
          (item.id && entity.id !== item.id)) throw new Error('Course identity mismatch');
      if (courseId && entity.id !== courseId) continue;
      matches++;
      const declared = entity.config?.base?.params?.languages;
      if (!Array.isArray(declared) || !declared.length ||
          new Set(declared).size !== declared.length ||
          declared.some(code => !supportedLanguages.includes(code)))
        throw new Error('Invalid Course supported languages');
      for (const locale of languages ?? declared) {
        try {
          if (!declared.includes(locale)) throw new Error('Locale not declared by Course');
          const projected = typeof entity.project === 'function' ? entity.project(locale) : null;
          const props = projected ? null : entity.build.props({ languages: [locale] });
          const resolved = projected?.course ?? mergeCourseReview(props.base, props.locale?.[locale]);
          const missing = projected?.missing ?? 0;
          if (resolved.id !== entity.id) throw new Error('Resolved Course identity mismatch');
          const md = renderCourseMarkdown({ course: resolved, locale, packageName,
            sourceRef: manifest.sourceCommit, sources: courseSources(root, item) });
          const relative = 'courses/' + packageName.slice(8) + '/' + entity.id.slice(-1) +
            '/' + entity.id + '/' + locale + '.md';
          const destination = path.join(output, relative);
          fs.mkdirSync(path.dirname(destination), { recursive: true });
          if (fs.existsSync(destination) &&
              (!fs.lstatSync(destination).isFile() || fs.lstatSync(destination).isSymbolicLink()))
            throw new Error('Unsafe Course Markdown output');
          fs.writeFileSync(destination, md);
          manifest.generated.push({ kind: 'course', textbook: packageName,
            course: entity.id.slice(-1) + '/' + entity.id, locale,
            path: relative, missing, reviewReady: missing === 0 });
          generated++;
          saveManifest();
        } catch (error) { fail(entity.id, locale, error); }
      }
    } catch (error) { fail(item.relative, null, error); }
  }
  if (courseId && !matches) throw new Error('Requested Course not found: ' + courseId);
  return { generated, failures };
}
