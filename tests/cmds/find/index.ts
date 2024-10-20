import { CommandInterface, Options, Rule } from "../../../src";
import contries  from '../countries';

export default class Cmd implements CommandInterface {
  description = 'Bye command';
  examples = [
    'country find --code GT',
    'country find -c US'
  ];
  validations: Rule[] = [
    {
      flag: 'code',
      alias: 'c',
      description: "Country code",
      required: true,
      type: 'string'
    }
  ];
  handler(options: Options) {
    const code = options.get('code');
    const result = contries.find((c) => c.code === code);
    console.log(result);
  }
};
