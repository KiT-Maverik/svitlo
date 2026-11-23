import type {
  DynamicQuestion,
  DynamicQuestion_ArgumentProposal,
  DynamicQuestion_ArgumentValidation,
  DynamicQuestion_Arguments,
  DynamicQuestion_Config,
  DynamicQuestion_Variant,
} from './createDynamicQuestion.types';

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const validateCommonArgument = (
  argument: DynamicQuestion_ArgumentProposal<'string' | 'number' | 'boolean'>,
): Record<string, boolean> => ({
  selector: argument.selector.length > 0,
  type: typeof argument.value === argument.type,
});

export const validateStringArgument = (
  argument: DynamicQuestion_ArgumentProposal<'string'>,
): DynamicQuestion_ArgumentValidation => {
  const constraints = {
    ...validateCommonArgument(argument),
    minLength: argument.minLength === undefined || argument.value.length >= argument.minLength,
    maxLength: argument.maxLength === undefined || argument.value.length <= argument.maxLength,
    allowedValues: argument.allowedValues === undefined || argument.allowedValues.includes(argument.value),
    exclude: argument.exclude === undefined || !argument.exclude.includes(argument.value),
    exact: argument.exact === undefined || argument.value === argument.exact,
  };

  return {
    success: Object.values(constraints).every(Boolean),
    selector: argument.selector,
    type: argument.type,
    constraints,
  };
};

export const validateNumberArgument = (
  argument: DynamicQuestion_ArgumentProposal<'number'>,
): DynamicQuestion_ArgumentValidation => {
  const constraints = {
    ...validateCommonArgument(argument),
    min: argument.min === undefined || argument.value >= argument.min,
    max: argument.max === undefined || argument.value <= argument.max,
    step:
      argument.step === undefined ||
      argument.min === undefined ||
      (argument.value - argument.min) % argument.step === 0,
    allowedValues: argument.allowedValues === undefined || argument.allowedValues.includes(argument.value),
    exclude: argument.exclude === undefined || !argument.exclude.includes(argument.value),
    exact: argument.exact === undefined || argument.value === argument.exact,
  };

  return {
    success: Object.values(constraints).every(Boolean),
    selector: argument.selector,
    type: argument.type,
    constraints,
  };
};

export const validateBooleanArgument = (
  argument: DynamicQuestion_ArgumentProposal<'boolean'>,
): DynamicQuestion_ArgumentValidation => {
  const constraints = validateCommonArgument(argument);

  return {
    success: Object.values(constraints).every(Boolean),
    selector: argument.selector,
    type: argument.type,
    constraints,
  };
};

export const validateArgument = (
  argument: DynamicQuestion_ArgumentProposal<'string' | 'number' | 'boolean'>,
): DynamicQuestion_ArgumentValidation => {
  switch (argument.type) {
    case 'string':
      return validateStringArgument(argument);
    case 'number':
      return validateNumberArgument(argument);
    case 'boolean':
      return validateBooleanArgument(argument);
  }
};

const isValidVariant = <TArguments extends DynamicQuestion_Arguments>(
  argumentsConfig: TArguments,
  variant: DynamicQuestion_Variant<TArguments>,
): boolean => {
  if (variant.length !== argumentsConfig.length) {
    return false;
  }

  return argumentsConfig.every((argument, index) => {
    const value = variant[index];

    if (!isRecord(value) || value.selector !== argument.selector) {
      return false;
    }

    const proposal = {
      ...argument,
      value: value.value,
    } as DynamicQuestion_ArgumentProposal<'string' | 'number' | 'boolean'>;

    return validateArgument(proposal).success;
  });
};

export function createDynamicQuestion<TArguments extends DynamicQuestion_Arguments>(
  config: DynamicQuestion_Config<TArguments>,
): DynamicQuestion<TArguments> {
  const defaultArgs = config.arguments;
  let args: DynamicQuestion_Variant<TArguments> | undefined;
  let variants: DynamicQuestion_Variant<TArguments>[] = [];

  const calculateValidVariants = (): DynamicQuestion_Variant<TArguments>[] => {
    variants = config
      .buildVariants(config)
      .filter(variant => isValidVariant(config.arguments, variant))
      .filter(config.checkConstraints);

    return variants;
  };

  return {
    getDefaultArgs: () => defaultArgs,
    getArgs: () => args,
    updateArgs: nextArgs => {
      args = nextArgs;
    },
    calculateValidVariants,
    hasVariants: () => variants.length > 0,
    getAllVariants: () => variants,
    getVariant: index => variants[index],
    getRandomVariant: () => (variants.length === 0 ? undefined : variants[Math.floor(Math.random() * variants.length)]),
  };
}
