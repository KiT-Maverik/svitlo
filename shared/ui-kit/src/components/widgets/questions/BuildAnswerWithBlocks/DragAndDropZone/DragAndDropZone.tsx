'use client';

import { useCallback, useId, useRef, useState } from 'react';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { alpha, Box, Chip, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  type CollisionDetection,
  type KeyboardCoordinateGetter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import type { InteractionProps } from '../../interaction-props';
import type { Item } from '../../types';
import { uk } from '../../messages';
import { AnimatedLayoutItem, type DragRect } from '../AnimatedLayoutItem/AnimatedLayoutItem';
import { choiceFeedback, isGraded, type ChoiceFeedback } from '../../feedback';

const chipSx = {
  height: 'auto',
  minHeight: 32,
  alignSelf: 'center',
  flex: '0 0 auto',
  bgcolor: 'transparent',
  maxWidth: '100%',
  fontSize: '1rem',
  cursor: 'grab',
  '& .MuiChip-label': {
    whiteSpace: 'normal',
    overflowWrap: 'anywhere',
    overflow: 'visible',
    textOverflow: 'clip',
    py: 0.25,
  },
  '&:active': { cursor: 'grabbing' },
};
function AvailableBlock({
  item,
  id,
  index,
  locked,
  toggle,
}: {
  item: Item;
  id: string;
  index: number;
  locked: boolean;
  toggle: (node: HTMLElement) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id, disabled: locked });
  return (
    <Chip
      component="button"
      clickable
      variant="outlined"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onKeyDown={undefined}
      aria-pressed={undefined}
      aria-label={`${uk.add}: ${item.label} (${index + 1})`}
      label={item.content ?? item.label}
      disabled={locked}
      onClick={event => toggle(event.currentTarget)}
      sx={{ ...chipSx, opacity: isDragging ? 0.25 : 1 }}
    />
  );
}
function SortableBlock({
  item,
  id,
  index,
  locked,
  toggle,
  feedback,
}: {
  item: Item;
  id: string;
  index: number;
  locked: boolean;
  toggle: (node: HTMLElement) => void;
  feedback?: Exclude<ChoiceFeedback, 'missed'>;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id, disabled: locked });
  const tone = feedback === 'correct' ? 'success' : feedback === 'incorrect' ? 'error' : undefined;
  return (
    <Chip
      component="button"
      clickable
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      aria-label={`${uk.remove}: ${item.label} (${index + 1})`}
      data-feedback={feedback}
      label={item.content ?? item.label}
      variant="outlined"
      disabled={locked}
      onClick={event => toggle(event.currentTarget)}
      sx={{
        ...chipSx,
        opacity: isDragging ? 0.25 : 1,
        borderColor: tone ? `${tone}.main` : undefined,
        bgcolor: tone ? theme => alpha(theme.palette[tone].main, 0.12) : undefined,
        color: tone ? `${tone}.main` : undefined,
        transition: theme =>
          theme.transitions.create(['background-color', 'border-color', 'color'], {
            duration: 220,
            easing: theme.transitions.easing.easeInOut,
          }),
        '&.Mui-disabled': { opacity: feedback ? 1 : 0.6, color: tone ? `${tone}.main` : undefined },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      }}
    />
  );
}
function DropZone({
  id,
  label,
  children,
  locked,
  highlighted = false,
  showLabel = true,
  onMeasure,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  locked: boolean;
  highlighted?: boolean;
  showLabel?: boolean;
  onMeasure?: (rect: DragRect) => void;
}) {
  const { setNodeRef } = useDroppable({ id, disabled: locked });
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      if (node) {
        const rect = node.getBoundingClientRect();
        onMeasure?.({ left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom });
      }
    },
    [onMeasure, setNodeRef],
  );
  return (
    <Box
      ref={setRef}
      role="group"
      aria-label={label}
      sx={{
        width: '100%',
        p: 2,
        border: '1px dashed',
        borderColor: highlighted ? 'primary.main' : 'divider',
        borderRadius: 1,
        minHeight: 100,
        transition: theme =>
          theme.transitions.create('border-color', { duration: 180, easing: theme.transitions.easing.easeInOut }),
      }}
    >
      {showLabel ? (
        <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center' }}>
          {label}
        </Typography>
      ) : null}
      <Stack
        direction="row"
        useFlexGap
        sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1, minHeight: 44, alignItems: 'center' }}
      >
        {children}
      </Stack>
    </Box>
  );
}
function SourceSlot({ id, rect, disabled }: { id: string; rect: DragRect | null; disabled: boolean }) {
  const { setNodeRef } = useDroppable({ id, disabled: disabled || !rect });
  if (!rect) return null;
  return (
    <Box
      ref={setNodeRef}
      aria-hidden="true"
      sx={{
        position: 'fixed',
        left: rect.left,
        top: rect.top,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top,
        pointerEvents: 'none',
        opacity: 0,
      }}
    />
  );
}
type Preview = { zone: 'answer' | 'bank'; index: number };
type DragGeometry = Parameters<CollisionDetection>[0]['droppableRects'];
export function DragAndDropZone({
  question,
  value,
  onChange,
  disabled,
  readOnly,
  result,
  showErrors = true,
  showCorrectAnswers = true,
}: InteractionProps<'block-builder'>) {
  const rtl = useTheme().direction === 'rtl';
  const id = useId(),
    answerId = `${id}-answer`,
    bankId = `${id}-bank`,
    sourceSlotId = `${id}-source-slot`;
  const itemDragId = (itemId: string) => `${id}-item-${itemId}`;
  const locked = Boolean(disabled || readOnly);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [keyboardDrag, setKeyboardDrag] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [ghostAnimationKey, setGhostAnimationKey] = useState(0);
  const [sourceRectState, setSourceRectState] = useState<DragRect | null>(null);
  const [answerZoneRect, setAnswerZoneRect] = useState<DragRect | null>(null);
  const geometry = useRef<DragGeometry | null>(null);
  const sourceRect = useRef<DragRect | null>(null);
  const itemRects = useRef(new Map<string, DragRect>());
  const root = useRef<HTMLDivElement>(null);
  const [departure, setDeparture] = useState<{
    item: Item;
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const keyboardCoordinates: KeyboardCoordinateGetter = (event, { context }) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.code)) return;
    event.preventDefault();
    const current = value.findIndex(itemId => itemDragId(itemId) === String(context.over?.id ?? context.active?.id));
    const delta =
      event.code === 'ArrowUp'
        ? -1
        : event.code === 'ArrowDown'
          ? 1
          : event.code === 'ArrowLeft'
            ? rtl
              ? 1
              : -1
            : rtl
              ? -1
              : 1;
    const target = value[Math.max(0, Math.min(value.length - 1, current + delta))];
    const rect = target ? context.droppableRects.get(itemDragId(target)) : undefined;
    return rect ? { x: rect.left, y: rect.top } : undefined;
  };
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: keyboardCoordinates,
      scrollBehavior: 'auto',
      keyboardCodes: { start: ['Space'], cancel: ['Escape'], end: ['Space', 'Enter'] },
    }),
  );
  const available = question.blocks.filter(item => !value.includes(item.id));
  const activeItem = question.blocks.find(item => itemDragId(item.id) === activeId);
  const activeInAnswer = Boolean(activeId && value.some(itemId => itemDragId(itemId) === activeId));
  const collision: CollisionDetection = args => {
    if (!args.pointerCoordinates) return closestCenter(args);
    // Freeze measurements before the placeholder changes layout, avoiding a moving insertion target.
    if (!geometry.current) geometry.current = new Map(args.droppableRects);
    const point = args.pointerCoordinates;
    const contains = (zone: string) => {
      const rect = geometry.current?.get(zone);
      return rect && point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
    };
    const draggingId = String(args.active.id);
    const draggingFromAnswer = value.some(itemId => itemDragId(itemId) === draggingId);
    const answerRect = geometry.current.get(answerId);
    const source = sourceRect.current;
    const sourceTop = draggingFromAnswer && answerRect ? answerRect.top : source?.top;
    const sourceBottom = draggingFromAnswer && answerRect ? answerRect.bottom : source?.bottom;
    if (
      source &&
      sourceTop !== undefined &&
      sourceBottom !== undefined &&
      point.x >= source.left &&
      point.x <= source.right &&
      point.y >= sourceTop &&
      point.y <= sourceBottom
    )
      return [{ id: sourceSlotId }];
    if (contains(bankId)) return [{ id: bankId }];
    const firstId = value[0] ? itemDragId(value[0]) : undefined;
    const firstRect = firstId ? geometry.current.get(firstId) : undefined;
    const lastId = value[value.length - 1] ? itemDragId(value[value.length - 1]) : undefined;
    const lastRect = lastId ? geometry.current.get(lastId) : undefined;
    const inAnswerBand = answerRect && point.y >= answerRect.top && point.y <= answerRect.bottom;
    if (inAnswerBand && firstId && firstRect && (rtl ? point.x > firstRect.right : point.x < firstRect.left))
      return [{ id: firstId }];
    if (inAnswerBand && lastRect && (rtl ? point.x < lastRect.left : point.x > lastRect.right))
      return [{ id: answerId }];
    if (!contains(answerId)) return [];
    const activeRect = geometry.current.get(String(args.active.id)) ?? sourceRect.current;
    if (
      draggingFromAnswer &&
      activeRect &&
      point.x >= activeRect.left &&
      point.x <= activeRect.right &&
      point.y >= activeRect.top &&
      point.y <= activeRect.bottom
    )
      return [{ id: draggingId }];
    const answerItems = value.flatMap(itemId => {
      const itemIdWithPrefix = itemDragId(itemId);
      const rect = geometry.current?.get(itemIdWithPrefix);
      return rect && itemIdWithPrefix !== draggingId ? [{ id: itemIdWithPrefix, rect }] : [];
    });
    const rowItems = answerItems.filter(item => point.y >= item.rect.top && point.y <= item.rect.bottom);
    if (!rowItems.length) return [{ id: answerId }];
    const before = rowItems.find(item =>
      rtl ? point.x > (item.rect.left + item.rect.right) / 2 : point.x < (item.rect.left + item.rect.right) / 2,
    );
    return [{ id: before?.id ?? answerId }];
  };
  function destination(target: string, draggedId = activeId): Preview | null {
    if (target === sourceSlotId && draggedId) {
      const sourceIndex = value.findIndex(itemId => itemDragId(itemId) === draggedId);
      return sourceIndex >= 0
        ? { zone: 'answer', index: sourceIndex }
        : { zone: 'bank', index: available.findIndex(item => itemDragId(item.id) === draggedId) };
    }
    if (target === bankId) return { zone: 'bank', index: available.length };
    if (target === answerId) return { zone: 'answer', index: value.length };
    if (draggedId && value.some(itemId => itemDragId(itemId) === draggedId) && target === draggedId)
      return { zone: 'answer', index: value.findIndex(itemId => itemDragId(itemId) === draggedId) };
    const availableIndex = available.findIndex(item => itemDragId(item.id) === target);
    if (availableIndex >= 0) return { zone: 'bank', index: availableIndex };
    const index = value.findIndex(itemId => itemDragId(itemId) === target);
    return index < 0 ? null : { zone: 'answer', index };
  }
  const clearDrag = () => {
    setActiveId(null);
    setPreview(null);
    setGhostAnimationKey(0);
    setSourceRectState(null);
    setKeyboardDrag(false);
    geometry.current = null;
    sourceRect.current = null;
  };
  const feedbackFor = (index: number): Exclude<ChoiceFeedback, 'missed'> | undefined => {
    if (!result || (result.status !== 'correct' && result.status !== 'incorrect')) return undefined;
    const itemId = value[index];
    const isCorrectPosition = Boolean(
      itemId && question.acceptedSequences.some(sequence => sequence[index] === itemId),
    );
    const feedback = choiceFeedback(result, Boolean(itemId), isCorrectPosition, { showErrors, showCorrectAnswers });
    return feedback === 'correct' || feedback === 'incorrect' ? feedback : undefined;
  };
  const correctAnswerItems =
    question.acceptedSequences[0]
      ?.map(itemId => question.blocks.find(item => item.id === itemId))
      .filter((item): item is Item => Boolean(item)) ?? [];
  const renderBlock = (item: Item, selected: boolean, feedback?: Exclude<ChoiceFeedback, 'missed'>) => {
    const index = question.blocks.findIndex(b => b.id === item.id);
    const toggle = (node: HTMLElement) => {
      if (locked || activeId) return;
      const bounds = node.getBoundingClientRect(),
        container = root.current?.getBoundingClientRect();
      if (!reducedMotion && container)
        setDeparture({
          item,
          x: bounds.left - container.left,
          y: bounds.top - container.top,
          width: bounds.width,
          height: bounds.height,
        });
      onChange(selected ? value.filter(v => v !== item.id) : [...value, item.id]);
    };
    return (
      <AnimatedLayoutItem
        key={item.id}
        enabled={!reducedMotion && Boolean(activeId)}
        onMeasure={rect => itemRects.current.set(item.id, rect)}
      >
        <Box
          sx={{
            maxWidth: '100%',
            display: 'flex',
            alignSelf: 'center',
            alignItems: 'center',
            flex: '0 0 auto',
            animation: 'block-in 140ms ease-in-out both',
            '@keyframes block-in': {
              from: { opacity: 0, transform: 'scale(.65)' },
              to: { opacity: 1, transform: 'scale(1)' },
            },
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          {selected ? (
            <SortableBlock
              item={item}
              id={itemDragId(item.id)}
              index={index}
              locked={locked}
              feedback={feedback}
              toggle={toggle}
            />
          ) : (
            <AvailableBlock item={item} id={itemDragId(item.id)} index={index} locked={locked} toggle={toggle} />
          )}
        </Box>
      </AnimatedLayoutItem>
    );
  };
  const answerBlocks = value
    .map(itemId => question.blocks.find(b => b.id === itemId))
    .filter((item): item is Item => Boolean(item));
  const ghostZone = preview?.zone ?? (activeInAnswer ? 'answer' : 'bank');
  // Keep the active chip mounted and focused while it is being moved with the keyboard.
  const displayedAnswerBlocks =
    activeInAnswer && !keyboardDrag ? answerBlocks.filter(item => itemDragId(item.id) !== activeId) : answerBlocks;
  const displayedAvailableBlocks = activeId ? available.filter(item => itemDragId(item.id) !== activeId) : available;
  const answerInsertion =
    ghostZone === 'answer'
      ? preview?.zone === 'answer'
        ? Math.min(preview.index, value.length)
        : activeInAnswer
          ? value.findIndex(itemId => itemDragId(itemId) === activeId)
          : -1
      : -1;
  const displayAnswerInsertion = Math.min(answerInsertion, displayedAnswerBlocks.length);
  const bankInsertion =
    ghostZone === 'bank'
      ? preview?.zone === 'bank'
        ? Math.min(preview.index, displayedAvailableBlocks.length)
        : available.findIndex(item => itemDragId(item.id) === activeId)
      : -1;
  const sourceSlotRect =
    activeId && sourceRectState
      ? activeInAnswer && answerZoneRect
        ? { ...sourceRectState, top: answerZoneRect.top, bottom: answerZoneRect.bottom }
        : sourceRectState
      : null;
  const ghost = activeItem ? (
    <AnimatedLayoutItem key={`insertion-ghost-${ghostAnimationKey}`} enabled={!reducedMotion && Boolean(activeId)}>
      <Chip
        data-insertion-preview="true"
        aria-hidden="true"
        label={activeItem.content ?? activeItem.label}
        variant="outlined"
        sx={{
          ...chipSx,
          borderColor: 'text.disabled',
          color: 'text.disabled',
          opacity: 0.45,
          boxShadow: 1,
          pointerEvents: 'none',
          animation:
            ghostAnimationKey && !reducedMotion ? 'ghost-grow 180ms cubic-bezier(0.2, 0.8, 0.2, 1) both' : 'none',
          '@keyframes ghost-grow': {
            from: { opacity: 0, transform: 'scale(.72)' },
            to: { opacity: 0.45, transform: 'scale(1)' },
          },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      />
    </AnimatedLayoutItem>
  ) : null;
  return (
    <Stack
      ref={root}
      spacing={2}
      sx={{ position: 'relative', width: '100%', maxWidth: 600, mx: 'auto', alignItems: 'center' }}
    >
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        {uk.dragBlockHint}
      </Typography>
      <DndContext
        id={id}
        sensors={sensors}
        collisionDetection={collision}
        accessibility={{
          screenReaderInstructions: { draggable: uk.dragBlockKeyboard },
          announcements: {
            onDragStart: ({ active }) =>
              `${uk.pickedUp}: ${question.blocks.find(b => itemDragId(b.id) === active.id)?.label}. ${uk.position}: ${value.findIndex(itemId => itemDragId(itemId) === String(active.id)) + 1}`,
            onDragOver: ({ over }) =>
              over
                ? `${uk.position}: ${value.findIndex(itemId => itemDragId(itemId) === String(over.id)) + 1}`
                : undefined,
            onDragEnd: () => uk.dropped,
            onDragCancel: () => uk.dragCancelled,
          },
        }}
        onDragStart={event => {
          const itemId = String(event.active.id);
          const initial = event.active.rect.current.initial;
          const sourceItemId = question.blocks.find(item => itemDragId(item.id) === itemId)?.id;
          const nextSourceRect = initial
            ? { left: initial.left, right: initial.right, top: initial.top, bottom: initial.bottom }
            : sourceItemId
              ? (itemRects.current.get(sourceItemId) ?? null)
              : null;
          sourceRect.current = nextSourceRect;
          setSourceRectState(nextSourceRect);
          setKeyboardDrag(event.activatorEvent.type === 'keydown');
          setActiveId(itemId);
          const sourceIndex = value.findIndex(valueItemId => itemDragId(valueItemId) === itemId);
          setPreview(
            sourceIndex >= 0
              ? { zone: 'answer', index: sourceIndex }
              : { zone: 'bank', index: available.findIndex(item => itemDragId(item.id) === itemId) },
          );
          setGhostAnimationKey(0);
          setDeparture(null);
          geometry.current = null;
        }}
        onDragOver={({ active, over }) => {
          if (!over) return;
          const nextPreview = destination(String(over.id), String(active.id));
          if (!nextPreview) return;
          const currentZone = preview?.zone ?? (activeInAnswer ? 'answer' : 'bank');
          if (nextPreview.zone !== currentZone) setGhostAnimationKey(key => key + 1);
          setPreview(nextPreview);
        }}
        onDragCancel={clearDrag}
        onDragEnd={({ active, over }) => {
          clearDrag();
          if (locked || !over) return;
          const draggedId = String(active.id),
            target = String(over.id);
          const itemId = question.blocks.find(item => itemDragId(item.id) === draggedId)?.id;
          if (!itemId) return;
          const dest = destination(target, draggedId);
          if (!dest) return;
          if (dest.zone === 'bank') {
            if (value.includes(itemId)) onChange(value.filter(v => v !== itemId));
            return;
          }
          const from = value.indexOf(itemId);
          if (from < 0) {
            const next = [...value];
            next.splice(dest.index, 0, itemId);
            onChange(next);
          } else if (target !== draggedId) onChange(arrayMove(value, from, Math.min(dest.index, value.length - 1)));
        }}
      >
        <SortableContext items={value.map(itemDragId)}>
          <DropZone
            id={answerId}
            label={uk.built}
            locked={locked || keyboardDrag}
            highlighted={Boolean(activeId && !activeInAnswer)}
            onMeasure={setAnswerZoneRect}
          >
            {!value.length && !preview && <Typography color="text.secondary">{uk.emptyBlocks}</Typography>}
            {displayedAnswerBlocks.flatMap((item, index) => {
              const valueIndex = value.indexOf(item.id);
              const block = renderBlock(item, true, feedbackFor(valueIndex));
              return index === displayAnswerInsertion ? [ghost, block] : [block];
            })}
            {displayAnswerInsertion === displayedAnswerBlocks.length && ghost}
          </DropZone>
        </SortableContext>
        <DropZone
          id={bankId}
          label={uk.available}
          showLabel={!isGraded(result)}
          locked={locked || keyboardDrag}
          highlighted={Boolean(activeId && activeInAnswer)}
        >
          {isGraded(result) ? (
            <Stack
              direction="row"
              useFlexGap
              sx={{ width: '100%', minHeight: 80, alignItems: 'stretch', justifyContent: 'center', gap: 2 }}
            >
              <Stack sx={{ flex: '1 1 auto', minWidth: 0, alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <InfoOutlined aria-label={uk.optionCorrect} color="disabled" />
                <Stack
                  direction="row"
                  useFlexGap
                  sx={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                >
                  {correctAnswerItems.map(item => (
                    <Chip
                      key={item.id}
                      label={item.content ?? item.label}
                      variant="outlined"
                      disabled
                      sx={{ ...chipSx, cursor: 'default' }}
                    />
                  ))}
                </Stack>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack
                sx={{
                  flex: '0 1 auto',
                  width: 'fit-content',
                  maxWidth: '45%',
                  minWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <DeleteOutlineOutlined aria-label={uk.available} color="disabled" />
                <Stack
                  direction="row"
                  useFlexGap
                  sx={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                >
                  {available.length ? (
                    available.map(item => renderBlock(item, false, undefined))
                  ) : (
                    <Typography color="text.secondary">{uk.noBlocks}</Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>
          ) : (
            <>
              {!available.length && preview?.zone !== 'bank' && (
                <Typography color="text.secondary">{uk.noBlocks}</Typography>
              )}
              {displayedAvailableBlocks.flatMap((item, index) =>
                index === bankInsertion ? [ghost, renderBlock(item, false)] : [renderBlock(item, false)],
              )}
              {bankInsertion === displayedAvailableBlocks.length && ghost}
            </>
          )}
        </DropZone>
        <SourceSlot id={sourceSlotId} rect={sourceSlotRect} disabled={locked || keyboardDrag} />
        <DragOverlay dropAnimation={null} style={{ margin: 0 }}>
          {activeItem ? (
            <Chip
              aria-hidden="true"
              label={activeItem.content ?? activeItem.label}
              sx={{ ...chipSx, width: '100%', bgcolor: 'background.paper', cursor: 'grabbing' }}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      {departure && (
        <Box
          aria-hidden="true"
          onAnimationEnd={() => setDeparture(null)}
          sx={{
            position: 'absolute',
            pointerEvents: 'none',
            m: '0 !important',
            left: departure.x,
            top: departure.y,
            width: departure.width,
            height: departure.height,
            animation: 'block-out 140ms ease-in-out both',
            '@keyframes block-out': {
              from: { opacity: 1, transform: 'scale(1)' },
              to: { opacity: 0, transform: 'scale(.65)' },
            },
            '@media (prefers-reduced-motion: reduce)': { display: 'none' },
          }}
        >
          <Chip label={departure.item.content ?? departure.item.label} sx={{ ...chipSx, width: '100%' }} />
        </Box>
      )}
    </Stack>
  );
}
