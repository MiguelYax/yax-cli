import { Arguments, pathfinder, resolveCommands } from '../src';

describe('get files', () => {
  test('resolve posible cmds', () => {
    const commandsPath = `${__dirname}/cmds`;
    const commandFiles = resolveCommands(commandsPath, commandsPath)

    expect(commandFiles).toEqual(
      [
        {
          filePath: '/home/myax/dev/yax-cli/tests/cmds/find/index.ts',
          commands: [ 'find' ]
        },
        {
          filePath: '/home/myax/dev/yax-cli/tests/cmds/index.ts',
          commands: [ '' ]
        },
        {
          filePath: '/home/myax/dev/yax-cli/tests/cmds/search/index.ts',
          commands: [ 'search' ]
        },
        {
          filePath: '/home/myax/dev/yax-cli/tests/cmds/search/location.ts',
          commands: [ 'search', 'location' ]
        }
      ]
    );
  });
});

describe('pathfinder', () => {
  test('should return false', async () => {
    const     commandsPath = `${__dirname}/cmds`;
    const args: Arguments =     {
      node: 'node',
      path: 'cwd/bin',
      commands: [ 'generate', 'app' ],
      argv: [ 'node', 'cwd/bin', 'generate', 'app', '-o', '/usr/home/app' ],
      flags: [ '-o', '/usr/home/app' ],
      bin: 'bin'
    }

   const resolution = await pathfinder(commandsPath, args);
   expect(resolution.config).toBeUndefined();
  });
  test('should resolve command', async() => {
    const     commandsPath = `${__dirname}/cmds`;
    const args: Arguments =     {
      node: 'node',
      path: 'cwd/bin',
      commands: [ 'search', 'location' ],
      argv: [ 'node', 'cwd/bin', 'generate', 'app', '-o', '/usr/home/app' ],
      flags: [ '-o', '/usr/home/app' ],
      bin: 'bin'
    }

   const resolution = await pathfinder(commandsPath, args);
   expect(resolution.config).toBeDefined();
  });
})