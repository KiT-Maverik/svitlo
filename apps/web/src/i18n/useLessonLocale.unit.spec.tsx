import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { useLessonLanguage, useLessonLocale } from './useLessonLocale';

vi.mock('next/navigation', () => ({ usePathname: vi.fn(), useRouter: vi.fn() }));

const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const lessonPath = `/uk/lesson/en/${lessonId}`;

describe('independent lesson and interface locales from route', () => {
  const replace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePathname).mockReturnValue(lessonPath);
    vi.mocked(useRouter).mockReturnValue({ replace } as unknown as ReturnType<typeof useRouter>);
    window.history.replaceState({}, '', '/');
  });

  it('resolves the interface locale from the first segment and the content locale after lesson', () => {
    expect(renderHook(() => useLessonLanguage()).result.current.locale).toBe('uk-UA');
    const { result } = renderHook(() => useLessonLocale());
    expect(result.current.locale).toBe('uk-UA');
    expect(result.current.lessonLocale).toBe('en-US');
    vi.mocked(usePathname).mockReturnValue(lessonPath.replace('/uk/', '/qm/'));
    expect(renderHook(() => useLessonLanguage()).result.current.locale).toBe('crh-Latn-UA');
  });

  it('changes interface language while leaving lesson translation and query parameters intact', () => {
    window.history.replaceState({}, '', lessonPath + '?ref=abc&lang=uk-UA');
    const { result } = renderHook(() => useLessonLocale());
    act(() => result.current.setLocale('de-DE'));
    expect(replace).toHaveBeenCalledWith(`/de/lesson/en/${lessonId}?ref=abc`, { scroll: false });
  });

  it('changes only lesson language while preserving interface language', () => {
    const { result } = renderHook(() => useLessonLocale());
    act(() => result.current.setLessonLocale('ar-SA'));
    expect(replace).toHaveBeenCalledWith(`/uk/lesson/ar/${lessonId}`, { scroll: false });
  });

  it('upgrades legacy URLs to the explicit lesson locale on selection', () => {
    vi.mocked(usePathname).mockReturnValue(`/uk/lesson/${lessonId}`);
    const { result } = renderHook(() => useLessonLocale());
    expect(result.current.lessonLocale).toBe('uk-UA');
    act(() => result.current.setLocale('en-US'));
    expect(replace).toHaveBeenCalledWith(`/en/lesson/uk/${lessonId}`, { scroll: false });
  });
});
