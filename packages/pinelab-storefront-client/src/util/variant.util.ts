export interface AvailableOptions {
  /**
   * This is the ID of the optionGroup
   */
  [key: string]: {
    /**
     * Name of the optionGroup
     */
    name: string;
    options: {
      /**
       * 'id: value' of the option itself
       */
      [key: string]: string;
    };
  };
}

interface VariantWithOptions {
  options: {
    id: string;
    group: {
      id: string;
      name: string;
    };
    name: string;
  }[];
}

/**
 * Key value map of the selectedOptions
 */
export interface SelectedOptions {
  [key: string]: string;
}

/**
 * Get available options based on given variants. Excludes options that are not part of any variant.
 */
export function getAvailableOptions(
  variants: VariantWithOptions[]
): AvailableOptions {
  const availableOptions: AvailableOptions = {};
  for (const variant of variants) {
    for (const option of variant.options) {
      const existingOptions = availableOptions[option.group.id]?.options;
      availableOptions[option.group.id] = {
        options: {
          ...existingOptions,
          [option.id]: option.name,
        },
        name: option.group.name,
      };
    }
  }
  return availableOptions;
}

/**
 * Select a variant based on given options
 */
export function findVariant<T extends VariantWithOptions>(
  selectedOptions: SelectedOptions,
  variants: T[]
): T | undefined {
  return variants.find((variant) =>
    variant.options.every(
      (option) => selectedOptions[option.group.id] === option.id
    )
  );
}

/**
 * Gets a map of options from given variant
 */
export function getOptionsFromVariant(
  variant: VariantWithOptions
): SelectedOptions {
  const options: SelectedOptions = {};
  for (const option of variant.options) {
    options[option.group.id] = option.id;
  }
  return options;
}
