import { Arguments, CommandInterface, Validations } from "./types"

export const toList = (title: string, items: string[]) : string[] => {
    return items.length ? [`${title}`, ...items.map((i) => `  - ${i}`)] : []
}

const pad =(n:number) : string => {
  const a = n > 0 ? new Array(n) : [];
  return a.join(' ');
}

export const getFlags = (validations: Validations): string[] => {
  const flagSection = 40;
  const keys: string[]  = Object.keys(validations);
  const options = keys.map((key) => {
    const { alias, description, required} = validations[key];
    const flags = `--${key}, -${alias}`
    const mode = required ? '(required)' : '(optional)'
    return  `${flags}${pad(flagSection - flags.length)}${mode} ${description}`
  });
  return options;
}

export const showHelp = (cmd: CommandInterface, args: Arguments): void => {
  const text = [
    `USAGE: ${args.bin} <command> [options]`,
    ...toList('COMMANDS', cmd.commands),
    ...toList('EXAMPLES', cmd.examples),
    ...toList('FLAGS', getFlags(cmd.validations))
  ]

  console.log(text.join('\n'));
}