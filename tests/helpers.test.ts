import { Arguments, CommandInterface, getFlags, pad, showHelp, Rule } from '../src';

describe('yax-cli', () => {
  test('resolve validations', () => {
    const validations: Rule[] = [
      {
        flag: 'help',
        alias: 'h',
        description: "Display help",
        required: false, 
        type: 'boolean',
        default: false
      }];
    expect(getFlags(validations)).toEqual(['OPTIONS:', '--help, -h                             (optional) Display help']);
  });

  test('pad should return an empty string when n is a negative number', () => {
    expect(pad(-100)).toEqual('');
  });

  test('show help', () => {
    const cmd: CommandInterface = {
      description: 'cli',
      examples: [],
      handler: () => {},
      validations: []
    };

    const args: Arguments =    {
      node: 'node',
      path: 'cwd/bin',
      bin: 'bin',
      command: 'test',
      argv: []
    };
    showHelp(cmd, args);
  });

  test('show help', () => {
    const cmd: CommandInterface = {
      description: 'cli',
      examples: ['cli move --file readme.md'],
      handler: () => {},
      validations: [ {
        flag: 'file',
        alias: 'f',
        list: true,
        description: 'File path',
        type: 'string',
        required: true
          
      }]
    };

    const args: Arguments =    {
      node: 'node',
      path: 'cwd/bin',
      bin: 'bin',
      command: 'test',
      argv: []
    };
    showHelp(cmd, args);
  });
});

