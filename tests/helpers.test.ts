import { Arguments, CommandInterface, getFlags, pad, showHelp, Validations } from '../src';

describe('yax-cli', () => {
    test('resolve validations', () => {
        const validations: Validations = {
            'help': {
              alias: 'h',
              description: "Display help",
              required: false, 
              type: 'boolean',
              default: false
            }
          }
          expect(getFlags(validations)).toEqual(['FLAGS:', '--help, -h                             (optional) Display help'])
    });

    test('pad should return an empty string when n is a negative number', () => {
      expect(pad(-100)).toEqual('');
    });

    test('show help', () => {
      const cmd: CommandInterface = {
        description: 'cli',
        commands: [],
        examples: [],
        handler: () => {},
        validations: {}
      }

      const args: Arguments =    {
        node: 'node',
        path: 'cwd/bin',
        bin: 'bin',
        command: 'test',
        options: { 
          h: true, 
          o: 'dir',
          f: ['index.js', 'main.js', 'root.js'],
         }
      }
      showHelp(cmd, args);
    });

    test('show help', () => {
      const cmd: CommandInterface = {
        description: 'cli',
        commands: ['print'],
        examples: ['cli move --file readme.md'],
        handler: () => {},
        validations: {
          file: {
            alias: 'f',
            description: 'File path',
            type: 'array',
            required: true,
          }
        }
      }

      const args: Arguments =    {
        node: 'node',
        path: 'cwd/bin',
        bin: 'bin',
        command: 'test',
        options: { 
          h: true, 
          o: 'dir',
          f: ['index.js', 'main.js', 'root.js'],
         }
      }
      showHelp(cmd, args);
    });
});


