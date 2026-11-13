# Skills JSON generator

The build/publish-time serializer is `publishSkillTree.mjs`. It writes one
**textbook-wide** `base.json` and up to one already-prepared Props-shaped
`<language>.json` per requested language.

## Ownership

- Authoring configurators own validation, nested composition, ordering and
  language-specific `build.props({ languages })`.
- The caller can use
  `scripts/generators/data/prepare-skills-publication.mjs` to gather complete
  `SkillDomain.build.props({ languages })` results under their domain slugs.
- The generator owns **only** deterministic serialization and replacement of
  the dedicated `generated/skills/` directory. It never invokes configurators
  or interprets/merges their Props.

```js
import { prepareSkillPublication } from
  '../../../../scripts/generators/data/prepare-skills-publication.mjs';
import { renderSkillTree, writeSkillFiles } from './publishSkillTree.mjs';

const publication = prepareSkillPublication(domains, ['uk', 'en']);
writeSkillFiles('content/<book>/generated/skills', renderSkillTree(publication));
```

The example expects existing textbook `SkillDomain` configurators in `domains`
and a real package directory in place of `<book>`.

## Transitional publisher

The CLI at `scripts/generators/data/publish-skills-data.mjs` still reads
unmigrated authored `*.data.ts` taxonomy files via an AST adapter. It delegates
file serialization and ownership to this generator. It defaults to
`content/<book>/generated/skills/` and the textbook build writes its static
distribution to `dist/static/generated/skills/`. The Web host reads published
`/generated/skills/` resources.

**Migration limit:** the transitional AST adapter still emits the former
slug-keyed tree values expected by the current Web parser. New configurator
Build results contain ordered Props arrays and `slug` fields; switch the
publisher and Web parser to that contract together when textbook Skill authoring
is migrated. Do not silently reinterpret these arrays in the generator.

Run `node --test shared/engine/generators/skills/publishSkillTree.spec.mjs`
and `node --test scripts/generators/data/prepare-skills-publication.spec.mjs`
to test the serializer and Build-result gathering separately.
