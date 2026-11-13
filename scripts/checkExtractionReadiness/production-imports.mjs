import ts from 'typescript';

/**
 * Return static module specifiers from actual TypeScript syntax, not prose.
 *
 * The former regex mistook the sentence "... from 'how many?'" inside a
 * methodological description for an undeclared production dependency.
 * Include import/export declarations, TS import-equals, type-only import(),
 * dynamic import('literal') and require('literal') calls.
 */
export function importedModules(source, filename = 'source.ts') {
  const kind = filename.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, kind);
  const modules = [];
  const record = specifier => {
    if (specifier && ts.isStringLiteralLike(specifier)) modules.push(specifier.text);
  };

  const visit = node => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      record(node.moduleSpecifier);
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
      record(node.moduleReference.expression);
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      record(node.argument.literal);
    } else if (ts.isCallExpression(node)) {
      const isImport = node.expression.kind === ts.SyntaxKind.ImportKeyword;
      const isRequire = ts.isIdentifier(node.expression) && node.expression.text === 'require';
      if (isImport || isRequire) record(node.arguments[0]);
    }
    ts.forEachChild(node, visit);
  };

  visit(ast);
  return modules;
}
