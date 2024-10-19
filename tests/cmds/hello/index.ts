import { Arguments, CommandInterface, Rule } from '../../../src/types';

export default class Hello implements CommandInterface  {
  description = "Hello command";
  examples = ['cli hello -m world'];
  commands = [];
  validations: Rule[] = [
    {
      flag: 'message',
      alias: 'f',
      required: true,
      description: 'Hello message',
      type: 'string'
    }
  ];
  handler(args: Arguments) {
    console.log('hello', args.options.get('mesage'));
  }
};

