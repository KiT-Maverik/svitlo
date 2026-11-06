import type { Metadata } from 'next';
import Link from 'next/link';
import { getLearningApps } from '@/catalog/learningApps';
import { PageIntro } from '@/components/PageIntro';

export const metadata: Metadata = { title: 'Навчальні матеріали' };

const upcoming = [
  { name: 'Біологія', sign: '✿', description: 'Дізнавайся, як влаштоване життя навколо нас.' },
  { name: 'Фізика', sign: '✳', description: 'Досліджуй рух, світло, звук і природу явищ.' },
  { name: 'Інформатика', sign: '⌘', description: 'Знайомся з алгоритмами, даними й технологіями.' },
  { name: 'Географія', sign: '◎', description: 'Відкривай планету, на якій ми живемо.' },
  { name: 'Мистецтво', sign: '◒', description: 'Твори, експериментуй і знаходь власний стиль.' },
  { name: 'Інженерія', sign: '⌁', description: 'Будуй, винаходь і розумій, як усе працює.' },
] as const;

export default function MaterialsPage() {
  const apps = getLearningApps();
  return (
    <main>
      <PageIntro
        eyebrow="ПІЗНАВАЙ · ДОСЛІДЖУЙ · СТВОРЮЙ"
        title="Навчальні матеріали"
        description="Інтерактивні підручники — це простір для маленьких і великих відкриттів. Обирай цікаву тему та навчайся у своєму темпі."
      />
      <section className="section section--after-intro">
        <div className="site-container">
          <div className="section-bar">
            <h2>Наші підручники</h2>
            <span>Бібліотека поповнюється</span>
          </div>
          <div className="materials-grid">
            {apps.map(app => (
              <article className="material-card material-card--featured" key={app.id}>
                <div className="material-card__symbol" aria-hidden="true">
                  π
                </div>
                <div>
                  <span className="material-card__status">{app.url ? 'МОЖНА ВІДКРИТИ' : 'ГОТУЄТЬСЯ'}</span>
                  <h3>{app.name}</h3>
                  <p>{app.description}</p>
                </div>
                {app.url ? (
                  <a className="text-link" href={app.url} target="_blank" rel="noopener noreferrer">
                    Відкрити підручник <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="material-card__coming">Посилання з’явиться після публікації</span>
                )}
              </article>
            ))}
            {upcoming.map(subject => (
              <article className="material-card" key={subject.name}>
                <div className="material-card__symbol" aria-hidden="true">
                  {subject.sign}
                </div>
                <div>
                  <span className="material-card__status">У РОЗРОБЦІ</span>
                  <h3>{subject.name}</h3>
                  <p>{subject.description}</p>
                </div>
                <span className="material-card__coming">Незабаром</span>
              </article>
            ))}
          </div>
          <div className="materials-outro">
            Знання для всіх — не привілей, а можливість. <Link href="/scholarships">Наші стипендійні ініціативи ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
