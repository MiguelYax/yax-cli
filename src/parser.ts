import { All, Arguments, Options, Rule } from "./types";
import { basename } from "path";

const isFlag = (key: string): boolean => {
  return key?.startsWith('-');
};

export const getArgs = (argv: string[]): Arguments => {
  const [
    node,
    path,
    ...tokens
  ] = argv;
  const commands = []
  let flags:string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (isFlag(t)) { 
      flags = tokens.slice(i);
      break;
    } else {
      commands.push(t);
    }
  }

  return {
    node,
    path,
    commands,
    argv,
    flags,
    bin: basename(path)
  };
};

export const isList = (flag: string, validations: Rule[]): boolean => {
  return validations.some((v) => ((v.flag === flag || v.alias === flag) && v.type === 'list'));
};

export const parser = (flags: string[], validations: Rule[]): Options => {
  const options = new Map<string, All>();

  for (let i = 0; i < flags.length; i++) {
    const current = flags[i];
    const next = flags[i + 1];
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
