/**
 * Deliberately narrow Course exception: import already-trusted default-branch
 * Lesson Configurators inside a credential-free, network-disabled container.
 * The reviewed Course draft is NEVER imported or executed here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createJiti } from 'jiti';

const { input, source, textbookRoot, references, sections, skills } = JSON.parse(fs.readFileSync(0, 'utf8'));
if (
  !/^content\/[a-z][a-z0-9-]*$/.test(textbookRoot) ||
  !Array.isArray(references) ||
  references.length > 250 ||
  !Array.isArray(sections) ||
  sections.length > 250 ||
  !Array.isArray(skills) ||
  skills.length > 250 ||
  !source ||
  !input
)
  throw Error('Invalid trusted Course dependency request');
const { materializeCourse } = createRequire(import.meta.url)('/work/shared/engine/dist/build.js');
const jiti = createJiti(import.meta.url, { fsCache: false });
const loaded = new Map();
const loadedSkills = new Map();
if (skills.length) {
  // Use the same actual SkillDomain/SkillGroup Configurator graph as textbook
  // Skills publication. No draft value is ever interpreted as a Skill.
  const taxonomy = await jiti.import(path.join('/work', textbookRoot, 'data/skills/index.ts'));
  const registered = new Map();
  const register = item => {
    if (!item || item.type !== 'skill' || typeof item.id !== 'string' ||
        item.config?.base?.id !== item.id || item.config?.base?.slug !== item.slug ||
        typeof item.build?.props !== 'function')
      throw Error('Invalid trusted Skill registry member');
    if (registered.has(item.id)) throw Error('Duplicate Skill in trusted taxonomy ' + item.id);
    registered.set(item.id, item);
  };
  for (const domain of Object.values(taxonomy)) {
    if (!domain || domain.type !== 'skillDomain' || !domain.id || !domain.build?.props)
      throw Error('Invalid trusted SkillDomain export');
    for (const skill of Object.values(domain.skills ?? {})) register(skill);
    for (const group of Object.values(domain.groups ?? {})) {
      if (!group || group.type !== 'skillGroup' || !group.id || !group.build?.props)
        throw Error('Invalid trusted SkillGroup');
      for (const skill of Object.values(group.skills ?? {})) register(skill);
    }
  }
  for (const binding of skills) {
    if (!/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(binding.id ?? '') ||
        !/^[A-Za-z][A-Za-z0-9]*$/.test(binding.exportName ?? '') ||
        !/^[A-Za-z][A-Za-z0-9]*$/.test(binding.slug ?? '') ||
        !/^[a-f0-9]{40}$/.test(binding.sourceSha ?? '') ||
        !/^#skillsData\/(?:[A-Za-z][A-Za-z0-9]*\/)*[A-Za-z][A-Za-z0-9]*$/.test(binding.importPath ?? '') ||
        binding.sourcePath !== textbookRoot + '/data/skills/' + binding.importPath.slice('#skillsData/'.length) + '.ts')
      throw Error('Untrusted Skill source binding');
    const module = await jiti.import('/work/' + binding.sourcePath);
    const skill = module[binding.exportName];
    const catalogued = registered.get(binding.id);
    if (!skill || skill.type !== 'skill' || skill.id !== binding.id ||
        skill.slug !== binding.slug || skill.config?.base?.id !== binding.id ||
        skill.config?.base?.slug !== binding.slug || !catalogued ||
        catalogued.slug !== skill.slug)
      throw Error('Skill binding does not match trusted taxonomy registry');
    loadedSkills.set(binding.id, { ...binding, configurator: skill });
  }
}
for (const reference of references) {
  const { id, sourceSha, exportName } = reference;
  if (
    !/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(id) ||
    !/^[a-f0-9]{40}$/.test(sourceSha) ||
    !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(exportName)
  )
    throw Error('Unsafe resolved Lesson identity');
  const filename = path.join('/work', textbookRoot, 'data/lessons', id.at(-1), id, 'index.ts');
  const module = await jiti.import(filename);
  const configurator = module[exportName];
  if (
    !configurator ||
    configurator.id !== id ||
    configurator.type !== 'lesson' ||
    typeof configurator.build?.overrides !== 'function'
  )
    throw Error('Trusted Lesson dependency export mismatch');
  loaded.set(id + ':' + sourceSha + ':' + exportName, configurator);
}

const loadedSections = new Map();
for (const reference of sections) {
  const { id, ownerLessonId, sourceSha, slug, exportName } = reference;
  if (
    !/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(id) ||
    !/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(ownerLessonId) ||
    !/^[a-f0-9]{40}$/.test(sourceSha) ||
    !/^[A-Za-z][A-Za-z0-9]*$/.test(slug) ||
    !/^[A-Za-z][A-Za-z0-9]*$/.test(exportName)
  )
    throw Error('Unsafe trusted Section reference');
  const filename = path.join(
    '/work',
    textbookRoot,
    'data/lessons',
    ownerLessonId.at(-1),
    ownerLessonId,
    'sections',
    slug,
    'index.ts',
  );
  const exported = await jiti.import(filename);
  const configurator = exported[exportName];
  if (
    !configurator ||
    configurator.id !== id ||
    configurator.slug !== slug ||
    configurator.config?.base?.id !== id ||
    configurator.config.base.slug !== slug ||
    configurator.config.base.type !== configurator.type ||
    typeof configurator.build?.props !== 'function' ||
    typeof configurator.build?.overrides !== 'function'
  )
    throw Error('Trusted Section dependency export mismatch');
  loadedSections.set([id, ownerLessonId, sourceSha, slug, exportName].join(':'), configurator);
}

const plan = materializeCourse(input, {
  textbookRoot,
  source: { sourcePath: source.sourcePath, sourceBlobSha: source.sourceBlobSha },
  verifySource: ({ source: pinned, textbookRoot: pkg }) =>
    pinned.sourcePath === source.sourcePath && pinned.sourceBlobSha === source.sourceBlobSha && pkg === textbookRoot,
  resolveSkill({ id }) {
    const binding = loadedSkills.get(id);
    if (!binding) throw Error('Unapproved Course Skill dependency ' + id);
    return { ...binding, approved: true };
  },
  resolveExistingLesson(request) {
    const { id, sourceSha, exportName, importPath } = request;
    if (importPath !== '#lessonsData/' + id.at(-1) + '/' + id + '/index') throw Error('Lesson import path mismatch');
    const configurator = loaded.get(id + ':' + sourceSha + ':' + exportName);
    if (!configurator) throw Error('Unapproved Course Lesson dependency');
    return { approved: true, id, sourceSha, exportName, importPath, configurator };
  },
  resolveAddedSection(request) {
    const { id, ownerLessonId, sourceSha, slug, exportName, importPath } = request;
    if (importPath !== '#lessonsData/' + ownerLessonId.at(-1) + '/' + ownerLessonId + '/sections/' + slug)
      throw Error('Added Section import path mismatch');
    const configurator = loadedSections.get([id, ownerLessonId, sourceSha, slug, exportName].join(':'));
    if (!configurator) throw Error('Unapproved Course Section dependency');
    return { ...request, approved: true, configurator };
  },
});
if (plan?.publishable !== false) throw Error('Course renderer must remain nonpublishable');
process.stdout.write(JSON.stringify(plan));
