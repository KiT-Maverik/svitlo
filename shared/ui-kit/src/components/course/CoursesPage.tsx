'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { LanguageCode } from '@svitlo/engine/runtime';
import type { CourseListItem, CourseMessages } from './types';
import { CourseCard } from './CourseCard';

export function CoursesPage({
  courses,
  messages,
  interfaceLanguage,
}: {
  courses: readonly CourseListItem[];
  messages: CourseMessages;
  interfaceLanguage?: LanguageCode;
}) {
  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 5, md: 9 } }}>
      <Box component="header" sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800 }}>
          {messages.catalogEyebrow}
        </Typography>
        <Typography
          component="h1"
          variant="h2"
          sx={{ fontWeight: 850, letterSpacing: '-.035em', maxWidth: 800, mt: 1 }}
        >
          {messages.catalogTitle}
        </Typography>
        <Typography color="text.secondary" variant="h6" sx={{ maxWidth: 720, mt: 2, lineHeight: 1.55 }}>
          {messages.catalogDescription}
        </Typography>
      </Box>
      {courses.length === 0 ? (
        <Typography role="status" color="text.secondary">
          {messages.emptyCatalog}
        </Typography>
      ) : (
        <Box
          component="section"
          aria-label={messages.catalogTitle}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gap: 3,
          }}
        >
          {courses.map(({ course, href }) => (
            <CourseCard
              key={course.id}
              course={course}
              href={href}
              messages={messages}
              interfaceLanguage={interfaceLanguage}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}
