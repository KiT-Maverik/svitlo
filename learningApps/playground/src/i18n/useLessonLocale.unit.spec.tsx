import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { useLessonLanguage, useLessonLocale } from './useLessonLocale';

vi.mock('next/navigation', () => ({ usePathname: vi.fn(), useRouter: vi.fn() }));

const lessonPath = '/uk/lesson/d3048d21-8690-5255-b62c-984c69ac272c';

describe('lesson locale from route', () => {
  const replace = vi.fn();

  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue(lessonPath);
    vi.mocked(useRouter).mockReturnValue({ replace } as unknown as ReturnType<typeof useRouter>);
    window.history.replaceState({}, '', '/');
  });

  it('resolves the language and BCP 47 locale from the path', () => {
    expect(renderHook(() => useLessonLanguage()).result.current.locale).toBe('uk-UA');
    vi.mocked(usePathname).mockReturnValue(lessonPath.replace('/uk/', '/qm/'));
    expect(renderHook(() => useLessonLanguage()).result.current.locale).toBe('crh-Latn-UA');
  });

  it('changes the language segment while preserving unrelated query parameters', () => {
    window.history.replaceState({}, '', lessonPath + '?ref=abc&lang=uk-UA');
    const { result } = renderHook(() => useLessonLocale());
    act(() => result.current.setLocale('en-US'));
    expect(replace).toHaveBeenCalledWith('/en/lesson/d3048d21-8690-5255-b62c-984c69ac272c?ref=abc', { scroll: false });
  });
});
