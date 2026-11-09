import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineScenarioSection } from '../../sections/defineScenarioSection/defineScenarioSection';
import { defineTheorySection } from '../../sections/defineTheorySection/defineTheorySection';
import { defineEpisode } from '../defineEpisode/defineEpisode';
import { defineChapter } from '../defineChapter/defineChapter';
import { defineModule } from '../defineModule/defineModule';
import { defineCourse } from './defineCourse';
import { defineMarkdown } from '../../contentBlocks/defineMarkdown/defineMarkdown';

const id = 'b775647f-203d-481a-a1c7-4d331c779d01';
const title = defineText({ type: 'text', id, slug: 'title', params: {}, value: 'Title' });
const description = defineMarkdown({ type: 'markdown', id, slug: 'description', locales: 'Description' });
const scenario = defineScenarioSection({
  type: 'scenario', id, slug: 'scenario',
  title: 'Scenario', navigationLabel: 'S', content: [title],
});
const theory = defineTheorySection({
  type: 'theory', id, slug: 'theory',
  title: 'Theory', navigationLabel: 'T', content: [title],
});
const episode = defineEpisode({ type: 'episode', id, title, sections: [scenario] });
const chapter = defineChapter({ type: 'chapter', id, title, content: [episode] });
const module = defineModule({ type: 'module', id, title, content: [chapter] });
const course = defineCourse({
  type: 'course', id, title, description, parameters: { languages: ['en', 'uk'] as const },
  content: [module, chapter, episode],
});

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;
type ScenarioSlug = Expect<Equal<typeof scenario.config.base.slug, 'scenario'>>;
type TheorySlug = Expect<Equal<typeof theory.config.base.slug, 'theory'>>;
type NestedKind = Expect<Equal<typeof course.content[0]['config']['base']['type'], 'module'>>;
type ExactEpisode = Expect<Equal<typeof chapter.content[0], typeof episode>>;

// @ts-expect-error Chapter must not contain Modules.
defineChapter({ type: 'chapter', id, title, content: [module] });
// @ts-expect-error Episode must not contain Theory Sections.
defineEpisode({ type: 'episode', id, title, sections: [theory] });
// @ts-expect-error Course description must be a Markdown configurator.
defineCourse({ type: 'course', id, title, description: title, parameters: { languages: ['en'] }, content: [] });

void course;
void (null as unknown as ScenarioSlug);
void (null as unknown as TheorySlug);
void (null as unknown as NestedKind);
void (null as unknown as ExactEpisode);
