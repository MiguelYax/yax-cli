import { Arguments, CommandInterface, Rule } from "./types";

export const toList = (title: string, items: string[]) : string[] => {
  return items.length ? [`${title}`, ...items.map((i) => `  - ${i}`)] : [];
};

export const pad =(n:number) : string => {
  const a = n > 0 ? new Array(n) : [];
  return a.join(' ');
};

export const getFlags = (validations: Rule[]): string[] => {
  const flagSection = 40;
  const flags = validations.map((rule) => {
    const { flag, alias, description, required} = rule;
    const flags = `--${flag}, -${alias}`;
    const mode = required ? '(required)' : '(optional)';
    return  `${flags}${pad(flagSection - flags.length)}${mode} ${description}`;
  });
  return validations.length > 0 ? ['FLAGS:', ...flags] : [];
};

export const showHelp = (cmd: CommandInterface, args: Arguments): void => {
  const text = [
    `USAGE: ${args.bin} <command> [options]`,
    ...toList('COMMANDS', cmd.commands),
    ...toList('EXAMPLES', cmd.examples),
    ...getFlags(cmd.validations)
  ];

  console.log(text.join('\n'));
};
