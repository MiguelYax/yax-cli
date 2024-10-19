export type AllTypes = boolean | string | number | string[] | number[];

export type Options = {
  [key:string]: AllTypes
}
export type Validations = {
  [key: string]: {
    alias: string,
    description: string,
    required: boolean,
    type: 'boolean' | 'string' | 'array'
    default?: AllTypes
  }
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
  validations: Validations
}
