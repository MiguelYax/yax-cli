import { Arguments, pathfinder, resolveCommands } from '../src';

describe('get files', () => {
  test('resolve posible cmds', () => {
    const commandsPath = `${__dirname}/cmds`;
    const commandFiles = resolveCommands(commandsPath, commandsPath, []);

    expect(commandFiles.length).toBe(4);
    expect(commandFiles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          filePath: expect.any(String),
          commands: expect.any(Array)
        })
      ])
    );
  });
});

describe('pathfinder', () => {
  test('should return false', async () => {
    const commandsPath = `${__dirname}/cmds`;
    const args: Arguments = {
      node: 'node',
      path: 'cwd/bin',
      commands: ['generate', 'app'],
      argv: ['node', 'cwd/bin', 'generate', 'app', '-o', '/usr/home/app'],
      flags: ['-o', '/usr/home/app'],
      bin: 'bin'
    };

    const resolution = await pathfinder(commandsPath, args, true);
    expect(resolution.command).toBeUndefined();
  });

  describe('Strict mode', ()=> {
    test('strict mode is equals to true only index.[js|ts] are considered as commands', async () => {
      const commandsPath = `${__dirname}/cmds`;
      const args: Arguments = {
        node: 'node',
        path: 'cwd/bin',
        commands: ['search', 'location'],
        argv: ['node', 'cwd/bin', 'generate', 'app', '-o', '/usr/home/app'],
        flags: ['-o', '/usr/home/app'],
        bin: 'bin'
      };
  
      const resolution = await pathfinder(commandsPath, args, true);
      expect(resolution.commands.length).toBe(3);
      expect(resolution.command).toBeUndefined();
    });

    test('strict mode is equals to false it asumes all *.[js|ts] are considered commands', async () => {
      const commandsPath = `${__dirname}/cmds`;
      const args: Arguments = {
        node: 'node',
        path: 'cwd/bin',
        commands: ['search', 'location'],
        argv: ['node', 'cwd/bin', 'generate', 'app', '-o', '/usr/home/app'],
        flags: ['-o', '/usr/home/app'],
        bin: 'bin'
      };
  
      const resolution = await pathfinder(commandsPath, args, false);
      expect(resolution.commands.length).toBe(4);
      expect(resolution.command).toBeDefined();
    });

  });
});
