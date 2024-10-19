import { Options, Rule } from "./types";

export const verify = (options: Options, validations: Rule[]): boolean => {
  let valid = true;
  validations?.forEach((rule) => {
    const value = options.get(rule.flag) ?? options.get(rule.alias);
    const exists = value !== undefined;
    if (!exists && rule.required) {
      console.error(`The flag: --${rule.flag} is required!`);
      valid = false;
    }
    if (!exists && rule.default !== undefined) {
      options.set(rule.flag, rule.default);
      options.set(rule.alias, rule.default);
    }
  });
  return valid;
};
