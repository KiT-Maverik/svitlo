/** Trusted, byte-preserving replacement of one generated Course child stub.
 *
 * Reuse the TypeScript parser already required by the Episode analyzer; never
 * interpret TODO comments, evaluate parent code, or reconstruct a parent.
 * The publisher applies the same deterministic edit to its pinned parent blob.
 */
import ts from 'typescript';

const UUID = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;
const safe = value =>
  typeof value === 'string' &&
  /^[A-Za-z][A-Za-z0-9]*$/.test(value) &&
  !['constructor', '__proto__', 'prototype'].includes(value);
const identifier = value => typeof value === 'string' && /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value);
const name = node => (ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : undefined);
const unwrap = node => {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)))
    node = node.expression;
  return node;
};

function singleProperty(object, key) {
  const found = object.properties.filter(property => ts.isPropertyAssignment(property) && name(property.name) === key);
  if (found.length !== 1) throw Error('Expected exactly one parent ' + key + ' property');
  return found[0];
}

/** Resolve an integrated Lesson from the exact Course/Module/Chapter content slot.
 * Independent Lessons live in #lessonsData, not inside a Course placement.
 * Inspect the pinned immediate-parent AST; never search import text/comments or
 * infer a bank owner from an arbitrary sibling import.
 */
export function resolveIntegratedCourseLesson(source, { slug, ownerKind }) {
  if (typeof source !== 'string' || source.length > 4 * 1024 * 1024 ||
      !safe(slug) || !['course', 'module', 'chapter'].includes(ownerKind))
    throw Error('Invalid Course Lesson parent or placement');
  const ast = ts.createSourceFile('parent.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length ||
      ast.statements.some(statement => !ts.isImportDeclaration(statement) && !ts.isVariableStatement(statement)))
    throw Error('Unexpected integrated Course Lesson parent syntax');
  const imports = ast.statements.filter(ts.isImportDeclaration);
  const declarations = ast.statements.filter(ts.isVariableStatement).flatMap(statement =>
    [...statement.declarationList.declarations]);
  const collections = declarations.filter(declaration => ts.isIdentifier(declaration.name) &&
    declaration.name.text === 'content');
  if (collections.length !== 1 || !ts.isObjectLiteralExpression(unwrap(collections[0].initializer)))
    throw Error('Integrated Lesson requires one immediate parent content collection');
  const collection = unwrap(collections[0].initializer);
  if (collection.properties.length !== 2) throw Error('Unexpected Course Lesson content shape');
  const items = unwrap(singleProperty(collection, 'items').initializer);
  const order = unwrap(singleProperty(collection, 'order').initializer);
  if (!ts.isObjectLiteralExpression(items) || !ts.isArrayLiteralExpression(order))
    throw Error('Integrated Lesson parent items/order must be literal');
  const entries = items.properties.map(property => {
    if (!ts.isPropertyAssignment(property) || !safe(name(property.name)))
      throw Error('Unexpected integrated Lesson item syntax');
    return { key: name(property.name), value: unwrap(property.initializer) };
  });
  const keys = order.elements.map(element => {
    const node = unwrap(element);
    if (!ts.isStringLiteral(node) || !safe(node.text))
      throw Error('Invalid integrated Lesson parent order');
    return node.text;
  });
  if (keys.length !== entries.length || new Set(keys).size !== keys.length ||
      new Set(entries.map(entry => entry.key)).size !== entries.length ||
      entries.some(entry => !keys.includes(entry.key)))
    throw Error('Integrated Lesson parent items/order mismatch');
  const item = entries.find(entry => entry.key === slug)?.value;
  const alias = 'child_' + slug;
  const direct = ts.isIdentifier(item) && item.text === alias;
  const placed = ts.isCallExpression(item) &&
    ts.isIdentifier(item.expression) && item.expression.text === 'placeLesson' &&
    item.arguments.length === 2 && ts.isIdentifier(unwrap(item.arguments[0])) &&
    unwrap(item.arguments[0]).text === alias;
  if (!direct && !placed) throw Error('Upstream Lesson is not integrated into its reviewed Course slot');
  const owned = imports.filter(statement => {
    const clause = statement.importClause;
    return clause && !clause.isTypeOnly && clause.namedBindings &&
      ts.isNamedImports(clause.namedBindings) &&
      clause.namedBindings.elements.some(element => !element.isTypeOnly && element.name.text === alias);
  });
  if (owned.length !== 1 || owned[0].attributes ||
      owned[0].importClause.name ||
      owned[0].importClause.namedBindings.elements.length !== 1)
    throw Error('Missing or ambiguous integrated Lesson import');
  const binding = owned[0].importClause.namedBindings.elements[0];
  const specifier = owned[0].moduleSpecifier;
  const match = ts.isStringLiteral(specifier) &&
    /^#lessonsData\/([a-f0-9])\/([a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})\/index$/.exec(specifier.text);
  if (!binding.propertyName || !identifier(binding.propertyName.text) ||
      !match || match[1] !== match[2].at(-1))
    throw Error('Upstream Lesson import must bind a canonical verified Lesson UUID');
  const occurrences = { count: 0 };
  const visit = node => {
    if (ts.isIdentifier(node) && node.text === alias) occurrences.count++;
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(ast, visit);
  if (occurrences.count !== 2) throw Error('Ambiguous integrated Lesson alias reference');
  const definition = 'define' + ownerKind[0].toUpperCase() + ownerKind.slice(1);
  const parents = declarations.filter(declaration => {
    const call = unwrap(declaration.initializer);
    return ts.isCallExpression(call) && ts.isIdentifier(call.expression) &&
      call.expression.text === definition && call.arguments.length === 1 &&
      ts.isObjectLiteralExpression(unwrap(call.arguments[0])) &&
      unwrap(call.arguments[0]).properties.some(property =>
        ts.isShorthandPropertyAssignment(property) && name(property.name) === 'content');
  });
  if (parents.length !== 1 || !imports.some(statement =>
    ts.isStringLiteral(statement.moduleSpecifier) &&
    statement.moduleSpecifier.text === '@svitlo/engine/build' &&
    statement.importClause?.namedBindings &&
    ts.isNamedImports(statement.importClause.namedBindings) &&
    statement.importClause.namedBindings.elements.some(element =>
      !element.isTypeOnly && !element.propertyName && element.name.text === definition)))
    throw Error('Unexpected immediate Course Lesson owner');
  if (placed && !imports.some(statement =>
    ts.isStringLiteral(statement.moduleSpecifier) &&
    statement.moduleSpecifier.text === '@svitlo/engine/build' &&
    statement.importClause?.namedBindings &&
    ts.isNamedImports(statement.importClause.namedBindings) &&
    statement.importClause.namedBindings.elements.some(element =>
      !element.isTypeOnly && !element.propertyName && element.name.text === 'placeLesson')))
    throw Error('Course Lesson override lacks verified placement API');
  return match[2];
}

/** Verify an inert, generated, locally-owned stub; never import or execute it. */
export function verifyOwnedCourseStub(source, { kind, id, slug }) {
  const api = { lesson: 'defineLessonStub', episode: 'defineEpisodeStub', assessment: 'defineAssessmentStub' }[kind];
  if (!api || !UUID.test(id ?? '') || !safe(slug) || typeof source !== 'string' || source.length > 32 * 1024)
    throw Error('Invalid reserved Course child stub identity/source');
  const ast = ts.createSourceFile('stub.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length || ast.statements.length !== 2)
    throw Error('Owned Course stub must contain only one trusted import and one exported Configurator');
  const [imported, exported] = ast.statements;
  if (
    !ts.isImportDeclaration(imported) ||
    !ts.isStringLiteral(imported.moduleSpecifier) ||
    imported.moduleSpecifier.text !== '@svitlo/engine/build' ||
    imported.attributes ||
    !imported.importClause ||
    imported.importClause.isTypeOnly ||
    imported.importClause.name ||
    !imported.importClause.namedBindings ||
    !ts.isNamedImports(imported.importClause.namedBindings) ||
    imported.importClause.namedBindings.elements.length !== 1
  )
    throw Error('Owned Course stub has an unexpected runtime import');
  const binding = imported.importClause.namedBindings.elements[0];
  if (binding.isTypeOnly || binding.propertyName || binding.name.text !== api)
    throw Error('Owned Course stub must import exactly its draft-only API');
  if (
    !ts.isVariableStatement(exported) ||
    !(ts.getCombinedModifierFlags(exported) & ts.ModifierFlags.Export) ||
    !(exported.declarationList.flags & ts.NodeFlags.Const) ||
    exported.declarationList.declarations.length !== 1 ||
    !ts.isIdentifier(exported.declarationList.declarations[0].name) ||
    exported.declarationList.declarations[0].name.text !== 'stub'
  )
    throw Error('Owned Course stub must export exactly const stub');
  const call = unwrap(exported.declarationList.declarations[0].initializer);
  if (
    !ts.isCallExpression(call) ||
    !ts.isIdentifier(call.expression) ||
    call.expression.text !== api ||
    call.typeArguments?.length ||
    call.arguments.length !== 1 ||
    !ts.isObjectLiteralExpression(unwrap(call.arguments[0]))
  )
    throw Error('Owned Course stub cannot execute arbitrary source');
  const props = unwrap(call.arguments[0]);
  if (
    props.properties.length !== 2 ||
    props.properties.some(property => !ts.isPropertyAssignment(property)) ||
    !ts.isStringLiteral(unwrap(singleProperty(props, 'id').initializer)) ||
    !ts.isStringLiteral(unwrap(singleProperty(props, 'slug').initializer)) ||
    unwrap(singleProperty(props, 'id').initializer).text !== id ||
    unwrap(singleProperty(props, 'slug').initializer).text !== slug
  )
    throw Error('Owned Course stub UUID/slug differs from the pinned placement');
  return true;
}

/** Read-only Course Stage 5 seal: the generated parent must import the
 * exact local stub and use it once at the actual ordered child key. This is
 * equally strict for pending Lessons, which deliberately have no automatic
 * parent-restoration transaction.
 */
export function verifyPendingCourseParent(source, { kind, id, slug, placement, stubSource }) {
  if (
    !['lesson', 'episode', 'assessment'].includes(kind) ||
    typeof source !== 'string' ||
    source.length > 4 * 1024 * 1024 ||
    !UUID.test(id ?? '') ||
    !safe(slug) ||
    typeof placement !== 'string' ||
    placement.split('/').at(-1) !== slug
  )
    throw Error('Invalid pending Course stub or placement identity');
  const parts = placement.split('/');
  const depth = parts.length;
  if (
    parts[0] !== 'content' ||
    parts.some(part => !safe(part)) ||
    (kind === 'assessment' && ![2, 4, 5].includes(depth)) ||
    (kind !== 'assessment' && ![2, 3, 4].includes(depth)) ||
    (kind === 'assessment' && depth > 2 && parts.at(-2) !== 'content')
  )
    throw Error('Invalid pending Course parent ownership');
  verifyOwnedCourseStub(stubSource, { kind, id, slug });
  const ast = ts.createSourceFile('parent.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (
    ast.parseDiagnostics.length ||
    ast.statements.some(statement => !ts.isImportDeclaration(statement) && !ts.isVariableStatement(statement))
  )
    throw Error('Unexpected generated parent syntax');
  const imported = ast.statements.filter(ts.isImportDeclaration);
  const prefix = depth === 2 || kind === 'assessment' ? './content/' : './';
  const stubImport = prefix + slug + '/stub';
  const found = imported.filter(
    statement => ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === stubImport,
  );
  if (found.length !== 1) throw Error('Missing or duplicate Course child stub import');
  const clause = found[0].importClause;
  if (
    !clause ||
    clause.isTypeOnly ||
    clause.name ||
    found[0].attributes ||
    !clause.namedBindings ||
    !ts.isNamedImports(clause.namedBindings) ||
    clause.namedBindings.elements.length !== 1 ||
    clause.namedBindings.elements[0].isTypeOnly ||
    clause.namedBindings.elements[0].propertyName?.text !== 'stub' ||
    clause.namedBindings.elements[0].name.text !== 'child_' + slug
  )
    throw Error('Unexpected imported Course stub alias/export');
  if (
    imported.some(
      statement =>
        statement !== found[0] &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        [stubImport, stubImport + '/index'].includes(statement.moduleSpecifier.text),
    )
  )
    throw Error('Ambiguous imported Course stub');
  const variable = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .filter(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === 'content');
  if (variable.length !== 1 || !ts.isObjectLiteralExpression(unwrap(variable[0].initializer)))
    throw Error('Missing exact immediate parent content collection');
  const collection = unwrap(variable[0].initializer);
  if (collection.properties.length !== 2) throw Error('Unrecognized parent items/order shape');
  const itemNode = unwrap(singleProperty(collection, 'items').initializer);
  const orderNode = unwrap(singleProperty(collection, 'order').initializer);
  if (!ts.isObjectLiteralExpression(itemNode) || !ts.isArrayLiteralExpression(orderNode))
    throw Error('Parent items/order must be literals');
  const items = itemNode.properties.map(property => {
    if (!ts.isPropertyAssignment(property) || !safe(name(property.name))) throw Error('Unexpected parent item syntax');
    return { key: name(property.name), value: unwrap(property.initializer) };
  });
  const ordered = orderNode.elements.map(element => {
    const node = unwrap(element);
    if (!ts.isStringLiteral(node) || !safe(node.text)) throw Error('Unsafe parent order');
    return node.text;
  });
  if (
    items.length !== ordered.length ||
    new Set(items.map(item => item.key)).size !== items.length ||
    new Set(ordered).size !== ordered.length ||
    items.some(item => !ordered.includes(item.key))
  )
    throw Error('Incomplete or duplicate immediate parent order');
  const owned = items.find(item => item.key === slug);
  if (!owned || !ts.isIdentifier(owned.value) || owned.value.text !== 'child_' + slug)
    throw Error('Course pending child slot does not use its approved stub alias');
  let references = 0;
  const visit = node => {
    if (ts.isIdentifier(node) && node.text === 'child_' + slug) references++;
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(ast, visit);
  if (references !== 2) throw Error('Course pending stub alias has ambiguous references');
  const owner =
    depth === 2
      ? 'defineCourse'
      : kind === 'assessment'
        ? depth === 4
          ? 'defineModule'
          : 'defineChapter'
        : depth === 3
          ? 'defineModule'
          : 'defineChapter';
  const parents = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .filter(declaration => {
      const init = unwrap(declaration.initializer);
      return (
        ts.isCallExpression(init) &&
        ts.isIdentifier(init.expression) &&
        init.expression.text === owner &&
        init.arguments.length === 1 &&
        ts.isObjectLiteralExpression(unwrap(init.arguments[0])) &&
        unwrap(init.arguments[0]).properties.some(
          property => ts.isShorthandPropertyAssignment(property) && name(property.name) === 'content',
        )
      );
    });
  if (parents.length !== 1) throw Error('Unexpected immediate Course stub owner Configurator');
  const statements = ast.statements.filter(ts.isVariableStatement);
  if (
    statements.length !== 2 ||
    statements.some(
      statement =>
        statement.declarationList.declarations.length !== 1 || !(statement.declarationList.flags & ts.NodeFlags.Const),
    ) ||
    !parents.every(declaration =>
      statements.some(statement => statement.declarationList.declarations[0] === declaration),
    )
  )
    throw Error('Unexpected executable or extra parent variable declaration');

  const builds = imported.filter(
    statement =>
      ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === '@svitlo/engine/build',
  );
  if (
    !builds.some(
      statement =>
        statement.importClause?.namedBindings &&
        ts.isNamedImports(statement.importClause.namedBindings) &&
        statement.importClause.namedBindings.elements.some(
          specifier => !specifier.isTypeOnly && !specifier.propertyName && specifier.name.text === owner,
        ),
    )
  )
    throw Error('Immediate parent must import its declared Configurator');
  return true;
}

/** Pin the immediate parent AST and its separately imported, immutable stub.
 * Comments, text search, author-supplied orderPath and executable code are
 * never evidence of Course ownership or an eligible restoration.
 */
export function replaceReservedParentSlot(source, { kind, id, slug, placement, exportName, stubSource }) {
  if (
    typeof source !== 'string' ||
    source.length > 4 * 1024 * 1024 ||
    !['episode', 'assessment'].includes(kind) ||
    !UUID.test(id ?? '') ||
    !safe(slug) ||
    !identifier(exportName) ||
    typeof placement !== 'string' ||
    placement.split('/').at(-1) !== slug
  )
    throw Error('Invalid reserved child identity');
  const parts = placement.split('/');
  const root = parts.length === 2;
  if (
    parts[0] !== 'content' ||
    (kind === 'episode' && (parts.length < 2 || parts.length > 4)) ||
    (kind === 'assessment' && ![2, 4, 5].includes(parts.length)) ||
    parts.some(part => !safe(part)) ||
    (kind === 'assessment' && parts.length > 2 && parts.at(-2) !== 'content')
  )
    throw Error('Invalid reserved Course child ownership path');
  verifyOwnedCourseStub(stubSource, { kind, id, slug });
  const ast = ts.createSourceFile('parent.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length) throw Error('Invalid generated parent TypeScript');
  if (ast.statements.some(statement => !ts.isImportDeclaration(statement) && !ts.isVariableStatement(statement)))
    throw Error('Unexpected executable generated parent statement');
  const declarations = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .filter(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === 'content');
  if (declarations.length !== 1 || !ts.isObjectLiteralExpression(unwrap(declarations[0].initializer)))
    throw Error('Expected one generated parent content collection');
  const collection = unwrap(declarations[0].initializer);
  if (
    collection.properties.length !== 2 ||
    !ts.isObjectLiteralExpression(unwrap(singleProperty(collection, 'items').initializer)) ||
    !ts.isArrayLiteralExpression(unwrap(singleProperty(collection, 'order').initializer))
  )
    throw Error('Unsupported parent content shape');
  const items = unwrap(singleProperty(collection, 'items').initializer);
  const order = unwrap(singleProperty(collection, 'order').initializer);
  const entries = items.properties.map(property => {
    if (!ts.isPropertyAssignment(property) || !safe(name(property.name)))
      throw Error('Parent items must be a literal keyed collection');
    return { key: name(property.name), value: unwrap(property.initializer) };
  });
  const keys = entries.map(entry => entry.key);
  const ordered = order.elements.map(element => {
    const value = unwrap(element);
    if (!ts.isStringLiteral(value) || !safe(value.text)) throw Error('Parent content.order must contain literal keys');
    return value.text;
  });
  if (
    keys.length !== ordered.length ||
    new Set(keys).size !== keys.length ||
    new Set(ordered).size !== ordered.length ||
    keys.some(key => !ordered.includes(key))
  )
    throw Error('Parent content.items/order is incomplete or ambiguous');
  const slot = entries.find(entry => entry.key === slug)?.value;
  const orderIndex = ordered.indexOf(slug);
  if (orderIndex < 0 || !slot) throw Error('Reserved child stub missing from actual parent order/items');
  const importPath = (root || kind === 'assessment' ? './content/' : './') + slug + '/stub';
  const childAlias = 'child_' + slug;
  const imports = ast.statements.filter(ts.isImportDeclaration);
  const ownedImports = imports.filter(
    statement => ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === importPath,
  );
  if (ownedImports.length !== 1) throw Error('Expected exactly one immediate-parent stub import');
  const owned = ownedImports[0];
  const clause = owned.importClause;
  if (
    !clause ||
    clause.isTypeOnly ||
    clause.name ||
    owned.attributes ||
    !clause.namedBindings ||
    !ts.isNamedImports(clause.namedBindings) ||
    clause.namedBindings.elements.length !== 1 ||
    clause.namedBindings.elements[0].isTypeOnly ||
    clause.namedBindings.elements[0].propertyName?.text !== 'stub' ||
    clause.namedBindings.elements[0].name.text !== childAlias ||
    !ts.isIdentifier(slot) ||
    slot.text !== childAlias
  )
    throw Error('Parent slot must reference the exact imported draft-only stub');
  if (
    imports.some(
      statement =>
        statement !== owned &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        [importPath, importPath + '/index'].includes(statement.moduleSpecifier.text),
    )
  )
    throw Error('Ambiguous imported Course stub module');
  let occurrences = 0;
  const visit = node => {
    if (ts.isIdentifier(node) && node.text === childAlias) occurrences++;
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(ast, visit);
  if (occurrences !== 2) throw Error('Reserved stub alias is referenced outside its exact parent slot');
  const expectedParent = root
    ? 'defineCourse'
    : kind === 'assessment'
      ? parts.length === 4
        ? 'defineModule'
        : 'defineChapter'
      : parts.length === 3
        ? 'defineModule'
        : 'defineChapter';
  const parents = ast.statements.filter(ts.isVariableStatement).flatMap(statement =>
    [...statement.declarationList.declarations].filter(declaration => {
      const init = unwrap(declaration.initializer);
      if (
        !ts.isCallExpression(init) ||
        !ts.isIdentifier(init.expression) ||
        init.expression.text !== expectedParent ||
        init.arguments.length !== 1 ||
        !ts.isObjectLiteralExpression(unwrap(init.arguments[0]))
      )
        return false;
      return unwrap(init.arguments[0]).properties.some(
        property => ts.isShorthandPropertyAssignment(property) && name(property.name) === 'content',
      );
    }),
  );
  if (parents.length !== 1) throw Error('Unexpected immediate Course/Module/Chapter parent Configurator');
  const variableStatements = ast.statements.filter(ts.isVariableStatement);
  if (
    variableStatements.length !== 2 ||
    variableStatements.some(
      statement =>
        statement.declarationList.declarations.length !== 1 || !(statement.declarationList.flags & ts.NodeFlags.Const),
    )
  )
    throw Error('Unexpected executable or additional immediate parent declaration');

  const engineImports = imports.filter(
    statement =>
      ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === '@svitlo/engine/build',
  );
  if (
    !engineImports.some(
      statement =>
        !!statement.importClause?.namedBindings &&
        ts.isNamedImports(statement.importClause.namedBindings) &&
        statement.importClause.namedBindings.elements.some(
          element => !element.isTypeOnly && !element.propertyName && element.name.text === expectedParent,
        ),
    )
  )
    throw Error('Immediate parent Configurator API must be imported from Engine build');
  const target = root || kind === 'assessment' ? './content/' + slug : './' + slug;
  if (
    imports.some(
      statement =>
        ts.isStringLiteral(statement.moduleSpecifier) &&
        [target, target + '/index'].includes(statement.moduleSpecifier.text),
    )
  )
    throw Error('Completed child import already exists');
  // Exactly two edits: replace only the reviewed parent slot and remove ONLY
  // the now-unused imported stub. Other imports, children and order are intact.
  const edits = [
    { start: slot.getStart(ast), end: slot.end, value: childAlias },
    {
      start: owned.getStart(ast),
      end: source[owned.end] === '\n' ? owned.end + 1 : owned.end,
      value: '',
    },
  ];
  let updated = source;
  for (const edit of edits.sort((a, b) => b.start - a.start))
    updated = updated.slice(0, edit.start) + edit.value + updated.slice(edit.end);
  const childImport = 'import { ' + exportName + ' as ' + childAlias + ' } from ' + JSON.stringify(target) + ';\n';
  return { content: childImport + updated, orderIndex, order: ordered };
}

export function verifyReservedParentSlot(source, candidate, allocation) {
  if (replaceReservedParentSlot(source, allocation).content !== candidate)
    throw Error('Parent patch is not the exact authorized one-slot restoration');
  return true;
}

/** Decode only a pinned Course-generated typed *data literal*, using the same
 * existing TypeScript parser as the parent source check. This never interprets
 * author-written Stage 1/2 TypeScript, comments or executable expressions.
 * Unlike JSON.parse of a TS substring, it survives ordinary Prettier.
 */
export function readGeneratedCourseHandoff(source, { variable, contract }) {
  if (typeof source !== 'string' || source.length > 2 * 1024 * 1024 || !identifier(variable) || !identifier(contract))
    throw Error('Invalid Course-generated handoff source');
  const ast = ts.createSourceFile('handoff.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length || ast.statements.length !== 2)
    throw Error('Course handoff must contain only its typed import and data export');
  const [imported, exported] = ast.statements;
  if (
    !ts.isImportDeclaration(imported) ||
    !ts.isStringLiteral(imported.moduleSpecifier) ||
    imported.moduleSpecifier.text !== '@svitlo/engine/build' ||
    !imported.importClause?.namedBindings ||
    imported.importClause.name ||
    imported.attributes ||
    !ts.isNamedImports(imported.importClause.namedBindings) ||
    imported.importClause.namedBindings.elements.length !== 1 ||
    imported.importClause.namedBindings.elements[0].name.text !== contract ||
    imported.importClause.namedBindings.elements[0].propertyName ||
    (!imported.importClause.isTypeOnly && !imported.importClause.namedBindings.elements[0].isTypeOnly)
  )
    throw Error('Course handoff has an unexpected authoring contract import');
  // Generated Course seeds may use the historical named const export or the
  // inert single-default-export contract. Both must be literal typed data,
  // never an executable statement or an imported candidate module.
  let typed;
  if (ts.isVariableStatement(exported)) {
    if (
      !(ts.getCombinedModifierFlags(exported) & ts.ModifierFlags.Export) ||
      !(exported.declarationList.flags & ts.NodeFlags.Const) ||
      exported.declarationList.declarations.length !== 1 ||
      name(exported.declarationList.declarations[0].name) !== variable
    )
      throw Error('Course handoff must export its one canonical immutable data object');
    typed = exported.declarationList.declarations[0].initializer;
  } else if (ts.isExportAssignment(exported) && !exported.isExportEquals) {
    typed = exported.expression;
  } else {
    throw Error('Course handoff must export one named or default typed data object');
  }
  while (typed && ts.isParenthesizedExpression(typed)) typed = typed.expression;
  if (
    !typed ||
    !ts.isSatisfiesExpression(typed) ||
    !ts.isTypeReferenceNode(typed.type) ||
    name(typed.type.typeName) !== contract ||
    typed.type.typeArguments?.length
  )
    throw Error('Course handoff must satisfy the exact typed seed contract');
  let literal = typed.expression;
  if (ts.isAsExpression(literal)) {
    if (!ts.isTypeReferenceNode(literal.type) || name(literal.type.typeName) !== 'const')
      throw Error('Course handoff must use an immutable as const data assertion');
    literal = literal.expression;
  } else if (ts.isVariableStatement(exported)) {
    // Historical named seed output required the literal's as const assertion.
    throw Error('Course handoff must use an immutable as const data assertion');
  }
  literal = unwrap(literal);
  if (!ts.isObjectLiteralExpression(literal)) throw Error('Course handoff must be a literal data object');
  const decode = node => {
    node = unwrap(node);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) {
      const value = Number(node.text);
      if (!Number.isSafeInteger(value) || value < 0) throw Error('Unsafe handoff numeric value');
      return value;
    }
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(decode);
    if (ts.isObjectLiteralExpression(node)) {
      const entries = node.properties.map(property => {
        if (!ts.isPropertyAssignment(property)) throw Error('Handoff may contain data properties only');
        const key = name(property.name);
        if (!key || ['__proto__', 'prototype', 'constructor'].includes(key))
          throw Error('Unsafe Course handoff property');
        return [key, decode(property.initializer)];
      });
      if (new Set(entries.map(([key]) => key)).size !== entries.length)
        throw Error('Duplicate Course handoff object property');
      return Object.fromEntries(entries);
    }
    throw Error('Course handoff must not contain executable TypeScript');
  };
  return decode(literal);
}
