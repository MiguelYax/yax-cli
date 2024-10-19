import { Arguments, Options } from "./types";
import { basename } from "path";

const isFlag = (key: string): boolean => {
  return key.startsWith('-');
}

const hasMore = (flag: string, argv: string[]): boolean => {
  return argv.filter((i) => i === flag )?.length > 1;
}

const append = (opts: Options, key: string, value: string): void  =>{
  if (opts[key]) {
    // @ts-ignore
    opts[key].push(value);
  } else {
    opts[key] = [value];
  }
}

export const parser = (argv: string[]): Arguments => {
  const [
    node,
    path,
    command, 
    ...opts
  ] = argv;

  const options: Options = {};

  for (let i = 0; i < opts.length; i++) {
    const current = opts[i];
    const next = opts[i + 1];
    const flag = current.replace(/^[-]+/g, '');
    switch (true) {
      case isFlag(current) && (next === undefined || isFlag(next)):
        options[flag] = true;
        break;
      case isFlag(current) && !isFlag(next):
        if (hasMore(current, opts)) {
          append(options, flag, next);
        } else {
          options[flag] = next;
        }
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
}
