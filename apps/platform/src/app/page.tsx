import Link from 'next/link';

const features = [
  {
    index: '01',
    title: 'Навчання через цікавість',
    text: 'Не просто читати правила, а досліджувати, пробувати й знаходити відповіді.',
    motif: '✦',
  },
  {
    index: '02',
    title: 'У власному темпі',
    text: 'Невеликі кроки, зрозумілі пояснення та свобода повертатися до складного.',
    motif: '◌',
  },
  {
    index: '03',
    title: 'Відкрито для кожного',
    text: 'Ми створюємо освітні матеріали, до яких можна долучитися незалежно від обставин.',
    motif: '↗',
  },
] as const;

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="site-container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">
              <span className="eyebrow__spark">✳</span> НОВЕ ПОКОЛІННЯ ОСВІТИ
            </span>
            <h1>
              Світло
              <br />
              <span>Academy</span>
              <span className="hero__period">.</span>
            </h1>
            <p className="hero__tagline">
              NextGen Learning<span> ✳</span>
            </p>
            <p className="hero__description">
              Світ, у якому навчатися цікаво. Створюємо інтерактивні підручники, що перетворюють допитливість на знання,
              а знання — на можливості.
            </p>
            <div className="hero__actions">
              <Link className="button button--primary" href="/materials">
                Відкрити навчальні матеріали <span aria-hidden="true">↗</span>
              </Link>
              <a className="button button--outline" href="#mission">
                Дізнатися більше <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero__signature">
              <span className="signature__asterisk">✳</span>
              <span>Створено з любов’ю до дитячої цікавості.</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art__orbit hero-art__orbit--outer" />
            <div className="hero-art__orbit hero-art__orbit--inner" />
            <div className="hero-art__sun">
              <span>✳</span>
            </div>
            <div className="hero-art__bubble hero-art__bubble--a">Aa</div>
            <div className="hero-art__bubble hero-art__bubble--pi">π</div>
            <div className="hero-art__bubble hero-art__bubble--star">✦</div>
            <div className="hero-art__note">
              <span className="hero-art__note-icon">↗</span>
              <strong>
                Вчитися —<br />
                це пригода!
              </strong>
            </div>
            <div className="hero-art__caption">ЗНАННЯ БЕЗ МЕЖ · 2026</div>
          </div>
        </div>
      </section>

      <section className="section section--features">
        <div className="site-container">
          <div className="section-heading">
            <span className="eyebrow">ІДЕЯ СВІТЛА</span>
            <h2>
              Майбутнє починається
              <br />з одного <em>«чому?»</em>
            </h2>
          </div>
          <div className="feature-grid">
            {features.map(feature => (
              <article className="feature-card" key={feature.index}>
                <div className="feature-card__top">
                  <span>{feature.index} / 03</span>
                  <span className="feature-card__motif" aria-hidden="true">
                    {feature.motif}
                  </span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mission" id="mission">
        <div className="site-container mission-panel">
          <div>
            <span className="eyebrow">НАША МІСІЯ</span>
            <h2>
              Дати кожному дитинству <em>більше можливостей.</em>
            </h2>
          </div>
          <div>
            <p>
              Світло — це простір, де складні речі стають зрозумілими, помилки — частиною відкриттів, а бажання
              дізнатися більше завжди має підтримку.
            </p>
            <Link className="text-link" href="/scholarships">
              Дізнатись про стипендії <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container join-panel">
          <div>
            <span className="eyebrow">БУДУЄМО РАЗОМ</span>
            <h2>За кожним великим світлом — люди.</h2>
            <p>Знайомтеся з командою, підтримуйте ідею та допомагайте робити знання доступними.</p>
          </div>
          <Link className="button button--light" href="/team">
            Знайомитися з командою <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
