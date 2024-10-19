import { All, Arguments, Options } from "./types";
import { basename } from "path";

const isFlag = (key: string): boolean => {
  return key.startsWith('-');
};

const hasMore = (flag: string, argv: string[]): boolean => {
  return argv.filter((i) => i === flag )?.length > 1;
};

export const getArgs = (argv: string[]): Arguments => {
  const [
    node,
    path,
    command, 
    ...flags
  ] = argv;

  return {
    node,
    path,
    command,
    flags,
    bin: basename(path)
  };
};

export const parser = (flags: string[]): Options => {
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
      if (hasMore(current, flags)) {
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
