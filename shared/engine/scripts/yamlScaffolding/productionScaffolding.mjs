/**
 * Build-time handoff for a single authored config.yaml tree.
 *
 * Each entity is { config: EngineConfig, production?: authoringRequirements }.
 * Identity lives ONLY in config; production is never passed to define*.
 * This module deliberately does not run Config/Zod/TypeScript validation.
 */
import fs from 'node:fs';
import path from 'node:path';

const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;

/** Split the single file while preserving all authored, possibly incomplete Config fields. */
export function splitScaffoldDocument(document) {
  if (!record(document) || !record(document.config) || typeof document.config.type !== 'string') {
    throw new Error('config.yaml: root config.type is required for factory dispatch');
  }
  const tasks = [];
  function visit(value, location) {
    if (Array.isArray(value)) return value.map((entry, index) => visit(entry, location + '[' + index + ']'));
    if (!record(value)) return value;
    // A nested node is recognized by its own Config discriminator, never by its
    // YAML map key. Non-entity objects (including arbitrary "type" values) stay data.
    if (record(value.config) && typeof value.config.type === 'string') {
      if (value.production !== undefined && !record(value.production)) {
        throw new Error('config.yaml:' + location + '.production must be an object');
      }
      const { config, production } = value;
      if (production !== undefined) tasks.push({ id: config.id, type: config.type, production, location });
      return visit(config, location + '.config');
    }
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [
      key, visit(child, location + '.' + key),
    ]));
  }
  const { config, production } = document;
  const normalized = visit({ config, production }, '$');
  return {
    config: normalized,
    documentLanguage: production?.documentLanguage,
    overrides: document.overrides === undefined ? undefined : visit(document.overrides, '$.overrides'),
    tasks,
  };
}

function text(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function markdownForTask(task) {
  const { type, id, production } = task;
  if (type === 'scene' && text(production.specification)) {
    return production.specification.trimEnd() + '\n';
  }
  const lines = ['# ' + type + ' production specification', '', 'Entity ID: ' + id, ''];
  for (const [key, label] of [
    ['purpose', 'Purpose'], ['prompt', 'Generation prompt'], ['script', 'Script'],
    ['storyboard', 'Storyboard'], ['specification', 'Implementation specification'],
    ['productionNotes', 'Production notes'],
  ]) {
    if (text(production[key])) lines.push('## ' + label, '', production[key].trim(), '');
  }
  return lines.join('\n').trimEnd() + '\n';
}

/**
 * Materialize a deterministic, non-executable handoff next to the ID-addressed
 * entity. The output path is derived only from config.id and the textbook root.
 * This does NOT create Scene implementations or real media assets.
 */
export function productionFiles(entityFolder, tasks) {
  const textbookRoot = path.resolve(entityFolder, '../../../..');
  const outputs = [];
  for (const task of tasks) {
    const { id, type, production } = task;
    let destination;
    let body;
    if (['lesson', 'course'].includes(type) && text(production.methodology)) {
      destination = path.join(entityFolder, 'methodology.md');
      body = production.methodology.trimEnd() + '\n';
    } else if (type === 'scene' && text(production.specification)) {
      if (!uuid.test(id ?? '')) throw new Error('config.yaml:' + task.location + '.config.id: Scene specification requires UUID');
      destination = path.join(textbookRoot, 'scenes', id.at(-1), id, 'specification.md');
      body = markdownForTask(task);
    } else if (['image', 'audio', 'video'].includes(type) &&
      [production.prompt, production.specification, production.script, production.storyboard].some(text)) {
      if (!uuid.test(id ?? '')) throw new Error('config.yaml:' + task.location + '.config.id: media specification requires UUID');
      destination = path.join(textbookRoot, 'data/assets', id.at(-1), id, 'specification.md');
      body = markdownForTask(task);
    } else if (text(production.specification)) {
      if (!uuid.test(id ?? '')) throw new Error('config.yaml:' + task.location + '.config.id: specification requires UUID');
      destination = path.join(entityFolder, 'specifications', id.at(-1), id, 'specification.md');
      body = markdownForTask(task);
    }
    if (destination) outputs.push({ file: destination, content: body });
  }
  const seen = new Set();
  for (const entry of outputs) {
    if (seen.has(entry.file)) throw new Error('Duplicate production destination from config IDs: ' + entry.file);
    seen.add(entry.file);
  }
  return outputs;
}

function noSymlinkComponents(filename) {
  let current = path.parse(path.resolve(filename)).root;
  for (const part of path.resolve(filename).slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error('Refusing symlink: ' + current);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}

/** Check every target before writing anything; never overwrite a spec edited by an agent. */
export function checkProductionFiles(files, mode) {
  for (const { file, content } of files) {
    noSymlinkComponents(file);
    if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') !== content) {
      throw new Error('Existing production specification differs; refusing to overwrite: ' + file);
    }
    if (mode === 'check' && !fs.existsSync(file)) {
      throw new Error('Missing production specification: ' + file);
    }
  }
}

/** A scaffolder writes only new files; identical existing outputs are left untouched. */
export function writeProductionFiles(files) {
  let changed = 0;
  for (const { file, content } of files) {
    if (fs.existsSync(file)) continue;
    noSymlinkComponents(file);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content, { flag: 'wx' });
    changed++;
  }
  return changed;
}
