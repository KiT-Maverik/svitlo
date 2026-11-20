/** Render only the Course-owned Episode Config used by the Stage 5 materializer.
 * This is not an alternative Course authoring CLI or a legacy YAML reader.
 * The renderer preserves nested Scenes, Quests and visible media TODO(asset)
 * markers without inventing any physical content.
 */
import { loadFactoryRegistry } from '../yamlScaffolding/yamlScaffolding.mjs';

const factories = Object.freeze(loadFactoryRegistry());
const UNRESOLVED_RESOURCE_UUID = '00000000-0000-0000-0000-000000000000';
const pendingMediaExtensions = { image: 'webp', audio: 'mp3', video: 'mp4', subtitles: 'vtt' };
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const literal = value => JSON.stringify(value);
function fail(code, description) {
  throw new Error('Course Episode Renderer [' + code + ']: ' + description);
}
function selectedFactory(node, location) {
  if (!record(node) || typeof node.type !== 'string' || !node.type) {
    fail('TYPE', location + ': missing required type discriminator');
  }
  if (node.type !== 'lesson' && !Object.hasOwn(factories, node.type)) {
    fail('TYPE', location + ': unknown type discriminator ' + literal(node.type));
  }
  return node.type === 'lesson' ? null : factories[node.type];
}

const typedCollections = {
  course: ['content'],
  module: ['content'],
  chapter: ['content'],
  episode: ['section'],
  content: ['content'],
  practice: ['content'],
  codingTask: ['content'],
  learningFlow: ['content'],
  flashcards: ['content'],
  quiz: ['content'],
  carousel: ['slides'],
  checkpoint: ['content'],
  checkpointItem: ['answer'],
  flashcard: ['content'],
};

function renderValue(value, state, indent, location, typedItems = false) {
  const space = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    return (
      '[\n' +
      value
        .map((entry, index) => inner + renderValue(entry, state, indent + 1, location + '[' + index + ']') + ',')
        .join('\n') +
      '\n' +
      space +
      ']'
    );
  }
  if (!record(value)) return literal(value);
  const entries = Object.entries(value);
  if (!entries.length) return '{}';
  return (
    '{\n' +
    entries
      .map(([key, child]) => {
        const nextLocation = location + '.' + key;
        const expression = typedItems
          ? renderEntity(child, state, indent + 1, nextLocation)
          : key === 'additionalItems' && record(child)
            ? renderValue(child, state, indent + 1, nextLocation, true)
            : renderValue(child, state, indent + 1, nextLocation);
        return inner + literal(key) + ': ' + expression + ',';
      })
      .join('\n') +
    '\n' +
    space +
    '}'
  );
}

/** Quest Stages own named media configurators, not a positional or items/order list. */
function renderQuestMediaMap(value, state, indent, location, allowNull = false) {
  if (!record(value)) return renderValue(value, state, indent, location);
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  const fields = Object.entries(value);
  if (!fields.length) return '{}';
  return (
    '{\n' +
    fields
      .map(
        ([key, child]) =>
          inner +
          literal(key) +
          ': ' +
          (allowNull && child === null ? 'null' : renderEntity(child, state, indent + 1, location + '.' + key)) +
          ',',
      )
      .join('\n') +
    '\n' +
    pad +
    '}'
  );
}

function renderQuestStageContent(value, state, indent, location) {
  if (!record(value)) return renderValue(value, state, indent, location);
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  return (
    '{\n' +
    Object.entries(value)
      .map(([key, child]) => {
        const field = location + '.' + key;
        const expression =
          key === 'video' || key === 'audio'
            ? renderQuestMediaMap(child, state, indent + 1, field, key === 'audio')
            : key === 'image' || key === 'subtitles'
              ? renderEntity(child, state, indent + 1, field)
              : renderValue(child, state, indent + 1, field);
        return inner + literal(key) + ': ' + expression + ',';
      })
      .join('\n') +
    '\n' +
    pad +
    '}'
  );
}

function renderMediaLocale(value, missing, state, indent, location) {
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  return (
    '{\n' +
    Object.entries(value)
      .map(([key, entry]) => {
        const todo = missing.has(key)
          ? inner +
            '// TODO(asset): Replace the unresolved ' +
            location +
            '.' +
            key +
            ' with an actual textbook-wide UUID media file before publication.\n'
          : '';
        return todo + inner + literal(key) + ': ' + renderValue(entry, state, indent + 1, location + '.' + key) + ',';
      })
      .join('\n') +
    '\n' +
    pad +
    '}'
  );
}

function renderConfigFields(node, state, indent, location) {
  const space = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  // Episodes can contain arbitrary nested Sections, Carousel slides and Quest media.
  // Generate visible incomplete media references instead of pretending an asset exists.
  const missingMediaFields = new Set();
  let effectiveNode = node;
  if (Object.hasOwn(pendingMediaExtensions, node.type)) {
    const locale = record(node.locale) ? { ...node.locale } : {};
    const fields = node.type === 'video' ? ['fileName', 'posterFileName'] : ['fileName'];
    for (const field of fields) {
      if (!Object.hasOwn(locale, field) || locale[field] === null) {
        const extension = field === 'posterFileName' ? 'webp' : pendingMediaExtensions[node.type];
        locale[field] = UNRESOLVED_RESOURCE_UUID + '.' + extension;
        missingMediaFields.add(field);
      }
    }
    effectiveNode = { ...node, locale };
  }
  const fields = Object.entries(effectiveNode);
  return (
    '{\n' +
    fields
      .map(([key, value]) => {
        const collection = (typedCollections[node.type] ?? []).includes(key);
        if (node.type === 'carousel' && key === 'slides' && record(value) && record(value.items)) {
          for (const [slug, slide] of Object.entries(value.items)) {
            if (!record(slide) || !['image', 'scene'].includes(slide.type))
              fail('TYPE', location + '.slides.items.' + slug + ': Carousel slides must be image or scene');
          }
        }
        let expression;
        if (key === 'locale' && missingMediaFields.size) {
          expression = renderMediaLocale(value, missingMediaFields, state, indent + 1, location + '.locale');
        } else if (node.type === 'quest' && (key === 'stages' || key === 'tasks')) {
          expression = renderValue(value, state, indent + 1, location + '.' + key, true);
        } else if (node.type === 'questStage' && key === 'content') {
          expression = renderQuestStageContent(value, state, indent + 1, location + '.content');
        } else if (node.type === 'questTask' && key === 'scene') {
          expression = renderEntity(value, state, indent + 1, location + '.scene');
        } else if (node.type === 'checkpointItem' && key === 'question') {
          expression = renderEntity(value, state, indent + 1, location + '.question');
        } else if (collection && record(value) && record(value.items)) {
          const properties = Object.entries(value).map(([field, child]) => {
            const rendered =
              field === 'items'
                ? renderValue(child, state, indent + 2, location + '.' + key + '.items', true)
                : renderValue(child, state, indent + 2, location + '.' + key + '.' + field);
            return '  '.repeat(indent + 2) + literal(field) + ': ' + rendered + ',';
          });
          expression = '{\n' + properties.join('\n') + '\n' + inner + '}';
        } else {
          expression = renderValue(value, state, indent + 1, location + '.' + key);
        }
        return inner + literal(key) + ': ' + expression + ',';
      })
      .join('\n') +
    '\n' +
    space +
    '}'
  );
}

function renderEntity(node, state, indent, location) {
  const factory = selectedFactory(node, location);
  if (node.type === 'lesson') fail('TYPE', location + ': Episode draft cannot embed a standalone Lesson');
  state.imports.add(factory);
  return factory + '(' + renderConfigFields(node, state, indent, location) + ')';
}

/**
 * Render a Course-local Lesson patch using the exact same Engine factory registry
 * as nested Episode/Section drafts. In particular, section.additionalItems
 * contains actual define* configurators, never untyped YAML object literals.
 * This is source rendering only: final Build/Props validation remains owned by
 * the corresponding Engine configurators at the materialization boundary.
 */
export function renderCourseLessonOverrideSource(items) {
  if (!record(items)) fail('TYPE', 'Course Lesson override items must be a slug-keyed object');
  const state = { imports: new Set() };
  const expression = renderValue({ content: { items } }, state, 0, 'courseOverrides').replace(
    /(^|\\n)([ \\t]*)"([A-Za-z_$][A-Za-z0-9_$]*)":/g,
    (full, line, space, key) => (key === '__proto__' ? full : line + space + key + ':'),
  );
  return { expression, factories: [...state.imports].sort() };
}

/** Produce one parseable, ephemeral draft used to extract defineEpisode nodes. */
export function renderEpisodeScaffoldSource(wrapper) {
  if (!record(wrapper) || wrapper.type !== 'course') fail('TYPE', 'expected a Course wrapper');
  const state = { imports: new Set() };
  const expression = renderEntity(wrapper, state, 0, 'course');
  const imports = [...state.imports].sort();
  return [
    '// Internal Episode draft for Stage 5 materialization; never a Course publication.',
    'import { ' + imports.join(', ') + ' } from "@svitlo/engine/build";',
    '',
    'export const episodeScaffold_Course = ' + expression + ';',
    '',
  ].join('\n');
}
