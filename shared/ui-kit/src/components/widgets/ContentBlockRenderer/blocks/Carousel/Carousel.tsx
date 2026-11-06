'use client';

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import FullscreenRounded from '@mui/icons-material/FullscreenRounded';
import FullscreenExitRounded from '@mui/icons-material/FullscreenExitRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import type { ContentBlock_Carousel_Response, ContentBlock_Carousel_Slide_Response } from '@svitlo/engine/content';
import type { UiKitMessages } from '#types/uiKitMessages';
import { localizedAttributes } from '../../utils';
import { useContentLanguage } from '../../ContentLanguageContext';
import { Image } from '../Image/Image';
import styles from './Carousel.module.css';

type Props = ContentBlock_Carousel_Response & { messages: Pick<UiKitMessages, 'image' | 'learningLayout'> };
type Playback = 'auto' | 'paused' | 'playing';
type TransitionState = { from: number; direction: -1 | 1; revision: number };

function initialIndex(startIndex: number | undefined, count: number) {
  return Number.isFinite(startIndex) ? Math.min(count - 1, Math.max(0, Math.floor(startIndex!))) : 0;
}

export function Carousel({
  id,
  title,
  slides,
  messages,
  aspectRatio = 16 / 9,
  objectFit = 'cover',
  loop = true,
  autoplay = false,
  autoplayIntervalMs = 5000,
  transition = 'slide',
  transitionDurationMs = 450,
  showArrows = true,
  showIndicators = true,
  allowFullscreen = true,
  allowSwipe = true,
  pauseOnHover = true,
  startIndex = 0,
}: Props) {
  const language = useContentLanguage();
  const attributes = localizedAttributes({ locale: { code: language } });
  const rtl = attributes.dir === 'rtl';
  const count = slides.length;
  const rootRef = useRef<HTMLElement>(null);
  const touchOrigin = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(() => initialIndex(startIndex, count));
  const [transitionState, setTransitionState] = useState<TransitionState | null>(null);
  const [playback, setPlayback] = useState<Playback>('auto');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const current = Math.min(index, count - 1);
  const multiple = count > 1;
  const ratio = Number.isFinite(aspectRatio) && aspectRatio > 0 ? aspectRatio : 16 / 9;
  const duration = Number.isFinite(transitionDurationMs)
    ? Math.min(1500, Math.max(0, transitionDurationMs))
    : 450;
  const interval = Number.isFinite(autoplayIntervalMs) ? Math.max(1500, autoplayIntervalMs) : 5000;
  const animated = !reduceMotion && duration > 0;
  const temporarilyPaused = pauseOnHover && (hovered || focused);
  const paused = playback === 'paused' || (playback === 'auto' && temporarilyPaused);
  const canAutoplay = autoplay && multiple && !paused && visible && (!reduceMotion || playback === 'playing');

  function goTo(target: number, direction?: -1 | 1) {
    if (!multiple) return;
    const next = loop ? ((target % count) + count) % count : Math.min(count - 1, Math.max(0, target));
    if (next === current) return;
    setTransitionState(previous => ({
      from: current,
      direction: direction ?? (next > current ? 1 : -1),
      revision: (previous?.revision ?? 0) + 1,
    }));
    setIndex(next);
  }

  function move(direction: -1 | 1) {
    goTo(current + direction, direction);
  }

  useEffect(() => {
    if (!canAutoplay || (!loop && current === count - 1)) return;
    const timer = window.setTimeout(() => {
      goTo(current + 1, 1);
    }, interval);
    return () => window.clearTimeout(timer);
    // goTo is recreated when the active slide changes; restarting after navigation is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAutoplay, current, count, interval, loop]);

  useEffect(() => {
    const updateVisibility = () => setVisible(document.visibilityState !== 'hidden');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduceMotion(media.matches);
    updateMotion();
    media.addEventListener?.('change', updateMotion);
    return () => media.removeEventListener?.('change', updateMotion);
  }, []);

  useEffect(() => {
    const updateFullscreen = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener('fullscreenchange', updateFullscreen);
    return () => document.removeEventListener('fullscreenchange', updateFullscreen);
  }, []);

  function toggleFullscreen() {
    if (!rootRef.current) return;
    if (document.fullscreenElement === rootRef.current) {
      if (typeof document.exitFullscreen === 'function') void document.exitFullscreen().catch(() => undefined);
    } else if (typeof rootRef.current.requestFullscreen === 'function') {
      void rootRef.current.requestFullscreen().catch(() => undefined);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget || !multiple) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move((event.key === 'ArrowLeft' ? -1 : 1) * (rtl ? -1 : 1) as -1 | 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goTo(count - 1);
    }
  }

  function onTouchStart(event: TouchEvent<HTMLElement>) {
    if (!allowSwipe || !multiple) return;
    const touch = event.changedTouches[0];
    if (touch) touchOrigin.current = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd(event: TouchEvent<HTMLElement>) {
    if (!allowSwipe || !multiple || !touchOrigin.current) return;
    const origin = touchOrigin.current;
    touchOrigin.current = null;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - origin.x;
    const deltaY = touch.clientY - origin.y;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      move((deltaX < 0 ? 1 : -1) * (rtl ? -1 : 1) as -1 | 1);
    }
  }

  const visualDirection = (transitionState?.direction ?? 1) * (rtl ? -1 : 1);
  const inClass = transition === 'fade'
    ? styles.fadeIn
    : visualDirection > 0 ? styles.enterFromRight : styles.enterFromLeft;
  const outClass = transition === 'fade'
    ? styles.fadeOut
    : visualDirection > 0 ? styles.exitToLeft : styles.exitToRight;
  const showTransition = transitionState !== null && animated;
  const currentSlide = slides[current];
  const style = { '--carousel-duration': String(duration) + 'ms' } as CSSProperties;

  function renderSlide(slide: ContentBlock_Carousel_Slide_Response, number: number) {
    return (
      <Image
        id={id + '-image-' + number}
        type="image"
        src={slide.src}
        alt={slide.alt}
        caption={slide.caption}
        fill
        aspectRatio={ratio}
        objectFit={objectFit}
        messages={messages.image}
      />
    );
  }

  return (
    <section
      ref={rootRef}
      {...attributes}
      className={styles.root}
      aria-label={title ?? currentSlide.alt}
      role="region"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      style={style}
    >
      <div className={styles.viewport} style={{ aspectRatio: ratio }}>
        {showTransition && (
          <div
            key={'out-' + transitionState.revision}
            className={[styles.slide, styles.outgoing, outClass].join(' ')}
            aria-hidden="true"
            inert
          >
            {renderSlide(slides[transitionState.from], transitionState.from)}
          </div>
        )}
        <div
          key={'in-' + (transitionState?.revision ?? 0)}
          className={[styles.slide, styles.active, showTransition ? inClass : ''].join(' ')}
          onAnimationEnd={event => {
            if (event.target === event.currentTarget) setTransitionState(null);
          }}
        >
          {renderSlide(currentSlide, current)}
        </div>
        {multiple && showArrows && (
          <>
            <IconButton
              type="button"
              className={[styles.arrow, styles.previous].join(' ')}
              disabled={!loop && current === 0}
              onClick={() => move(-1)}
              aria-label={messages.learningLayout.actions.previous}
              title={messages.learningLayout.actions.previous}
            >
              {rtl ? <KeyboardArrowRightRounded /> : <KeyboardArrowLeftRounded />}
            </IconButton>
            <IconButton
              type="button"
              className={[styles.arrow, styles.next].join(' ')}
              disabled={!loop && current === count - 1}
              onClick={() => move(1)}
              aria-label={messages.learningLayout.actions.next}
              title={messages.learningLayout.actions.next}
            >
              {rtl ? <KeyboardArrowLeftRounded /> : <KeyboardArrowRightRounded />}
            </IconButton>
          </>
        )}
        {(autoplay && multiple || allowFullscreen) && (
          <div className={styles.actions}>
            {autoplay && multiple && (
              <IconButton
                type="button"
                className={styles.action}
                onClick={() => setPlayback(paused ? 'playing' : 'paused')}
                aria-label={paused ? messages.image.carousel.play : messages.image.carousel.pause}
                title={paused ? messages.image.carousel.play : messages.image.carousel.pause}
              >
                {paused ? <PlayArrowRounded /> : <PauseRounded />}
              </IconButton>
            )}
            {allowFullscreen && (
              <IconButton
                type="button"
                className={styles.action}
                onClick={toggleFullscreen}
                aria-label={fullscreen ? messages.image.carousel.exitFullscreen : messages.image.carousel.fullscreen}
                title={fullscreen ? messages.image.carousel.exitFullscreen : messages.image.carousel.fullscreen}
              >
                {fullscreen ? <FullscreenExitRounded /> : <FullscreenRounded />}
              </IconButton>
            )}
          </div>
        )}
      </div>
      {multiple && showIndicators && (
        <div className={styles.indicators} role="group" aria-label={title ?? currentSlide.alt}>
          {slides.map((slide, position) => (
            <button
              key={id + '-indicator-' + position}
              className={[styles.indicator, position === current ? styles.selected : ''].join(' ')}
              type="button"
              aria-label={slide.alt}
              aria-current={position === current ? 'true' : undefined}
              title={slide.alt}
              onClick={() => goTo(position)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
