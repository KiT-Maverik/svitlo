import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { resolveEntityPath } from '../utils/entityPath/resolveEntityPath.utils';
import { defineImage, defineAudio, defineVideo, defineCarousel, defineScene } from './contentBlocks';

const id = '72d22bea-d787-4c6d-9a83-144830c6d325';
const url = (name: string) => '/textbooks/example/' + name;

test('ContentBlock validators check packaged Image, Audio, Video, Carousel and Scene files', () => {
  const repo = mkdtempSync(join(tmpdir(), 'svitlo-block-assets-'));
  const textbook = join(repo, 'content', 'example');
  const media = join(textbook, 'static');
  const scene = join(textbook, 'scenes', resolveEntityPath(id), 'index.ts');
  const originals = process.cwd();
  mkdirSync(join(repo, 'shared'), { recursive: true });
  mkdirSync(media, { recursive: true });
  mkdirSync(join(textbook, 'scenes', resolveEntityPath(id)), { recursive: true });
  for (const file of ['photo.png', 'tone.wav', 'clip.mp4', 'poster.jpg']) writeFileSync(join(media, file), 'fixture');
  writeFileSync(scene, 'export default function Scene() {}');

  try {
    process.chdir(textbook);
    const imageConfig = {
      id,
      slug: 'image',
      type: 'image' as const,
      params: { width: 10, height: 10 },
      locale: { src: url('photo.png'), alt: 'Photo' },
    };
    const audioConfig = {
      id,
      slug: 'audio',
      type: 'audio' as const,
      params: {},
      locale: { fileLocation: { en: url('tone.wav'), uk: url('tone.wav') }, title: 'Tone' },
    };
    const videoConfig = {
      id,
      slug: 'video',
      type: 'video' as const,
      params: {},
      locale: { fileLocation: url('clip.mp4'), poster: url('poster.jpg'), label: 'Video' },
    };
    const carouselConfig = {
      id,
      slug: 'carousel',
      type: 'carousel' as const,
      params: {},
      locale: { slides: [{ src: url('photo.png'), alt: 'Photo' }] },
    };
    const sceneConfig = {
      id,
      slug: 'scene',
      type: 'scene' as const,
      params: {},
      locale: { value: { title: 'Demo Scene' } },
    };

    const image = defineImage(imageConfig);
    const audio = defineAudio(audioConfig);
    const video = defineVideo(videoConfig);
    const carousel = defineCarousel(carouselConfig);
    const sceneBlock = defineScene(sceneConfig);

    assert.throws(
      () => image.config.validate({ ...imageConfig, locale: { ...imageConfig.locale, src: url('missing.png') } }),
      /Missing local media file at locale.src/,
    );
    assert.throws(
      () =>
        audio.config.validate({
          ...audioConfig,
          locale: { ...audioConfig.locale, fileLocation: { uk: url('missing.wav') } },
        }),
      /Missing local media file at locale.fileLocation.uk/,
    );
    assert.throws(
      () => video.config.validate({ ...videoConfig, locale: { ...videoConfig.locale, poster: url('missing.jpg') } }),
      /Missing local media file at locale.poster/,
    );
    assert.throws(
      () =>
        carousel.config.validate({
          ...carouselConfig,
          locale: { slides: [{ src: url('missing.png'), alt: 'Photo' }] },
        }),
      /Missing local media file at locale.slides\[0\].src/,
    );

    unlinkSync(join(media, 'clip.mp4'));
    assert.throws(() => video.config.validate(videoConfig), /Missing local media file at locale.fileLocation/);
    unlinkSync(scene);
    assert.throws(() => sceneBlock.config.validate(sceneConfig), /Missing Scene entrypoint/);
  } finally {
    process.chdir(originals);
    rmSync(repo, { recursive: true, force: true });
  }
});
