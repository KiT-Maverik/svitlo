'use client';

import type { UiKitMessages } from '#types/uiKitMessages';

import { useId } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import DragIndicator from '@mui/icons-material/DragIndicator';
import Close from '@mui/icons-material/Close';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionContent, type QuestionItem } from './QuestionContent';

function Row({
  item,
  locked,
  onRemove,
  sceneRegistry,
  messages,
}: {
  item: QuestionItem;
  locked: boolean;
  onRemove?: (id: string) => void;
  sceneRegistry?: SceneRegistry;
  messages: UiKitMessages;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: locked,
  });
  return (
    <Box
      ref={setNodeRef}
      component="li"
      style={{ transform: CSS.Transform.toString(transform), transition }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 1,
        minWidth: 0,
        opacity: isDragging ? 0.6 : 1,
      }}
    >
      <IconButton
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        disabled={locked}
        aria-label={messages.questionFrame.moveItem}
        size="small"
      >
        <DragIndicator />
      </IconButton>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <QuestionContent blocks={[item.block]} sceneRegistry={sceneRegistry} messages={messages} />
      </Box>
      {onRemove ? (
        <IconButton
          onClick={() => onRemove(item.id)}
          disabled={locked}
          aria-label={messages.questionFrame.removeItem}
          size="small"
        >
          <Close />
        </IconButton>
      ) : null}
    </Box>
  );
}

export function QuestionSortable({
  items,
  order,
  onChange,
  locked,
  onRemove,
  sceneRegistry,
  messages,
}: {
  messages: UiKitMessages;
  items: readonly QuestionItem[];
  order: readonly string[];
  onChange: (order: string[]) => void;
  locked: boolean;
  onRemove?: (id: string) => void;
  sceneRegistry?: SceneRegistry;
}) {
  const id = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (locked || !over || active.id === over.id) return;
        const from = order.indexOf(String(active.id));
        const to = order.indexOf(String(over.id));
        if (from !== -1 && to !== -1) onChange(arrayMove([...order], from, to));
      }}
    >
      <SortableContext items={[...order]} strategy={verticalListSortingStrategy}>
        <Stack component="ol" spacing={1} sx={{ listStyle: 'none', pl: 0, mx: 'auto', maxWidth: 650 }}>
          {order.map(id => {
            const item = items.find(entry => entry.id === id);
            return item ? (
              <Row
                key={id}
                item={item}
                locked={locked}
                onRemove={onRemove}
                sceneRegistry={sceneRegistry}
                messages={messages}
              />
            ) : null;
          })}
        </Stack>
      </SortableContext>
    </DndContext>
  );
}
