
# Multi-level
Provides the capability to add nested commands as deep as the directory definition.

## Main structure

```sh
repository
├── src
│   ├── pone ## relative path 
│   │   ├──call 
│   │   │  └── index.ts ## implements CommandInterface
|   │   │  ├──call 
|   │   │  │  └── index.ts ## implements CommandInterface
│   │   ├──camara 
|   │   │  ├──photo 
|   │   │  │  └── index.ts ## implements CommandInterface
|   │   │  ├──video 
|   │   │  │  └── index.ts ## implements CommandInterface
│   │   │  └── index.ts ## implements CommandInterface
│   ├── index.ts  ##  Command line Register file
```
## Pathfinder resolution
For each file *.js or *.ts file found under `commandsPath` directory provided at registration time.  Pathfinder will resolve the equivalent command for each route. 

```sh
COMMANDS:
  * call
  * camera
  * camera photo
  * camera video
```
