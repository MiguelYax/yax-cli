import { Arguments, CommandInterface, getFlags, pad, showHelp, Rule } from '../src';

describe('helpers', () => {
  test('resolve options flags based on validations', () => {
    const validations: Rule[] = [
      {
        flag: 'help',
        alias: 'h',
        description: "Display help",
        required: false,
        type: 'boolean',
        default: false
      },
      {
        flag: 'name',
        alias: 'n',
        description: 'Name',
        required: true,
        type: 'string'
      }
    ];
    expect(getFlags(validations)).toEqual([
      'OPTIONS:',
      '--help, -h                             (optional) Display help',
      '--name, -n                             (required) Name'
    ]);
  });

  test('pad should return an empty string when n is a negative number', () => {
    expect(pad(-100)).toEqual('');
  });

  test('show help', () => {
    const cmd: CommandInterface = {
      description: 'cli',
      examples: [],
      handler: () => { },
      validations: []
    };

    const args: Arguments = {
      node: 'node',
      path: 'cwd/bin',
      bin: 'bin',
      command: 'test',
      argv: []
    };

    expect( showHelp(cmd, args)).toEqual(
      [
        "USAGE: bin <COMMAND> [OPTIONS]", 
        "COMMAND: test", 
        "DESCRIPTION: cli"]
    );

  });

  test('show help', () => {
    const cmd: CommandInterface = {
      description: '',
      examples: ['cli move --file readme.md'],
      handler: () => { },
      validations: [{
        flag: 'file',
        alias: 'f',
        list: true,
        description: 'File path',
        type: 'string',
        required: true
      }]
    };

    const args: Arguments = {
      node: 'node',
      path: 'cwd/bin',
      bin: 'bin',
      command: 'test',
      argv: []
    };

    expect(showHelp(cmd, args)).toEqual([
      "USAGE: bin <COMMAND> [OPTIONS]", 
      "COMMAND: test", 
      "DESCRIPTION: ", 
      "EXAMPLES:", 
      "  - cli move --file readme.md", 
      "OPTIONS:", "--file, -f                             (required) File path"]);
  });
});

