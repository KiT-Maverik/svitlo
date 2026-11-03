import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Fragment, type ReactNode } from 'react';
import { Markdown } from '@svitlo/ui-kit';
import type { LessonSection } from '@svitlo/engine/content';
import { getLanguageCode } from '@svitlo/engine/localization';
import type { Locale } from '@svitlo/engine/localization';

async function readMarkdown(fileLocation: string) {
  'use cache';
  return readFile(path.join(process.cwd(), 'src', fileLocation.slice(1)), 'utf8');
}

export default async function LessonSectionContent({
  content,
  locale,
}: {
  content: LessonSection['content'];
  locale: Locale;
}) {
  const blocks = await Promise.all(
    content.map(async block => {
      if (block.blockType === 'scene') return <Fragment key={block.id}>{block.component as ReactNode}</Fragment>;
      if (block.blockType === 'markdown') {
        const markdown = await readMarkdown(block.fileLocation);
        return <Markdown key={block.id} id={block.id} type="markdown" locale={{ code: getLanguageCode(locale) }} text={markdown} />;
      }

      if (block.blockType === 'text') return <Fragment key={block.id}>{block.value}</Fragment>;

      throw new Error(`Unsupported lesson contentBlock type: ${block.blockType}`);
    }),
  );

  return <>{blocks}</>;
}
