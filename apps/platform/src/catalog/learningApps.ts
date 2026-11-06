/** Public catalog metadata. App URLs are deployment configuration, not local routes. */
export type LearningApp = Readonly<{
  id: string;
  name: string;
  description: string;
  url: string | null;
}>;

/** Never expose malformed or non-HTTP destinations in the catalog. */
export function resolveLearningAppUrl(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  try {
    const url = new URL(raw);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export function getLearningApps(): readonly LearningApp[] {
  return [
    {
      id: 'math',
      name: 'Математика',
      description: 'Інтерактивне вивчення математичних понять і навичок.',
      url: resolveLearningAppUrl(process.env.NEXT_PUBLIC_MATH_APP_URL),
    },
  ];
}
