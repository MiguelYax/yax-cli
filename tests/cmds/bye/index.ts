import { CommandInterface, Rule } from "../../../src";

export default class Cmd implements CommandInterface {
  description = 'Bye command';
  examples = [];
  validations: Rule[] = [
    {
      flag: 'log',
      alias: 'l',
      description: "Log information",
      default: 'false',
      required: false,
      type: 'boolean'
    }
  ];
  constructor() {}
  handler() {
    return true;
  }
};
