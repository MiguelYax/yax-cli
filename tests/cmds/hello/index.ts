import { CommandInterface, Options, Rule } from '../../../src/types';

export default class Hello implements CommandInterface  {
  description = "Hello command";
  examples = ['cli hello -m world'];
  validations: Rule[] = [
    {
      flag: 'message',
      alias: 'm',
      required: true,
      description: 'Hello message',
      type: 'string'
    }
  ];
  handler(options: Options) {
    console.log('hello', options.get('mesage'));
  }
};

