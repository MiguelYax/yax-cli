import { Arguments, CommandInterface, Rule } from "./types";

export const toList = (title: string, items: string[]): string[] => {
  return items.length ? [`${title}:`, ...items.map((i) => `  - ${i}`)] : [];
};

export const pad = (n: number): string => {
  const a = n > 0 ? new Array(n) : [];
  return a.join(' ');
};

export const getFlags = (validations: Rule[]): string[] => {
  const flagSection = 40;
  const flags = validations.map((rule) => {
    const { flag, alias, description, required } = rule;
    const flags = `--${flag}, -${alias}`;
    const mode = required ? '(required)' : '(optional)';
    return `${flags}${pad(flagSection - flags.length)}${mode} ${description}`;
  });
  return validations.length > 0 ? ['OPTIONS:', ...flags] : [];
};

export const showHelp = (cmd: CommandInterface, args: Arguments, commands: string[] = [], errors: string[] = []): void => {
  const commandInfo = args.command ? [`COMMAND: ${args.command}`] : [];
  const text = [
    `USAGE: ${args.bin} <COMMAND> [OPTIONS]`,
    ...commandInfo,
    `DESCRIPTION: ${cmd.description}`,
    ...toList('COMMANDS', commands),
    ...toList('EXAMPLES', cmd.examples),
    ...toList('ERRORS', errors),
    ...getFlags(cmd.validations)
  ];

  console.log(text.join('\n'));
};
