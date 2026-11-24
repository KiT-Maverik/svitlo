import { assessmentDraftExpression } from '../../../shared/engine/generators/materializers/course/materializeAssessmentPlaceholder.mjs';
/** Exact generated-parent source edit for a single Course-owned Assessment.
 * This is not an authored TypeScript resolver, AST interpreter or materializer.
 * The trusted publisher must additionally bind both bytes to the authorized
 * Course/Assessment branches before writing one non-force Git commit.
 */
const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slugPattern = /^[A-Za-z][A-Za-z0-9]*$/;
const blocker = '// TODO (BLOCKER): Not implemented — Assessment has no reviewed Questions or Quiz. Do not publish.\n';
const assessmentImport =
  "import { defineAssessmentDraft, defineContentSection, defineText } from '@svitlo/engine/build';\n";

export function restoreAssessmentPlacement(source, { id, slug, placement, exportName }) {
  if (
    typeof source !== 'string' ||
    source.length > 4 * 1024 * 1024 ||
    !UUID.test(id) ||
    !slugPattern.test(slug) ||
    ['constructor', '__proto__', 'prototype'].includes(slug) ||
    typeof placement !== 'string' ||
    !/^content(?:\/[A-Za-z][A-Za-z0-9]*)+$/.test(placement) ||
    placement.split('/').at(-1) !== slug ||
    placement.split('/').at(-2) !== 'content' ||
    typeof exportName !== 'string' ||
    !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(exportName)
  )
    throw Error('Invalid reserved Assessment placement or source');
  const inline = assessmentDraftExpression(id, slug);
  const target = JSON.stringify(slug) + ': ' + inline;
  if (
    source.split(target).length !== 2 ||
    source.split(blocker).length !== 2 ||
    source.split(assessmentImport).length !== 2 ||
    !source.includes('const content = { items: { ') ||
    !source.includes(' }, order: ') ||
    !source.includes('export const ')
  )
    throw Error('Assessment parent no longer has the one exact reviewed placeholder');
  const alias = 'child_' + slug;
  if (new RegExp('\\b' + alias + '\\b').test(source))
    throw Error('Assessment source already contains the reserved child alias');
  const childImport =
    'import { ' + exportName + ' as ' + alias + ' } from ' + JSON.stringify('./content/' + slug) + ';\n';
  let updated = childImport + source.replace(target, JSON.stringify(slug) + ': ' + alias);
  if (!updated.includes('defineAssessmentDraft({ id: ')) {
    updated = updated.replace(blocker, '').replace(assessmentImport, '');
  }
  return updated;
}

/** Trusted byte-exact postcondition: no edits beyond the one approved slot. */
export function verifyAssessmentParentPatch(source, candidate, placement) {
  if (restoreAssessmentPlacement(source, placement) !== candidate)
    throw Error('Assessment parent edit differs from authorized placeholder replacement');
  return true;
}
