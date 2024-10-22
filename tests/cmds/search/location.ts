import { CommandInterface  } from '../../../src';

const Search: CommandInterface = {
  description :"Command description",
  examples : [],
  validations:[],
  handler() {
    console.log('Hello from location!');
  }
};

export default Search;
