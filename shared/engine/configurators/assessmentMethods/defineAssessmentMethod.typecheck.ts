import { defineAssessmentMethod } from './defineAssessmentMethod';
import type { AllLanguageCodes } from '#schemas';
import type { LanguageScope } from '#types';

const method = defineAssessmentMethod<'retrieval', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d06',
  slug: 'retrieval',
  title: { en: 'Retrieval', uk: 'Усне опитування' },
  description: { en: 'Discuss aloud', uk: 'Поясни вголос' },
});

method.build.props({ languages: ['en', 'uk'] });
method.build.props({ languages: ['uk'] });
// @ts-expect-error A requested language must be in the authored generic scope.
method.build.props({ languages: ['pl'] });
// @ts-expect-error No contextual Assessment Method overrides are available.
method.build.overrides({});
// @ts-expect-error Publication scope is mandatory.
method.build.props();
// @ts-expect-error Internal config/locales API is not exposed.
void method.config;

const application = defineAssessmentMethod({
  id: '42f0a875-fcba-40c8-8960-4fd5666dfb46',
  slug: 'application',
  title: 'Uniform method',
  description: 'The default authoring scope covers all canonical languages.',
});
const fullScope: LanguageScope<AllLanguageCodes> = application;
application.build.props({ languages: ['en', 'uk'] });
void fullScope;
