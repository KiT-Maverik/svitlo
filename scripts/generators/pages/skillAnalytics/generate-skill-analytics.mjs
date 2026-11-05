#!/usr/bin/env node
/** Build-only publication for the learner Skill Analytics page.
 * One complete, already-localized Domain -> Group -> Skill tree per language.
 * Profile-specific mastery is deliberately NOT part of the static output.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import {
  languageCodes,
  loadSkillGraph,
  writePublishedFiles,
  checkPublishedFiles,
  taxonomyCollections,
} from '../../data/publish-skills-data.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const collectionByKind = Object.freeze({
  SkillDomain: 'skillDomain',
  SkillGroup: 'skillGroup',
  Skill: 'skill',
});

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

/** The page gets the exact fields it renders; no per-entity metadata lookups. */
export function renderSkillAnalyticsFiles(graph, codes) {
  const collections = taxonomyCollections();
  for (const name of Object.values(collectionByKind)) {
    assert(collections.has(name), 'Unsupported canonical Collection: ' + name);
  }
  const files = new Map();
  const ids = new Set();
  function node(entity, language) {
    const collection = collectionByKind[entity.kind];
    assert(collection, 'Unsupported Skill collection: ' + entity.kind);
    const result = {
      id: entity.id,
      slug: entity.slug,
      collection,
      name: entity.name[language],
      ...(entity.description ? { description: entity.description[language] } : {}),
      ...(entity.groups?.length || entity.skills?.length
        ? {
            children: [
              ...(entity.groups ?? []).map(child => node(child, language)),
              ...(entity.skills ?? []).map(child => node(child, language)),
            ],
          }
        : {}),
    };
    assert(typeof result.name === 'string' && result.name.trim(), 'Missing ' + language + ' name for ' + entity.slug);
    assert(
      collection !== 'skill' || (typeof result.description === 'string' && result.description.trim()),
      'Missing ' + language + ' frontend description for ' + entity.slug,
    );
    return result;
  }
  // Validate globally unique IDs once, irrespective of language.
  function check(entity) {
    assert(!ids.has(entity.id), 'Duplicate UUID: ' + entity.id);
    ids.add(entity.id);
    for (const group of entity.groups ?? []) check(group);
    for (const skill of entity.skills ?? []) check(skill);
  }
  for (const domain of graph) check(domain);
  assert(graph.length > 0, 'Skill Analytics page requires at least one Domain');
  for (const code of codes) {
    assert(!files.has(code + '.json'), 'Duplicate language: ' + code);
    files.set(
      code + '.json',
      JSON.stringify({
        domains: graph.map(domain => node(domain, code)),
      }) + '\n',
    );
  }
  return files;
}

export function measureSkillAnalyticsFiles(files) {
  const rows = [...files].map(([file, json]) => {
    const bytes = Buffer.from(json, 'utf8');
    return {
      language: file.replace(/\.json$/, ''),
      bytes: bytes.length,
      gzip: gzipSync(bytes, { level: 9, mtime: 0 }).length,
      brotli: brotliCompressSync(bytes).length,
    };
  });
  const sum = key => rows.reduce((total, item) => total + item[key], 0);
  return {
    count: rows.length,
    total: sum('bytes'),
    gzip: sum('gzip'),
    brotli: sum('brotli'),
    min: Math.min(...rows.map(x => x.bytes)),
    max: Math.max(...rows.map(x => x.bytes)),
    rows,
  };
}

function options(args) {
  let packageName, action;
  for (let i = 0; i < args.length; i++) {
    const token = args[i];
    if (token === '--package') {
      assert(!packageName && args[i + 1] && !args[i + 1].startsWith('--'), 'Missing or repeated --package');
      packageName = args[++i];
    } else if (['--write', '--check', '--measure'].includes(token)) {
      assert(!action, 'Specify exactly one action');
      action = token;
    } else throw new Error('Unknown argument: ' + token);
  }
  assert(packageName && action, 'Usage: --package content/<textbook> --write|--check|--measure');
  const pkg = path.resolve(repoRoot, packageName);
  assert(
    pkg.startsWith(path.join(repoRoot, 'content') + path.sep) && fs.existsSync(path.join(pkg, 'package.json')),
    'Invalid textbook package',
  );
  return { pkg, action };
}

function main() {
  const { pkg, action } = options(process.argv.slice(2));
  const codes = languageCodes();
  const graph = loadSkillGraph(path.join(pkg, 'data/skills'), codes);
  const files = renderSkillAnalyticsFiles(graph, codes);
  const output = path.join(pkg, 'public/data/pages/skillAnalytics');
  if (action === '--measure') {
    const metrics = measureSkillAnalyticsFiles(files);
    console.log(JSON.stringify(metrics, null, 2));
  } else if (action === '--write') {
    writePublishedFiles(output, files);
    const metrics = measureSkillAnalyticsFiles(files);
    console.log(
      'Published skillAnalytics: ' +
        files.size +
        ' languages, ' +
        metrics.total +
        ' uncompressed bytes, ' +
        metrics.gzip +
        ' gzip bytes total',
    );
  } else {
    const diff = checkPublishedFiles(output, files);
    if (diff.missing.length || diff.changed.length || diff.stale.length) {
      throw new Error('skillAnalytics output differs: ' + JSON.stringify(diff));
    }
    console.log('skillAnalytics output verified: ' + files.size + ' files');
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
