import { z } from 'zod';
import { defineStructured, childDefinition, localizedText, uuid, slug, resolvedProps } from '../structured';
import type { DefinitionLanguages, TaggedDefinition } from '../structured';
import type { ContentBlock_Text_Definition } from './defineText/defineText';
import { createContentBlockMetaSchema } from './contentBlock.schemas';

type OtherBlock = 'markdown'|'code'|'image'|'video'|'audio'|'youtube'|'carousel'|'checkpoint'|'scene';
export type ContentBlockDefinition = ContentBlock_Text_Definition | TaggedDefinition<OtherBlock>;

const meta = <T extends Parameters<typeof createContentBlockMetaSchema>[0]>(type: T) =>
  createContentBlockMetaSchema(type).shape;
const text = <L extends DefinitionLanguages>(languages: L) => localizedText(languages);
const fallback = <L extends DefinitionLanguages>(languages: L, keys: readonly string[]) =>
  z.strictObject(Object.fromEntries(keys.map(key => [key, text(languages).optional()])) as Record<string, z.ZodOptional<ReturnType<typeof text<L>>>>);
const content = () => childDefinition<ContentBlockDefinition>(value => {
  if ('kind' in value) return ['markdown','code','image','video','audio','youtube','carousel','checkpoint','scene'].includes(String(value.kind));
  const base = value.config.base;
  return typeof base === 'object' && base !== null && 'type' in base && base.type === 'text';
});
const nonEmptyContent = () => z.tuple([content()], content());
const imageFields = <L extends DefinitionLanguages>(l: L) => ({
  src: text(l), alt: text(l), caption: text(l).optional(),
});
const imageLayout = {
  width: z.number().positive().optional(), height: z.number().positive().optional(),
  fill: z.boolean().optional(), aspectRatio: z.number().positive().optional(),
  objectFit: z.enum(['contain', 'cover']).optional(),
};
const mediaFallbackKeys = ['offline','unavailable','playbackError','retry'] as const;
const commonMeta = (type: Parameters<typeof meta>[0]) => meta(type);

export const markdownSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({ ...meta('markdown'), locales: text(l) });
export const codeSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...meta('code'), language: z.string().min(1), title: text(l).optional(),
    code: text(l).optional(), fileLocation: text(l).optional(),
    variables: z.array(z.strictObject({ id: z.string().min(1), value: text(l) })).optional(),
  }).refine(value => Number(value.code !== undefined) + Number(value.fileLocation !== undefined) === 1,
    {message:'Provide exactly one of code or fileLocation'});
export const imageSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...meta('image'), ...imageFields(l), ...imageLayout,
    sizes: z.string().optional(), unoptimized: z.boolean().optional(),
    fallback: fallback(l, ['offline','unavailable','retry']).optional(),
  }).refine(value => value.fill ? value.aspectRatio !== undefined :
    value.width !== undefined && value.height !== undefined,
    {message:'Image requires either fill/aspectRatio or width/height'});
export const videoSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...meta('video'), fileLocation: text(l), poster: text(l),
    title: text(l).optional(), fallback: fallback(l, mediaFallbackKeys).optional(),
  });
export const audioSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...meta('audio'), fileLocation: text(l), title: text(l),
    description: text(l).optional(), fallback: fallback(l, mediaFallbackKeys).optional(),
  });
export const youtubeSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...meta('youtube'), href: text(l), mode: z.enum(['link','embed']),
    title: text(l).optional(), hint: text(l).optional(),
    fallback: fallback(l, ['offline','unavailable','retry']).optional(),
  }).refine(value => value.mode === 'link' || value.title !== undefined || value.hint !== undefined,
    {message:'Embedded video requires title or hint'});
export const carouselSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...meta('carousel'), title: text(l).optional(),
    slides: z.tuple([z.strictObject(imageFields(l))], z.strictObject(imageFields(l))),
    aspectRatio: z.number().positive().optional(), objectFit: z.enum(['cover','contain']).optional(),
    loop: z.boolean().optional(), autoplay: z.boolean().optional(),
    autoplayIntervalMs: z.number().positive().optional(),
    transition: z.enum(['slide','fade']).optional(), transitionDurationMs: z.number().positive().optional(),
    showArrows: z.boolean().optional(), showIndicators: z.boolean().optional(),
    allowFullscreen: z.boolean().optional(), allowSwipe: z.boolean().optional(),
    startIndex: z.number().int().nonnegative().optional(), pauseOnHover: z.boolean().optional(),
  });
export const checkpointSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...meta('checkpoint'), title: text(l),
    headingLevel: z.number().int().min(1).max(6).optional(),
    showIndices: z.boolean().optional(), showChevron: z.boolean().optional(),
    showIcon: z.boolean().optional(), indexPosition: z.enum(['left','right']).optional(),
    iconPosition: z.enum(['left','right']).optional(), chevronPosition: z.enum(['left','right']).optional(),
    enableChecks: z.boolean().optional(), requireCompletion: z.boolean().optional(),
    renderAsGroup: z.boolean().optional(),
    items: z.array(z.strictObject({question:text(l),answer:nonEmptyContent(),check:z.literal(true).optional()})),
  });
const sceneValue: z.ZodType<unknown> = z.lazy(() =>
  z.union([z.string(), z.record(z.string(), sceneValue)]));
export const sceneSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({ ...meta('scene'), locales: z.record(z.enum(l), sceneValue) });

const locales = {
  markdown: ['locales'],
  code: ['title','code','fileLocation','variables.*.value'],
  image: ['src','alt','caption','fallback.offline','fallback.unavailable','fallback.retry'],
  video: ['fileLocation','poster','title',...mediaFallbackKeys.map(key=>'fallback.'+key)],
  audio: ['fileLocation','title','description',...mediaFallbackKeys.map(key=>'fallback.'+key)],
  youtube: ['href','title','hint','fallback.offline','fallback.unavailable','fallback.retry'],
  carousel: ['title','slides.*.src','slides.*.alt','slides.*.caption'],
  checkpoint: ['title','items.*.question'],
  scene: ['locales'],
} as const;

export function defineMarkdown<const L extends DefinitionLanguages>(config: z.input<ReturnType<typeof markdownSchema<L>>>) {
  return defineStructured('markdown',config,markdownSchema<L>,resolvedProps('markdown'),locales.markdown);
}
export function defineCode<const L extends DefinitionLanguages>(config: z.input<ReturnType<typeof codeSchema<L>>>) {
  return defineStructured('code',config,codeSchema<L>,resolvedProps('code'),locales.code);
}
export function defineImage<const L extends DefinitionLanguages>(config: z.input<ReturnType<typeof imageSchema<L>>>) {
  return defineStructured('image',config,imageSchema<L>,resolvedProps('image'),locales.image);
}
export function defineVideo<const L extends DefinitionLanguages>(config: z.input<ReturnType<typeof videoSchema<L>>>) {
  return defineStructured('video',config,videoSchema<L>,resolvedProps('video'),locales.video);
}
export function defineAudio<const L extends DefinitionLanguages>(config: z.input<ReturnType<typeof audioSchema<L>>>) {
  return defineStructured('audio',config,audioSchema<L>,resolvedProps('audio'),locales.audio);
}
export function defineYoutube<const L extends DefinitionLanguages>(config: z.input<ReturnType<typeof youtubeSchema<L>>>) {
  return defineStructured('youtube',config,youtubeSchema<L>,resolvedProps('youtube'),locales.youtube);
}
export function defineCarousel<const L extends DefinitionLanguages>(config: z.input<ReturnType<typeof carouselSchema<L>>>) {
  return defineStructured('carousel',config,carouselSchema<L>,resolvedProps('carousel'),locales.carousel);
}
export function defineCheckpoint<const L extends DefinitionLanguages>(config: z.input<ReturnType<typeof checkpointSchema<L>>>) {
  return defineStructured('checkpoint',config,checkpointSchema<L>,resolvedProps('checkpoint'),locales.checkpoint);
}
export function defineScene<const L extends DefinitionLanguages>(config: z.input<ReturnType<typeof sceneSchema<L>>>) {
  return defineStructured('scene',config,sceneSchema<L>,resolvedProps('scene'),locales.scene);
}
