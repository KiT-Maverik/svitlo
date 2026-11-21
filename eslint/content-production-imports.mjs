/**
 * Production-only import boundary for authored textbooks.
 * Draft Preview runs TypeScript/build without invoking this ESLint policy.
 */
import parser from '@typescript-eslint/parser';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const enginePending = new Set([
  'definePendingLesson',
  'definePendingQuizSection',
  'definePendingFlashcardsSection',
]);
const uiPending = new Set(['SceneStub']);
const allPending = new Set([...enginePending, ...uiPending]);
const sourceFiles = ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'];

const inside = (parent, child) => {
  const path = relative(parent, child);
  return path === '' || (!path.startsWith('..' + sep) && path !== '..' && !isAbsolute(path));
};
const staticText = node => {
  if (!node) return undefined;
  if (typeof node.value === 'string') return node.value;
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0]?.value?.cooked;
  }
  return undefined;
};
const familyFor = (specifier, filename) => {
  if (typeof specifier !== 'string') return null;
  if (specifier === '@svitlo/engine' || specifier.startsWith('@svitlo/engine/')) return 'engine';
  if (specifier === '@svitlo/ui-kit' || specifier.startsWith('@svitlo/ui-kit/')) return 'ui-kit';
  // Direct internal imports through a relative path cannot bypass the package restriction.
  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    const target = resolve(dirname(filename), specifier);
    if (inside(resolve(repoRoot, 'shared/engine'), target)) return 'engine';
    if (inside(resolve(repoRoot, 'shared/ui-kit'), target)) return 'ui-kit';
  }
  return null;
};
const forbiddenFor = (family, name) =>
  (family === 'engine' && enginePending.has(name)) || (family === 'ui-kit' && uiPending.has(name));

export const contentPendingImportRule = {
  meta: {
    type: 'problem',
    schema: [],
    docs: { description: 'Disallow imported preview-only APIs in production textbook source' },
    messages: {
      pending: '{{name}} is preview-only and cannot be used in production textbook source.',
      star: 'Wildcard/namespace re-export exposes preview-only APIs from {{family}}.',
      unknown: 'Dynamic property access on {{family}} may access preview-only APIs; use a statically named API.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const filename = context.filename || context.getFilename();
    const report = (node, name) => context.report({ node, messageId: 'pending', data: { name } });
    const scopeVariable = (node, name) => {
      for (let scope = sourceCode.getScope(node); scope; scope = scope.upper) {
        if (scope.set.has(name)) return scope.set.get(name);
      }
      return null;
    };
    const stringValue = (node, visited = new Set()) => {
      const literal = staticText(node);
      if (literal !== undefined) return literal;
      if (node?.type !== 'Identifier' || visited.has(node)) return undefined;
      visited.add(node);
      const variable = scopeVariable(node, node.name);
      if (variable?.defs.length !== 1 || variable.defs[0].type !== 'Variable') return undefined;
      const declaration = variable.defs[0].node;
      if (declaration.id.type !== 'Identifier') return undefined;
      return stringValue(declaration.init, visited);
    };
    const namespaceFamily = (node, visited = new Set()) => {
      if (!node || visited.has(node)) return null;
      visited.add(node);
      if (
        ['AwaitExpression', 'ChainExpression', 'TSAsExpression', 'TSSatisfiesExpression',
          'TSNonNullExpression', 'TSTypeAssertion', 'ParenthesizedExpression'].includes(node.type)
      ) return namespaceFamily(node.expression || node.argument, visited);
      if (node.type === 'ImportExpression') return familyFor(staticText(node.source), filename);
      if (
        node.type === 'CallExpression' && node.callee.type === 'Identifier' &&
        node.callee.name === 'require'
      ) return familyFor(staticText(node.arguments[0]), filename);
      if (node.type === 'Identifier') {
        const variable = scopeVariable(node, node.name);
        if (variable?.defs.length !== 1) return null;
        const def = variable.defs[0];
        if (def.type === 'ImportBinding') {
          if (['ImportNamespaceSpecifier', 'ImportDefaultSpecifier'].includes(def.node.type)) {
            return familyFor(def.parent?.source?.value, filename);
          }
          if (def.node.type === 'ImportSpecifier' && def.node.imported?.name === 'default') {
            return familyFor(def.parent?.source?.value, filename);
          }
        }
        if (def.type === 'Variable' && def.node.id.type === 'Identifier') {
          return namespaceFamily(def.node.init, visited);
        }
      }
      return null;
    };
    const propertyName = node => {
      if (!node) return undefined;
      if (node.type === 'Identifier') return node.name;
      return stringValue(node);
    };
    const checkObjectPattern = (pattern, family) => {
      if (!pattern || pattern.type !== 'ObjectPattern' || !family) return;
      for (const prop of pattern.properties) {
        if (prop.type !== 'Property') continue;
        const name = prop.computed ? stringValue(prop.key) : propertyName(prop.key);
        if (forbiddenFor(family, name)) report(prop.key, name);
        else if (name === undefined) {
          context.report({ node: prop, messageId: 'unknown', data: { family } });
        }
      }
    };
    const checkStatic = node => {
      if (!node.source) return;
      const source = staticText(node.source);
      const family = familyFor(source, filename);
      for (const spec of node.specifiers || []) {
        const name = spec.type === 'ImportSpecifier' || spec.type === 'ExportSpecifier'
          ? propertyName(spec.imported || spec.local)
          : null;
        // Named imports and re-exports are checked without rejecting safe namespace imports.
        if (allPending.has(name) && (!family || forbiddenFor(family, name))) {
          report(spec, name);
        }
        if (spec.type === 'ExportNamespaceSpecifier' && family) {
          context.report({ node: spec, messageId: 'star', data: { family } });
        }
      }
    };
    return {
      ImportDeclaration: checkStatic,
      ExportNamedDeclaration(node) {
        checkStatic(node);
        if (!node.source && node.specifiers) {
          for (const spec of node.specifiers) {
            const family = namespaceFamily(spec.local);
            if (family) context.report({ node: spec, messageId: 'star', data: { family } });
          }
        }
        if (node.declaration?.type === 'VariableDeclaration') {
          for (const declaration of node.declaration.declarations) {
            const family = namespaceFamily(declaration.init);
            if (family) context.report({ node: declaration, messageId: 'star', data: { family } });
          }
        }
      },
      ExportAllDeclaration(node) {
        const family = familyFor(staticText(node.source), filename);
        if (family) context.report({ node, messageId: 'star', data: { family } });
      },
      ExportDefaultDeclaration(node) {
        const family = namespaceFamily(node.declaration);
        if (family) context.report({ node, messageId: 'star', data: { family } });
      },
      VariableDeclarator(node) { checkObjectPattern(node.id, namespaceFamily(node.init)); },
      AssignmentExpression(node) {
        checkObjectPattern(node.left, namespaceFamily(node.right));
        const left = node.left;
        if (
          left.type === 'MemberExpression' && left.object.type === 'Identifier' &&
          left.object.name === 'module' && propertyName(left.property) === 'exports'
        ) {
          const family = namespaceFamily(node.right);
          if (family) context.report({ node, messageId: 'star', data: { family } });
        }
      },
      MemberExpression(node) {
        const family = namespaceFamily(node.object);
        if (!family) return;
        const name = node.computed ? stringValue(node.property) : propertyName(node.property);
        if (forbiddenFor(family, name)) report(node.property, name);
        else if (name === undefined) {
          context.report({ node, messageId: 'unknown', data: { family } });
        }
      },
      SpreadElement(node) {
        const family = namespaceFamily(node.argument);
        if (family) context.report({ node, messageId: 'star', data: { family } });
      },
      CallExpression(node) {
        // Catch import('@svitlo/engine/build').then(({ definePendingLesson }) => ...).
        if (node.callee.type !== 'MemberExpression' || propertyName(node.callee.property) !== 'then') return;
        const family = namespaceFamily(node.callee.object);
        if (!family) return;
        const callback = node.arguments[0];
        if (callback?.type === 'ArrowFunctionExpression' || callback?.type === 'FunctionExpression') {
          checkObjectPattern(callback.params[0], family);
        }
      },
    };
  },
};

export const contentProductionImportPolicy = [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/coverage/**', '**/test-results/**'] },
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: { parser, parserOptions: { ecmaVersion: 'latest', sourceType: 'module' } },
  },
  {
    files: sourceFiles,
    plugins: { svitloContent: { rules: { 'no-pending-imports': contentPendingImportRule } } },
    rules: { 'svitloContent/no-pending-imports': 'error' },
  },
];
