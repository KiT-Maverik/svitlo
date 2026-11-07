'use client';

import { useId, useState, type ElementType } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';

export type Topic = {
  id: string;
  title: string;
  href?: string;
  /** Course nodes preserve their published TOC structure; standalone lessons may omit these fields. */
  type?: 'module' | 'chapter' | 'lesson' | 'episode';
  children?: readonly Topic[];
  /** Backwards-compatible indentation for callers still supplying flat topics. */
  depth?: number;
};

type TopicItemProps = {
  topic: Topic;
  depth: number;
  pathname: string;
  linkComponent?: ElementType;
  onNavigate: () => void;
};

function TopicItem({ topic, depth, pathname, linkComponent, onNavigate }: TopicItemProps) {
  const isGroup = topic.type === 'module' || topic.type === 'chapter';
  const [expanded, setExpanded] = useState(true);
  const childrenId = useId();

  if (isGroup) {
    const isModule = topic.type === 'module';
    const toggle = () => setExpanded(value => !value);
    return (
      <Box component="li" sx={{ listStyle: 'none', minWidth: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            mt: isModule ? 1.5 : 0.5,
            mb: 0.5,
            '&:hover .course-topic-toggle, &:focus-within .course-topic-toggle': { opacity: 1 },
            '@media (hover: none)': { '& .course-topic-toggle': { opacity: 1 } },
          }}
        >
          <ButtonBase
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={childrenId}
            sx={{
              flex: 1,
              minWidth: 0,
              justifyContent: 'flex-start',
              textAlign: 'start',
              borderRadius: 1,
              px: 1,
              py: isModule ? 1.25 : 0.75,
              '&:hover .course-topic-title, &:focus-visible .course-topic-title': {
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main' },
            }}
          >
            <Typography
              className="course-topic-title"
              variant="body2"
              component="span"
              sx={{ fontWeight: isModule ? 750 : 650, overflowWrap: 'anywhere' }}
            >
              {topic.title}
            </Typography>
          </ButtonBase>
          <IconButton
            className="course-topic-toggle"
            size="small"
            onClick={toggle}
            aria-label={topic.title}
            aria-expanded={expanded}
            aria-controls={childrenId}
            sx={{
              flexShrink: 0,
              opacity: { xs: 1, md: 0 },
              transition: 'opacity 150ms ease',
              '&:focus-visible': { opacity: 1, outline: '2px solid', outlineColor: 'primary.main' },
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            }}
          >
            {expanded ? <ExpandLessRoundedIcon fontSize="small" /> : <ExpandMoreRoundedIcon fontSize="small" />}
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout="auto" id={childrenId}>
          <Box
            component="ul"
            sx={{
              m: 0,
              p: 0,
              ms: 1,
              ps: 1.5,
              borderInlineStart: '1px solid',
              borderColor: 'divider',
            }}
          >
            {topic.children?.map(child => (
              <TopicItem
                key={child.id}
                topic={child}
                depth={depth + 1}
                pathname={pathname}
                linkComponent={linkComponent}
                onNavigate={onNavigate}
              />
            ))}
          </Box>
        </Collapse>
      </Box>
    );
  }

  const selected = topic.href === pathname;
  return (
    <Box component="li" sx={{ listStyle: 'none', minWidth: 0 }}>
      {topic.href ? (
        <ListItemButton
          component={linkComponent ?? 'a'}
          href={topic.href}
          selected={selected}
          aria-current={selected ? 'page' : undefined}
          onClick={onNavigate}
          sx={{
            borderRadius: 1.5,
            px: 1.25,
            py: 0.75,
            ps: 1.25 + Math.min(topic.depth ?? (topic.type ? 0 : depth), 4) * (topic.type ? 0 : 2),
            gap: 1,
            '&.Mui-selected': { bgcolor: 'action.selected', color: 'primary.main' },
          }}
        >
          {topic.type === 'episode' ? (
            <PlayCircleOutlineRoundedIcon fontSize="small" color="action" aria-hidden="true" />
          ) : topic.type === 'lesson' ? (
            <MenuBookOutlinedIcon fontSize="small" color="action" aria-hidden="true" />
          ) : null}
          <ListItemText
            primary={topic.title}
            slotProps={{ primary: { variant: 'body2', sx: { overflowWrap: 'anywhere' } } }}
          />
        </ListItemButton>
      ) : (
        <Typography variant="body2" sx={{ py: 1, px: 1.25 }}>
          {topic.title}
        </Typography>
      )}
    </Box>
  );
}

/** Portable, hierarchical navigation for Course TOCs and standalone Lesson topics. */
export default function CourseTopicList({
  topics,
  pathname,
  linkComponent,
  onNavigate,
}: {
  topics: readonly Topic[];
  pathname: string;
  linkComponent?: ElementType;
  onNavigate: () => void;
}) {
  return (
    <Box component="ul" sx={{ m: 0, p: 0, userSelect: 'none' }}>
      {topics.map(topic => (
        <TopicItem
          key={topic.id}
          topic={topic}
          depth={0}
          pathname={pathname}
          linkComponent={linkComponent}
          onNavigate={onNavigate}
        />
      ))}
    </Box>
  );
}
