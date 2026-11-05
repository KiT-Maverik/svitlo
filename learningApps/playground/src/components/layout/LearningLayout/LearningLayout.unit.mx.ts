
import { vi } from 'vitest';
import { useLessonLocale } from '@/i18n/useLessonLocale';

/** The Lesson navigation state is now UI Kit-owned; never fake it in host tests. */
export const LearningLayout_mx = {
  prepare: (options: { locale?: 'uk-UA' | 'ar-SA' } = {}) => {
    vi.mocked(useLessonLocale).mockReturnValue({
      locale: options.locale ?? 'uk-UA',
      setLocale: vi.fn(),
    });
  },
  reset: () => vi.clearAllMocks(),
} as const;
