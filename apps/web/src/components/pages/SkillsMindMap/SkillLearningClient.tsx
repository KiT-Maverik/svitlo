'use client';

import Link from 'next/link';
import { textbook } from '@/generated/textbook';
import { Alert, Box, Paper, Stack, Typography } from '@mui/material';
import { SkillMastery } from '@/components/pages/SkillsMindMap/SkillLeafCard';
import type { SkillNode } from '@/components/pages/SkillsMindMap/skillsMindMap.utils';

interface SkillLearningClientProps {
  node: SkillNode | null;
  language: string;
}

/** Server loads and resolves Skill UUID; client renders only received props. */
export function SkillLearningClient({ node, language }: SkillLearningClientProps) {
  if (!node) {
    return (
      <Alert severity="error" role="alert" sx={{ mt: 3 }}>
        Скіл із таким UUID не знайдено в каталозі.
        <Box sx={{ mt: 2 }}>
          <Link href="/skillAnalytics">Повернутися до мапи навичок</Link>
        </Box>
      </Alert>
    );
  }
  const dir = language === 'ar' || language === 'he' || language === 'ur' ? 'rtl' : 'ltr';
  const returnHref = '/skillAnalytics?lang=' + encodeURIComponent(language);
  return (
    <Stack spacing={3} sx={{ pt: 2 }}>
      <Box>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800 }}>
          SKILL · ПРОКАЧУВАННЯ
        </Typography>
        <Typography component="h1" variant="h3" sx={{ fontWeight: 800 }} lang={language} dir={dir}>
          {node.name}
        </Typography>
        {node.description && (
          <Typography lang={language} dir={dir} sx={{ mt: 2, maxWidth: 750 }}>
            {node.description}
          </Typography>
        )}
        <Box sx={{ maxWidth: 350, mt: 3 }}>
          <SkillMastery skillId={node.id} />
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
          {textbook.skillLearningEmptyMessage ?? 'Пов’язані навчальні матеріали поки відсутні.'} Коли такі зв&apos;язки
          з&apos;являться, тут можна буде показувати матеріали саме для цієї навички.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Link href={returnHref}>← Повернутися до аналітики навичок</Link>
        </Box>
      </Paper>
    </Stack>
  );
}
