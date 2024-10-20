import { CommandInterface, Options, Rule } from '../../../src/types';
import contries from '../countries';

 const Search: CommandInterface = {
  description :"Search country",
  examples : [
    'country search --name Andorra',
    'country search --name ania --limit 2'
  ],
  validations:[
    {
      flag: 'name',
      alias: 'n',
      required: true,
      description: 'Country name',
      type: 'string'
    },
    {
      flag: 'limit',
      alias: 'l',
      required: false, 
      description: 'Elements to show',
      type: 'number',
      default: 3
    } 
  ],
  handler(options: Options) {
    const name = <string>options.get('name');
    const limit = <number>options.get('limit');
    const result = contries.filter((c) => c.name.includes(name));
    console.log(result.slice(0, limit));
  }
};

export default Search;
