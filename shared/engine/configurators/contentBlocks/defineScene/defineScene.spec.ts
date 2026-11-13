import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { defineScene } from './index';

const id = 'e5235ac2-2c44-4c10-8c48-3c7bad649011';
const scope = { languages: ['uk'] as const };

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineScene', () => {
      const config = () => ({
        id, slug: 'activity', type: 'scene' as const, params: {},
        locale: { value: { en: 'Choose an option', uk: 'Обери варіант' } },
      });

      test('publishes the selected recursive Scene localization as Props', () => {
        const scene = defineScene(config());
        const resource = scene.build.props(scope);
        assert.equal(resource.base.locale?.value, undefined);
        assert.deepEqual(resource.locale, { uk: { locale: { value: 'Обери варіант' } } });
        assert.equal(JSON.stringify(resource).includes('Choose an option'), false);
      });

      test('rejects positional authored Scene content and identity changes', () => {
        assert.throws(
          () => defineScene({ id, slug: 'activity', type: 'scene', params: {}, locale: { value: ['first', 'second'] as never } }),
        );
        const scene = defineScene(config());
        assert.throws(() => scene.build.overrides({ type: 'image' } as never, scope), /Invalid Scene overrides/);
        const patch = scene.build.overrides({ locale: { value: { uk: 'Обирай' } } }, scope);
        assert.deepEqual(patch.locale, { uk: { locale: { value: 'Обирай' } } });
      });
    });
  });
});
