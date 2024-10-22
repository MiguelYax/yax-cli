import { CommandInterface, Options } from '../../src/types';

const Search: CommandInterface = {
  description :"Command description",
  examples : [],
  validations:[],
  handler() {
    console.log('Hello universe!')
  }
};

export default Search;
