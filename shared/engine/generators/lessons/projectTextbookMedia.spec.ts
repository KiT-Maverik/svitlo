import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { defineImage } from '../../configurators/contentBlocks/primitive/defineImage/defineImage';
import { defineText } from '../../configurators/contentBlocks/primitive/defineText/defineText';
import { defineLesson } from '../../configurators/lessons/defineLesson/defineLesson';
import { defineContentSection } from '../../configurators/sections/defineContentSection';
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
  try {
    run(root, save);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
}
function publish<T>(root: string, props: T, mode: 'draft' | 'production' = 'production') {
  const diagnostics: MediaDiagnostic[] = [];
  const result = projectTextbookMedia(props, {
    textbookRoot: root,
    textbookId: 'math',
    source: 'lesson.ts',
    mode,
    diagnostics,
  });
  return { result, diagnostics };
}

test('resolves invariant and localized media in nested Carousel and video poster', () =>
  fixture((root, save) => {
    save('images', image);
    save('images', poster);
    save('audio', audio);
    save('video', video);
    save('subtitles', subtitles);
    const source = {
      base: {
        type: 'lesson',
        section: [
          {
            type: 'content',
            content: [
              {
                type: 'carousel',
                locale: {
                  slides: [
                    { type: 'image', id: 'image-a', locale: { src: image } },
                    { type: 'image', id: 'image-b', locale: { src: image } },
                  ],
                },
              },
              { type: 'video', locale: { fileLocation: video, poster } },
              { type: 'audio', locale: { fileLocation: audio } },
            ],
          },
        ],
      },
      locale: {
        uk: {
          section: [
            {
              type: 'content',
              content: [
                {
                  type: 'carousel',
                  locale: {
                    slides: [
                      { type: 'image', locale: { src: image } },
                      { type: 'image', locale: { src: image } },
                    ],
                  },
                },
                { type: 'subtitles', locale: { fileLocation: subtitles } },
              ],
            },
          ],
        },
      },
    };
    const { result, diagnostics } = publish(root, source);
    assert.deepEqual(diagnostics, []);
    const published = JSON.parse(JSON.stringify(result));
    assert.equal(
      published.base.section[0].content[0].locale.slides[0].locale.src,
      '/textbooks/math/assets/images/' + image,
    );
    assert.equal(
      published.base.section[0].content[0].locale.slides[1].locale.src,
      '/textbooks/math/assets/images/' + image,
    );
    assert.equal(published.base.section[0].content[1].locale.poster, '/textbooks/math/assets/images/' + poster);
    assert.equal(
      published.locale.uk.section[0].content[1].locale.fileLocation,
      '/textbooks/math/assets/subtitles/' + subtitles,
    );
  }));

test('allows Draft missing media, warns without inventing assets, and rejects Production', () =>
  fixture(root => {
    const source = {
      base: {
        type: 'lesson',
        section: [
          { id: 'image-id', type: 'image', locale: { src: image } },
          { id: 'audio-id', type: 'audio', locale: { fileLocation: audio } },
        ],
      },
    };
    const { result, diagnostics } = publish(root, source, 'draft');
    assert.equal(diagnostics.length, 2);
    assert(diagnostics.every(d => d.reason === 'file is missing'));
    assert.equal(
      JSON.parse(JSON.stringify(result)).base.section[0].locale.src,
      '/textbooks/math/assets/images/' + image,
    );
    assert.doesNotThrow(() => assertMediaPublicationReady(diagnostics, 'draft'));
    assert.throws(() => assertMediaPublicationReady(diagnostics, 'production'), /image-id[\s\S]*audio-id/);
  }));

test('leaves external HTTP(S) media URLs unchanged and detects malformed local references', () =>
  fixture(root => {
    const source = { base: { type: 'image', locale: { src: 'https://cdn.example.org/image.webp' } } };
    const a = publish(root, source);
    assert.deepEqual(a.result, source);
    assert.equal(a.diagnostics.length, 0);
    const b = publish(root, {
      base: {
        type: 'video',
        locale: { fileLocation: 'not-a-uuid.mp4', poster: '550e8400-e29b-41d4-a716-446655440001.mp4' },
      },
    });
    assert.equal(b.diagnostics.length, 2);
    assert(b.diagnostics.every(d => d.reason.includes('malformed')));
  }));

test('refuses symlinked assets even in Draft', () =>
  fixture((root, save) => {
    save('images', image);
    const from = join(root, 'assets', 'images', image);
    const dest = join(root, 'assets', 'images', poster);
    symlinkSync(from, dest);
    const { diagnostics } = publish(root, { base: { type: 'image', locale: { src: poster } } }, 'draft');
    assert.equal(diagnostics[0]?.reason, 'unsafe symbolic link');
    assert.throws(() => assertMediaPublicationReady(diagnostics, 'draft'), /unsafe symbolic link/);
  }));

test('Nil UUID media remains a Draft placeholder and always blocks Production even when the file exists', () =>
  fixture((root, save) => {
    const nilImage = '00000000-0000-0000-0000-000000000000.webp';
    save('images', nilImage);
    const source = { base: { id: 'image-id', type: 'image', locale: { src: nilImage } } };
    const { result, diagnostics } = publish(root, source, 'draft');
    assert.equal(diagnostics.length, 1);
    assert.equal(diagnostics[0]?.reason, 'unresolved resource placeholder');
    assert.equal(JSON.parse(JSON.stringify(result)).base.locale.src, '/textbooks/math/assets/images/' + nilImage);
    assert.doesNotThrow(() => assertMediaPublicationReady(diagnostics, 'draft'));
    assert.throws(() => assertMediaPublicationReady(diagnostics, 'production'), /unresolved resource placeholder/);
  }));

test('strict publication rejects reserved Draft identities in built Props, not Preview', () =>
  fixture(root => {
    const pending = 'feedc0de-12ab-8cab-abcd-0123456789ab';
    const sources = [
      { base: { type: 'lesson', section: [{ type: 'quiz', params: { selection: { questionIds: [pending] } } }] } },
      {
        base: { type: 'course', content: { items: { blocked: { type: 'lesson', id: pending } }, order: ['blocked'] } },
      },
      { base: { type: 'flashcard', locale: { value: { reference: pending } } } },
      { base: { type: 'image', locale: { src: pending + '.webp' } } },
    ];
    for (const source of sources) {
      assert.doesNotThrow(() => publish(root, source, 'draft'));
      assert.throws(() => publish(root, source, 'production'), /Unresolved Preview value.*lesson\.ts/);
    }
  }));

test('production blocks known pending Lesson/Quiz scaffolds and pending assessment labels, not ordinary copy', () =>
  fixture(root => {
    const blocked = [
      {
        base: {
          type: 'lesson',
          section: [{ type: 'content', slug: 'pendingContent', locale: { title: 'Not implemented' } }],
        },
      },
      {
        base: {
          type: 'lesson',
          section: [
            {
              type: 'content',
              content: [{ type: 'text', slug: 'pendingNotice', locale: { value: 'Not implemented' } }],
            },
          ],
        },
      },
      { base: { type: 'lesson', section: [{ type: 'quiz', locale: { title: 'PENDING QUIZ' } }] } },
      { base: { type: 'course', content: { items: { activity: { type: 'quest' } }, order: ['activity'] } } },
    ];
    for (const source of blocked) {
      assert.doesNotThrow(() => publish(root, source, 'draft'));
      assert.throws(() => publish(root, source, 'production'), /Preview scaffold|Preview value|Unimplemented Quest/);
    }
    const complete = {
      base: {
        type: 'lesson',
        section: [
          {
            type: 'content',
            slug: 'realSection',
            locale: { title: 'Not implemented yet in the history of this topic' },
          },
        ],
      },
    };
    assert.deepEqual(publish(root, complete, 'production').diagnostics, []);
  }));

test('complete typed Lesson source publishes all authored locales without Preview false positives', () =>
  fixture((root, save) => {
    save('images', image);
    const paragraph = defineText<'paragraph', ['en', 'uk']>({
      id: '550e8400-e29b-41d4-a716-446655440005',
      slug: 'paragraph',
      type: 'text',
      params: {},
      locale: { value: { en: 'A real explanation', uk: 'Справжнє пояснення' } },
    });
    const diagram = defineImage<'diagram', ['en', 'uk']>({
      id: '550e8400-e29b-41d4-a716-446655440008',
      slug: 'diagram',
      type: 'image',
      params: { width: 640, height: 480 },
      locale: { fileName: image, alt: 'Real diagram' },
    });
    const section = defineContentSection<
      'introduction',
      { paragraph: typeof paragraph; diagram: typeof diagram },
      ['en', 'uk']
    >({
      id: '550e8400-e29b-41d4-a716-446655440006',
      slug: 'introduction',
      type: 'content',
      params: {},
      locale: { title: { en: 'Introduction', uk: 'Вступ' }, navigationLabel: '1' },
      children: ['paragraph', 'diagram'],
      paragraph,
      diagram,
    });
    const lesson = defineLesson({
      id: '550e8400-e29b-41d4-a716-446655440007',
      slug: 'completedLesson',
      type: 'lesson',
      skills: [],
      params: {
        quizRequiredForCompletion: false,
        languages: ['en', 'uk'] as const,
        sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
      },
      locale: { title: { en: 'Real lesson', uk: 'Справжній урок' } },
      children: ['introduction'],
      introduction: section,
    });
    const publication = lesson.build.data({ languages: ['en', 'uk'] });
    const { result, diagnostics } = publish(root, publication, 'production');
    assert.deepEqual(diagnostics, []);
    const publishedImage = (result.base.introduction as { diagram: { type: string; locale: { src?: string } } })
      .diagram;
    const originalImage = (publication.base.introduction as { diagram: { locale: { src?: string } } }).diagram;
    assert.equal(publishedImage?.type, 'image');
    assert.equal(
      (publishedImage?.locale as { src?: string } | undefined)?.src,
      '/textbooks/math/assets/images/' + image,
    );
    assert.equal((originalImage?.locale as { src?: string } | undefined)?.src, image, 'authored Props stay unchanged');
    const translated = result.locale?.uk?.introduction as { paragraph?: { locale?: { value?: string } } } | undefined;
    assert.equal(translated?.paragraph?.locale?.value, 'Справжнє пояснення');
  }));
