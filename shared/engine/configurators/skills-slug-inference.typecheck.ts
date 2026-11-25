import { configuratorArrayToSlugMap } from './configuratorArrayToSlugMap';
import { defineSkill, type Skill_Configurator } from './skills/defineSkill/defineSkill';
import { defineSkillDomain } from './skills/defineSkillDomain/defineSkillDomain';
import { defineSkillGroup } from './skills/defineSkillGroup/defineSkillGroup';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

declare const localized: string;
declare const dynamicSlug: string;

const fields = {
  id: 'dbe68255-2f03-4ac9-b1e7-277dca1cd160',
  description: { methodological: 'Methodological notes', frontend: localized },
  name: localized,
};

const reading = defineSkill({ ...fields, slug: 'reading' });
const writing = defineSkill({ ...fields, slug: 'writing' });
const numeracy = defineSkill({ ...fields, slug: 'numeracy' });
type ReadingSlug = Expect<Equal<typeof reading.slug, 'reading'>>;

const group = defineSkillGroup({ ...fields, slug: 'literacy', skills: { reading, writing } });
type GroupSlug = Expect<Equal<typeof group.slug, 'literacy'>>;
type GroupKeys = Expect<Equal<keyof typeof group.skills, 'reading' | 'writing'>>;
type ReadingValue = Expect<Equal<typeof group.skills.reading, typeof reading>>;
type WritingValue = Expect<Equal<typeof group.skills.writing, typeof writing>>;
// @ts-expect-error Unknown literal slugs must not be accepted.
void group.skills.nonexistent;
// @ts-expect-error There is no duplicate singular accessor.
void group.skill;

const domain = defineSkillDomain({
  id: fields.id,
  slug: 'language',
  title: localized,
  description: fields.description,
  groups: { literacy: group },
  skills: { numeracy },
});
type DomainSlug = Expect<Equal<typeof domain.slug, 'language'>>;
type DomainGroupKeys = Expect<Equal<keyof NonNullable<typeof domain.groups>, 'literacy'>>;
type DomainSkillKeys = Expect<Equal<keyof NonNullable<typeof domain.skills>, 'numeracy'>>;
type DomainGroupValue = Expect<Equal<NonNullable<typeof domain.groups>['literacy'], typeof group>>;
type DomainSkillValue = Expect<Equal<NonNullable<typeof domain.skills>['numeracy'], typeof numeracy>>;
type NestedKeys = Expect<Equal<keyof NonNullable<typeof domain.groups>['literacy']['skills'], 'reading' | 'writing'>>;
type NestedValue = Expect<Equal<NonNullable<typeof domain.groups>['literacy']['skills']['reading'], typeof reading>>;
// @ts-expect-error An unknown group slug is not a valid property.
void domain.groups?.nonexistent;
// @ts-expect-error An unknown top-level skill slug is not a valid property.
void domain.skills?.nonexistent;
// @ts-expect-error An unknown nested skill slug is not a valid property.
void domain.groups?.literacy.skills.nonexistent;
// @ts-expect-error Domain has no singular group accessor.
void domain.group;

const emptyDomain = defineSkillDomain({
  id: fields.id,
  slug: 'empty',
  title: localized,
  description: fields.description,
});
type EmptyGroupKeys = Expect<Equal<keyof NonNullable<typeof emptyDomain.groups>, never>>;
type EmptySkillKeys = Expect<Equal<keyof NonNullable<typeof emptyDomain.skills>, never>>;

const readonlySkills = [reading, writing] as const;
const readonlyGroup = defineSkillGroup({
  ...fields,
  slug: 'readonly',
  skills: configuratorArrayToSlugMap(readonlySkills),
});
type ReadonlyKeys = Expect<Equal<keyof typeof readonlyGroup.skills, 'reading' | 'writing'>>;
const readonlyDomain = defineSkillDomain({
  id: fields.id,
  slug: 'readonly-domain',
  title: localized,
  description: fields.description,
  groups: { literacy: group },
  skills: configuratorArrayToSlugMap(readonlySkills),
});
type ReadonlyDomainGroupKeys = Expect<Equal<keyof NonNullable<typeof readonlyDomain.groups>, 'literacy'>>;
type ReadonlyDomainSkillKeys = Expect<Equal<keyof NonNullable<typeof readonlyDomain.skills>, 'reading' | 'writing'>>;

const inline = configuratorArrayToSlugMap([
  { slug: 'first' as const, onlyFirst: true },
  { slug: 'second' as const, onlySecond: true },
]);
type InlineKeys = Expect<Equal<keyof typeof inline, 'first' | 'second'>>;
// @ts-expect-error Each key points to its own configurator, not the entire union.
void inline.first.onlySecond;
// @ts-expect-error There is no third slug.
void inline.third;

const dynamicSkill = defineSkill({ ...fields, slug: dynamicSlug });
const dynamicMap = configuratorArrayToSlugMap([dynamicSkill]);
const maybeDynamic: Skill_Configurator | undefined = dynamicMap.anything;
// @ts-expect-error A dynamic string slug cannot guarantee this key exists.
const guaranteedDynamic: Skill_Configurator = dynamicMap.anything;
const mixedMap = configuratorArrayToSlugMap([reading, dynamicSkill]);
type KnownMixedValue = Expect<Equal<typeof mixedMap.reading, typeof reading>>;
const maybeMixed: Skill_Configurator | undefined = mixedMap.unknown;
// @ts-expect-error A mixed collection cannot guarantee unknown keys.
const guaranteedMixed: Skill_Configurator = mixedMap.unknown;

void maybeDynamic;
void guaranteedDynamic;
void maybeMixed;
void guaranteedMixed;
