
import { vi } from 'vitest';
import { usePathname } from 'next/navigation';
import { useLessonLocale } from '@/i18n/useLessonLocale';

/** The Lesson navigation state is now UI Kit-owned; never fake it in host tests. */
export const LearningLayout_mx = {
  prepare: (options: { locale?: 'uk-UA' | 'ar-SA' } = {}) => {
    vi.mocked(usePathname).mockReturnValue('/uk/lesson/d3048d21-8690-5255-b62c-984c69ac272c');
    vi.mocked(useLessonLocale).mockReturnValue({
      locale: options.locale ?? 'uk-UA',
      setLocale: vi.fn(),
    });
  },
  reset: () => vi.clearAllMocks(),
} as const;
