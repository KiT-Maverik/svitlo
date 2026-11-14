import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { fixture } from './quest.fixture';
import { defineStage, defineTask } from './index';
import { defineStage as sectionStage, defineTask as sectionTask } from '../index';
const languages = { languages: ['uk'] as const };
const id = (last: string) => 'e5235ac2-2c44-4c10-8c48-3c7bad6490' + last;

describe('Configurators > Sections > defineQuestSection', () => {
  test('exports nested Stage and Task through the Quest and Sections barrels', () => {
    assert.equal(defineStage, sectionStage);
    assert.equal(defineTask, sectionTask);
  });

  test('publishes nested Stage/Task maps without an order array', () => {
    const { quest } = fixture();
    const resource = quest.build.props(languages);
    assert.equal(resource.base.type, 'quest');
    assert.equal((resource.base.stages as Record<string, unknown>).start !== undefined, true);
    assert.equal(JSON.stringify(resource.base).includes('order'), false);
    assert.doesNotThrow(() => JSON.stringify(resource));
    const locale = resource.locale?.uk as Record<string, unknown>;
    assert.equal((locale.locale as { title: string }).title, 'Пригода з піцою');
  });

  test('publishes targeted Stage patches without mutating authored Quest', () => {
    const { stage, task, quest } = fixture();
    assert.equal(stage.build.props(languages).base.type, 'questStage');
    assert.equal(task.build.props(languages).base.type, 'questTask');
    const original = JSON.stringify(quest.build.props(languages));
    const changed = quest.build.overrides({
      stages: { start: { content: { video: { small: { locale: { label: { uk: 'Економна якість' } } } } } } },
    }, languages);
    assert.ok(changed.locale?.uk);
    assert.equal(JSON.stringify(quest.build.props(languages)), original, 'patch must be stateless');
    assert.throws(() => quest.build.overrides({ id: id('20') } as never, languages), /QuestSection overrides/);
    assert.throws(() => quest.build.overrides({ tasks: { unknown: {} } } as never, languages), /Unknown Quest child/);
  });

  test('requires start stage and task and rejects mismatched keys', () => {
    const { quest, stage, task } = fixture();
    assert.throws(() => quest.validate({
      id: quest.id, slug: quest.slug, type: 'quest', params: {}, locale: { title: 'Title', navigationLabel: 'Quest' },
      stages: { other: stage }, tasks: { start: task },
    }), /start/);
    assert.throws(() => quest.validate({
      id: quest.id, slug: quest.slug, type: 'quest', params: {}, locale: { title: 'Title', navigationLabel: 'Quest' },
      stages: { start: stage }, tasks: { start: task, extra: task },
    }), /Build configurator/);
  });
});
