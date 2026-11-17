/**
 * Shared read-only static Lesson discovery for PR lookups and the legacy Skill index.
 * Authored TypeScript/YAML is parsed, never imported, compiled or executed.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import yaml from 'yaml';

export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const PACKAGE = /^content\/[a-z][a-z0-9-]*$/;
export const uuid = value => typeof value === 'string' && UUID.test(value);
export const normalized = value => value.toLowerCase();
const sort = values => [...values].sort((a, b) => a.localeCompare(b, 'en'));
const slash = value => value.split(path.sep).join('/');
const exists = file => fs.existsSync(file) && fs.lstatSync(file).isFile();
const relative = (root, file) => slash(path.relative(root, file));
const isRecord = value => value && typeof value === 'object' && !Array.isArray(value);

function walk(dir, predicate, result = []) {
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) throw Error('Symlink refused: ' + file);
    if (entry.isDirectory()) walk(file, predicate, result);
    else if (entry.isFile() && predicate(file)) result.push(file);
  }
  return result;
}
function unwrap(node) {
  while (
    node &&
    (ts.isAsExpression(node) ||
      ts.isSatisfiesExpression(node) ||
      ts.isParenthesizedExpression(node) ||
      ts.isNonNullExpression(node))
  )
    node = node.expression;
  return node;
}
function key(prop) {
  return prop && (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) ? prop.name.text : null;
}
function field(object, name) {
  const item = object?.properties?.find(
    p => (ts.isPropertyAssignment(p) || ts.isShorthandPropertyAssignment(p)) && key(p) === name,
  );
  return item && (ts.isPropertyAssignment(item) ? item.initializer : item.name);
}
function string(node) {
  node = unwrap(node);
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : null;
}
function object(node) {
  node = unwrap(node);
  return node && ts.isObjectLiteralExpression(node) ? node : null;
}
function source(file) {
  const result = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  if (result.parseDiagnostics?.length) throw Error('Invalid TypeScript syntax');
  return result;
}
const sourceCache = new Map();
function fileSource(file) {
  if (!sourceCache.has(file)) sourceCache.set(file, source(file));
  return sourceCache.get(file);
}
function declarations(sf) {
  const result = new Map();
  for (const item of sf.statements) {
    if (!ts.isVariableStatement(item)) continue;
    const exported = item.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;
    for (const d of item.declarationList.declarations) {
      if (ts.isIdentifier(d.name)) result.set(d.name.text, { node: d.initializer, exported });
    }
  }
  return result;
}
function moduleFile(from, specifier) {
  if (!specifier.startsWith('.')) return null;
  const base = path.resolve(path.dirname(from), specifier);
  for (const candidate of [base + '.ts', base + '.data.ts', path.join(base, 'index.ts')]) {
    if (exists(candidate)) return candidate;
  }
  return null;
}
function importSource(sf, file, local) {
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    const imported = statement.importClause?.namedBindings;
    if (!imported || !ts.isNamedImports(imported)) continue;
    for (const element of imported.elements) {
      if (element.name.text === local)
        return {
          symbol: (element.propertyName ?? element.name).text,
          file: moduleFile(file, statement.moduleSpecifier.text),
        };
    }
  }
  return null;
}
function findExport(file, name, depth = new Set()) {
  if (!file || depth.has(file)) return null;
  depth.add(file);
  try {
    const sf = fileSource(file);
    const local = declarations(sf).get(name);
    if (local?.exported) return { file, sf, node: local.node };
    for (const stmt of sf.statements) {
      if (!ts.isExportDeclaration(stmt) || !stmt.moduleSpecifier || !ts.isStringLiteral(stmt.moduleSpecifier)) continue;
      const next = moduleFile(file, stmt.moduleSpecifier.text);
      if (stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
        const element = stmt.exportClause.elements.find(e => e.name.text === name);
        if (element) return findExport(next, (element.propertyName ?? element.name).text, depth);
      } else if (!stmt.exportClause) {
        const found = findExport(next, name, depth);
        if (found) return found;
      }
    }
    return null;
  } finally {
    depth.delete(file);
  }
}
function expression(sf, file, node, seen = new Set()) {
  node = unwrap(node);
  if (!node || !ts.isIdentifier(node)) return node;
  const name = node.text;
  const identity = file + ':' + name;
  if (seen.has(identity)) throw Error('Cyclic symbol ' + name);
  seen.add(identity);
  try {
    const declaration = declarations(sf).get(name);
    if (declaration) return expression(sf, file, declaration.node, seen);
    const imp = importSource(sf, file, name);
    if (imp?.file) {
      const ref = findExport(imp.file, imp.symbol);
      if (ref) return expression(ref.sf, ref.file, ref.node, seen);
    }
    return node;
  } finally {
    seen.delete(identity);
  }
}
function namedObject(sf, file, node) {
  return object(expression(sf, file, node));
}
function namedString(sf, file, node) {
  return string(expression(sf, file, node));
}
function skillCatalogue(root, book, diagnostics) {
  const byId = new Map(),
    bySymbol = new Map();
  const folder = path.join(root, 'content', book, 'data/skills');
  let files = [];
  try {
    files = walk(folder, p => p.endsWith('.ts') && !p.endsWith('.d.ts') && !p.endsWith('.spec.ts'));
  } catch (error) {
    diagnostics.push({
      file: relative(root, folder),
      package: 'content/' + book,
      entityId: null,
      reason: error.message,
      incomplete: true,
    });
  }
  for (const file of files) {
    try {
      const sf = fileSource(file);
      for (const [symbol, declaration] of declarations(sf)) {
        if (!declaration.exported) continue;
        const call = unwrap(declaration.node);
        if (
          !call ||
          !ts.isCallExpression(call) ||
          !ts.isIdentifier(call.expression) ||
          call.expression.text !== 'defineSkill'
        )
          continue;
        const config = object(call.arguments[0]);
        const id = string(field(config, 'id'));
        if (!uuid(id)) throw Error('defineSkill has no literal UUID: ' + symbol);
        const name = namedObject(sf, file, field(config, 'name'));
        const value = { id: normalized(id), name: string(field(name, 'en')), source: relative(root, file) };
        if (byId.has(value.id)) throw Error('Duplicate Skill UUID: ' + value.id);
        byId.set(value.id, value);
        if (bySymbol.has(symbol)) bySymbol.set(symbol, null);
        else bySymbol.set(symbol, value);
      }
    } catch (error) {
      diagnostics.push({
        file: relative(root, file),
        package: 'content/' + book,
        entityId: null,
        reason: error.message,
        incomplete: true,
      });
    }
  }
  return { byId, bySymbol };
}
function skillRef(node, sf, file, catalogue) {
  node = unwrap(node);
  if (ts.isStringLiteral(node)) {
    const id = normalized(node.text);
    if (!uuid(id) || !catalogue.byId.has(id)) throw Error('Unknown or invalid Skill UUID ' + id);
    return id;
  }
  if (!ts.isPropertyAccessExpression(node) || node.name.text !== 'id')
    throw Error('Unsupported dynamic Skill expression');
  let reference = node.expression;
  if (
    ts.isPropertyAccessExpression(reference) &&
    reference.name.text === 'base' &&
    ts.isPropertyAccessExpression(reference.expression) &&
    reference.expression.name.text === 'config'
  ) {
    reference = reference.expression.expression;
  }
  if (!ts.isIdentifier(reference)) throw Error('Unsupported Skill reference');
  const imported = importSource(sf, file, reference.text);
  let skill = imported?.file ? findExport(imported.file, imported.symbol) : null;
  if (skill) {
    const call = unwrap(skill.node);
    const conf = call && ts.isCallExpression(call) ? object(call.arguments[0]) : null;
    const id = string(field(conf, 'id'));
    if (!uuid(id)) throw Error('Imported Skill has no static ID: ' + reference.text);
    const result = normalized(id);
    if (!catalogue.byId.has(result)) throw Error('Imported Skill absent from taxonomy: ' + result);
    return result;
  }
  if (imported?.file) throw Error('Imported module does not export the requested Skill: ' + reference.text);
  // Legacy barrel imports sometimes use an unresolved directory; accept only
  // an unambiguous textbook-local export symbol, never a guess across packages.
  const lookup = catalogue.bySymbol.get(imported?.symbol ?? reference.text);
  if (!lookup) throw Error('Unresolved or ambiguous Skill import: ' + reference.text);
  return lookup.id;
}
function lessonObject(sf, file, expected, depth = new Set()) {
  const identity = file + ':' + expected;
  if (depth.has(identity)) throw Error('Cyclic Lesson source');
  depth.add(identity);
  try {
    let selected = null;
    for (const [symbol, declaration] of declarations(sf)) {
      if (!declaration.exported) continue;
      const init = unwrap(declaration.node);
      if (!init || !ts.isCallExpression(init)) continue;
      const outer = init.expression;
      const isLesson = ts.isIdentifier(outer) && outer.text === 'defineLesson';
      const isLegacy =
        ts.isCallExpression(outer) && ts.isIdentifier(outer.expression) && outer.expression.text === 'defineLessonData';
      if (!isLesson && !isLegacy) continue;
      const conf = object(init.arguments[0]);
      if (!conf) throw Error('Dynamic Lesson configuration: ' + symbol);
      const id = namedString(sf, file, field(conf, 'id'));
      if (!uuid(id)) throw Error('Lesson missing literal UUID: ' + symbol);
      if (normalized(id) !== expected) throw Error('Lesson source ID mismatch: ' + id + ' expected ' + expected);
      if (selected) throw Error('Multiple exported Lessons in one entrypoint');
      selected = conf;
    }
    if (!selected) throw Error('No exported defineLesson for ' + expected);
    return selected;
  } finally {
    depth.delete(identity);
  }
}
function lessonValues(sf, file, config, catalogue, visited = new Set()) {
  const identity = file + ':' + config.pos;
  if (visited.has(identity)) throw Error('Cyclic Lesson spread');
  visited.add(identity);
  try {
    let values = { skills: null, title: null, slug: null, languages: null };
    for (const property of config.properties) {
      if (ts.isSpreadAssignment(property)) {
        const spread = unwrap(property.expression);
        if (!ts.isIdentifier(spread)) throw Error('Unsupported dynamic Lesson spread');
        const imp = importSource(sf, file, spread.text);
        let ref = imp?.file ? findExport(imp.file, imp.symbol) : null;
        if (!ref) {
          const local = declarations(sf).get(spread.text);
          if (local) ref = { file, sf, node: local.node };
        }
        if (!ref) throw Error('Unresolved Lesson spread: ' + spread.text);
        const call = unwrap(ref.node);
        const nested = call && ts.isCallExpression(call) ? object(call.arguments[0]) : object(call);
        if (!nested) throw Error('Non-static Lesson spread: ' + spread.text);
        values = { ...values, ...lessonValues(ref.sf, ref.file, nested, catalogue, visited) };
        continue;
      }
      if (!ts.isPropertyAssignment(property)) continue;
      const name = key(property);
      if (name === 'skills') {
        const arr = unwrap(expression(sf, file, property.initializer));
        if (!arr || !ts.isArrayLiteralExpression(arr)) throw Error('Non-static skills array');
        values.skills = arr.elements.map(e => skillRef(e, sf, file, catalogue));
        if (!values.skills.length || new Set(values.skills).size !== values.skills.length)
          throw Error('Lesson requires unique static Skill IDs');
      }
      if (name === 'slug') values.slug = namedString(sf, file, property.initializer);
      if (name === 'title') {
        const title = namedObject(sf, file, property.initializer);
        values.title = title ? namedString(sf, file, field(title, 'en')) : namedString(sf, file, property.initializer);
      }
      if (name === 'locale') {
        const locale = namedObject(sf, file, property.initializer);
        const title = namedObject(sf, file, field(locale, 'title'));
        if (title) values.title = namedString(sf, file, field(title, 'en'));
      }
      if (name === 'params') {
        const params = namedObject(sf, file, property.initializer);
        const langs = unwrap(expression(sf, file, field(params, 'languages')));
        if (langs && ts.isArrayLiteralExpression(langs)) {
          const parsed = langs.elements.map(e => namedString(sf, file, e));
          values.languages = parsed.every(x => typeof x === 'string') ? parsed : null;
        }
      }
    }
    if (!values.skills) throw Error('Lesson missing statically verified Skill IDs');
    return values;
  } finally {
    visited.delete(identity);
  }
}
function draftData(file) {
  if (fs.statSync(file).size > 2_000_000) throw Error('YAML exceeds size limit');
  const doc = yaml.parseDocument(fs.readFileSync(file, 'utf8'), { strict: true, uniqueKeys: true, version: '1.2' });
  if (doc.errors.length) throw Error('Invalid YAML: ' + doc.errors.map(x => x.message).join('; '));
  const parsed = doc.toJS({ maxAliasCount: 0 });
  const config = parsed?.config;
  if (
    !isRecord(config) ||
    !uuid(config.id) ||
    !Array.isArray(config.skills) ||
    !config.skills.length ||
    !config.skills.every(uuid)
  )
    throw Error('Draft requires config.id and literal config.skills UUIDs');
  if (new Set(config.skills.map(normalized)).size !== config.skills.length) throw Error('Duplicate draft Skill IDs');
  return {
    id: normalized(config.id),
    slug: typeof config.slug === 'string' ? config.slug : null,
    title: typeof config.locale?.title?.en === 'string' ? config.locale.title.en : null,
    skills: config.skills.map(normalized),
    languages:
      Array.isArray(config.params?.languages) && config.params.languages.every(x => typeof x === 'string')
        ? config.params.languages
        : null,
  };
}
export function buildLessonIndex(root, selectedPackage) {
  if (selectedPackage && !PACKAGE.test(selectedPackage)) throw Error('Invalid textbook package');
  sourceCache.clear();
  const packagesDir = path.join(root, 'content');
  const packages = selectedPackage
    ? [selectedPackage.split('/')[1]]
    : fs.existsSync(packagesDir)
      ? fs
          .readdirSync(packagesDir, { withFileTypes: true })
          .filter(x => x.isDirectory() && /^[a-z][a-z0-9-]*$/.test(x.name))
          .map(x => x.name)
          .sort()
      : [];
  const diagnostics = [],
    candidates = [],
    skillDefinitions = new Map();
  let implemented = 0,
    drafts = 0;
  for (const book of packages) {
    const pkg = 'content/' + book;
    if (selectedPackage && !fs.existsSync(path.join(packagesDir, book))) {
      diagnostics.push({
        file: pkg,
        package: pkg,
        entityId: null,
        reason: 'Unknown textbook package',
        incomplete: true,
      });
      continue;
    }
    const catalogue = skillCatalogue(root, book, diagnostics);
    for (const [id, skill] of catalogue.byId) skillDefinitions.set(pkg + ':' + id, skill);
    const dir = path.join(packagesDir, book, 'data/lessons');
    if (!fs.existsSync(dir)) continue;
    for (const bucket of fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(x => x.isDirectory())
      .map(x => x.name)
      .sort()) {
      const bucketDir = path.join(dir, bucket);
      for (const name of fs
        .readdirSync(bucketDir, { withFileTypes: true })
        .filter(x => x.isDirectory())
        .map(x => x.name)
        .sort()) {
        const folder = path.join(bucketDir, name);
        const diagnostic = (file, reason) =>
          diagnostics.push({
            file: relative(root, file),
            entityId: uuid(name) ? normalized(name) : null,
            package: pkg,
            reason,
            incomplete: true,
          });
        if (!uuid(name) || bucket !== normalized(name).slice(-1) || name !== normalized(name)) {
          diagnostic(folder, 'Invalid UUID bucket or Lesson directory name');
          continue;
        }
        const indexFile = path.join(folder, 'index.ts');
        const legacy = fs
          .readdirSync(folder)
          .filter(n => n.endsWith('.data.ts'))
          .sort();
        const typed = exists(indexFile) ? indexFile : legacy.length === 1 ? path.join(folder, legacy[0]) : null;
        const draft = path.join(folder, 'lesson.yaml');
        if (
          (fs.existsSync(indexFile) && fs.lstatSync(indexFile).isSymbolicLink()) ||
          (fs.existsSync(draft) && fs.lstatSync(draft).isSymbolicLink())
        ) {
          diagnostic(folder, 'Lesson source symlink refused');
          continue;
        }
        if (!typed && !exists(draft)) continue;
        if (legacy.length > 1 && !exists(indexFile)) {
          diagnostic(folder, 'Ambiguous Lesson *.data.ts');
          continue;
        }
        let compiled = null,
          editorial = null;
        if (typed) {
          implemented++;
          try {
            const sf = fileSource(typed);
            const conf = lessonObject(sf, typed, normalized(name));
            compiled = lessonValues(sf, typed, conf, catalogue);
          } catch (error) {
            diagnostic(typed, error.message);
          }
        }
        if (exists(draft)) {
          drafts++;
          try {
            editorial = draftData(draft);
            if (editorial.id !== normalized(name)) throw Error('Draft ID differs from UUID directory');
            for (const skill of editorial.skills) {
              if (!catalogue.byId.has(skill)) throw Error('Unknown draft Skill UUID: ' + skill);
            }
          } catch (error) {
            diagnostic(draft, error.message);
            editorial = null;
          }
        }
        if (
          compiled &&
          editorial &&
          (compiled.skills.length !== editorial.skills.length ||
            compiled.skills.some(id => !editorial.skills.includes(id)))
        ) {
          diagnostic(draft, 'Typed Lesson and YAML draft disagree on Skill IDs');
        }
        const values = compiled ?? (typed ? null : editorial);
        if (!values) continue;
        const brief = ['methodology.md', 'methodologist-brief.md'].map(n => path.join(folder, n)).find(exists);
        candidates.push({
          lessonId: normalized(name),
          package: pkg,
          textbook: book,
          status: typed ? 'implemented' : 'editorial-draft',
          title: values.title,
          slug: values.slug,
          skills: values.skills,
          languages: values.languages,
          languageStatus: values.languages ? 'verified' : 'unknown',
          source: relative(root, typed ?? draft),
          draftSource: exists(draft) ? relative(root, draft) : null,
          methodology: brief ? relative(root, brief) : null,
        });
      }
    }
  }
  candidates.sort((a, b) => a.package.localeCompare(b.package) || a.lessonId.localeCompare(b.lessonId));
  return {
    candidates,
    diagnostics,
    skillDefinitions,
    complete: diagnostics.length === 0,
    scanned: { packages: packages.length, implemented, drafts, candidates: candidates.length },
  };
}
export function searchLessons(root, query, sourceSha = null) {
  const { candidates, diagnostics, complete, scanned } = buildLessonIndex(root, query.package);
  const duplicates = new Map();
  for (const item of candidates)
    duplicates.set(item.lessonId, [...(duplicates.get(item.lessonId) ?? []), item.package]);
  if (query.by === 'id' && (duplicates.get(query.lessonId)?.length ?? 0) > 1) {
    throw Error('Lesson UUID exists in multiple packages: ' + duplicates.get(query.lessonId).join(', '));
  }
  const matches = candidates
    .filter(item =>
      query.by === 'id'
        ? item.lessonId === query.lessonId
        : query.match === 'all'
          ? query.skills.every(id => item.skills.includes(id))
          : query.skills.some(id => item.skills.includes(id)),
    )
    .map(item => ({
      ...item,
      matchedSkills: query.by === 'skill' ? query.skills.filter(id => item.skills.includes(id)) : [],
      coverage: query.by === 'skill' ? query.skills.filter(id => item.skills.includes(id)).length : null,
    }));
  return { query, sourceSha, matches, scanned, diagnostics, complete };
}
