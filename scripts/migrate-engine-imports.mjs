#!/usr/bin/env node
/** Deterministically migrate removed Engine subpath imports across tracked source files. */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const taxonomyTypes = new Set([
  'SkillId', 'Skill_Config', 'Skill', 'SkillData', 'SkillGroup_Config',
  'SkillGroup', 'SkillGroupData', 'SkillDomain_Config', 'SkillDomain', 'SkillDomainData',
]);
const localeContracts = new Set([
  'DEFAULT_SUPPORTED_LANGUAGES', 'FALLBACK_LANGUAGE', 'FALLBACK_LOCALE',
  'TextDirection', 'LanguageDefinition', 'AdditionalLanguages', 'AdditionalLanguage',
  'DefaultSupportedLanguage', 'SupportedLanguage', 'Locale', 'LanguageCode',
  'LanguageFor', 'LocalizedContent', 'LanguageConfiguration',
]);
const subpaths = new Set([
  'builders', 'content', 'generation', 'lesson', 'localization', 'taxonomy',
  'assessment-methods', 'definitions', 'schemas', 'configurators', 'types', 'utils',
]);

export function rewriteEngineImports(source) {
  const named = /\b(import|export)\s+(type\s+)?\{([^}]+)\}\s+from\s+(['"])@svitlo\/engine\/(taxonomy|localization)\4\s*;?/g;
  let result = source.replace(named, (whole, verb, typeOnly, fields, quote, domain) => {
    const members = fields.split(',').map(item => item.trim()).filter(Boolean);
    if (members.some(item => !/^(?:type\s+)?[A-Za-z_$][\w$]*(?:\s+as\s+[A-Za-z_$][\w$]*)?$/.test(item))) {
      throw new Error('Unsupported Engine import declaration: ' + whole);
    }
    const contracts = [], engine = [];
    const contractSymbols = domain === 'taxonomy' ? taxonomyTypes : localeContracts;
    for (const item of members) {
      const symbol = item.replace(/^type\s+/, '').split(/\s+as\s+/)[0];
      (contractSymbols.has(symbol) ? contracts : engine).push(item);
    }
    const declaration = (items, module) => {
      if (!items.length) return null;
      const names = typeOnly ? items.map(item => item.replace(/^type\s+/, '')) : items;
      return verb + ' ' + (typeOnly || '') + '{ ' + names.join(', ') + ' } from ' + quote + module + quote + ';';
    };
    return [
      declaration(contracts, '@svitlo/contracts/' + domain),
      declaration(engine, '@svitlo/engine'),
    ].filter(Boolean).join('\n');
  });

  result = result.replace(/(['"])@svitlo\/engine\/([^'"\r\n]+)\1/g, (whole, quote, subpath) => {
    if (!subpaths.has(subpath)) throw new Error('Unsupported Engine subpath: ' + subpath);
    const module = subpath === 'content' ? '@svitlo/contracts/content' : '@svitlo/engine';
    return quote + module + quote;
  });
  return result;
}

export function rewriteTrackedFiles({ write = false, root = process.cwd() } = {}) {
  const files = execFileSync('git', ['ls-files', '-z'], {
    cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024,
  }).split('\0').filter(path => /\.(?:ts|tsx|mts|cts|js|jsx|mjs|cjs|json|yaml|yml)$/.test(path));
  const changed = [];
  for (const path of files) {
    const name = root + '/' + path;
    const oldContent = readFileSync(name, 'utf8');
    const newContent = rewriteEngineImports(oldContent);
    if (newContent === oldContent) continue;
    changed.push(path);
    if (write) writeFileSync(name, newContent);
  }
  const grouped = {};
  for (const path of changed) {
    const key = path.split('/').slice(0, 2).join('/');
    grouped[key] = (grouped[key] || 0) + 1;
  }
  return { count: changed.length, grouped };
}

if (process.argv[1]?.endsWith('/migrate-engine-imports.mjs')) {
  const mode = process.argv[2];
  if (mode !== '--write' && mode !== '--check') {
    console.error('Usage: node scripts/migrate-engine-imports.mjs --check|--write');
    process.exitCode = 2;
  } else {
    try {
      const result = rewriteTrackedFiles({ write: mode === '--write' });
      console.log(JSON.stringify({ mode, ...result }, null, 2));
      if (mode === '--check' && result.count) process.exitCode = 1;
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  }
}
