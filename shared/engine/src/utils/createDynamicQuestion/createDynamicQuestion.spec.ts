import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { TextContentBlock_AllLanguages_Config } from '../../content';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../types/languages';
import type { DynamicQuestion_Config, DynamicQuestion_Variant } from './createDynamicQuestion.types';
import {
  createDynamicQuestion,
  validateArgument,
  validateBooleanArgument,
  validateNumberArgument,
  validateStringArgument,
} from './createDynamicQuestion.utils';

const argumentsConfig = [
  { type: 'number', selector: 'amount', min: 1, max: 4, step: 1 },
  { type: 'boolean', selector: 'enabled' },
] as const;
type TestArguments = typeof argumentsConfig;
type Variant = DynamicQuestion_Variant<TestArguments>;

const variant = (amount: number, enabled: boolean): Variant => [
  { selector: 'amount', value: amount },
  { selector: 'enabled', value: enabled },
];

const name = {
  id: 'dynamic-question',
  blockType: 'text' as const,
  allLocales: true as const,
  value: Object.fromEntries(
    DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => [language, 'Question']),
  ) as TextContentBlock_AllLanguages_Config,
};

const createConfig = (
  buildVariants: () => Variant[] = () => [variant(1, true), variant(2, false), variant(3, true), variant(4, false)],
  checkConstraints: (candidate: Variant) => boolean = () => true,
): DynamicQuestion_Config<TestArguments> => ({
  arguments: argumentsConfig,
  buildVariants,
  checkConstraints,
  content: { question: [[]], explanation: [[]], answer: [[]] },
  name,
});

describe('Utils', () => {
  describe('CreateDynamicQuestion', () => {
    describe('String argument validation', () => {
      it('should accept strings at the inclusive length boundaries', () => {
        for (const value of ['ab', 'abcd']) {
          const result = validateStringArgument({
            type: 'string',
            selector: 'word',
            value,
            minLength: 2,
            maxLength: 4,
          });
          assert.equal(result.success, true);
          assert.equal(result.selector, 'word');
          assert.equal(result.type, 'string');
        }
      });

      it('should reject strings outside the configured length range', () => {
        assert.equal(
          validateStringArgument({
            type: 'string',
            selector: 'word',
            value: 'a',
            minLength: 2,
          }).constraints.minLength,
          false,
        );
        assert.equal(
          validateStringArgument({
            type: 'string',
            selector: 'word',
            value: 'abc',
            maxLength: 2,
          }).constraints.maxLength,
          false,
        );
      });

      it('should enforce allowed values, exclusions, and exact matches', () => {
        const result = validateStringArgument({
          type: 'string',
          selector: 'word',
          value: 'red',
          allowedValues: ['red'],
          exclude: ['red'],
          exact: 'blue',
        });
        assert.deepEqual(
          {
            allowedValues: result.constraints.allowedValues,
            exclude: result.constraints.exclude,
            exact: result.constraints.exact,
          },
          { allowedValues: true, exclude: false, exact: false },
        );
        assert.equal(result.success, false);
      });

      it('should reject an empty argument selector', () => {
        const result = validateStringArgument({
          type: 'string',
          selector: '',
          value: 'text',
        });
        assert.equal(result.success, false);
        assert.equal(result.constraints.selector, false);
      });

      it('should allow an empty string when no constraints prohibit it', () => {
        assert.equal(
          validateStringArgument({
            type: 'string',
            selector: 'word',
            value: '',
          }).success,
          true,
        );
      });
    });

    describe('Number argument validation', () => {
      it('should accept inclusive minimum and maximum values on the configured step', () => {
        for (const value of [2, 4, 6]) {
          assert.equal(
            validateNumberArgument({
              type: 'number',
              selector: 'n',
              value,
              min: 2,
              max: 6,
              step: 2,
            }).success,
            true,
          );
        }
      });

      it('should reject numbers below the minimum and above the maximum', () => {
        assert.equal(
          validateNumberArgument({
            type: 'number',
            selector: 'n',
            value: -1,
            min: 0,
          }).constraints.min,
          false,
        );
        assert.equal(
          validateNumberArgument({
            type: 'number',
            selector: 'n',
            value: 8,
            max: 7,
          }).constraints.max,
          false,
        );
      });

      it('should reject values that do not align with the configured step from the minimum', () => {
        const result = validateNumberArgument({
          type: 'number',
          selector: 'n',
          value: 3,
          min: 0,
          max: 10,
          step: 2,
        });
        assert.equal(result.success, false);
        assert.equal(result.constraints.step, false);
      });

      it('should preserve existing behavior that ignores a step without a minimum', () => {
        const result = validateNumberArgument({
          type: 'number',
          selector: 'n',
          value: 3,
          step: 2,
        });
        assert.equal(result.success, true);
        assert.equal(result.constraints.step, true);
      });

      it('should apply allowed values, exclusion, and exact-number constraints', () => {
        const result = validateNumberArgument({
          type: 'number',
          selector: 'n',
          value: 5,
          allowedValues: [5, 6],
          exclude: [5],
          exact: 6,
        });
        assert.deepEqual(
          {
            allowedValues: result.constraints.allowedValues,
            exclude: result.constraints.exclude,
            exact: result.constraints.exact,
          },
          { allowedValues: true, exclude: false, exact: false },
        );
        assert.equal(result.success, false);
      });
    });

    describe('Boolean validation and dispatch', () => {
      it('should accept both boolean values with a nonempty selector', () => {
        for (const value of [true, false]) {
          assert.equal(
            validateBooleanArgument({
              type: 'boolean',
              selector: 'enabled',
              value,
            }).success,
            true,
          );
        }
      });

      it('should expose selector and value-type validations for booleans', () => {
        const result = validateBooleanArgument({
          type: 'boolean',
          selector: '',
          value: false,
        });
        assert.deepEqual(result.constraints, { selector: false, type: true });
        assert.equal(result.success, false);
      });

      it('should dispatch validation to the correct argument type', () => {
        assert.equal(
          validateArgument({
            type: 'string',
            selector: 's',
            value: 'ok',
            exact: 'ok',
          }).success,
          true,
        );
        assert.equal(
          validateArgument({
            type: 'number',
            selector: 'n',
            value: 0,
            min: 1,
          }).success,
          false,
        );
        assert.equal(
          validateArgument({
            type: 'boolean',
            selector: 'b',
            value: true,
          }).success,
          true,
        );
      });
    });

    describe('Variant lifecycle', () => {
      it('should expose the configured argument definitions and no selected value initially', () => {
        const question = createDynamicQuestion(createConfig());
        assert.strictEqual(question.getDefaultArgs(), argumentsConfig);
        assert.equal(question.getArgs(), undefined);
      });

      it('should store the selected argument values without modifying them', () => {
        const question = createDynamicQuestion(createConfig());
        const selected = variant(2, true);
        const before = structuredClone(selected);
        question.updateArgs(selected);
        assert.strictEqual(question.getArgs(), selected);
        assert.deepEqual(selected, before);
      });

      it('should report no variants before initial calculation', () => {
        const question = createDynamicQuestion(createConfig());
        assert.equal(question.hasVariants(), false);
        assert.deepEqual(question.getAllVariants(), []);
        assert.equal(question.getVariant(0), undefined);
        assert.equal(question.getRandomVariant(), undefined);
      });

      it('should filter invalid argument values while retaining valid variant ordering', () => {
        const question = createDynamicQuestion(
          createConfig(() => [variant(0, true), variant(4, false), variant(5, true), variant(2, false)]),
        );
        assert.deepEqual(question.calculateValidVariants(), [variant(4, false), variant(2, false)]);
        assert.equal(question.hasVariants(), true);
      });

      it('should reject variants with mismatched selectors or the wrong number of arguments', () => {
        const wrongSelector = [
          { selector: 'other', value: 2 },
          { selector: 'enabled', value: true },
        ] as unknown as Variant;
        const incomplete = [{ selector: 'amount', value: 2 }] as unknown as Variant;
        const question = createDynamicQuestion(createConfig(() => [wrongSelector, incomplete, variant(3, true)]));
        assert.deepEqual(question.calculateValidVariants(), [variant(3, true)]);
      });

      it('should apply custom constraints only after validating argument definitions', () => {
        const examined: number[] = [];
        const question = createDynamicQuestion(
          createConfig(
            () => [variant(0, true), variant(2, false), variant(3, true)],
            candidate => {
              examined.push(candidate[0].value);
              return candidate[1].value;
            },
          ),
        );
        assert.deepEqual(question.calculateValidVariants(), [variant(3, true)]);
        assert.deepEqual(examined, [2, 3]);
      });

      it('should return individual variants by index and undefined for absent indexes', () => {
        const question = createDynamicQuestion(createConfig());
        question.calculateValidVariants();
        assert.deepEqual(question.getVariant(0), variant(1, true));
        assert.deepEqual(question.getVariant(3), variant(4, false));
        assert.equal(question.getVariant(4), undefined);
        assert.equal(question.getVariant(-1), undefined);
      });

      it('should choose only from the available valid variants', () => {
        const question = createDynamicQuestion(createConfig(() => [variant(2, false), variant(3, true)]));
        const variants = question.calculateValidVariants();
        for (let index = 0; index < 12; index += 1) {
          const chosen = question.getRandomVariant();
          if (chosen === undefined) return assert.fail('Expected an available variant');
          assert.equal(variants.includes(chosen), true);
        }
      });

      it('should replace cached variants when recalculated', () => {
        let generated = [variant(2, false)];
        const question = createDynamicQuestion(createConfig(() => generated));
        assert.deepEqual(question.calculateValidVariants(), [variant(2, false)]);
        generated = [variant(3, true)];
        assert.deepEqual(question.calculateValidVariants(), [variant(3, true)]);
        assert.deepEqual(question.getAllVariants(), [variant(3, true)]);
      });

      it('should preserve duplicate valid variants rather than silently removing them', () => {
        const question = createDynamicQuestion(createConfig(() => [variant(2, false), variant(2, false)]));
        assert.equal(question.calculateValidVariants().length, 2);
      });

      it('should surface exceptions from the caller-provided variant builder', () => {
        const question = createDynamicQuestion(
          createConfig(() => {
            throw new Error('variant generation failed');
          }),
        );
        assert.throws(() => question.calculateValidVariants(), /variant generation failed/);
      });
    });
  });
});
