
## Main structure

As a example, It uses `src` as source path.
```sh
repository
├── src
│   ├── cmds ## relative path 
│   │   ├──find 
│   │   │  └── index.ts ## export an object that implements CommandInterface
│   ├── index.ts  ##  Command line Register file
```

## files

### Command line registration

```ts
#!/usr/bin/env node 
import { Register } from 'yax-cli';

new Register({
  description: 'Country Command Line Tool', // Your description
  commandsPath: `${__dirname}/cmds`, //  Add here your full path to the directory
  process,  // Procees runtime variable
});
```

### Find command definition

```ts
import { CommandInterface, Options, Rule, logger } from "yax-cli";

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
    // You can do here wethever you want
    const name = options.get('name');
    const result = centralAmericaCountries.find((c) => c === name) ?? [];
    logger.log(result);
  }
};
```

### Build and Link/Publish your CLI
#### command
```sh
country --help
```
#### output
```sh
USAGE: bin <COMMAND> [OPTIONS]
DESCRIPTION: Country Command Line Tool
COMMANDS:
  - find
  - search
OPTIONS:
--help, -h                             (optional) Display help
```
```sh
countries find --name Guatemala
```

#### Output
```sh
Guatemala
```
