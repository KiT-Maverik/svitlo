'use client';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import AutoStoriesOutlined from '@mui/icons-material/AutoStoriesOutlined';
import type { LanguageCode } from '@svitlo/engine/localization';
import type { CourseMessages, CoursePreview } from './types';
import { CourseLanguages } from './CourseLanguages';
import { CourseArtwork } from './CourseArtwork';

export type CourseCardProps = {
  course: CoursePreview;
  href: string;
  messages: Pick<CourseMessages, 'explore' | 'lessons' | 'languages'>;
  interfaceLanguage?: LanguageCode;
};

export function CourseCard({ course, href, messages, interfaceLanguage }: CourseCardProps) {
  return (
    <Card
      component="article"
      variant="outlined"
      sx={{
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'box-shadow .2s, transform .2s',
        '&:hover': { boxShadow: 6, transform: 'translateY(-3px)' },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
      }}
    >
      <CardActionArea
        component="a"
        href={href}
        aria-label={`${messages.explore}: ${course.title}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CourseArtwork tone={course.tone} />
        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 1.5 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={course.category} size="small" variant="outlined" />
            <Typography variant="caption" color="text.secondary">
              {course.level}
            </Typography>
          </Stack>
          <Typography component="h2" variant="h5" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
            {course.title}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              minHeight: 60,
            }}
          >
            {course.description}
          </Typography>
          {!!course.languages?.length && (
            <CourseLanguages
              languages={course.languages}
              interfaceLanguage={interfaceLanguage}
              label={messages.languages}
              compact
            />
          )}
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
            <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', color: 'text.secondary' }}>
              <AutoStoriesOutlined fontSize="small" aria-hidden="true" />
              <Typography variant="caption">
                {course.lessons} {messages.lessons}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'primary.main' }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {messages.explore}
              </Typography>
              <ArrowForwardRounded
                fontSize="small"
                sx={{
                  transform: 'scaleX(var(--course-arrow-direction, 1))',
                  'html[dir="rtl"] &': { transform: 'scaleX(-1)' },
                }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
