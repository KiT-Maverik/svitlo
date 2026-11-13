import { defineAssessmentMethod } from './defineAssessmentMethod';

const method = defineAssessmentMethod<'oralExamination', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d06',
  slug: 'oralExamination',
  title: { en: 'Oral examination', uk: 'Усне опитування' },
  description: { en: 'Discuss aloud', uk: 'Поясни вголос' },
});

method.build.props({ languages: ['en', 'uk'] });
method.build.props({ languages: ['uk'] });
method.build.overrides({ title: { en: 'Changed' } }, { languages: ['uk'] });
// @ts-expect-error A requested language must be in the authored generic scope.
method.build.props({ languages: ['pl'] });
// @ts-expect-error Override publication has the same language constraint.
method.build.overrides({}, { languages: ['de'] });
// @ts-expect-error Publication scope is mandatory.
method.build.props();
// @ts-expect-error Publication scope is mandatory for overrides.
method.build.overrides({});
