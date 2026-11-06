'use client';

import { useRef, useState, type KeyboardEvent } from 'react';

const tabs = [
  {
    id: 'patrons',
    label: 'Меценати',
    heading: 'Люди, які вірять у знання',
    text: 'Тут ми з вдячністю розповідатимемо про людей, які підтримують розвиток Світла.',
    detail: 'Поки що підтверджених публічних імен немає.',
  },
  {
    id: 'organizations',
    label: 'Організації',
    heading: 'Партнерства, що створюють можливості',
    text: 'Освітні, громадські та бізнес-організації зможуть допомагати створювати доступні навчальні матеріали.',
    detail: 'Перелік партнерів буде оприлюднено після узгодження.',
  },
  {
    id: 'media',
    label: 'Медіа',
    heading: 'Ті, хто допомагає розповісти',
    text: 'Медіапартнери допоможуть більше людям дізнатися про безплатну освіту та можливості проєкту.',
    detail: 'Список медіапартнерів наразі порожній.',
  },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function SponsorTabs() {
  const [active, setActive] = useState<TabId>('patrons');
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = tabs.find(tab => tab.id === active) ?? tabs[0];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActive(tabs[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div className="sponsors-widget">
      <div className="sponsor-tabs" role="tablist" aria-label="Категорії спонсорів">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={element => {
              refs.current[index] = element;
            }}
            id={'sponsor-tab-' + tab.id}
            className={'sponsor-tab' + (active === tab.id ? ' sponsor-tab--active' : '')}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            aria-controls="sponsor-panel"
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={event => onKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <section
        className="sponsor-panel"
        id="sponsor-panel"
        role="tabpanel"
        aria-labelledby={'sponsor-tab-' + selected.id}
        tabIndex={0}
      >
        <div className="sponsor-panel__graphic" aria-hidden="true">
          <span>✳</span>
          <i>✦</i>
        </div>
        <div>
          <span className="eyebrow">ДЯКУЄМО ЗА ПІДТРИМКУ</span>
          <h2>{selected.heading}</h2>
          <p>{selected.text}</p>
          <p className="sponsor-panel__note">{selected.detail}</p>
        </div>
      </section>
    </div>
  );
}
