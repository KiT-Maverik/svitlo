/** Trusted read-only verification of Course reservations, stubs and Lesson imports.
 * Parse the pinned TypeScript source; never evaluate candidate code or infer
 * child ownership from comments or authored placement arrays.
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
  const ownerKinds = Array.isArray(ownerKind) ? ownerKind : [ownerKind];
  if (
    typeof source !== 'string' ||
    source.length > 4 * 1024 * 1024 ||
    !safe(slug) ||
    !ownerKinds.length ||
    ownerKinds.some(kind => !['course', 'module', 'chapter'].includes(kind))
  )
    throw Error('Invalid Course Lesson parent or placement');
  const ast = ts.createSourceFile('parent.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (
    ast.parseDiagnostics.length ||
    ast.statements.some(statement => !ts.isImportDeclaration(statement) && !ts.isVariableStatement(statement))
  )
    throw Error('Unexpected integrated Course Lesson parent syntax');
  const imports = ast.statements.filter(ts.isImportDeclaration);
  const declarations = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations]);
  const collections = declarations.filter(
    declaration => ts.isIdentifier(declaration.name) && declaration.name.text === 'content',
  );
  if (collections.length !== 1 || !ts.isObjectLiteralExpression(unwrap(collections[0].initializer)))
    throw Error('Integrated Lesson requires one immediate parent content collection');
  const collection = unwrap(collections[0].initializer);
  if (collection.properties.length !== 2) throw Error('Unexpected Course Lesson content shape');
  const items = unwrap(singleProperty(collection, 'items').initializer);
  const order = unwrap(singleProperty(collection, 'order').initializer);
  if (!ts.isObjectLiteralExpression(items) || !ts.isArrayLiteralExpression(order))
    throw Error('Integrated Lesson parent items/order must be literal');
  const entries = items.properties.map(property => {
    if (ts.isShorthandPropertyAssignment(property) && safe(property.name.text))
      return { key: property.name.text, value: property.name };
    if (!ts.isPropertyAssignment(property) || !safe(name(property.name)))
      throw Error('Unexpected integrated Lesson item syntax');
    return { key: name(property.name), value: unwrap(property.initializer) };
  });
  const keys = order.elements.map(element => {
    const node = unwrap(element);
    if (!ts.isStringLiteral(node) || !safe(node.text)) throw Error('Invalid integrated Lesson parent order');
    return node.text;
  });
  if (
    keys.length !== entries.length ||
    new Set(keys).size !== keys.length ||
    new Set(entries.map(entry => entry.key)).size !== entries.length ||
    entries.some(entry => !keys.includes(entry.key))
  )
    throw Error('Integrated Lesson parent items/order mismatch');
  const item = entries.find(entry => entry.key === slug)?.value;
  if (!item) throw Error('Upstream Lesson is not integrated into its reviewed Course slot');
  const direct = ts.isIdentifier(item);
  const placed =
    ts.isCallExpression(item) &&
    ts.isIdentifier(item.expression) &&
    item.expression.text === 'placeLesson' &&
    item.arguments.length === 2 &&
    ts.isIdentifier(unwrap(item.arguments[0]));
  if (!direct && !placed) throw Error('Upstream Lesson is not integrated into its reviewed Course slot');
  const localName = direct ? item.text : unwrap(item.arguments[0]).text;
  if (!identifier(localName)) throw Error('Invalid integrated Lesson identifier');
  const owned = imports.filter(statement => {
    const clause = statement.importClause;
    return (
      clause &&
      !clause.isTypeOnly &&
      clause.namedBindings &&
      ts.isNamedImports(clause.namedBindings) &&
      clause.namedBindings.elements.some(element => !element.isTypeOnly && element.name.text === localName)
    );
  });
  if (
    owned.length !== 1 ||
    owned[0].attributes ||
    owned[0].importClause.name ||
    owned[0].importClause.namedBindings.elements.length !== 1
  )
    throw Error('Missing or ambiguous integrated Lesson import');
  const binding = owned[0].importClause.namedBindings.elements[0];
  const specifier = owned[0].moduleSpecifier;
  const match =
    ts.isStringLiteral(specifier) &&
    /^#lessonsData\/([a-f0-9])\/([a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})\/index$/.exec(specifier.text);
  if (!identifier(binding.propertyName?.text ?? binding.name.text) || !match || match[1] !== match[2].at(-1))
    throw Error('Upstream Lesson import must bind a canonical verified Lesson UUID');
  const occurrences = { count: 0 };
  const visit = node => {
    if (ts.isIdentifier(node) && node.text === localName) occurrences.count++;
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(ast, visit);
  if (occurrences.count !== 2) throw Error('Ambiguous integrated Lesson import reference');
  const definitions = ownerKinds.map(kind => 'define' + kind[0].toUpperCase() + kind.slice(1));
  const parents = declarations.filter(declaration => {
    const call = unwrap(declaration.initializer);
    return (
      ts.isCallExpression(call) &&
      ts.isIdentifier(call.expression) &&
      definitions.includes(call.expression.text) &&
      call.arguments.length === 1 &&
      ts.isObjectLiteralExpression(unwrap(call.arguments[0])) &&
      unwrap(call.arguments[0]).properties.some(
        property => ts.isShorthandPropertyAssignment(property) && name(property.name) === 'content',
      )
    );
  });
  if (
    parents.length !== 1 ||
    !imports.some(
      statement =>
        ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.moduleSpecifier.text === '@svitlo/engine/build' &&
        statement.importClause?.namedBindings &&
        ts.isNamedImports(statement.importClause.namedBindings) &&
        statement.importClause.namedBindings.elements.some(
          element =>
            !element.isTypeOnly &&
            !element.propertyName &&
            element.name.text === unwrap(parents[0].initializer).expression.text,
        ),
    )
  )
    throw Error('Unexpected immediate Course Lesson owner');
  if (
    placed &&
    !imports.some(
      statement =>
        ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.moduleSpecifier.text === '@svitlo/engine/build' &&
        statement.importClause?.namedBindings &&
        ts.isNamedImports(statement.importClause.namedBindings) &&
        statement.importClause.namedBindings.elements.some(
          element => !element.isTypeOnly && !element.propertyName && element.name.text === 'placeLesson',
        ),
    )
  )
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
    exported.declarationList.declarations[0].name.text !== slug
  )
    throw Error('Owned Course stub must export its placement slug');
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
 * equally strict for pending Lessons, Episodes and Assessments. No child
 * materialization transaction rewrites a parent or deletes its stub.
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
  if (parts.some(part => !safe(part)) || ![1, 2, 3].includes(depth))
    throw Error('Invalid pending Course parent ownership');
  verifyOwnedCourseStub(stubSource, { kind, id, slug });
  const ast = ts.createSourceFile('parent.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (
    ast.parseDiagnostics.length ||
    ast.statements.some(statement => !ts.isImportDeclaration(statement) && !ts.isVariableStatement(statement))
  )
    throw Error('Unexpected generated parent syntax');
  const imported = ast.statements.filter(ts.isImportDeclaration);
  const prefix = './';
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
    clause.namedBindings.elements[0].propertyName ||
    clause.namedBindings.elements[0].name.text !== slug
  )
    throw Error('Unexpected imported Course stub export');
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
    if (ts.isShorthandPropertyAssignment(property) && safe(property.name.text))
      return { key: property.name.text, value: property.name };
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
  if (!owned || !ts.isIdentifier(owned.value) || owned.value.text !== slug)
    throw Error('Course pending child slot does not use its approved stub export');
  let references = 0;
  const visit = node => {
    if (ts.isIdentifier(node) && node.text === slug) references++;
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(ast, visit);
  if (references !== 2) throw Error('Course pending stub export has ambiguous references');
  // A Chapter may belong directly to a Course or to a Module. Path depth
  // constrains the legal owners but cannot distinguish the two at level one.
  const ownerDepth = depth - 1;
  const allowedOwners =
    ownerDepth === 0 ? ['defineCourse'] : ownerDepth === 1 ? ['defineModule', 'defineChapter'] : ['defineChapter'];
  const parents = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .filter(declaration => {
      const init = unwrap(declaration.initializer);
      return (
        ts.isCallExpression(init) &&
        ts.isIdentifier(init.expression) &&
        allowedOwners.includes(init.expression.text) &&
        init.arguments.length === 1 &&
        ts.isObjectLiteralExpression(unwrap(init.arguments[0])) &&
        unwrap(init.arguments[0]).properties.some(
          property => ts.isShorthandPropertyAssignment(property) && name(property.name) === 'content',
        )
      );
    });
  if (parents.length !== 1) throw Error('Unexpected immediate Course stub owner Configurator');
  const owner = unwrap(parents[0].initializer).expression.text;
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
