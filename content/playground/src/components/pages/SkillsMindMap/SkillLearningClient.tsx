'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Alert, Box, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { SkillMastery } from '@/components/pages/SkillsMindMap/SkillLeafCard';
import { flattenSkillNodes } from '@/components/pages/SkillsMindMap/skillsMindMap.utils';
import { loadSkillAnalyticsPage, resolveSkillLanguage } from '@/components/pages/SkillsMindMap/skillsData.client';
import type { SkillNode } from '@/components/pages/SkillsMindMap/skillsMindMap.utils';

interface SkillLearningClientProps {
  skillId: string;
  domainSlugs: readonly string[];
}

type State =
  { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; node: SkillNode; language: string };

/**
 * This is the future entry point for Skill-linked Lessons and Programs.
 * Playground's current Lesson/Program data does not declare links to fixture Skill
 * UUIDs, so no matching content can be honestly displayed yet.
 */
export function SkillLearningClient({ skillId, domainSlugs }: SkillLearningClientProps) {
  const requestKey = skillId + ':' + domainSlugs.join('|');
  const [loaded, setLoaded] = useState<State & { requestKey: string }>({ status: 'loading', requestKey });
  const state: State = loaded.requestKey === requestKey ? loaded : { status: 'loading' };

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const language = resolveSkillLanguage(
          new URLSearchParams(window.location.search).get('lang') ?? document.documentElement.lang,
        );
        const domains = await loadSkillAnalyticsPage(language, controller.signal, domainSlugs);
        const match = flattenSkillNodes(domains).find(node => node.kind === 'skill' && node.id === skillId);
        if (!match) throw new Error('Скіл із таким UUID не знайдено в каталозі.');
        if (!controller.signal.aborted) setLoaded({ status: 'ready', node: match, language, requestKey });
      } catch (error) {
        if (!controller.signal.aborted)
          setLoaded({
            requestKey,
            status: 'error',
            message: error instanceof Error ? error.message : 'Помилка завантаження скіла.',
          });
      }
    })();
    return () => controller.abort();
  }, [skillId, domainSlugs, requestKey]);

  if (state.status === 'loading') {
    return (
      <Box role="status" sx={{ display: 'flex', gap: 2, alignItems: 'center', py: 7 }}>
        <CircularProgress size={28} /> Завантаження навички…
      </Box>
    );
  }
  if (state.status === 'error')
    return (
      <Alert severity="error" role="alert" sx={{ mt: 3 }}>
        {state.message}
        <Box sx={{ mt: 2 }}>
          <Link href="/skillAnalytics">Повернутися до мапи навичок</Link>
        </Box>
      </Alert>
    );
  const dir = state.language === 'ar' || state.language === 'he' || state.language === 'ur' ? 'rtl' : 'ltr';
  const returnHref = '/skillAnalytics?lang=' + encodeURIComponent(state.language);
  return (
    <Stack spacing={3} sx={{ pt: 2 }}>
      <Box>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800 }}>
          SKILL · ПРОКАЧУВАННЯ
        </Typography>
        <Typography component="h1" variant="h3" sx={{ fontWeight: 800 }} lang={state.language} dir={dir}>
          {state.node.name}
        </Typography>
        {state.node.description && (
          <Typography lang={state.language} dir={dir} sx={{ mt: 2, maxWidth: 750 }}>
            {state.node.description}
          </Typography>
        )}
        <Box sx={{ maxWidth: 350, mt: 3 }}>
          <SkillMastery skillId={state.node.id} />
          <Typography color="text.secondary" variant="caption">
            Тестове значення, не реальна оцінка знань.
          </Typography>
        </Box>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Уроки та програми для цієї навички
      </Typography>
      <Paper variant="outlined" sx={{ borderRadius: 3, p: { xs: 3, sm: 4 } }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Поки немає пов&apos;язаних матеріалів
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          У цьому тестовому Playground ще не створено зв&apos;язків між UUID навички та уроками або програмами. Коли
          такі зв&apos;язки з&apos;являться, тут можна буде показувати матеріали саме для цієї навички.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Link href={returnHref}>← Повернутися до аналітики навичок</Link>
        </Box>
      </Paper>
    </Stack>
  );
}
