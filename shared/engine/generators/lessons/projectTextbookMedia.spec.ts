import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { assertMediaPublicationReady, projectTextbookMedia, type MediaDiagnostic } from './projectTextbookMedia.utils';

const image = '550e8400-e29b-41d4-a716-446655440000.webp';
const poster = '550e8400-e29b-41d4-a716-446655440001.png';
const audio = '550e8400-e29b-41d4-a716-446655440002.mp3';
const video = '550e8400-e29b-41d4-a716-446655440003.mp4';
const subtitles = '550e8400-e29b-41d4-a716-446655440004.vtt';

function fixture(run: (root: string, save: (category: string, file: string) => void) => void) {
  const home = mkdtempSync(join(tmpdir(), 'svitlo-props-media-'));
  const root = join(home, 'content', 'math');
  const save = (category: string, file: string) => {
    const dest = join(root, 'assets', category, file);
    mkdirSync(join(root, 'assets', category), { recursive: true });
    writeFileSync(dest, 'fixture');
  };
  try { run(root, save); }
  finally { rmSync(home, { recursive: true, force: true }); }
}
function publish(root: string, props: unknown, mode: 'draft' | 'production' = 'production') {
  const diagnostics: MediaDiagnostic[] = [];
  const result = projectTextbookMedia(props, {
    textbookRoot: root, textbookId: 'math', source: 'lesson.ts', mode, diagnostics,
  });
  return { result, diagnostics };
}

test('resolves invariant and localized media in nested Carousel and video poster', () => fixture((root, save) => {
  save('images', image);
  save('images', poster);
  save('audio', audio);
  save('video', video);
  save('subtitles', subtitles);
  const source = {
    base: {
      type: 'lesson',
      section: [{ type: 'content', content: [
        { type: 'carousel', locale: { slides: [
          { type: 'image', id: 'image-a', locale: { src: image } },
          { type: 'image', id: 'image-b', locale: { src: image } },
        ] } },
        { type: 'video', locale: { fileLocation: video, poster } },
        { type: 'audio', locale: { fileLocation: audio } },
      ] }],
    },
    locale: { uk: { section: [{ type: 'content', content: [
      { type: 'carousel', locale: { slides: [
        { type: 'image', locale: { src: image } },
        { type: 'image', locale: { src: image } },
      ] } },
      { type: 'subtitles', locale: { fileLocation: subtitles } },
    ] }] } },
  };
  const { result, diagnostics } = publish(root, source);
  assert.deepEqual(diagnostics, []);
  const published = result as typeof source;
  assert.equal(published.base.section[0].content[0].locale.slides[0].locale.src, '/textbooks/math/assets/images/' + image);
  assert.equal(published.base.section[0].content[0].locale.slides[1].locale.src, '/textbooks/math/assets/images/' + image);
  assert.equal(published.base.section[0].content[1].locale.poster, '/textbooks/math/assets/images/' + poster);
  assert.equal(published.locale.uk.section[0].content[1].locale.fileLocation, '/textbooks/math/assets/subtitles/' + subtitles);
}));

test('allows Draft missing media, warns without inventing assets, and rejects Production', () => fixture(root => {
  const source = { base: { type: 'lesson', section: [
    { id: 'image-id', type: 'image', locale: { src: image } },
    { id: 'audio-id', type: 'audio', locale: { fileLocation: audio } },
  ] } };
  const { result, diagnostics } = publish(root, source, 'draft');
  assert.equal(diagnostics.length, 2);
  assert(diagnostics.every(d => d.reason === 'file is missing'));
  assert.equal((result as typeof source).base.section[0].locale.src, '/textbooks/math/assets/images/' + image);
  assert.doesNotThrow(() => assertMediaPublicationReady(diagnostics, 'draft'));
  assert.throws(() => assertMediaPublicationReady(diagnostics, 'production'), /image-id[\s\S]*audio-id/);
}));

test('leaves external HTTP(S) media URLs unchanged and detects malformed local references', () => fixture(root => {
  const source = { base: { type: 'image', locale: { src: 'https://cdn.example.org/image.webp' } } };
  const a = publish(root, source);
  assert.deepEqual(a.result, source);
  assert.equal(a.diagnostics.length, 0);
  const b = publish(root, { base: { type: 'video', locale: { fileLocation: 'not-a-uuid.mp4', poster: '550e8400-e29b-41d4-a716-446655440001.mp4' } } });
  assert.equal(b.diagnostics.length, 2);
  assert(b.diagnostics.every(d => d.reason.includes('malformed')));
}));

test('refuses symlinked assets even in Draft', () => fixture((root, save) => {
  save('images', image);
  const from = join(root, 'assets', 'images', image);
  const dest = join(root, 'assets', 'images', poster);
  symlinkSync(from, dest);
  const { diagnostics } = publish(root, { base: { type: 'image', locale: { src: poster } } }, 'draft');
  assert.equal(diagnostics[0]?.reason, 'unsafe symbolic link');
}));
