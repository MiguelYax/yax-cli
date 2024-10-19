export type All = boolean | string | number | string[] | number[]

export type Options =  Map<string, All>;

export type Rule = {
    flag: string,
    alias: string,
    description: string,
    required: boolean,
    list?: boolean,
    type: 'boolean' | 'string' | 'number'
    default?: All
}
export type Arguments = {
  node: string
  bin: string, 
  path: string;
  command: string,
  options: Options
}

export interface CommandInterface {
  description: string,
  commands: string[],
  examples: string[],
  handler: (args: Arguments)=> void;
  validations: Rule[]
}
