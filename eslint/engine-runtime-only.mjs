/** Shared ESLint policy for all application workspaces.
 * Build-only authoring modules cannot be imported from app code, regardless
 * of static imports, re-exports, dynamic import(), or CommonJS require().
 */
const allowed = '@svitlo/engine/runtime';
const engine = '@svitlo/engine';

const forbidden = value =>
  value === engine || (value.startsWith(engine + '/') && value !== allowed);

const noEngineBuildImports = {
  meta: {
    type: 'problem',
    docs: { description: 'Require runtime-only Engine imports in application modules' },
    schema: [],
    messages: {
      runtimeOnly: 'Applications may import only @svitlo/engine/runtime. Build-time Engine APIs belong to the authoring pipeline.',
    },
  },
  create(context) {
    const check = source => {
      if (!source) return;
      const value =
        typeof source.value === 'string'
          ? source.value
          : source.type === 'TemplateLiteral' && source.expressions.length === 0
            ? source.quasis[0]?.value?.cooked
            : undefined;
      if (typeof value === 'string' && forbidden(value)) {
        context.report({ node: source, messageId: 'runtimeOnly' });
      }
    };
    return {
      ImportDeclaration: node => check(node.source),
      ExportNamedDeclaration: node => check(node.source),
      ExportAllDeclaration: node => check(node.source),
      ImportExpression: node => check(node.source),
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'require') {
          check(node.arguments[0]);
        } else if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'require' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'resolve'
        ) {
          check(node.arguments[0]);
        }
      },
    };
  },
};

export const engineRuntimeOnly = {
  files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,mts,cts}'],
  plugins: { svitlo: { rules: { 'engine-runtime-only': noEngineBuildImports } } },
  rules: { 'svitlo/engine-runtime-only': 'error' },
};
