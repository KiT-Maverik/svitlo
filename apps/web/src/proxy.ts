import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { NextRequest } from 'next/server';

import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';

/**
 * Only reject URLs that can be proved invalid before the App Router streams its
 * Cache Components shell. The actual Page and loader remain responsible for full
 * Course and Lesson Props validation.
 */
const codes = new Set<string>(DEFAULT_SUPPORTED_LANGUAGES.map(entry => entry.language));
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

function readPublicationBase(file: string): Record<string, unknown> | undefined {
  try {
    const contents: unknown = JSON.parse(readFileSync(file, 'utf8'));
    return record(contents) ? contents : undefined;
  } catch {
    return undefined;
  }
}

function supportsLanguage(resource: Record<string, unknown>, language: string): boolean {
  return (
    record(resource.params) && Array.isArray(resource.params.languages) && resource.params.languages.includes(language)
  );
}

function lessonExists(publicRoot: string, id: string, language: string): boolean {
  if (!uuid.test(id)) return false;
  const normalized = id.toLowerCase();
  const filename = path.join(publicRoot, 'data', 'lessons', normalized.slice(-1), normalized, 'base.json');
  const lesson = readPublicationBase(filename);
  return !!lesson && lesson.type === 'lesson' && lesson.id === normalized && supportsLanguage(lesson, language);
}

function courseContainsLesson(node: unknown, lessonId: string): boolean {
  if (!record(node)) return false;
  if (node.type === 'lesson') return node.id === lessonId;
  if (!record(node.content) || !record(node.content.items)) return false;
  return Object.values(node.content.items).some(child => courseContainsLesson(child, lessonId));
}

function courseIncludesLesson(publicRoot: string, courseId: string, lessonId: string, language: string): boolean {
  if (!uuid.test(courseId)) return false;
  const normalized = courseId.toLowerCase();
  const file = path.join(publicRoot, 'data', 'courses', normalized, 'base.json');
  const course = readPublicationBase(file);
  return (
    !!course &&
    course.id === normalized &&
    course.type === 'course' &&
    supportsLanguage(course, language) &&
    courseContainsLesson(course, lessonId)
  );
}

/** Pure routing decision with an injectable publication directory for regression tests. */
export function isInvalidPublishedRoute(pathname: string, publicRoot: string): boolean {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'topics' || parts[0] === 'lesson') return true;

  const language = parts[0];
  if (!language || !['lesson', 'course'].includes(parts[1] ?? '')) return false;

  if (parts[1] === 'lesson') {
    if (!codes.has(language)) return true;
    // Old /:language/lesson/:id URLs are still supported as redirects.
    if (parts.length === 3) return !lessonExists(publicRoot, parts[2], language);
    if (parts.length === 4) {
      return !codes.has(parts[2]) || !lessonExists(publicRoot, parts[3], parts[2]);
    }
    return true;
  }

  if (parts[1] === 'course' && parts[3] === 'episode') return true;
  if (parts[1] === 'course' && parts[3] === 'lesson') {
    if (parts.length !== 6 || !codes.has(language) || !codes.has(parts[4])) return true;
    const [courseId, lessonId] = [parts[2], parts[5]];
    return (
      !lessonExists(publicRoot, lessonId, parts[4]) || !courseIncludesLesson(publicRoot, courseId, lessonId, parts[4])
    );
  }
  return false;
}

/**
 * Next 16 streaming can commit HTTP 200 before notFound() executes under
 * Suspense. Reject impossible resource routes in Proxy so HTTP clients receive
 * a real 404, while valid requests continue through the normal App Router.
 */
export function proxy(request: NextRequest): Response | undefined {
  if (request.method !== 'GET' && request.method !== 'HEAD') return undefined;
  if (isInvalidPublishedRoute(request.nextUrl.pathname, path.join(process.cwd(), 'public'))) {
    return new Response(request.method === 'HEAD' ? null : 'Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  return undefined;
}

export const config = {
  matcher: [
    '/topics/:path*',
    '/lesson/:path*',
    '/:language/lesson/:path*',
    '/:language/course/:courseId/lesson/:path*',
    '/:language/course/:courseId/episode/:path*',
  ],
};
