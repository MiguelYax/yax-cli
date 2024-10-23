import { Arguments, CommandInterface, CommandRoute, Rule } from "./types";

export const toList = (title: string, items: string[]): string[] => {
  return items.length ? [`${title}:`, ...items.map((i) => `  * ${i}`)] : [];
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

export const getCommands = (commands: CommandRoute[]): string[] => {
  const cmds = commands
    .filter((i) => i.commands[0] !== '')
    .map((c) => `  *  ${c.commands.join(' ')}`);

  return commands.length > 0 ? ["COMMANDS:", ...cmds]: [];
};

export const showHelp = (cmd: CommandInterface, args: Arguments, commands: CommandRoute[] = [], errors: string[] = []): string[] => {
  const commandInfo = args.commands.length ? [`COMMAND: ${args.commands.join(' ')}`] : [];
  const content = [
    `USAGE: ${args.bin} <COMMAND> [OPTIONS]`,
    ...commandInfo,
    `DESCRIPTION: ${cmd.description}`,
    ...getCommands(commands),
    ...toList('EXAMPLES', cmd.examples),
    ...toList('ERRORS', errors),
    ...getFlags(cmd.validations)
  ];
  
  return content;
};
