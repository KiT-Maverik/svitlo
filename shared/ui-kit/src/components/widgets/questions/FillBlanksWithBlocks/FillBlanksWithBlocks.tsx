'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { alpha, Box, Chip, Stack } from '@mui/material';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { InteractionProps } from '../interaction-props';
import type { Item } from '../types';
import { isGraded } from '../feedback';
import { CorrectAnswerBlock } from '../helpers';
import { uk } from '../messages';

const returnAnimationMs = 180;
const chipSx = {
  height: 'auto',
  minHeight: 32,
  maxWidth: '100%',
  bgcolor: 'background.paper',
  '& .MuiChip-label': { whiteSpace: 'normal', overflowWrap: 'anywhere', py: 0.25 },
};
function DraggableBlock({
  item,
  id,
  disabled,
  faded = false,
  entering = false,
  exiting = false,
  onClick,
}: {
  item: Item;
  id: string;
  disabled: boolean;
  faded?: boolean;
  entering?: boolean;
  exiting?: boolean;
  onClick?: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id, disabled });
  const { onPointerDown: dndPointerDown, ...dndListeners } = listeners ?? {};
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const clickHandled = useRef(false);
  return (
    <Chip
      ref={setNodeRef}
      component="button"
      clickable
      variant="outlined"
      label={item.content ?? item.label}
      {...attributes}
      {...dndListeners}
      disabled={disabled}
      onPointerDown={event => {
        pointerStart.current = { x: event.clientX, y: event.clientY };
        clickHandled.current = false;
        dndPointerDown?.(event);
      }}
      onPointerUp={event => {
        const start = pointerStart.current;
        pointerStart.current = null;
        if (!onClick || !start) return;
        const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y);
        if (moved <= 5) {
          clickHandled.current = true;
          event.stopPropagation();
          onClick();
        }
      }}
      onClick={event => {
        if (clickHandled.current) {
          clickHandled.current = false;
          event.preventDefault();
          return;
        }
        event.stopPropagation();
        onClick?.();
      }}
      sx={{
        ...chipSx,
        cursor: disabled ? 'default' : 'grab',
        opacity: faded || isDragging ? 0.35 : 1,
        animation: exiting
          ? `fill-blank-return-out ${returnAnimationMs}ms ease-in-out both`
          : entering
            ? `fill-blank-return-in ${returnAnimationMs}ms cubic-bezier(0.2, 0.8, 0.2, 1) both`
            : 'none',
        '@keyframes fill-blank-return-out': {
          from: { opacity: 1, transform: 'scale(1)' },
          to: { opacity: 0, transform: 'scale(.72)' },
        },
        '@keyframes fill-blank-return-in': {
          from: { opacity: 0, transform: 'scale(.72)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        '&:active': { cursor: 'grabbing' },
      }}
    />
  );
}
function BlankDrop({
  id,
  placeholder,
  item,
  preview,
  correctAnswer,
  showCorrectAnswer = false,
  exiting = false,
  graded,
  disabled,
  feedback,
  active,
  onRemove,
}: {
  id: string;
  placeholder?: string;
  item?: Item;
  preview?: Item;
  correctAnswer?: string;
  showCorrectAnswer?: boolean;
  exiting?: boolean;
  graded: boolean;
  disabled: boolean;
  feedback?: 'correct' | 'incorrect';
  active: boolean;
  onRemove?: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id, disabled });
  const shownItem = isOver && preview ? preview : item;
  const showingPreview = Boolean(shownItem && preview && shownItem.id === preview.id);
  const answerBlock = (
    <Box
      ref={setNodeRef}
      component="span"
      sx={{
        display: 'inline-flex',
        verticalAlign: 'middle',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 96,
        minHeight: 40,
        mx: 0.5,
        px: shownItem ? 0.75 : 1,
        position: 'relative',
        border: '1px dashed',
        borderColor:
          feedback === 'correct'
            ? 'success.main'
            : feedback === 'incorrect'
              ? 'error.main'
              : isOver
                ? 'primary.main'
                : 'divider',
        borderRadius: 1,
        bgcolor:
          feedback === 'correct'
            ? theme => alpha(theme.palette.success.main, 0.12)
            : feedback === 'incorrect'
              ? theme => alpha(theme.palette.error.main, 0.12)
              : isOver
                ? 'action.hover'
                : 'transparent',
        transition: 'background-color 180ms ease-in-out, border-color 180ms ease-in-out',
      }}
    >
      {shownItem ? (
        graded ? (
          <Box component="span" sx={{ lineHeight: 1.4, overflowWrap: 'anywhere' }}>
            {shownItem.content ?? shownItem.label}
          </Box>
        ) : showingPreview ? (
          <Chip
            aria-hidden="true"
            label={shownItem.content ?? shownItem.label}
            variant="outlined"
            sx={{ ...chipSx, pointerEvents: 'none' }}
          />
        ) : (
          <DraggableBlock
            item={shownItem}
            id={shownItem.id}
            disabled={disabled}
            faded={active}
            exiting={exiting}
            onClick={onRemove}
          />
        )
      ) : (
        placeholder
          ? <Box component="span" sx={{ color: 'text.secondary' }}>{placeholder}</Box>
          : <Box component="span" aria-hidden="true" sx={{ width: 56, height: 1, bgcolor: 'text.disabled' }} />
      )}
      {graded && feedback ? (
        <Box
          component="span"
          role="img"
          aria-label={feedback === 'correct' ? uk.optionCorrect : uk.optionIncorrect}
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 22,
            border: '1px solid',
            borderColor: feedback === 'correct' ? 'success.main' : 'error.main',
            borderRadius: '50%',
            bgcolor: 'background.paper',
            color: feedback === 'correct' ? 'success.main' : 'error.main',
            transform: 'translate(-50%, -50%)',
            animation: 'fill-blank-drag-feedback-pop 180ms ease-out both',
            '@keyframes fill-blank-drag-feedback-pop': {
              from: { opacity: 0, transform: 'translate(-50%, -50%) scale(.55)' },
              to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            },
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          {feedback === 'correct' ? <CheckOutlined sx={{ fontSize: 20 }} /> : <CloseOutlined sx={{ fontSize: 15 }} />}
        </Box>
      ) : null}
    </Box>
  );
  return (
    <>
      {answerBlock}
      {graded && showCorrectAnswer && correctAnswer ? <CorrectAnswerBlock label={correctAnswer} /> : null}
    </>
  );
}
function PreviewBlock({ item }: { item: Item }) {
  return (
    <Chip
      aria-hidden="true"
      label={item.content ?? item.label}
      variant="outlined"
      sx={{
        ...chipSx,
        width: 'max-content',
        maxWidth: 'min(80vw, 600px)',
        borderColor: 'divider',
        color: 'text.primary',
        opacity: 1,
        boxShadow: 2,
        pointerEvents: 'none',
      }}
    />
  );
}
function BlockBank({
  id,
  items,
  enteringId,
  disabled,
}: {
  id: string;
  items: Item[];
  enteringId?: string;
  disabled: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id, disabled });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: '100%',
        minHeight: 64,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        p: 1.5,
        border: '1px dashed',
        borderColor: isOver ? 'primary.main' : 'divider',
        borderRadius: 1,
        transition: 'border-color 180ms ease-in-out',
      }}
    >
      {items.map(item => (
        <DraggableBlock key={item.id} item={item} id={item.id} entering={item.id === enteringId} disabled={disabled} />
      ))}
    </Box>
  );
}

export function FillBlanksWithBlocks({
  question,
  value,
  onChange,
  disabled,
  readOnly,
  result,
  showErrors = true,
  showCorrectAnswers = true,
}: InteractionProps<'fill-blanks-drag'>) {
  const id = useId();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [bankOrder, setBankOrder] = useState(() => question.blocks.map(item => item.id));
  const [returning, setReturning] = useState<{ blankId: string; itemId: string } | null>(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  }, [value, onChange]);
  useEffect(() => {
    if (!returning) return;
    const timer = window.setTimeout(() => {
      onChangeRef.current({ ...valueRef.current, [returning.blankId]: null });
      setReturning(null);
    }, returnAnimationMs);
    return () => window.clearTimeout(timer);
  }, [returning]);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const locked = Boolean(disabled || readOnly || result);
  const assigned = new Set(Object.values(value).filter((item): item is string => Boolean(item)));
  const available = bankOrder
    .map(itemId => question.blocks.find(item => item.id === itemId))
    .filter((item): item is Item => Boolean(item && !assigned.has(item.id)));
  const activeItem = question.blocks.find(item => item.id === activeId);
  const returningItem = returning ? question.blocks.find(item => item.id === returning.itemId) : undefined;
  const bankItems =
    returningItem && !available.some(item => item.id === returningItem.id) ? [...available, returningItem] : available;
  const blankTarget = (blankId: string) => `${id}-blank-${blankId}`;
  const bankTarget = `${id}-bank`;
  const feedbackFor = (blankId: string) => {
    if (!isGraded(result)) return undefined;
    const current = value[blankId];
    const correct = current === question.correctBlocks[blankId];
    if (correct && showCorrectAnswers) return 'correct' as const;
    if (!correct && current && showErrors) return 'incorrect' as const;
    return undefined;
  };
  const sourceBlank = (itemId: string) => Object.keys(value).find(blankId => value[blankId] === itemId);
  const drop = (itemId: string, target: string) => {
    const source = sourceBlank(itemId);
    const next = { ...value };
    if (target === bankTarget) {
      if (source) next[source] = null;
      onChange(next);
      return;
    }
    const targetBlank = question.parts.find(part => part.type === 'blank' && blankTarget(part.id) === target);
    if (!targetBlank || targetBlank.type !== 'blank') return;
    const displaced = next[targetBlank.id];
    if (source && source !== targetBlank.id) next[source] = displaced ?? null;
    next[targetBlank.id] = itemId;
    onChange(next);
  };
  return (
    <DndContext
      id={id}
      sensors={sensors}
      onDragStart={({ active }) => setActiveId(String(active.id))}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={({ active, over }) => {
        if (!locked && over) drop(String(active.id), String(over.id));
        setActiveId(null);
      }}
    >
      <Stack spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
        <Box
          role="group"
          aria-label={question.prompt}
          sx={{ width: '100%', textAlign: 'start', lineHeight: 2.8, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
        >
          {question.parts.map((part, index) =>
            part.type === 'text' ? (
              <Box component="span" key={`text-${index}`}>
                {part.text}
              </Box>
            ) : (
              <BlankDrop
                key={part.id}
                id={blankTarget(part.id)}
                placeholder={question.placeholder}
                item={question.blocks.find(item => item.id === value[part.id])}
                preview={activeItem}
                correctAnswer={question.blocks.find(item => item.id === question.correctBlocks[part.id])?.label}
                showCorrectAnswer={
                  isGraded(result) && showCorrectAnswers && value[part.id] !== question.correctBlocks[part.id]
                }
                exiting={returning?.blankId === part.id}
                graded={isGraded(result)}
                disabled={locked}
                feedback={feedbackFor(part.id)}
                active={activeId === value[part.id]}
                onRemove={() => {
                  const itemId = value[part.id];
                  if (itemId) {
                    setBankOrder(order => [...order.filter(id => id !== itemId), itemId]);
                    setReturning({ blankId: part.id, itemId });
                  }
                }}
              />
            ),
          )}
        </Box>
        <BlockBank id={bankTarget} items={bankItems} enteringId={returning?.itemId} disabled={locked} />
      </Stack>
      <DragOverlay>{activeItem ? <PreviewBlock item={activeItem} /> : null}</DragOverlay>
    </DndContext>
  );
}
