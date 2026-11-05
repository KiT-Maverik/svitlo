import { vi } from 'vitest';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/i18n/LocaleProvider/LocaleProvider';
import { useLessonNavigation } from '@/components/pages/Lesson/LessonNavigation';
import type { LearningLayoutProgress } from '@svitlo/ui-kit/learning-layout';

export const LearningLayout_mx = {
  prepare: (options: { locale?: 'uk-UA' | 'ar-SA'; progress?: Partial<LearningLayoutProgress> } = {}) => {
    const dispatch = vi.fn();
    vi.mocked(usePathname).mockReturnValue('/topics/demo');
    vi.mocked(useLocale).mockReturnValue({
      locale: options.locale ?? 'uk-UA',
      setLocale: vi.fn(),
    });
    vi.mocked(useLessonNavigation).mockReturnValue({
      progress: { ready: true, step: 0, lastStep: 2, testDone: false, ...options.progress } as ReturnType<typeof useLessonNavigation>['progress'],
      dispatch,
    });
    return { dispatch };
  },
  reset: () => vi.clearAllMocks(),
} as const;
