import { All, Arguments } from "./types";
import { basename } from "path";

const isFlag = (key: string): boolean => {
  return key.startsWith('-');
};

const hasMore = (flag: string, argv: string[]): boolean => {
  return argv.filter((i) => i === flag )?.length > 1;
};

export const parser = (argv: string[]): Arguments => {
  const [
    node,
    path,
    command, 
    ...opts
  ] = argv;

  const options = new Map<string, All>();
  
  for (let i = 0; i < opts.length; i++) {
    const current = opts[i];
    const next = opts[i + 1];
    const flag = current.replace(/^[-]+/g, '');
    switch (true) {
      case isFlag(current) && (next === undefined || isFlag(next)):
        options.set(flag, true);
        break;
      case isFlag(current) && !isFlag(next):
        if (hasMore(current, opts)) {
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
      default:
        break;
    }
  }
  return {
    node,
    path,
    bin: basename(path),
    command,
    options
  };
};
