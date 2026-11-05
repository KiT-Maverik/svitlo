'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react';
import { Alert, Box, Button, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';
import { expandableSkillIds, fitVisibleSkillNodes, flattenSkillNodes, layoutSkillMindMap } from './skillsMindMap.utils';
import type { SkillNode, MapEdge } from './skillsMindMap.utils';
import { loadSkillAnalyticsPage, resolveSkillLanguage } from './skillsData.client';
import styles from './SkillsMindMap.module.css';
import { SkillAction, SkillLeafCard, SkillMastery } from './SkillLeafCard';
import { useSkillsPageSettings } from './SkillsPageSettingsContext';
import {
  clampSkillZoom,
  gesturePair,
  moveAndScaleSkillMap,
  panSkillMap,
  type SkillMapView,
} from './skillsMindMap.gestures';

type LoadingStatus = 'loading' | 'ready' | 'error';
const KIND_LABELS = { skillDomain: 'Домен', skillGroup: 'Група', skill: 'Скіл' } as const;

function readableLanguage(code: string): string {
  try {
    return new Intl.DisplayNames([code], { type: 'language' }).of(code) ?? code;
  } catch {
    return code;
  }
}
function edgePath(edge: MapEdge, midpoint: number): string {
  const x1 = midpoint + edge.x1,
    y1 = midpoint + edge.y1;
  const x2 = midpoint + edge.x2,
    y2 = midpoint + edge.y2;
  const cx1 = x1 + (x2 - x1) * 0.48,
    cy1 = y1 + (y2 - y1) * 0.48;
  const cx2 = x2 - (x2 - x1) * 0.24,
    cy2 = y2 - (y2 - y1) * 0.24;
  return 'M ' + x1 + ' ' + y1 + ' C ' + cx1 + ' ' + cy1 + ', ' + cx2 + ' ' + cy2 + ', ' + x2 + ' ' + y2;
}

interface OutlineProps {
  nodes: readonly SkillNode[];
  collapsed: ReadonlySet<string>;
  selectedId: string | null;
  language: string;
  expandedSkills: ReadonlySet<string>;
  onNodeClick: (node: SkillNode) => void;
  onSkillToggle: (node: SkillNode) => void;
}
function SkillOutline({
  nodes,
  collapsed,
  selectedId,
  language,
  expandedSkills,
  onNodeClick,
  onSkillToggle,
}: OutlineProps) {
  const { settings } = useSkillsPageSettings();
  return (
    <ul className={styles.outlineList}>
      {nodes.map(node => {
        const hasChildren = node.children.length > 0;
        const expanded = hasChildren && !collapsed.has(node.id);
        const skillExpanded = node.kind === 'skill' && expandedSkills.has(node.id);
        return (
          <li key={node.id}>
            <button
              type="button"
              className={styles.outlineButton + (selectedId === node.id ? ' ' + styles.outlineSelected : '')}
              onClick={() => {
                onNodeClick(node);
                if (node.kind === 'skill') onSkillToggle(node);
              }}
              aria-expanded={node.kind === 'skill' ? skillExpanded : hasChildren ? expanded : undefined}
              aria-label={
                KIND_LABELS[node.kind] +
                ': ' +
                node.name +
                (node.kind === 'skill'
                  ? skillExpanded
                    ? '. Згорнути картку'
                    : '. Розгорнути картку'
                  : hasChildren
                    ? expanded
                      ? '. Згорнути гілку'
                      : '. Розгорнути гілку'
                    : '')
              }
            >
              <span className={styles.outlineGlyph} aria-hidden="true">
                {hasChildren ? (expanded ? '−' : '+') : '•'}
              </span>
              <span lang={language} dir={language === 'ar' || language === 'ur' || language === 'he' ? 'rtl' : 'ltr'}>
                {node.name}
              </span>
              {hasChildren && <span className={styles.outlineCount}>{node.children.length}</span>}
            </button>
            {node.kind === 'skill' && (
              <div className={styles.outlineSkillDetails} data-expanded={skillExpanded ? 'true' : 'false'}>
                {skillExpanded && node.description && (
                  <p lang={language} dir={language === 'ar' || language === 'ur' || language === 'he' ? 'rtl' : 'ltr'}>
                    {node.description}
                  </p>
                )}
                {settings.showMastery && (
                  <SkillMastery skillId={node.id} compact={!skillExpanded} colored={settings.colorMastery} />
                )}
                {settings.showPump && skillExpanded && <SkillAction skillId={node.id} language={language} compact />}
              </div>
            )}
            {expanded && (
              <SkillOutline
                nodes={node.children}
                collapsed={collapsed}
                selectedId={selectedId}
                language={language}
                expandedSkills={expandedSkills}
                onNodeClick={onNodeClick}
                onSkillToggle={onSkillToggle}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Map visualization within the reusable skillAnalytics page. */
export function SkillsMindMap({ domainSlugs }: { domainSlugs: readonly string[] }) {
  const { locale, localeError, setLanguageCode, registerMapActions } = useSkillsPageSettings();
  const language = resolveSkillLanguage(locale);
  const [domains, setDomains] = useState<SkillNode[]>([]);
  const [status, setStatus] = useState<LoadingStatus>('loading');
  const [error, setError] = useState('');
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
  // Card detail is independent from whether a Domain/Group branch is visible.
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(() => new Set());
  const [rootCollapsed, setRootCollapsed] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [listView, setListView] = useState(false);
  const [zoom, setZoom] = useState(0.65);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ width: 960, height: 640 });
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<SkillMapView>({ zoom: 0.65, pan: { x: 0, y: 0 } });
  const pointersRef = useRef(
    new Map<
      number,
      {
        x: number;
        y: number;
        startX: number;
        startY: number;
        interactive: boolean;
        dragging: boolean;
      }
    >(),
  );
  const suppressTapRef = useRef(false);
  const applyView = useCallback((next: SkillMapView) => {
    viewRef.current = next;
    setZoom(next.zoom);
    setPan(next.pan);
  }, []);
  useEffect(() => {
    viewRef.current = { zoom, pan };
  }, [zoom, pan]);
  const firstLoad = useRef(true);
  const didInitialFit = useRef(false);
  const handledFitRequest = useRef(0);
  const [fitRequest, setFitRequest] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Hide stale data immediately when the requested locale changes.
    setStatus('loading');
    setError('');
    void (async () => {
      try {
        const loaded = await loadSkillAnalyticsPage(language, controller.signal, domainSlugs);
        if (controller.signal.aborted) return;
        const all = flattenSkillNodes(loaded);
        setDomains(loaded);
        if (firstLoad.current) {
          setCollapsed(
            new Set(
              all.length > 45
                ? all.filter(node => node.kind === 'skillGroup' && node.children.length > 0).map(node => node.id)
                : [],
            ),
          );
          firstLoad.current = false;
        }
        setStatus('ready');
      } catch (cause) {
        if (!controller.signal.aborted) {
          setStatus('error');
          setError(cause instanceof Error ? cause.message : 'Не вдалося завантажити скіли.');
        }
      }
    })();
    return () => controller.abort();
  }, [domainSlugs, language]);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    const update = () => setViewport({ width: element.clientWidth, height: element.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [status, listView]);

  // React delegates wheel as a passive listener; the native non-passive handler
  // prevents the page from scrolling while zooming inside the map.
  useEffect(() => {
    const element = viewportRef.current;
    if (!element || status !== 'ready' || listView) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = element.getBoundingClientRect();
      const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      const current = viewRef.current;
      applyView(
        moveAndScaleSkillMap(current, point, point, current.zoom * (event.deltaY < 0 ? 1.1 : 0.9), {
          width: rect.width || element.clientWidth,
          height: rect.height || element.clientHeight,
        }),
      );
    };
    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [status, listView, applyView]);

  const allNodes = useMemo(() => flattenSkillNodes(domains), [domains]);
  const selectable = useMemo(() => new Map(allNodes.map(node => [node.id, node])), [allNodes]);
  const selected = selectedId ? selectable.get(selectedId) : null;
  const layout = useMemo(
    () => layoutSkillMindMap(rootCollapsed ? [] : domains, collapsed),
    [domains, collapsed, rootCollapsed],
  );
  const expandableIds = useMemo(() => expandableSkillIds(domains), [domains]);

  const fitToVisibleNodes = useCallback(() => {
    const width = viewportRef.current?.clientWidth || viewport.width || 960;
    const height = viewportRef.current?.clientHeight || viewport.height || 640;
    const result = fitVisibleSkillNodes(layout, expandedSkills, width, height);
    setZoom(result.zoom);
    setPan(result.pan);
  }, [layout, expandedSkills, viewport.width, viewport.height]);

  // Automatically fit the first loaded graph; subsequent manual pans and zooms
  // are preserved until an explicit "Вмістити в екран" request.
  useEffect(() => {
    if (status !== 'ready' || listView || didInitialFit.current) return;
    didInitialFit.current = true;
    fitToVisibleNodes();
  }, [status, listView, fitToVisibleNodes]);

  useEffect(() => {
    if (status !== 'ready' || listView || fitRequest === handledFitRequest.current) return;
    handledFitRequest.current = fitRequest;
    fitToVisibleNodes();
  }, [fitRequest, status, listView, fitToVisibleNodes]);

  const onSkillToggle = (node: SkillNode) => {
    if (node.kind !== 'skill') return;
    setExpandedSkills(previous => {
      const next = new Set(previous);
      if (next.has(node.id)) next.delete(node.id);
      else next.add(node.id);
      return next;
    });
  };

  const onNodeClick = (node: SkillNode) => {
    setSelectedId(node.id);
    if (node.children.length) {
      setCollapsed(previous => {
        const next = new Set(previous);
        if (next.has(node.id)) next.delete(node.id);
        else next.add(node.id);
        return next;
      });
    }
  };
  const collapseAll = useCallback(() => {
    setRootCollapsed(true);
    setCollapsed(new Set(expandableIds));
    setExpandedSkills(new Set());
  }, [expandableIds]);
  const expandAll = useCallback(() => {
    setRootCollapsed(false);
    setCollapsed(new Set());
    setExpandedSkills(new Set(allNodes.filter(node => node.kind === 'skill').map(node => node.id)));
  }, [allNodes]);
  const requestFitToScreen = useCallback(() => {
    setListView(false);
    setFitRequest(value => value + 1);
  }, []);

  // The sidebar invokes exactly the actions used by the map's own controls.
  useEffect(() => {
    if (status !== 'ready') return;
    registerMapActions({ collapseAll, expandAll, fitToScreen: requestFitToScreen });
    return () => registerMapActions(null);
  }, [status, registerMapActions, collapseAll, expandAll, requestFitToScreen]);
  const toggleFromProfile = () => {
    setRootCollapsed(value => !value);
    setSelectedId(null);
  };
  const resetView = requestFitToScreen;
  const capturePointer = (event: ReactPointerEvent<HTMLDivElement>, pointerId: number) => {
    if (!event.currentTarget.hasPointerCapture(pointerId)) {
      event.currentTarget.setPointerCapture(pointerId);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const interactive = Boolean((event.target as HTMLElement).closest('button, a, select, input'));
    if (event.pointerType !== 'touch' && interactive) return;
    const pointers = pointersRef.current;
    if (pointers.size === 0) suppressTapRef.current = false;
    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
      interactive,
      dragging: !interactive,
    });
    if (pointers.size === 1 && !interactive) capturePointer(event, event.pointerId);
    if (pointers.size >= 2) {
      // A second touch converts a pending tap or one-finger drag into a pinch.
      // Capture both pointers at the viewport so they can leave the card bounds.
      suppressTapRef.current = true;
      for (const id of pointers.keys()) capturePointer(event, id);
    }
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointers = pointersRef.current;
    const previous = pointers.get(event.pointerId);
    if (!previous) return;
    const before = Array.from(pointers.values()).slice(0, 2);
    const dx = event.clientX - previous.x;
    const dy = event.clientY - previous.y;
    pointers.set(event.pointerId, { ...previous, x: event.clientX, y: event.clientY });

    if (pointers.size >= 2) {
      const after = Array.from(pointers.values()).slice(0, 2);
      const older = gesturePair(before[0], before[1]);
      const newer = gesturePair(after[0], after[1]);
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const anchorBefore = { x: older.midpoint.x - rect.left, y: older.midpoint.y - rect.top };
      const anchorAfter = { x: newer.midpoint.x - rect.left, y: newer.midpoint.y - rect.top };
      const current = viewRef.current;
      const factor = older.distance > 1 ? newer.distance / older.distance : 1;
      applyView(
        moveAndScaleSkillMap(current, anchorBefore, anchorAfter, current.zoom * factor, {
          width: rect.width || element.clientWidth,
          height: rect.height || element.clientHeight,
        }),
      );
      return;
    }
    if (!previous.dragging && previous.interactive) {
      if (Math.hypot(event.clientX - previous.startX, event.clientY - previous.startY) < 7) return;
      // Do not prevent normal button/link activation on a stationary touch.
      pointers.set(event.pointerId, { ...previous, x: event.clientX, y: event.clientY, dragging: true });
      capturePointer(event, event.pointerId);
    }
    if (Math.hypot(event.clientX - previous.startX, event.clientY - previous.startY) > 4) {
      suppressTapRef.current = true;
    }
    applyView(panSkillMap(viewRef.current, dx, dy));
  };
  const endPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (suppressTapRef.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressTapRef.current = false;
    }
  };

  const onLanguageChange = (next: string) => {
    if (!DEFAULT_SUPPORTED_LANGUAGES.some(item => item.language === next)) return;
    setLanguageCode(next);
  };

  const middle = layout.worldSize / 2;
  const totalDomains = domains.length;
  const totalGroups = allNodes.filter(node => node.kind === 'skillGroup').length;
  const totalSkills = allNodes.filter(node => node.kind === 'skill').length;
  const profileIsExpanded = !rootCollapsed && domains.length > 0;
  const textDirection = language === 'ar' || language === 'he' || language === 'ur' ? 'rtl' : 'ltr';

  if (localeError)
    return (
      <Alert severity="error" role="alert">
        {localeError}
      </Alert>
    );

  return (
    <Box className={styles.root}>
      <header className={styles.header}>
        <Box>
          <Typography variant="overline" color="primary" sx={{ letterSpacing: '0.19em', fontWeight: 800 }}>
            SVITLO · PLAYGROUND
          </Typography>
          <Typography component="h1" variant="h3" sx={{ fontWeight: 800 }}>
            Аналітика навичок
          </Typography>
          <Typography color="text.secondary">
            Натисніть на скіл, щоб розгорнути опис і кнопку «Прокачати». Домен і група згортають свої гілки.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Значення володіння навичками — тестові, не результати оцінювання учня.
          </Typography>
        </Box>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Chip label={totalDomains + ' домени'} variant="outlined" />
          <Chip label={totalGroups + ' групи'} variant="outlined" />
          <Chip label={totalSkills + ' скіли'} color="primary" variant="outlined" />
        </Stack>
      </header>
      <Box className={styles.controls}>
        <label className={styles.languageControl}>
          <span>Мова даних</span>
          <select
            aria-label="Мова даних Skills"
            value={language}
            onChange={event => onLanguageChange(event.target.value)}
          >
            {DEFAULT_SUPPORTED_LANGUAGES.map(item => (
              <option key={item.language} value={item.language}>
                {readableLanguage(item.language)} · {item.language}
              </option>
            ))}
          </select>
        </label>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          <Button
            size="small"
            variant={listView ? 'contained' : 'outlined'}
            startIcon={listView ? <AccountTreeRoundedIcon /> : <ViewListRoundedIcon />}
            onClick={() => setListView(value => !value)}
            disabled={status !== 'ready'}
          >
            {listView ? 'Мапа' : 'Список'}
          </Button>
        </Stack>
      </Box>
      {status === 'loading' && (
        <Box className={styles.state} role="status" aria-live="polite">
          <CircularProgress size={32} />
          <Typography>Завантажуємо локалізовану карту навичок…</Typography>
        </Box>
      )}
      {status === 'error' && (
        <Alert severity="error" role="alert" sx={{ my: 2 }}>
          {error}
          <Button size="small" onClick={() => window.location.reload()} sx={{ ml: 1 }}>
            Повторити
          </Button>
        </Alert>
      )}
      {status === 'ready' && (
        <>
          {listView ? (
            <section aria-label="Навички за доменами" className={styles.outlineView}>
              <button
                type="button"
                className={styles.outlineProfile}
                onClick={toggleFromProfile}
                aria-expanded={profileIsExpanded}
              >
                <AccountCircleRoundedIcon fontSize="large" /> Учень
                <span>{profileIsExpanded ? '−' : '+'}</span>
              </button>
              {!rootCollapsed && (
                <SkillOutline
                  nodes={domains}
                  collapsed={collapsed}
                  selectedId={selectedId}
                  language={language!}
                  expandedSkills={expandedSkills}
                  onNodeClick={onNodeClick}
                  onSkillToggle={onSkillToggle}
                />
              )}
            </section>
          ) : (
            <section className={styles.mapFrame} aria-label="Радіальна мапа навичок">
              <div
                ref={viewportRef}
                className={styles.viewport}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endPointer}
                onPointerCancel={endPointer}
                onClickCapture={onClickCapture}
                data-testid="skills-map-viewport"
              >
                <div
                  className={styles.world}
                  data-testid="skills-map-world"
                  data-zoom={zoom}
                  data-pan-x={pan.x}
                  data-pan-y={pan.y}
                  style={{
                    width: layout.worldSize,
                    height: layout.worldSize,
                    transform: 'translate(-50%, -50%) translate(' + pan.x + 'px, ' + pan.y + 'px) scale(' + zoom + ')',
                  }}
                >
                  <svg
                    width={layout.worldSize}
                    height={layout.worldSize}
                    viewBox={'0 0 ' + layout.worldSize + ' ' + layout.worldSize}
                    aria-hidden="true"
                    className={styles.edges}
                  >
                    <circle cx={middle} cy={middle} r="218" className={styles.centerHalo} />
                    {layout.edges.map(edge => (
                      <path
                        key={edge.to}
                        d={edgePath(edge, middle)}
                        className={
                          styles.edge +
                          ' ' +
                          (edge.depth === 1
                            ? styles.domainEdge
                            : edge.depth === 2
                              ? styles.groupEdge
                              : styles.skillEdge)
                        }
                      />
                    ))}
                  </svg>
                  <button
                    type="button"
                    className={styles.profile}
                    style={{ left: middle, top: middle }}
                    onClick={toggleFromProfile}
                    aria-expanded={profileIsExpanded}
                    aria-label={'Учень. ' + (profileIsExpanded ? 'Згорнути всі гілки' : 'Розгорнути всі гілки')}
                    data-testid="skills-profile"
                  >
                    <AccountCircleRoundedIcon className={styles.profileIcon} />
                    <span className={styles.profileName}>Учень</span>
                    <span className={styles.profileSub}>Моя карта навичок</span>
                  </button>
                  {layout.nodes.map(node => {
                    const children = node.children.length;
                    if (node.kind === 'skill') {
                      return (
                        <SkillLeafCard
                          key={node.id}
                          node={node}
                          language={language!}
                          selected={selectedId === node.id}
                          expanded={expandedSkills.has(node.id)}
                          onSelect={onNodeClick}
                          onToggle={onSkillToggle}
                          left={middle + node.x}
                          top={middle + node.y}
                        />
                      );
                    }
                    return (
                      <button
                        key={node.id}
                        type="button"
                        className={
                          styles.node +
                          ' ' +
                          (node.kind === 'skillDomain'
                            ? styles.domainNode
                            : node.kind === 'skillGroup'
                              ? styles.groupNode
                              : styles.skillNode) +
                          (node.id === selectedId ? ' ' + styles.selectedNode : '')
                        }
                        style={{ left: middle + node.x, top: middle + node.y }}
                        onClick={() => onNodeClick(node)}
                        title={node.name}
                        aria-expanded={children > 0 ? node.expanded : undefined}
                        aria-label={
                          KIND_LABELS[node.kind] +
                          ': ' +
                          node.name +
                          (children ? (node.expanded ? '. Згорнути' : '. Розгорнути') : '')
                        }
                        data-testid={'skill-node-' + node.slug}
                      >
                        <span className={styles.nodeKind}>{KIND_LABELS[node.kind]}</span>
                        <span className={styles.nodeName} lang={language ?? undefined} dir={textDirection}>
                          {node.name}
                        </span>
                        {children > 0 && (
                          <span className={styles.nodeCount}>
                            {children} {node.expanded ? '−' : '+'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={styles.zoomControls} role="group" aria-label="Масштаб мапи">
                <button
                  type="button"
                  aria-label="Збільшити масштаб"
                  onClick={() => setZoom(value => clampSkillZoom(value * 1.2))}
                >
                  <ZoomInRoundedIcon />
                </button>
                <button
                  type="button"
                  aria-label="Зменшити масштаб"
                  onClick={() => setZoom(value => clampSkillZoom(value / 1.2))}
                >
                  <ZoomOutRoundedIcon />
                </button>
                <button type="button" aria-label="Вмістити в екран" onClick={resetView}>
                  <CenterFocusStrongRoundedIcon />
                </button>
              </div>
              <p className={styles.mapHint}>
                Перетягуйте одним пальцем або мишею · Масштабуйте двома пальцями чи колесом
              </p>
            </section>
          )}
          <section className={styles.detail} aria-live="polite" aria-label="Інформація про вибраний вузол">
            {selected ? (
              <>
                <span className={styles.detailEyebrow}>{KIND_LABELS[selected.kind]}</span>
                <h2 lang={language ?? undefined} dir={textDirection}>
                  {selected.name}
                </h2>
                {selected.description && (
                  <p lang={language ?? undefined} dir={textDirection}>
                    {selected.description}
                  </p>
                )}
                <span className={styles.detailMeta}>
                  {selected.children.length ? 'Безпосередніх нащадків: ' + selected.children.length : 'Окрема навичка'}
                </span>
              </>
            ) : (
              <>
                <span className={styles.detailEyebrow}>ПРО КАРТУ</span>
                <h2>Оберіть вузол</h2>
                <p>Тут з’являться назва й опис вибраного домена, групи або скіла.</p>
              </>
            )}
          </section>
        </>
      )}
    </Box>
  );
}
