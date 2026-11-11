import { existsSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { isAbsolute, relative, resolve, sep } from 'node:path';

import { code_Config_Schema, type ContentBlock_Code_Config } from '../../../configurators/contentBlocks/defineCode/defineCode.schemas';
import { validateCodeVariables } from '../../../configurators/contentBlocks/defineCode/validateCodeVariables';

function withinDirectory(directory: string, filename: string): boolean {
  const rel = relative(directory, filename);
  return rel !== '..' && !rel.startsWith('..' + sep) && !isAbsolute(rel);
}

/**
 * Load static Code source for publication, and verify all declared placeholders.
 *
 * @remarks
 * Node-only: callers supply an explicit base directory for relative
 * `params.fileLocation`; `defineCode` itself remains safe for browser imports.
 * The returned UTF-8 string is source text to display, never code to execute.
 */
export function loadAndValidateCodeTemplate(config: ContentBlock_Code_Config, baseDirectory: string): string {
  code_Config_Schema.parse(config);

  const location = config.params.fileLocation;
  if (isAbsolute(location)) {
    throw new Error(`Code fileLocation must be relative to the provided baseDirectory: ${location}`);
  }

  const root = realpathSync(baseDirectory);
  const filename = resolve(root, location);
  if (!withinDirectory(root, filename)) {
    throw new Error(`Code fileLocation escapes baseDirectory: ${location}`);
  }
  if (!existsSync(filename)) {
    throw new Error(`Code source file does not exist: ${filename}`);
  }

  const actualFile = realpathSync(filename);
  if (!withinDirectory(root, actualFile)) {
    throw new Error(`Code source file resolves outside baseDirectory: ${location}`);
  }
  if (!statSync(actualFile).isFile()) {
    throw new Error(`Code fileLocation does not refer to a file: ${actualFile}`);
  }

  const source = readFileSync(actualFile, 'utf8');
  validateCodeVariables(config, source);
  return source;
}
