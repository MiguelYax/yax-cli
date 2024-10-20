import { CommandInterface, Options, Rule } from "../../../src";

const centralAmericaCountries = [ "Belice", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panamá" ];

export default class Cmd implements CommandInterface {
  description = 'Find country by name';
  examples = [
    'country find --name Guatemala',
    'country find -n Belice'
  ];
  validations: Rule[] = [
    {
      flag: 'name',
      alias: 'n',
      description: "Country name",
      required: true,
      type: 'string'
    }
  ];
  handler(options: Options) {
    const name = options.get('name');
    const result = centralAmericaCountries.find((c) => c === name);
    console.log(result);
  }
};
