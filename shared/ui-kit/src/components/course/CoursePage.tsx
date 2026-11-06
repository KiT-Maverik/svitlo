'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import AutoStoriesOutlined from '@mui/icons-material/AutoStoriesOutlined';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import LayersOutlined from '@mui/icons-material/LayersOutlined';
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined';
import PlayCircleOutlineRounded from '@mui/icons-material/PlayCircleOutlineRounded';
import type { CourseMessages, CourseOutlineItem, CoursePreview } from './types';
import { CourseArtwork } from './CourseArtwork';

function firstPlayable(items: readonly CourseOutlineItem[]): string | undefined {
  for (const item of items) {
    if (item.href && (item.type === 'lesson' || item.type === 'episode')) return item.href;
    const child = firstPlayable(item.children ?? []);
    if (child) return child;
  }
  return undefined;
}

function OutlineItem({ item, depth, messages }: { item: CourseOutlineItem; depth: number; messages: CourseMessages }) {
  const isGroup = item.type === 'module' || item.type === 'chapter';
  const typeText = messages[item.type];
  const icon =
    item.type === 'module' ? (
      <LayersOutlined fontSize="small" />
    ) : item.type === 'chapter' ? (
      <MenuBookOutlined fontSize="small" />
    ) : item.type === 'episode' ? (
      <PlayCircleOutlineRounded fontSize="small" />
    ) : (
      <AutoStoriesOutlined fontSize="small" />
    );
  return (
    <Box
      component="li"
      id={item.id}
      sx={{
        listStyle: 'none',
        minWidth: 0,
        ...(depth === 0 ? { '& + li': { borderTop: '1px solid', borderColor: 'divider', pt: 1 } } : {}),
      }}
    >
      <Box
        component={item.href ? 'a' : 'div'}
        {...(item.href ? { href: item.href } : {})}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: isGroup ? 2 : 1.5,
          borderRadius: 2,
          color: 'text.primary',
          textDecoration: 'none',
          ...(item.href && {
            '&:hover': { bgcolor: 'action.hover' },
            '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main' },
          }),
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: isGroup ? 'action.selected' : 'action.hover',
            color: isGroup ? 'primary.main' : 'text.secondary',
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" component="span">
            {typeText}
          </Typography>
          <Typography
            component={depth === 0 ? 'h3' : depth === 1 && isGroup ? 'h4' : 'span'}
            variant="body1"
            sx={{ fontWeight: isGroup ? 750 : 500 }}
          >
            {item.title}
          </Typography>
        </Box>
        {item.href && (
          <ArrowForwardRounded
            aria-hidden="true"
            color="primary"
            sx={{ 'html[dir="rtl"] &': { transform: 'scaleX(-1)' } }}
          />
        )}
      </Box>
      {!!item.children?.length && (
        <Box
          component="ol"
          sx={{
            m: 0,
            p: 0,
            marginInlineStart: { xs: 1.5, sm: 3 },
            paddingInlineStart: 1.5,
            borderInlineStart: '1px solid',
            borderColor: 'divider',
          }}
        >
          {item.children.map(child => (
            <OutlineItem key={child.id} item={child} depth={depth + 1} messages={messages} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export type CoursePageProps = {
  course: CoursePreview;
  outline: readonly CourseOutlineItem[];
  messages: CourseMessages;
  catalogHref: string;
};

export function CoursePage({ course, outline, messages, catalogHref }: CoursePageProps) {
  const startHref = firstPlayable(outline);
  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, pb: 10 }}>
      <Button component="a" href={catalogHref} startIcon={<ArrowBackRounded />} sx={{ mb: 3 }}>
        {messages.backToCatalog}
      </Button>
      <Paper component="header" variant="outlined" sx={{ overflow: 'hidden', borderRadius: 4, mb: 5 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.6fr) minmax(250px, 1fr)' } }}>
          <Stack spacing={2.5} sx={{ justifyContent: 'center', p: { xs: 3, md: 5 } }}>
            <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
              <Chip color="primary" variant="outlined" label={course.category} />
              <Chip variant="outlined" label={course.level} />
            </Stack>
            <Typography component="h1" variant="h3" sx={{ fontWeight: 850, letterSpacing: '-.03em' }}>
              {course.title}
            </Typography>
            <Typography color="text.secondary" variant="body1" sx={{ lineHeight: 1.7 }}>
              {course.description}
            </Typography>
            <Stack direction="row" sx={{ gap: 2.5, flexWrap: 'wrap', color: 'text.secondary' }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                <AutoStoriesOutlined fontSize="small" />
                <Typography variant="body2">
                  {course.lessons} {messages.lessons}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                <LayersOutlined fontSize="small" />
                <Typography variant="body2">
                  {course.modules} {messages.modules}
                </Typography>
              </Stack>
              {course.duration && <Typography variant="body2">{course.duration}</Typography>}
            </Stack>
            {startHref ? (
              <Box>
                <Button
                  component="a"
                  href={startHref}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRounded />}
                >
                  {messages.startCourse}
                </Button>
              </Box>
            ) : (
              <Typography color="text.secondary" variant="body2">
                {messages.previewOnly}
              </Typography>
            )}
          </Stack>
          <CourseArtwork tone={course.tone} large />
        </Box>
      </Paper>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: course.highlights?.length ? 'minmax(0, 1fr) minmax(0, 2fr)' : '1fr' },
          gap: 4,
          alignItems: 'start',
        }}
      >
        {!!course.highlights?.length && (
          <Paper component="section" variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography component="h2" variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              {messages.highlights}
            </Typography>
            <Stack component="ul" spacing={2} sx={{ m: 0, p: 0, listStyle: 'none' }}>
              {course.highlights.map(highlight => (
                <Stack component="li" direction="row" sx={{ gap: 1.5 }} key={highlight}>
                  <CheckCircleOutlineRounded color="success" fontSize="small" aria-hidden="true" />
                  <Typography variant="body2">{highlight}</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        )}
        <Box component="section" aria-labelledby="course-outline-title">
          <Typography id="course-outline-title" component="h2" variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            {messages.contents}
          </Typography>
          <Paper variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
            {outline.length === 0 ? (
              <Typography color="text.secondary" role="status" sx={{ p: 2 }}>
                {messages.noContents}
              </Typography>
            ) : (
              <Stack component="ol" spacing={1} sx={{ m: 0, p: 0 }}>
                {outline.map(item => (
                  <OutlineItem key={item.id} item={item} depth={0} messages={messages} />
                ))}
              </Stack>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
