import type { Metadata } from 'next';
import Image from 'next/image';
import { PageIntro } from '@/components/PageIntro';

export const metadata: Metadata = { title: 'Команда' };

const members = [
  {
    name: 'Микола',
    role: 'Автор ідеї',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
    tags: ['Філософ', 'Поет', 'Візіонер', 'Винахідник', 'Програміст'],
    details: true,
    style: 'peach',
  },
  {
    name: 'Марія',
    role: 'Серце команди',
    photo: 'https://images.unsplash.com/photo-1649312555826-e42566d05d15?auto=format&fit=crop&w=900&q=85',
    tags: ['Кучеряве щастячко'],
    details: false,
    style: 'lilac',
  },
  {
    name: 'Мія',
    role: 'Найголовніша мотивація',
    photo: 'https://images.unsplash.com/photo-1690145150475-3ce6bc09e4bb?auto=format&fit=crop&w=900&q=85',
    tags: ['Натхнення', 'Цільова аудиторія'],
    details: false,
    style: 'mint',
  },
] as const;

export default function TeamPage() {
  return (
    <main>
      <PageIntro
        eyebrow="ЛЮДИ СВІТЛА"
        title="Наша команда"
        description="Маленька команда. Великі мрії. І дуже багато любові до того, що ми робимо."
      />
      <section className="section section--after-intro">
        <div className="site-container">
          <div className="team-grid">
            {members.map(person => (
              <article className="team-card" key={person.name}>
                <div className={'team-card__image team-card__image--' + person.style}>
                  {/* Demonstration images are not photographs of the named team members. */}
                  <Image
                    unoptimized
                    src={person.photo}
                    alt={'Ілюстративний портрет для картки «' + person.name + '»'}
                    loading="lazy"
                    width={900}
                    height={900}
                  />
                  <span className="team-card__photo-note">Ілюстративне фото</span>
                </div>
                <div className="team-card__body">
                  <p className="team-card__role">{person.role}</p>
                  <h2>{person.name}</h2>
                  <div className="chip-list">
                    {person.tags.map(tag => (
                      <span className="tag-chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {person.details && (
                    <div className="team-card__epilogue">
                      <span className="team-card__ellipsis">...</span>
                      <span>Одним словом — безробітний.</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="content-note">
            Фотографії тимчасові й слугують лише для оформлення макета. Перед публікацією замінимо їх на фото учасників
            за їхньою згодою.
          </p>
        </div>
      </section>
    </main>
  );
}
