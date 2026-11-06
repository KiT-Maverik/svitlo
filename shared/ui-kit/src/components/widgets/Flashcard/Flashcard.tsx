'use client';

import type { Flashcard_Locale } from '../../../../data/locale/flashcard';

import { forwardRef, type ReactElement, type ReactNode } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Chip, { type ChipProps } from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelOutlined from '@mui/icons-material/LabelOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import LockOpenOutlined from '@mui/icons-material/LockOpenOutlined';
import Stack from '@mui/material/Stack';
import styles from './Flashcard.module.css';

export interface FlashcardLabel {
  label: ReactNode;
  icon?: ReactElement;
  color?: ChipProps['color'];
}

export interface FlashcardProps {
  messages: Flashcard_Locale;
  question: ReactNode;
  answer: ReactNode;
  labels?: readonly FlashcardLabel[];
  revealed?: boolean;
  disabled?: boolean;
  onReveal?: () => void;
  onRate?: (remembered: boolean) => void;
  onAddLabel?: () => void;
}

export const Flashcard = forwardRef<HTMLButtonElement, FlashcardProps>(function Flashcard(
  { question, answer, messages, labels = [], revealed = false, disabled = false, onReveal, onRate, onAddLabel },
  ref,
) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const closeMenu = () => setMenuAnchor(null);
  return (
    <section className={styles.flashStage} aria-label={messages.flashcard.region}>
      <div className={styles.cardArea}>
        <Paper component="article" className={styles.flashCard} elevation={0}>
          <div className={styles.flashHeader}>
            <h1 className={styles.flashQuestion}>{question}</h1>
            <IconButton
              className={styles.flashMenuButton}
              size="small"
              type="button"
              aria-label={messages.flashcard.actions.menu}
              aria-controls={menuAnchor ? 'flashcard-menu' : undefined}
              aria-haspopup="menu"
              aria-expanded={Boolean(menuAnchor)}
              disabled={disabled}
              onClick={event => setMenuAnchor(event.currentTarget)}
            >
              <MoreVert />
            </IconButton>
          </div>
          {labels.length > 0 && (
            <div className={styles.flashLabels}>
              {labels.map((item, index) => (
                <Chip
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  color={item.color}
                  size="small"
                  variant="outlined"
                />
              ))}
            </div>
          )}
          <Divider className={styles.flashDivider} />
          <button
            ref={ref}
            className={styles.flashReveal}
            type="button"
            disabled={disabled || revealed}
            onClick={onReveal}
            aria-expanded={revealed}
            aria-label={messages.flashcard.actions.reveal}
          >
            {revealed ? (
              <p className={styles.answer}>{answer}</p>
            ) : (
              <Fade in timeout={180}>
                <span className={styles.flashHintIcon}>
                  <LockOpenOutlined aria-hidden="true" />
                </span>
              </Fade>
            )}
          </button>
          {revealed && onRate && (
            <>
              <Divider className={styles.flashControlsDivider} />
              <div className={styles.flashControls}>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
                  <Button variant="outlined" disabled={disabled} onClick={() => onRate(false)}>
                    {messages.flashcard.actions.forgot}
                  </Button>
                  <Button variant="outlined" disabled={disabled} onClick={() => onRate(true)}>
                    {messages.flashcard.actions.remembered}
                  </Button>
                </Stack>
              </div>
            </>
          )}
          <Menu
            id="flashcard-menu"
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              onClick={() => {
                onAddLabel?.();
                closeMenu();
              }}
            >
              <ListItemIcon>
                <LabelOutlined fontSize="small" />
              </ListItemIcon>
              {messages.flashcard.actions.addLabel}
            </MenuItem>
          </Menu>
        </Paper>
      </div>
    </section>
  );
});
