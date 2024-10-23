# yax-cli
Yet another command line tool helper, multi-level, and generator using Javascript/Typescript. (By the way my last name is Yax)

# Install 
```
npm install yax-cli
```

# Documentation


# Getting started

## Main structure

As a example, It uses `src` as source path.
```sh
repository
├── src
│   ├── phone ## relative path 
│   │   ├──on 
│   │   │  └── index.ts ## implements CommandInterface
│   ├── index.ts  ##  Command line Register file
```

## files

### Command line register definition file

```ts
#!/usr/bin/env node // Don't forget add this at the first line

import { Register } from 'yax-cli'

new Register({
  description: 'Phone demo cli', // Your cli description
  commandsPath: `${__dirname}/phone`, //  Add here your full path to the directory
  process,  // Procees runtime variable
});
```

### phone on command definition
```ts
import { CommandInterface } from "yax-cli";

export default class Cmd implements CommandInterface {
  description = 'Phone turn on';
  examples = [];
  validations = [];
  handler() {
    console.log('Hello moto!');
    console.log('Phone turned on :D');
  }
};
```

### Executing
```sh
phone on
```

### Output
```sh
Hello moto!
Phone turned on :D
```

### Show help
```sh
phone --help
```
### output
```sh
USAGE: phone <COMMAND> [OPTIONS]
DESCRIPTION: Phone demo cli
COMMANDS:
  * on
OPTIONS:
--help, -h                             (optional) Display help
```

## That's it, I hope this tool can help you :)

