import { Options, Rule } from "./types";

export const verify = (options: Options, validations: Rule[]): { isValid: boolean, errors: string[] } => {
  const errors: string[] = [];
  validations?.forEach((rule) => {
    const value = options.get(rule.flag) ?? options.get(rule.alias);
    const exists = value !== undefined;
    if (!exists && rule.required) {
      errors.push(`The flag: --${rule.flag} is required!`);
    }
    if (!exists && rule.default !== undefined) {
      options.set(rule.flag, rule.default);
      options.set(rule.alias, rule.default);
    }
    if (exists) {
      options.set(rule.flag, value);
      options.set(rule.alias, value);
    }
  });

  return {
    isValid: (errors.length === 0),
    errors
  };
};
