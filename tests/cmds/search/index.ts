import { CommandInterface, Options } from '../../../src/types';

const centralAmericaCountries = [ "Belice", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panamá" ]

const Search: CommandInterface = {
  description :"Search country",
  examples : [
    'country search --name a',
    'country search --name li --limit 2'
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
    const result = centralAmericaCountries
      .filter((c) => c.includes(name));

    console.log(result.slice(0, limit));
  }
};

export default Search;
