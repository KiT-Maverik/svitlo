import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';

import type { NextRequest } from 'next/server';

import { DEFAULT_SUPPORTED_LANGUAGES, resolveEntityPath } from '@svitlo/engine/runtime';

/**
 * Only reject URLs that can be proved invalid before the App Router streams its
 * Cache Components shell. The actual Page and loader remain responsible for full
 * Course and Lesson Props validation.
 */
const codes = new Set<string>(DEFAULT_SUPPORTED_LANGUAGES.map(entry => entry.language));
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const placementSegment = /^[a-z][a-zA-Z0-9]*$/;
const forbiddenPlacements = new Set(['__proto__', 'constructor', 'prototype']);

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

/**
 * Course detail pages stream under Suspense: reject only impossible URLs before
 * streaming begins. Do not parse or enumerate Course resources here; a corrupt
 * requested publication must reach the normal loader and fail visibly.
 */
function invalidDirectCourseBase(publicRoot: string, courseId: string): boolean {
  let canonicalId: string;
  try {
    canonicalId = resolveEntityPath(courseId).split('/')[1];
  } catch {
    return true;
  }
  try {
    // A missing base is a 404. A damaged or inaccessible existing resource must
    // reach the adapter's typed error path, not be treated as unsupported locale.
    statSync(path.join(publicRoot, 'data', 'courses', canonicalId, 'base.json'));
    return false;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return true;
    throw error;
  }
}

/**
 * Preflight only the addressed child chain. Each segment must appear in its
 * owner's canonical children order; unrelated Course branches are not scanned.
 */
function courseActivityAtPlacement(course: Record<string, unknown>, placement: readonly string[]): Record<string, unknown> | undefined {
  let owner = course;
  for (const [index, key] of placement.entries()) {
    if (
      !placementSegment.test(key) ||
      forbiddenPlacements.has(key) ||
      !Array.isArray(owner.children) ||
      !owner.children.includes(key)
    ) return undefined;
    const child = owner[key];
    if (!record(child)) return undefined;
    if (index < placement.length - 1 && child.type !== 'module' && child.type !== 'chapter') return undefined;
    owner = child;
  }
  return owner;
}

function courseHasActivity(
  publicRoot: string,
  courseId: string,
  placement: readonly string[],
  type: 'lesson' | 'episode',
  contentLanguage: string,
): boolean {
  if (!uuid.test(courseId) || !placement.length) return false;
  const normalized = courseId.toLowerCase();
  const course = readPublicationBase(path.join(publicRoot, 'data', 'courses', normalized, 'base.json'));
  if (!course || course.id !== normalized || course.type !== 'course' || !supportsLanguage(course, contentLanguage))
    return false;
  const activity = courseActivityAtPlacement(course, placement);
  if (!activity || activity.type !== type || typeof activity.id !== 'string') return false;
  return type === 'lesson'
    ? lessonExists(publicRoot, activity.id, contentLanguage)
    : supportsLanguage(activity, contentLanguage);
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

  if (parts[1] === 'course' && parts.length === 3) {
    return !codes.has(language) || invalidDirectCourseBase(publicRoot, parts[2]);
  }
  if (parts[1] === 'course' && (parts[3] === 'lesson' || parts[3] === 'episode')) {
    if (parts.length < 6 || !codes.has(language) || !codes.has(parts[4])) return true;
    return !courseHasActivity(publicRoot, parts[2], parts.slice(5), parts[3], parts[4]);
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
    '/:language/course/:courseId',
    '/:language/course/:courseId/lesson/:path*',
    '/:language/course/:courseId/episode/:path*',
  ],
};
