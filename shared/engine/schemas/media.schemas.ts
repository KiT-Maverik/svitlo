import { z } from 'zod';
import { languageCode_Schema } from './languages.schemas';

/** Canonical supported formats for authoring, generated schemas and publishing. */
export const imageExtensions = ['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'] as const;
export const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a', 'flac'] as const;
export const videoExtensions = ['mp4', 'webm'] as const;
export const subtitlesExtensions = ['vtt', 'srt'] as const;
export type ImageExtension = (typeof imageExtensions)[number];
export type AudioExtension = (typeof audioExtensions)[number];
export type VideoExtension = (typeof videoExtensions)[number];
export type SubtitlesExtension = (typeof subtitlesExtensions)[number];

/** Reserved unresolved filename identity for typed source materialization; never a published asset. */
export const UNRESOLVED_RESOURCE_UUID = '00000000-0000-0000-0000-000000000000' as const;
/** Non-URL sentinel for a pending YouTube reference; never navigable or publishable. */
export const UNRESOLVED_YOUTUBE_HREF = UNRESOLVED_RESOURCE_UUID;
const mediaUuid_Schema = z.union([z.uuid(), z.literal(UNRESOLVED_RESOURCE_UUID)]);

/** Filename schemas preserve UUID and extension constraints in generated JSON Schema. */
export const imageFileName_Schema = z.templateLiteral([mediaUuid_Schema, '.', z.enum(imageExtensions)]);
export const audioFileName_Schema = z.templateLiteral([mediaUuid_Schema, '.', z.enum(audioExtensions)]);
export const videoFileName_Schema = z.templateLiteral([mediaUuid_Schema, '.', z.enum(videoExtensions)]);
export const subtitlesFileName_Schema = z.templateLiteral([mediaUuid_Schema, '.', z.enum(subtitlesExtensions)]);

/** Remote media are not local filenames and are never checked on disk. */
export const externalMediaUrl_Schema = z.url({ protocol: /^https?$/ });
export const imageMediaReference_Schema = z.union([imageFileName_Schema, externalMediaUrl_Schema]);
export const audioMediaReference_Schema = z.union([audioFileName_Schema, externalMediaUrl_Schema]);
export const videoMediaReference_Schema = z.union([videoFileName_Schema, externalMediaUrl_Schema]);
export const subtitlesMediaReference_Schema = z.union([subtitlesFileName_Schema, externalMediaUrl_Schema]);

export function localizedMediaReference_Schema<Schema extends z.ZodType<string>>(schema: Schema) {
  return z.union([
    schema,
    z
      .partialRecord(languageCode_Schema, schema)
      .refine(values => Object.keys(values).length > 0, 'At least one localized media reference is required'),
  ]);
}

export const mediaFileNameSchemas = {
  image: imageFileName_Schema,
  audio: audioFileName_Schema,
  video: videoFileName_Schema,
  subtitles: subtitlesFileName_Schema,
} as const;
export type MediaKind = keyof typeof mediaFileNameSchemas;
