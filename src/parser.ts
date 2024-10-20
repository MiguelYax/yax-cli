import { All, Arguments, Options, Rule } from "./types";
import { basename } from "path";

const isFlag = (key: string): boolean => {
  return key?.startsWith('-');
};

export const getArgs = (argv: string[]): Arguments => {
  const [
    node,
    path,
    command
  ] = argv;

  return {
    node,
    path,
    command: !isFlag(command) ? command : undefined,
    argv,
    bin: basename(path)
  };
};

export const isList = (flag: string, validations: Rule[]): boolean => {
  return validations.some((v) => ((v.flag === flag || v.alias === flag) && v.type === 'list'));
};

export const parser = (argv: string[], validations: Rule[]): Options => {
  const options = new Map<string, All>();

  for (let i = 0; i < argv.length; i++) {
    const current = argv[i];
    const next = argv[i + 1];
    const flag = current.replace(/^[-]+/g, '');
    switch (true) {
    case isFlag(current) && (next === undefined || isFlag(next)):
      options.set(flag, true);
      break;
    case isFlag(current) && !isFlag(next):
      if (isList(flag, validations)) {
        if (options.has(flag)) {
          const temp = <string[]>options.get(flag);
          options.set(flag, [...temp, next]);
        } else {
          options.set(flag, [next]);
        }
      } else {
        options.set(flag, next);
      }
      break;
    }
  }
  return options;
};
