/**
 * @fileoverview SHA-pinned, read-only media/Scene evidence for typed Bank Stage 5.
 * This module runs only in the tokenless candidate analyzer. Candidate files
 * are statically parsed, Git object identities checked, never executed.
 */
import fs from 'node:fs';
import path from 'node:path';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const assetExtensions = {
  images: new Set(['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'avif']),
  audio: new Set(['mp3', 'wav', 'ogg', 'm4a', 'flac']),
  video: new Set(['mp4', 'webm']),
  subtitles: new Set(['vtt', 'srt']),
};
const mediaFields = {
  image: [['fileName', 'images']],
  audio: [['fileName', 'audio']],
  video: [
    ['fileName', 'video'],
    ['posterFileName', 'images'],
  ],
  subtitles: [['fileName', 'subtitles']],
};
const mediaTypes = new Set([...Object.keys(mediaFields), 'youtube']);
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const isBlock = value =>
  isRecord(value) && uuid.test(value.id ?? '') && (mediaTypes.has(value.type) || value.type === 'scene');

function staticFile(ts, name, source, scriptKind = ts.ScriptKind.TS) {
  const ast = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, scriptKind);
  if (ast.parseDiagnostics.length) throw Error('Reviewed Scene source contains TypeScript syntax errors: ' + name);
  return ast;
}

function pinnedRegular(root, head, filename, git, readText = true) {
  if (
    typeof filename !== 'string' ||
    filename.startsWith('/') ||
    filename.includes('\\') ||
    filename.split('/').some(part => !/^[A-Za-z0-9_.-]+$/.test(part) || part === '.' || part === '..')
  )
    throw Error('Unsafe reviewed asset/Scene path: ' + filename);
  let current = root;
  for (const part of filename.split('/')) {
    current = path.join(current, part);
    const stat = fs.lstatSync(current);
    if (stat.isSymbolicLink()) throw Error('Symlink in reviewed Scene/media path: ' + filename);
  }
  const stats = fs.statSync(current);
  if (!stats.isFile() || !stats.size) throw Error('Missing/empty regular reviewed asset: ' + filename);
  const tracked = git(root, 'ls-files', '--stage', '--', filename);
  if (!/^100644 [a-f0-9]{40} 0\t/.test(tracked) || !tracked.endsWith('\t' + filename))
    throw Error('Scene/media evidence is not a regular tracked Git object: ' + filename);
  const pinned = git(root, 'rev-parse', head + ':' + filename);
  const actual = git(root, 'hash-object', '--', current);
  if (pinned !== actual) throw Error('Scene/media evidence changed since reviewed HEAD: ' + filename);
  return readText ? fs.readFileSync(current, 'utf8') : undefined;
}

/**
 * A reviewed but not-yet-created resource is a scaffold, not a forged asset.
 * Reject tracked files missing from checkout, symlinks (including dangling
 * links and parent links), and existing untracked/modified files. Only a
 * genuinely absent, untracked path is allowed to remain unresolved.
 */
function pinnedOptional(root, head, filename, git, readText = true) {
  if (
    typeof filename !== 'string' ||
    filename.startsWith('/') ||
    filename.includes('\\') ||
    filename.split('/').some(part => !/^[A-Za-z0-9_.-]+$/.test(part) || part === '.' || part === '..')
  ) throw Error('Unsafe reviewed asset/Scene path: ' + filename);
  let current = root;
  for (const part of filename.split('/')) {
    current = path.join(current, part);
    let stat;
    try {
      stat = fs.lstatSync(current);
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
      if (git(root, 'ls-files', '--stage', '--', filename).trim())
        throw Error('Tracked reviewed resource missing from checkout: ' + filename);
      return null;
    }
    if (stat.isSymbolicLink()) throw Error('Symlink in reviewed Scene/media path: ' + filename);
  }
  return pinnedRegular(root, head, filename, git, readText);
}

function sourceValue(field, language, at) {
  const value =
    typeof field === 'string' ? field : isRecord(field) && Object.hasOwn(field, language) ? field[language] : undefined;
  if (typeof value !== 'string' || !value.trim())
    throw Error('Missing reviewed source-language media reference at ' + at);
  return value;
}

function approvedUrl(value, kind) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw Error('Invalid reviewed external media URL');
  }
  if (url.protocol !== 'https:' || url.username || url.password || !url.hostname)
    throw Error('External media requires reviewed HTTPS without credentials');
  if (
    kind === 'youtube' &&
    !['youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com', 'youtu.be'].includes(url.hostname)
  )
    throw Error('Unverified Youtube host');
}

function checkMedia(root, meta, config, production, documentLanguage, git) {
  if (!isRecord(config.locale)) throw Error('Media locale missing for ' + config.id);
  const primary = [];
  let unresolved = false;
  if (config.type === 'youtube') {
    if (production?.mediaSourcePath !== undefined) throw Error('Youtube cannot claim a local mediaSourcePath');
    const field = config.locale.href;
    if (field === undefined) return false;
    const href = sourceValue(field, documentLanguage, config.id + '.href');
    if (href === '00000000-0000-0000-0000-000000000000') return false;
    approvedUrl(href, 'youtube');
    return true;
  }
  for (const [field, folder] of mediaFields[config.type]) {
    const authored = config.locale[field];
    if (authored === undefined) {
      unresolved = true;
      continue;
    }
    const reference = sourceValue(authored, documentLanguage, config.id + '.' + field);
    if (reference === '00000000-0000-0000-0000-000000000000.' + {
      images: 'webp', audio: 'mp3', video: 'mp4', subtitles: 'vtt',
    }[folder]) {
      unresolved = true;
      continue;
    }
    if (/^https?:\/\//i.test(reference)) {
      approvedUrl(reference, config.type);
      continue;
    }
    const match = reference.match(/^([0-9a-f-]{36})\.([a-z0-9]+)$/i);
    if (
      !match ||
      !uuid.test(match[1]) ||
      match[1].toLowerCase() === '00000000-0000-0000-0000-000000000000' ||
      !assetExtensions[folder].has(match[2].toLowerCase())
    )
      throw Error('Invalid reviewed UUID media filename for ' + config.id);
    const filename = meta.identity.pkg + '/assets/' + folder + '/' + reference;
    if (pinnedOptional(root, meta.head, filename, git, false) === null) unresolved = true;
    if (field === 'fileName') primary.push(filename);
  }
  if (production?.mediaSourcePath !== undefined && (primary.length !== 1 || production.mediaSourcePath !== primary[0]))
    throw Error('Authored mediaSourcePath differs from the pinned canonical asset');
  return !unresolved;
}

function property(ts, object, name) {
  if (!ts.isObjectLiteralExpression(object)) throw Error('Expected literal Scene registry map');
  const matches = object.properties.filter(
    prop =>
      ts.isPropertyAssignment(prop) &&
      (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) &&
      prop.name.text === name,
  );
  if (matches.length === 0) throw Error('Scene registry UUID entry missing: ' + name);
  if (matches.length !== 1) throw Error('Scene registry has nonunique UUID entry: ' + name);
  return matches[0].initializer;
}

function checkScene(root, meta, config, production, git, ts) {
  const directory = meta.identity.pkg + '/scenes/' + config.id.at(-1) + '/' + config.id;
  const registryPath = meta.identity.pkg + '/scenes/sceneLoader.ts';
  const registryText = pinnedOptional(root, meta.head, registryPath, git);
  if (registryText === null) return false; // No Scene registry authored yet.
  const registry = staticFile(ts, registryPath, registryText);
  const declarations = registry.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .filter(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === 'sceneImports');
  if (declarations.length !== 1 || !declarations[0].initializer) throw Error('Canonical Scene loader map missing');
  let initializer;
  try {
    initializer = property(ts, declarations[0].initializer, config.id);
  } catch (error) {
    if (String(error?.message) === 'Scene registry UUID entry missing: ' + config.id) return false;
    throw error;
  }
  if (!ts.isArrowFunction(initializer) || initializer.parameters.length)
    throw Error('Scene registry entry is not a static lazy import');
  const then = initializer.body;
  if (
    !ts.isCallExpression(then) ||
    !ts.isPropertyAccessExpression(then.expression) ||
    then.expression.name.text !== 'then'
  )
    throw Error('Scene registry entry has unsupported implementation');
  const imported = then.expression.expression;
  if (
    !ts.isCallExpression(imported) ||
    imported.expression.kind !== ts.SyntaxKind.ImportKeyword ||
    imported.arguments.length !== 1 ||
    !ts.isStringLiteral(imported.arguments[0]) ||
    imported.arguments[0].text !== './' + config.id.at(-1) + '/' + config.id
  )
    throw Error('Scene registry UUID points to a different implementation');

  if (typeof production?.specification !== 'string' || !production.specification.trim())
    throw Error('Scene lacks reviewed production specification: ' + config.id);
  const indexFile = directory + '/index.ts';
  const indexText = pinnedRegular(root, meta.head, indexFile, git);
  const index = staticFile(ts, indexFile, indexText);
  if (
    index.statements.length !== 1 ||
    !ts.isExportDeclaration(index.statements[0]) ||
    !ts.isNamedExports(index.statements[0].exportClause) ||
    !ts.isStringLiteral(index.statements[0].moduleSpecifier) ||
    index.statements[0].exportClause.elements.length !== 1
  )
    throw Error('Scene entrypoint must statically re-export its real component');
  const entry = index.statements[0];
  const symbol = entry.exportClause.elements[0];
  const component = symbol.propertyName?.text;
  if (
    symbol.name.text !== 'default' ||
    !/^[A-Za-z][A-Za-z0-9]*$/.test(component ?? '') ||
    entry.moduleSpecifier.text !== './' + component
  )
    throw Error('Scene entrypoint has no canonical component export');

  const componentPath = directory + '/' + component + '.tsx';
  const componentText = pinnedRegular(root, meta.head, componentPath, git);
  staticFile(ts, componentPath, componentText, ts.ScriptKind.TSX);
  if (
    /\bsceneImplementationRequired\b|\bsceneSourceLocaleRequired\b|TODO\(scene\)|TODO\s*\(BLOCKER\)/.test(componentText) ||
    /TODO\s*\(BLOCKER\)/.test(indexText)
  )
    return false; // Pinned draft implementation: valid scaffold, not approved evidence.
  // Legacy Scenes may retain a sidecar; Lesson Stage 6 Scenes intentionally
  // store reviewed specifications in their source draft/TSX comment and emit no
  // specification.md. The Bank's own SHA-pinned Stage 3 production.specification
  // is the reviewed evidence, so a missing sidecar is not proof of an invalid
  // implementation. If one exists, it must agree byte-for-byte.
  const specification = pinnedOptional(root, meta.head, directory + '/specification.md', git);
  if (specification !== null && specification !== production.specification.trimEnd() + '\n')
    throw Error('Scene specification is not the exact independently reviewed bank source');
  return true;
}

/**
 * Traverse only Config data, never follow an author-controlled source path or
 * interpret metadata as executable evidence. The Bank gate pins the source
 * revision before this tokenless analysis.
 */
export function resolveReviewedBankBlockEvidence({ root, meta, input, git, ts }) {
  if (
    typeof root !== 'string' ||
    typeof git !== 'function' ||
    !ts ||
    !/^[a-f0-9]{40}$/.test(meta?.head ?? '') ||
    !/^content\/[a-z][a-z0-9-]*$/.test(meta?.identity?.pkg ?? '') ||
    typeof meta?.identity?.folder !== 'string' ||
    !meta.identity.folder.startsWith(meta.identity.pkg + '/data/lessons/') ||
    git(root, 'rev-parse', 'HEAD') !== meta.head
  )
    throw Error('Bank block evidence requires the exact pinned checkout');
  const language =
    meta.bank === 'questions' ? input.production?.languages?.document : input.production?.lesson?.languages?.document;
  if (typeof language !== 'string' || !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(language))
    throw Error('Missing reviewed bank document language');
  const registeredSceneIds = new Set();
  const approvedMediaBlockIds = new Set();
  const unregisteredSceneIds = new Set();
  const unresolvedMediaBlockIds = new Set();
  const visited = new WeakSet();
  let count = 0;
  function visit(value) {
    if (!value || typeof value !== 'object' || visited.has(value)) return;
    if (++count > 30000) throw Error('Oversized Bank Block evidence graph');
    visited.add(value);
    if (Array.isArray(value)) {
      for (const child of value) visit(child);
      return;
    }
    const node =
      isRecord(value.config) && isBlock(value.config)
        ? { config: value.config, production: value.production }
        : isBlock(value)
          ? { config: value, production: undefined }
          : null;
    if (node) {
      const { config, production } = node;
      // An unfinished authored resource is a scaffold, not a release proof.
      // Malformed identities and unsafe paths still fail at the evidence gate.
      const pending = production?.pending === true;
      if (config.type === 'scene') {
        try {
          const ready = !pending && checkScene(root, meta, config, production, git, ts);
          if (ready) registeredSceneIds.add(config.id);
          else {
            if (meta.bank !== 'questions') throw Error('Unresolved reviewed Flashcard Scene: ' + config.id);
            unregisteredSceneIds.add(config.id);
          }
        } catch (error) {
          if (meta.bank !== 'questions' || !String(error?.message).startsWith('Scene registry UUID entry missing: '))
            throw error;
          unregisteredSceneIds.add(config.id);
        }
      } else if (!pending && checkMedia(root, meta, config, production, language, git)) {
        approvedMediaBlockIds.add(config.id);
      } else {
        if (meta.bank !== 'questions') throw Error('Unresolved reviewed Flashcard media: ' + config.id);
        unresolvedMediaBlockIds.add(config.id);
      }
      // Recurse into composite children, never into locale, schema fields or
      // production metadata (which could mimic a Config by accident).
      for (const [key, child] of Object.entries(config)) {
        if (!['id', 'slug', 'type', 'params', 'locale', 'production'].includes(key)) visit(child);
      }
    } else {
      for (const [key, child] of Object.entries(value)) {
        if (key !== 'production') visit(child);
      }
    }
  }
  visit(input.config);
  return { registeredSceneIds, approvedMediaBlockIds, unregisteredSceneIds, unresolvedMediaBlockIds };
}
