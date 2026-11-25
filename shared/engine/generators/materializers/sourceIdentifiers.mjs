/** Strict, deterministic generated TypeScript binding names. No synthetic aliases. */
const identifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const forbidden = new Set('await break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static implements interface package private protected public arguments eval'.split(' '));

/** Register emitted imports, local declarations and the exported Configurator. */
export function createSourceIdentifierRegistry(owner, locals = []) {
  const used = new Map();
  const register = (name, location) => {
    if (typeof name !== 'string' || !identifier.test(name) || forbidden.has(name))
      throw Error(owner + ': invalid or reserved generated identifier ' + JSON.stringify(name) + ' at ' + location);
    if (used.has(name))
      throw Error(owner + ': generated identifier collision ' + JSON.stringify(name) + ' between ' + used.get(name) + ' and ' + location + '; fix the reviewed source/export name');
    used.set(name, location);
    return name;
  };
  for (const name of locals) register(name, 'generated local ' + name);
  return register;
}

/** Named child uses shorthand only when its actual import identifier equals the map key. */
export const renderSourceItem = (key, identifierName) =>
  key === identifierName ? identifierName : JSON.stringify(key) + ': ' + identifierName;
