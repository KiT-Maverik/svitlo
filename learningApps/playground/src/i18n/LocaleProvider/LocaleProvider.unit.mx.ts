import { vi } from 'vitest';
import { usePathname, useRouter } from 'next/navigation';

export const LocaleProvider_mx = {
  prepare: (pathname = '/lesson/d3048d21-8690-5255-b62c-984c69ac272c') => {
    const replace = vi.fn();
    vi.mocked(usePathname).mockReturnValue(pathname);
    vi.mocked(useRouter).mockReturnValue({ replace } as unknown as ReturnType<typeof useRouter>);
    return { replace };
  },
  reset: () => {
    vi.restoreAllMocks();
    window.history.replaceState({}, '', '/');
  },
} as const;
