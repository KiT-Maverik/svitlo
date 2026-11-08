import { z } from 'zod';
import { childDefinition, defineStructured, uuid, resolvedProps, taggedChild } from '../structured';
import type { DefinitionLanguages, TaggedDefinition } from '../structured';
import { scenarioSectionChild } from '../sections';
import type { ContentBlock_Text_Definition } from '../contentBlocks/defineText/defineText';

type TextDefinition = ContentBlock_Text_Definition;
const title = () => childDefinition<TextDefinition>(v => {
  const base = v.config.base;
  return typeof base === 'object' && base !== null && 'type' in base && base.type === 'text';
});
const markdown = () => taggedChild('markdown');
const chapterContent = () => taggedChild('episode','lesson');
const moduleContent = () => taggedChild('chapter','episode','lesson');
const courseContent = () => taggedChild('module','chapter','episode','lesson');
const identity = <Kind extends string>(kind:Kind) => ({
  type:z.literal(kind),id:uuid,iconKey:z.string().optional(),title:title(),
});

export const episodeSchema = <L extends DefinitionLanguages>(_languages:L) =>
  z.strictObject({...identity('episode'),sections:z.array(scenarioSectionChild())});
export const chapterSchema = <L extends DefinitionLanguages>(_languages:L) =>
  z.strictObject({...identity('chapter'),content:z.array(chapterContent())});
export const moduleSchema = <L extends DefinitionLanguages>(_languages:L) =>
  z.strictObject({...identity('module'),content:z.array(moduleContent())});
export const courseSchema = <L extends DefinitionLanguages>(languages:L) =>
  z.strictObject({
    type:z.literal('course'),id:uuid,title:title(),description:markdown(),
    scenarioMode:z.enum(['none','story']).optional(),
    prerequisites:z.strictObject({
      skills:z.array(uuid).optional(),skillGroups:z.array(uuid).optional(),
      skillDomains:z.array(uuid).optional(),courses:z.array(uuid).optional(),
      text:markdown().optional(),
    }).optional(),
    parameters:z.strictObject({languages:z.tuple([z.enum(languages)],z.enum(languages))}),
    content:z.array(courseContent()),
  });

export function defineEpisode<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof episodeSchema<L>>>) {
  return defineStructured('episode',source,episodeSchema<L>,resolvedProps('episode'),[]);
}
export function defineChapter<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof chapterSchema<L>>>) {
  return defineStructured('chapter',source,chapterSchema<L>,resolvedProps('chapter'),[]);
}
export function defineModule<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof moduleSchema<L>>>) {
  return defineStructured('module',source,moduleSchema<L>,resolvedProps('module'),[]);
}
export function defineCourse<const L extends DefinitionLanguages>(source:z.input<ReturnType<typeof courseSchema<L>>>) {
  return defineStructured('course',source,courseSchema<L>,resolvedProps('course'),[]);
}
export type CourseDefinition = TaggedDefinition<'course'>;
export type ModuleDefinition = TaggedDefinition<'module'>;
export type ChapterDefinition = TaggedDefinition<'chapter'>;
export type EpisodeDefinition = TaggedDefinition<'episode'>;
