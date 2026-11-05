import type { SkillNode } from './skillsMindMap.utils';
import { mockSkillMastery, skillLearningHref } from './skillsMindMap.utils';
import styles from './SkillsMindMap.module.css';
import { useSkillsPageSettings } from './SkillsPageSettingsContext';

type MasteryTier = 'starting' | 'growing' | 'strong';

function masteryTier(value: number): MasteryTier {
  return value < 35 ? 'starting' : value < 70 ? 'growing' : 'strong';
}

interface SkillMasteryProps {
  skillId: string;
  compact?: boolean;
  colored?: boolean;
}

export function SkillMastery({ skillId, compact = false, colored = true }: SkillMasteryProps) {
  const value = mockSkillMastery(skillId);
  return (
    <div
      className={styles.mastery}
      data-tier={colored ? masteryTier(value) : 'neutral'}
      data-compact={compact ? 'true' : 'false'}
      data-testid={'mastery-' + skillId}
    >
      <div className={styles.masteryHeading}>
        <span>{compact ? 'Володіння' : 'Володіння навичкою'}</span>
        <strong>{value}%</strong>
      </div>
      <div
        className={styles.masteryTrack}
        role="progressbar"
        aria-label="Демонстраційний рівень володіння навичкою"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={value + ' зі 100 відсотків. Тестові дані'}
      >
        <span className={styles.masteryFill} style={{ width: value + '%' }} />
      </div>
    </div>
  );
}

interface SkillActionProps {
  skillId: string;
  language: string;
  compact?: boolean;
}

export function SkillAction({ skillId, language, compact = false }: SkillActionProps) {
  return (
    <a
      className={styles.pumpLink + (compact ? ' ' + styles.compactPump : '')}
      href={skillLearningHref(skillId, language)}
      aria-label="Прокачати навичку: перейти до уроків і програм"
    >
      Прокачати <span aria-hidden="true">↗</span>
    </a>
  );
}

interface SkillLeafCardProps {
  node: SkillNode;
  language: string;
  selected: boolean;
  expanded: boolean;
  onSelect: (node: SkillNode) => void;
  onToggle: (node: SkillNode) => void;
  left: number;
  top: number;
}

export function SkillLeafCard({
  node,
  language,
  selected,
  expanded,
  onSelect,
  onToggle,
  left,
  top,
}: SkillLeafCardProps) {
  const direction = language === 'ar' || language === 'he' || language === 'ur' ? 'rtl' : 'ltr';
  const { settings } = useSkillsPageSettings();
  const tier = settings.showMastery && settings.colorMastery ? masteryTier(mockSkillMastery(node.id)) : undefined;
  return (
    <article
      className={
        styles.node +
        ' ' +
        styles.skillNode +
        (expanded ? ' ' + styles.expandedSkillNode : ' ' + styles.compactSkillNode) +
        (selected ? ' ' + styles.selectedNode : '')
      }
      style={{ left, top }}
      data-testid={'skill-node-' + node.slug}
      data-expanded={expanded ? 'true' : 'false'}
      data-tier={tier}
      aria-label={'Скіл: ' + node.name}
    >
      <div className={styles.skillCardBody}>
        <span className={styles.nodeKind}>СКІЛ</span>
        <button
          type="button"
          className={styles.skillTitleButton}
          onClick={() => {
            onSelect(node);
            onToggle(node);
          }}
          aria-label={'Інформація про скіл: ' + node.name + '. ' + (expanded ? 'Згорнути' : 'Розгорнути')}
          aria-expanded={expanded}
        >
          <span className={styles.nodeName} lang={language} dir={direction}>
            {node.name}
          </span>
          <span className={styles.skillExpandIcon} aria-hidden="true">
            {expanded ? '−' : '+'}
          </span>
        </button>
        {expanded && node.description && (
          <p className={styles.nodeDescription} lang={language} dir={direction}>
            {node.description}
          </p>
        )}
      </div>
      {settings.showMastery && <SkillMastery skillId={node.id} compact={!expanded} colored={settings.colorMastery} />}
      {expanded && settings.showPump && (
        <div className={styles.skillCardFooter}>
          <SkillAction skillId={node.id} language={language} />
        </div>
      )}
    </article>
  );
}
