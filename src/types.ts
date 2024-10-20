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
  flags: string[]
}

export interface CommandInterface {
  description: string,
  examples: string[],
  handler: (options: Options, args: Arguments)=> void;
  validations: Rule[]
}
