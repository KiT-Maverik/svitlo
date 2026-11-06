import type { Metadata } from 'next';
import { Fragment } from 'react';
import { CountryFlag, type FlagCode } from '@/components/CountryFlag';
import { PageIntro } from '@/components/PageIntro';

export const metadata: Metadata = { title: 'Зал слави' };

const placeholders: readonly { name: string; country: FlagCode }[] = [
  { name: 'Олена Зоряна', country: 'ua' },
  { name: 'Адам Вітер', country: 'pl' },
  { name: 'Марко Ліс', country: 'de' },
  { name: 'Софія Весна', country: 'ua' },
  { name: 'Емма Північ', country: 'ee' },
  { name: 'Лукас Море', country: 'lt' },
  { name: 'Злата Сонячна', country: 'ua' },
  { name: 'Нора Ясна', country: 'lv' },
  { name: 'Лео Долина', country: 'fr' },
  { name: 'Анна Квітка', country: 'it' },
  { name: 'Мирон Ранок', country: 'ua' },
  { name: 'Марта Промінь', country: 'pl' },
  { name: 'Ліна Зоря', country: 'de' },
  { name: 'Давид Хмара', country: 'ee' },
  { name: 'Остап Мандрівник', country: 'ua' },
  { name: 'Олівія Літо', country: 'fr' },
  { name: 'Ілля Мрійник', country: 'lt' },
  { name: 'Віра Роса', country: 'ua' },
];

export default function HallOfFamePage() {
  return (
    <main>
      <PageIntro
        eyebrow="ДЯКУЄМО, ЩО ВИ З НАМИ"
        title="Зал слави"
        description="Світло стає яскравішим завдяки людям. Тут ми з вдячністю відзначатимемо тих, хто допомагає проєкту зростати."
      />
      <section className="section section--after-intro">
        <div className="site-container">
          <div className="hall-panel">
            <span className="eyebrow">МАЙБУТНЯ СПІЛЬНОТА</span>
            <p className="hall-names">
              {placeholders.map(person => (
                <Fragment key={person.name}>
                  <span className="hall-entry">
                    <CountryFlag code={person.country} />
                    <span>{person.name}</span>
                  </span>{' '}
                </Fragment>
              ))}
            </p>
          </div>
          <p className="content-note">
            Усі імена вище — вигадані демонстраційні приклади. Справжніх учасників додаватимемо лише з їхньої згоди.
          </p>
        </div>
      </section>
    </main>
  );
}
