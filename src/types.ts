export type All = boolean | string | number | number[] | string[]

export type Options = Map<string, All>;

export type CommandRoute = {
  filePath: string;
  commands: string[];
}

export type Rule = {
  flag: string,
  alias: string,
  description: string,
  required: boolean,
  list?: boolean,
  type: 'boolean' | 'string' | 'number' | 'list'
  default?: All
}

export type Arguments = {
  node: string
  bin: string,
  path: string;
  commands: string[],
  flags: string[],
  argv: string[]
}

export interface CommandInterface {
  description: string,
  examples: string[],
  validations: Rule[]
  handler: (options: Options, args: Arguments) => void;
}

export type RegisterOptions = {
  commandsPath: string;
  description: string;
  process: ProcessType
}

export type ProcessType = {
  argv: string[]
}
