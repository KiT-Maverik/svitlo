'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { ContentBlock_Scene, Locale_Languages, SupportedLessonEvents } from '@svitlo/engine/content';
import type { SceneRegistry } from '../widgets/ContentBlockRenderer';
import { Scene } from '../widgets/ContentBlockRenderer/blocks/Scene/Scene';

export type EventScene = ContentBlock_Scene<'response', Locale_Languages>;
export type LessonEventSceneMap = Readonly<Record<string, EventScene | false>>;

/** The bus is scoped to one mounted lesson; publishing never schedules a controller render. */
export function createLessonEventBus() {
  const subscribers = new Set<(eventId: string) => void>();
  return {
    publish(eventId: string) {
      for (const subscriber of [...subscribers]) subscriber(eventId);
    },
    subscribe(subscriber: (eventId: string) => void) {
      subscribers.add(subscriber);
      return () => { subscribers.delete(subscriber); };
    },
  };
}
export type LessonEventBus = ReturnType<typeof createLessonEventBus>;

export const LessonEventBusContext = createContext<LessonEventBus | null>(null);
const EventSceneContext = createContext<{ eventId: string; dismiss: () => void } | null>(null);

export function useLessonEventBus(): LessonEventBus {
  const bus = useContext(LessonEventBusContext);
  if (!bus) throw new Error('LessonEventBusContext requires LessonController');
  return bus;
}

/** Subscribe without causing updates to sibling lesson regions. */
export function useLessonEventListener<CustomEvents extends string = never>(
  eventId: SupportedLessonEvents<CustomEvents>,
  handler: () => void,
): void {
  const bus = useLessonEventBus();
  useEffect(() => bus.subscribe(received => { if (received === eventId) handler(); }), [bus, eventId, handler]);
}

export function useLessonEventScene() {
  const context = useContext(EventSceneContext);
  if (!context) throw new Error('EventSceneContext requires EventSceneHost');
  return context;
}

/** Program override keys are checked; an app cannot introduce unregistered custom event IDs. */
export function resolveLessonEventScenes(
  authored: LessonEventSceneMap | undefined,
  overrides: LessonEventSceneMap | undefined,
): LessonEventSceneMap {
  const builtIn = new Set<string>(['lessonStarted', 'lessonCompleted', 'quizCompleted', 'quizFailed']);
  const result: Record<string, EventScene | false> = { ...authored };
  for (const [eventId, reaction] of Object.entries(overrides ?? {})) {
    if (!builtIn.has(eventId) && !Object.hasOwn(result, eventId)) {
      throw new Error('Cannot override undeclared lesson event: ' + eventId);
    }
    result[eventId] = reaction;
  }
  return result;
}

type ActiveScene = { eventId: string; scene: EventScene };

/** Fifth sibling UI region. The Material dialog portals outside the layout grid. */
export function EventSceneHost({
  bus,
  events,
  sceneRegistry,
  enabled = true,
}: {
  bus: LessonEventBus;
  events: LessonEventSceneMap;
  sceneRegistry?: SceneRegistry;
  enabled?: boolean;
}) {
  const [queue, setQueue] = useState<readonly ActiveScene[]>([]);
  useEffect(() => {
    if (!enabled) return;
    return bus.subscribe(eventId => {
      const scene = events[eventId];
      if (scene && scene.type === 'scene') {
        setQueue(previous => [...previous, { eventId, scene }]);
      }
    });
  }, [bus, enabled, events]);
  useEffect(() => { if (!enabled) setQueue([]); }, [enabled]);

  const active = queue[0];
  const dismiss = () => setQueue(previous => previous.slice(1));
  const label = active
    ? (typeof active.scene.locales?.title === 'string'
        ? active.scene.locales.title
        : active.eventId)
    : '';

  return (
    <EventSceneContext.Provider value={active ? { eventId: active.eventId, dismiss } : null}>
      <Dialog
        open={!!active && enabled}
        onClose={dismiss}
        aria-labelledby="lesson-event-scene-title"
        fullWidth
        maxWidth="sm"
        slotProps={{ paper: { sx: { maxHeight: '90dvh' } } }}
      >
        {active && <DialogTitle id="lesson-event-scene-title">{label}</DialogTitle>}
        {active && (
          <DialogContent>
            <Scene key={active.eventId + ':' + active.scene.id} response={active.scene} sceneRegistry={sceneRegistry} />
          </DialogContent>
        )}
      </Dialog>
    </EventSceneContext.Provider>
  );
}
