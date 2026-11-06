import type { Metadata } from 'next';
import { PageIntro } from '@/components/PageIntro';
import { ScholarshipArt, type ScholarshipArtKind } from '@/components/ScholarshipArt';

export const metadata: Metadata = { title: 'Стипендії' };

const scholarships: readonly { name: string; description: string; kind: ScholarshipArtKind; note?: string }[] = [
  {
    name: 'Дякую за захист',
    description:
      'Майбутня програма підтримки дітей захисників і захисниць України та родин, які постраждали через війну.',
    kind: 'defense',
  },
  {
    name: 'Дякую за освіту',
    description:
      'Концепція вдячності людям, які допомагають навчатися. Для кого саме діятиме програма — ще обговорюємо.',
    kind: 'education',
    note: 'Цільова аудиторія уточнюється',
  },
  {
    name: 'Дякую за порятунок',
    description: 'Ідея підтримки дітей рятувальників, пожежників та медичних працівників екстреної допомоги.',
    kind: 'rescue',
  },
  {
    name: 'Дякую за світло',
    description: 'Присвята працівникам енергетики та критичної інфраструктури, які повертають світло й тепло.',
    kind: 'energy',
  },
  {
    name: 'Велика родина',
    description: 'Ідея спільноти підтримки для дітей, яким бракує родинної опори: ніхто не має залишатися наодинці.',
    kind: 'family',
  },
  {
    name: 'Рукавичка',
    description: 'Тепла, натхненна українською казкою концепція підтримки дітей із багатодітних родин.',
    kind: 'mitten',
  },
];

export default function ScholarshipsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="МОЖЛИВОСТІ ДЛЯ КОЖНОГО"
        title="Стипендії Світла"
        description="Освіта повинна відкривати двері. Ми продумуємо програми підтримки, щоб обставини не ставали перешкодою для допитливості."
      />
      <section className="section section--after-intro">
        <div className="site-container">
          <div className="notice-panel">
            <span className="notice-panel__icon" aria-hidden="true">
              ✳
            </span>
            <p>
              <strong>Програми на етапі розробки.</strong> Назви та напрями — концепції зі Studio, а не запущені
              стипендії. Умови, фінансування й порядок подання заявок ще не затверджені.
            </p>
          </div>
          <div className="scholarship-grid">
            {scholarships.map((scholarship, index) => (
              <article className={'scholarship-card scholarship-card--' + scholarship.kind} key={scholarship.name}>
                <div className="scholarship-card__image">
                  <ScholarshipArt kind={scholarship.kind} />
                </div>
                <div className="scholarship-card__content">
                  <span className="scholarship-card__index">КОНЦЕПЦІЯ / {String(index + 1).padStart(2, '0')}</span>
                  <h2>{scholarship.name}</h2>
                  <p>{scholarship.description}</p>
                  {scholarship.note && <small>{scholarship.note}</small>}
                </div>
              </article>
            ))}
          </div>
          <p className="content-note">
            Опис програм не означає автоматичного права на стипендію. Критерії участі та безпечний спосіб перевірки
            відповідності будуть визначені до запуску.
          </p>
        </div>
      </section>
    </main>
  );
}
