import type { Metadata } from 'next';
import SponsorTabs from '@/components/SponsorTabs';
import { PageIntro } from '@/components/PageIntro';

export const metadata: Metadata = { title: 'Спонсори' };

export default function SponsorsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="БУДУЄМО СВІТЛО РАЗОМ"
        title="Спонсори та друзі"
        description="Підтримка має багато форм. Тут ми відзначатимемо людей, організації та медіа, які допомагають нашій освітній місії."
      />
      <section className="section section--after-intro">
        <div className="site-container">
          <SponsorTabs />
          <p className="content-note">
            Усі майбутні згадки партнерів і меценатів публікуватимуться лише після підтвердження співпраці та згоди на
            оприлюднення.
          </p>
        </div>
      </section>
    </main>
  );
}
