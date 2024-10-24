
# Multi-level
Provides the capability to add nested commands as deep as the directory definition.

## Pathfinder resolution
For each file *.js or *.ts file found under `commandsPath` directory provided at registration time.  Pathfinder will resolve the equivalent command for each route. 

## Strict mode (boolean)
Strict mode configuratio  provides the command resolution strategy:
  - Scenarios:
    - When `strictMode is equals to true` only `index.js or index.ts` files are considered as commands. 
    - When `strictMode is equals to false` all `*.js or *.ts` files are considered as commands.

Configuration example
```ts
#!/usr/bin/env node

import { Register } from 'yax-cli'

new Register({
  description: 'Phone demo cli', 
  commandsPath: `${__dirname}/phone`, //  Add here your full path to the directory
  process,  // Procees runtime variable
  strictMode: true
});
```

## Strict mode equals to true (default)
```sh
repository
├── src
│   ├── pone ## relative path 
│   │   ├──call 
│   │   │  └── index.ts ## implements CommandInterface
│   │   ├──camara 
│   │   │  ├──photo 
│   │   │  │  └── index.ts ## implements CommandInterface
│   │   │  ├──video 
│   │   │  │  └── index.ts ## implements CommandInterface
│   │   │  └── index.ts ## implements CommandInterface
│   ├── index.ts  ##  Command line Register file
```

## Strict mode equals to false
```sh
repository
├── src
│   ├── pone ## relative path 
│   │   └── call.ts ## implements CommandInterface
│   │   ├──camara 
│   │   │  ├──photo.ts ## implements CommandInterface
│   │   │  ├──video 
│   │   │  │  ├── decoder.ts ## file is not consider as command. 
│   │   │  │  └── index.ts ## implements CommandInterface
│   │   │  └── index.ts ## implements CommandInterface
│   ├── index.ts  ##  Command line Register file
```

### Commads
```sh
COMMANDS:
  * call
  * camera
  * camera photo
  * camera video
```